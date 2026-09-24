import React from 'react';
import CampaignCoverageWidget from './CampaignCoverageWidget';
import PerformanceAlertsWidget from './PerformanceAlertsWidget';
import TaskQualityControlWidget from './TaskQualityControlWidget';
import GrowthExperimentsWidget from './GrowthExperimentsWidget';

export default function ControlCenterView({ 
  products = [],
  coverageData, 
  alerts, 
  tasks, 
  experiments, 
  masterPlans = [],
  teamMembers,
  onApproveMasterPlan,
  onRejectMasterPlan,
  onUpdatePlan,
  onUpdateTask,
  showToast,
  onNavigateToProducts,
  onNavigateToWorkflow,
  onOpenTeamModal,
  onOpenBrief,
  onOpenGuidedPlanning
}) {
  return (
    <div className="space-y-8">
      
      {/* 1. 2-COLUMN BALANCED GRID (CAMPAIGN COVERAGE vs ALERTS + LEARNING) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Left Column: Full-Height Campaign Coverage & Health Breakdown */}
        <div className="h-full flex flex-col">
          <CampaignCoverageWidget 
            products={products}
            coverageData={coverageData} 
            onNavigateToProducts={onNavigateToProducts} 
            onOpenGuidedPlanning={onOpenGuidedPlanning}
          />
        </div>

        {/* Right Column: Performance Alerts + Learning Library */}
        <div className="space-y-8 flex flex-col justify-between">
          <PerformanceAlertsWidget 
            alerts={alerts} 
          />

          <GrowthExperimentsWidget 
            experimentData={experiments} 
          />
        </div>
      </div>

      {/* 2. Full-width Task & Quality Control Widget */}
      <div className="pt-2">
        <TaskQualityControlWidget 
          tasks={tasks} 
          masterPlans={masterPlans}
          teamMembers={teamMembers}
          onApproveMasterPlan={onApproveMasterPlan}
          onRejectMasterPlan={onRejectMasterPlan}
          onUpdatePlan={onUpdatePlan}
          onUpdateTask={onUpdateTask}
          showToast={showToast}
          onOpenBrief={onOpenBrief}
          onNavigateToWorkflow={onNavigateToWorkflow}
          onOpenTeamModal={onOpenTeamModal}
        />
      </div>

    </div>
  );
}
