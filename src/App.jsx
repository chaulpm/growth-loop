import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import ControlCenterView from './components/dashboard/ControlCenterView';
import ProductMasterView from './components/product-master/ProductMasterView';
import NewProductLaunchModal from './components/product-master/NewProductLaunchModal';
import CreateCampaignModal from './components/CreateCampaignModal';
import GeminiGlobalPanel from './components/gemini/GeminiGlobalPanel';
import GeminiGuidedPlannerModal from './components/gemini/GeminiGuidedPlannerModal';
import CreativeBriefModal from './components/gemini/CreativeBriefModal';
import TaskWorkflowBoard from './components/workflow/TaskWorkflowBoard';
import TeamManagementModal from './components/team/TeamManagementModal';
import WeeklyReportModal from './components/report/WeeklyReportModal';
import { INITIAL_PRODUCTS, DASHBOARD_DATA, INITIAL_TEAM_MEMBERS, WEEKLY_REPORT_DATA, CURRENT_USER } from './data/mockData';
import { fetchTasks, createTasksBatch } from './services/taskService';
import { createMasterPlan } from './services/masterPlanService';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('control-center'); // 'control-center' | 'product-master' | 'task-workflow'
  const [selectedMonth, setSelectedMonth] = useState('2026-09');

  // State Dữ liệu Sản phẩm & Dashboard
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [alerts, setAlerts] = useState(DASHBOARD_DATA.performanceAlerts);
  const [tasks, setTasks] = useState(DASHBOARD_DATA.teamTasks);
  const [masterPlans, setMasterPlans] = useState(DASHBOARD_DATA.masterPlans || []);
  const [experiments, setExperiments] = useState(DASHBOARD_DATA.experiments);
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM_MEMBERS);
  const [currentUser, setCurrentUser] = useState(CURRENT_USER);

  // Gemini OS Modals & Panel State
  const [isGeminiPanelOpen, setIsGeminiPanelOpen] = useState(false);
  const [isGuidedPlannerOpen, setIsGuidedPlannerOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isWeeklyReportOpen, setIsWeeklyReportOpen] = useState(false);
  const [selectedTaskForBrief, setSelectedTaskForBrief] = useState(null);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);

  // Legacy/Manual Modals
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [campaignModalData, setCampaignModalData] = useState({
    productId: '',
    presetTitle: '',
    presetBrief: ''
  });

  // Toast notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Tải dữ liệu Tasks trực tiếp từ Supabase Database khi khởi động
  useEffect(() => {
    let isMounted = true;
    async function loadTasks() {
      try {
        const liveTasks = await fetchTasks();
        if (isMounted && liveTasks && liveTasks.length > 0) {
          setTasks(liveTasks);
          console.log(`⚡ [App.jsx] Đã tải thành công ${liveTasks.length} tasks từ Supabase Database.`);
        }
      } catch (err) {
        console.warn('Không thể nạp tasks từ Supabase, sử dụng mockData:', err);
      }
    }
    loadTasks();
    return () => {
      isMounted = false;
    };
  }, []);

  // Tính toán Coverage Data động từ danh sách sản phẩm
  const totalProducts = products.length;
  const coveredProducts = products.filter(p => p.metaSync?.activeCampaignsCount > 0).length;
  const missingProducts = totalProducts - coveredProducts;
  const needsRefresh = products.filter(p => p.aiDiagnosis?.urgency === 'warning').length;
  const activeCampaignsTotal = products.reduce((acc, p) => acc + (p.metaSync?.activeCampaignsCount || 0), 0);
  const coveragePercent = totalProducts > 0 ? Math.round((coveredProducts / totalProducts) * 100) : 0;

  const coverageData = {
    totalProducts,
    coveredProducts,
    missingProducts,
    needsRefresh,
    activeCampaignsTotal,
    coveragePercent
  };

  // Handler: Thêm sản phẩm mới
  const handleSaveProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
    showToast(`Đã thêm thành công sản phẩm: ${newProduct.name}`);
  };

  // Handler: Mở xem Creative Brief của task
  const handleOpenBrief = (task) => {
    setSelectedTaskForBrief(task);
    setIsBriefModalOpen(true);
  };

  // Handler: Xử lý nút bấm CTA theo ngữ cảnh AI trên Product Card
  const handleTriggerAction = (product, actionText) => {
    setCampaignModalData({
      productId: product.id,
      presetTitle: `[${product.name}] ${actionText}`,
      presetBrief: `${product.aiDiagnosis.problem} ${product.aiDiagnosis.solution}`
    });
    setIsCampaignModalOpen(true);
  };

  // Handler: Lưu Campaign từ Modal hoặc từ Gemini Guided Planner & Sinh Task thực thi
  const handleSaveCampaign = (campaignData, generatedTasks = [], newMasterPlan = null) => {
    setProducts(prevProducts => {
      return prevProducts.map(prod => {
        if (prod.id === campaignData.productId) {
          const currentCount = prod.metaSync?.activeCampaignsCount || 0;
          return {
            ...prod,
            metaSync: {
              ...prod.metaSync,
              status: 'live',
              activeCampaignsCount: currentCount + 1,
              startDate: campaignData.startDate,
              lastSynced: 'Vừa kích hoạt',
              runningCampaigns: [
                {
                  name: campaignData.title,
                  status: 'Active',
                  spend: '$50 (Test)',
                  leads: 0
                },
                ...(prod.metaSync?.runningCampaigns || [])
              ]
            },
            aiDiagnosis: {
              badge: 'Đang chạy tốt',
              problem: `Chiến dịch "${campaignData.title}" đã được chốt kế hoạch qua Trợ lý Hoạch định Chiến lược.`,
              solution: `Key message: "${campaignData.keyMessage || 'Tăng tốc tăng trưởng'}". Đang phân bổ task cho team thực thi.`,
              actionCtaText: 'Xem Chi Tiết Ads',
              urgency: 'success'
            }
          };
        }
        return prod;
      });
    });

    // Thêm Master Plan mới nếu có
    if (newMasterPlan) {
      setMasterPlans(prev => [newMasterPlan, ...prev]);
      createMasterPlan(newMasterPlan).catch(err => console.warn('Lỗi chèn Master Plan vào Supabase:', err));
    }

    // Tự động sinh task thực thi vào Kanban board nếu có
    if (generatedTasks && generatedTasks.length > 0) {
      setTasks(prevTasks => [...generatedTasks, ...prevTasks]);
      createTasksBatch(generatedTasks).catch(err => console.warn('Lỗi chèn generatedTasks vào Supabase:', err));
      if (newMasterPlan) {
        showToast(`🚀 Đã tạo Master Plan "${newMasterPlan.title}" và lưu DB Supabase!`);
      } else {
        showToast(`✨ Đã chốt kế hoạch "${campaignData.title}" và lưu ${generatedTasks.length} task vào Supabase!`);
      }
    } else {
      showToast(`✨ Hệ thống đã kích hoạt thành công chiến dịch "${campaignData.title}"!`);
    }
  };

  // Handler: Cập nhật Master Plan khi đổi Creator/Reviewer từ UI
  const handleUpdatePlan = (updatedPlan) => {
    setMasterPlans(prev => prev.map(p => p.id === updatedPlan.id ? updatedPlan : p));
    if (updatedPlan.reviewer) {
      setTasks(prev => prev.map(t => t.masterPlanId === updatedPlan.id ? {
        ...t,
        lockMessage: `Chờ ${updatedPlan.reviewer} duyệt Master Plan để mở khóa`
      } : t));
    }
  };

  // Handler: Cập nhật Task khi đổi Assignee từ UI
  const handleUpdateTask = (updatedTask) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  // Handler: Sếp duyệt Master Plan -> Mở khóa toàn bộ task con của chiến dịch
  const handleApproveMasterPlan = (planId, approverName) => {
    const targetPlan = masterPlans.find(p => p.id === planId);
    const finalApprover = approverName || targetPlan?.reviewer || targetPlan?.approver || 'Ban Giám Đốc';

    setMasterPlans(prev => prev.map(p => {
      if (p.id === planId) {
        return {
          ...p,
          status: 'approved',
          statusLabel: 'Đã phê duyệt',
          reviewer: finalApprover,
          approver: finalApprover
        };
      }
      return p;
    }));

    setTasks(prev => prev.map(t => {
      if (t.masterPlanId === planId) {
        return {
          ...t,
          isLocked: false,
          status: 'active',
          statusLabel: t.stage === 'in_progress' ? 'Đang làm' : 'Chưa bắt đầu',
          lockMessage: null
        };
      }
      return t;
    }));

    showToast(`🎉 ${finalApprover} đã phê duyệt Kế hoạch! 2 Task con của chiến dịch đã được mở khóa để team triển khai.`);
  };

  // Handler: Sếp yêu cầu chỉnh sửa Master Plan
  const handleRejectMasterPlan = (planId, note) => {
    setMasterPlans(prev => prev.map(p => {
      if (p.id === planId) {
        return {
          ...p,
          status: 'rejected',
          statusLabel: 'Yêu cầu sửa',
          revisionNote: note
        };
      }
      return p;
    }));
    showToast("📝 Đã gửi phản hồi yêu cầu chỉnh sửa Master Plan tới Growth Lead!");
  };

  const handleSaveLearning = ({ taskId, taskTitle, campaign, brand, winner, winnerLabel, learning }) => {
    setExperiments(prev => ({
      ...prev,
      aiLearning: {
        ...prev.aiLearning,
        points: [
          `[${brand} - ${campaign}] ${learning}`,
          ...(prev.aiLearning?.points || [])
        ]
      }
    }));
    showToast(`✨ Đã lưu bài học A/B test "${winnerLabel}" vào Thư viện Growth!`);
  };

  const pendingReviewCount = tasks.filter(t => t.stage === 'in_review').length;

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-800 flex flex-col selection:bg-indigo-100 selection:text-indigo-900 font-['Inter',sans-serif]">
      
      {/* 1. Header Navigation Bar (Soft & Elegant Minimalism) */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        onOpenNewProductModal={() => setIsNewProductModalOpen(true)}
        onOpenGuidedPlanning={() => setIsGuidedPlannerOpen(true)}
        onOpenWeeklyReport={() => setIsWeeklyReportOpen(true)}
        isGeminiPanelOpen={isGeminiPanelOpen}
        onToggleGeminiPanel={() => setIsGeminiPanelOpen(!isGeminiPanelOpen)}
        currentUser={currentUser}
        teamMembers={teamMembers}
        onSwitchUser={(user) => {
          setCurrentUser(user);
          showToast(`Đã chuyển không gian làm việc sang: ${user.name} (${user.role})`);
        }}
        criticalAlertsCount={3}
        pendingReviewCount={pendingReviewCount}
      />

      {/* 2. Main Workspace */}
      <main className={`flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300 ${isGeminiPanelOpen ? 'lg:pr-96' : ''}`}>
        
        {/* Toast thông báo Soft UI */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-xl shadow-lg border border-slate-700/50 flex items-center space-x-2.5 text-xs font-medium animate-in slide-in-from-bottom-5 duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {activeTab === 'control-center' && (
          /* MÀN HÌNH 1: THE CONTROL CENTER */
          <ControlCenterView
            products={products}
            coverageData={coverageData}
            alerts={alerts}
            tasks={tasks}
            experiments={experiments}
            masterPlans={masterPlans}
            teamMembers={teamMembers}
            onApproveMasterPlan={handleApproveMasterPlan}
            onRejectMasterPlan={handleRejectMasterPlan}
            onUpdatePlan={handleUpdatePlan}
            onUpdateTask={handleUpdateTask}
            showToast={showToast}
            onNavigateToProducts={() => setActiveTab('product-master')}
            onNavigateToWorkflow={() => setActiveTab('task-workflow')}
            onOpenTeamModal={() => setIsTeamModalOpen(true)}
            onOpenWeeklyReport={() => setIsWeeklyReportOpen(true)}
            onOpenBrief={handleOpenBrief}
            onOpenGuidedPlanning={() => setIsGuidedPlannerOpen(true)}
          />
        )}

        {activeTab === 'product-master' && (
          /* MÀN HÌNH 2: PRODUCT MASTER & PLANNER */
          <ProductMasterView
            products={products}
            onOpenNewProductModal={() => setIsNewProductModalOpen(true)}
            onOpenGuidedPlanning={() => setIsGuidedPlannerOpen(true)}
            onTriggerAction={handleTriggerAction}
          />
        )}

        {activeTab === 'task-workflow' && (
          /* MÀN HÌNH 3: TASK & WORKFLOW BOARD (KANBAN & SLIDE-OVER FEEDBACK) */
          <TaskWorkflowBoard
            tasks={tasks}
            onUpdateTasks={setTasks}
            teamMembers={teamMembers}
            products={products}
            onOpenTeamModal={() => setIsTeamModalOpen(true)}
            showToast={showToast}
            onSaveLearning={handleSaveLearning}
          />
        )}

      </main>

      {/* 3. Floating Quick Trigger cho Trợ lý Vận hành */}
      {!isGeminiPanelOpen && (
        <button
          onClick={() => setIsGeminiPanelOpen(true)}
          className="fixed bottom-6 right-6 z-30 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg shadow-indigo-200/50 transition-all flex items-center space-x-2 text-xs font-semibold cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-indigo-200" />
          <span>Trợ lý Vận hành</span>
        </button>
      )}

      {/* 4. The Global Sidebar/Panel (Thanh đồng hành bên phải) */}
      <GeminiGlobalPanel
        isOpen={isGeminiPanelOpen}
        onClose={() => setIsGeminiPanelOpen(false)}
        activeTab={activeTab}
        products={products}
        tasks={tasks}
        onOpenBrief={handleOpenBrief}
        onOpenGuidedPlanning={() => {
          setIsGeminiPanelOpen(false);
          setIsGuidedPlannerOpen(true);
        }}
      />

      {/* 5. Guided Planning Modal (Conversational Workflow thay Form 20 trường) */}
      <GeminiGuidedPlannerModal
        isOpen={isGuidedPlannerOpen}
        onClose={() => setIsGuidedPlannerOpen(false)}
        products={products}
        teamMembers={teamMembers}
        currentUser={currentUser}
        onApproveCampaign={handleSaveCampaign}
      />

      {/* 6. Creative Brief Modal (Inline Brief cho từng task) */}
      <CreativeBriefModal
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
        task={selectedTaskForBrief}
      />

      {/* 7. New Launch Modal & Manual Campaign Modal */}
      <NewProductLaunchModal
        isOpen={isNewProductModalOpen}
        onClose={() => setIsNewProductModalOpen(false)}
        onSave={handleSaveProduct}
      />

      <CreateCampaignModal
        isOpen={isCampaignModalOpen}
        onClose={() => setIsCampaignModalOpen(false)}
        products={products}
        initialProductId={campaignModalData.productId}
        presetTitle={campaignModalData.presetTitle}
        presetBrief={campaignModalData.presetBrief}
        selectedMonth={selectedMonth}
        onSave={handleSaveCampaign}
      />

      {/* 8. Team Management & Automated Follow-up Modal */}
      <TeamManagementModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        teamMembers={teamMembers}
        onUpdateTeamMembers={setTeamMembers}
        showToast={showToast}
      />

      {/* 9. Auto-Generated Weekly Report Modal */}
      <WeeklyReportModal
        isOpen={isWeeklyReportOpen}
        onClose={() => setIsWeeklyReportOpen(false)}
        reportData={WEEKLY_REPORT_DATA}
        showToast={showToast}
      />

      {/* Footer Soft & Elegant Style */}
      <footer className="border-t border-slate-200/50 bg-[#F9FAFB] py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-medium text-slate-600">
            <strong className="text-slate-800 font-bold">Growth-loop</strong> — Data-Driven Growth Operating System
          </span>
          <span className="flex items-center text-slate-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2" />
            Plan → Assign → Execute → Monitor → Optimize → Learn
          </span>
        </div>
      </footer>

    </div>
  );
}
