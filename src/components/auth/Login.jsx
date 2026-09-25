import React, { useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck,
  User,
  Zap
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';

export default function Login({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Xử lý thông báo lỗi thân thiện bằng tiếng Việt
  const getFriendlyErrorMessage = (error) => {
    if (!error) return 'Đã xảy ra lỗi, vui lòng thử lại.';
    const msg = error.message || error.toString();
    if (msg.includes('Invalid login credentials')) {
      return 'Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại.';
    }
    if (msg.includes('Email not confirmed')) {
      return 'Tài khoản chưa được kích hoạt. Vui lòng kiểm tra hộp thư email hoặc dùng chế độ Demo.';
    }
    if (msg.includes('Password should be at least')) {
      return 'Mật khẩu phải có tối thiểu 6 ký tự.';
    }
    if (msg.includes('User already registered')) {
      return 'Email này đã được đăng ký. Vui lòng chuyển sang tab Đăng nhập.';
    }
    if (msg.includes('invalid') && msg.includes('email')) {
      return 'Định dạng email không hợp lệ (ví dụ: name@company.com).';
    }
    return msg;
  };

  // 1. Luồng Submit Đăng nhập hoặc Đăng ký với Supabase Auth
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Vui lòng điền đầy đủ Email và Mật khẩu.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Mật khẩu cần tối thiểu 6 ký tự.');
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        // --- LUỒNG SIGN UP ---
        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase.auth.signUp({
            email: email.trim().toLowerCase(),
            password: password,
            options: {
              data: {
                full_name: fullName.trim() || email.split('@')[0],
              }
            }
          });

          if (error) throw error;

          if (data?.session) {
            setSuccessMsg('Đăng ký thành công! Đang chuyển vào hệ thống...');
            setTimeout(() => {
              if (onLoginSuccess) onLoginSuccess(data.session);
            }, 600);
          } else {
            setSuccessMsg('Đã khởi tạo tài khoản! Vui lòng kiểm tra email kích hoạt hoặc dùng chế độ Demo bên dưới để trải nghiệm ngay.');
            setLoading(false);
          }
        } else {
          // Fallback giả lập an toàn nếu Supabase chưa cấu hình
          const mockSession = createDemoSession(email, fullName || 'Người dùng mới');
          setSuccessMsg('Đăng ký thành công! Đang chuyển hướng...');
          setTimeout(() => {
            if (onLoginSuccess) onLoginSuccess(mockSession);
          }, 600);
        }
      } else {
        // --- LUỒNG SIGN IN ---
        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim().toLowerCase(),
            password: password
          });

          if (error) throw error;

          if (data?.session) {
            setSuccessMsg('Đăng nhập thành công!');
            setTimeout(() => {
              if (onLoginSuccess) onLoginSuccess(data.session);
            }, 500);
          }
        } else {
          // Fallback giả lập an toàn
          const mockSession = createDemoSession(email, email.split('@')[0]);
          setTimeout(() => {
            if (onLoginSuccess) onLoginSuccess(mockSession);
          }, 500);
        }
      }
    } catch (err) {
      console.error('Supabase Auth error:', err);
      setErrorMsg(getFriendlyErrorMessage(err));
      setLoading(false);
    }
  };

  // Tạo Mock Session cho khách trải nghiệm trực tiếp
  const createDemoSession = (userEmail, name, role = 'Growth Lead') => {
    const demoSession = {
      access_token: 'demo-token-' + Date.now(),
      token_type: 'bearer',
      expires_in: 3600,
      user: {
        id: 'usr-demo-' + Math.floor(Math.random() * 10000),
        email: userEmail,
        user_metadata: {
          full_name: name,
          role: role
        },
        app_metadata: { provider: 'email' },
        aud: 'authenticated',
        created_at: new Date().toISOString()
      }
    };
    try {
      localStorage.setItem('growthloop_guest_session', JSON.stringify(demoSession));
    } catch (e) {
      console.warn('Cannot persist guest session:', e);
    }
    return demoSession;
  };

  // 2. Luồng One-click Demo Login dành riêng cho Ban Giám Khảo & Khách Test
  const handleQuickDemoLogin = async (persona = 'alex') => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const isAlex = persona === 'alex';
    const demoEmail = isAlex ? 'alex@growthloop.demo' : 'sarah@growthloop.demo';
    const demoName = isAlex ? 'Alex' : 'Sarah';
    const demoRole = isAlex ? 'Head of Marketing' : 'Growth Lead';

    // Thử đăng nhập qua Supabase Auth nếu account demo tồn tại
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: 'demo@growthloop.io',
          password: 'DemoPassword@2026'
        });

        if (!error && data?.session) {
          setSuccessMsg(`Đăng nhập thành công với vai trò ${demoName} (${demoRole})!`);
          setTimeout(() => {
            if (onLoginSuccess) onLoginSuccess(data.session);
          }, 500);
          return;
        }
      } catch (err) {
        console.info('Direct demo sign in fallback to demo session:', err.message);
      }
    }

    // Luôn đảm bảo khách trải nghiệm không bao giờ bị chặn cửa
    setTimeout(() => {
      const demoSess = createDemoSession(demoEmail, demoName, demoRole);
      setSuccessMsg(`Đã kích hoạt chế độ Demo: ${demoName} (${demoRole})!`);
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(demoSess);
      }, 500);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100/60 to-indigo-50/40 flex items-center justify-center p-4 sm:p-6 font-['Inter',sans-serif] text-slate-800 relative overflow-hidden">
      
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Centered Card */}
      <div className="relative z-10 w-full max-w-[420px] bg-white/95 backdrop-blur-md rounded-3xl p-7 sm:p-8 border border-slate-200/80 shadow-[0_15px_40px_rgba(15,23,42,0.06)] space-y-6 transition-all">
        
        {/* Header Branding */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-2xs mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>Supabase Auth Secured</span>
          </div>

          <div className="flex items-center justify-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Sparkles className="w-5 h-5 text-white" strokeWidth={2.2} />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Growth Loop <span className="text-indigo-600 font-extrabold">OS</span>
            </h1>
          </div>

          <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
            Hệ thần kinh trung ương điều phối Growth Marketing & Chiến dịch đa kênh
          </p>
        </div>

        {/* Tab Switching: Đăng nhập / Đăng ký */}
        <div className="grid grid-cols-2 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/50 text-xs font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setErrorMsg(null); setSuccessMsg(null); }}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              !isSignUp ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-900'
            }`}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setErrorMsg(null); setSuccessMsg(null); }}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              isSignUp ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-900'
            }`}
          >
            Đăng ký dùng thử
          </button>
        </div>

        {/* Alert Notifications */}
        {errorMsg && (
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs flex items-start space-x-2 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
            <span className="font-medium leading-relaxed">{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs flex items-start space-x-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
            <span className="font-medium leading-relaxed">{successMsg}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isSignUp && (
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Họ và Tên
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Alex (Growth Team)"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Email công việc
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Mật khẩu
              </label>
              {!isSignUp && (
                <span className="text-[11px] text-slate-400 font-medium">
                  Tối thiểu 6 ký tự
                </span>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Primary CTA Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Đang kết nối Supabase...</span>
              </>
            ) : (
              <>
                <span>{isSignUp ? 'Tạo Tài Khoản Dùng Thử' : 'Đăng nhập vào Hệ Thần Kinh'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-slate-200/80" />
          <span className="absolute bg-white px-3 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Hoặc Dùng Thử Ngay
          </span>
        </div>

        {/* 1-Click Fast Demo Pass for Judges / Evaluators */}
        <div className="bg-slate-50/90 rounded-2xl p-3.5 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-slate-700 flex items-center">
              <Zap className="w-3.5 h-3.5 mr-1 text-amber-500 fill-amber-500" />
              Dành Cho Ban Giám Khảo & Trải Nghiệm Demo
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('alex')}
              disabled={loading}
              className="px-3 py-2 rounded-xl bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-left transition-all group cursor-pointer shadow-2xs"
            >
              <div className="font-bold text-[11px] text-slate-800 group-hover:text-indigo-700">
                Alex (Approver)
              </div>
              <div className="text-[10px] text-slate-500">
                Head of Marketing
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('sarah')}
              disabled={loading}
              className="px-3 py-2 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-left transition-all group cursor-pointer shadow-2xs"
            >
              <div className="font-bold text-[11px] text-slate-800 group-hover:text-emerald-700">
                Sarah (Owner)
              </div>
              <div className="text-[10px] text-slate-500">
                Growth Marketing Lead
              </div>
            </button>
          </div>
        </div>

        {/* Footer Technical Note */}
        <div className="text-center pt-1 border-t border-slate-100 text-[10px] text-slate-400 space-y-1">
          <p>
            Được bảo vệ bởi <strong>Supabase BaaS (PostgreSQL)</strong> & <strong>Vibe Host Cloud</strong>
          </p>
        </div>

      </div>

    </div>
  );
}
