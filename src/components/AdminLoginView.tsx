import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface AdminLoginViewProps {
  onLogin: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  onLogin,
  isLoading,
  error
}) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-900 text-amber-400 shadow-2xl">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900">نظام الإدارة الآمن</h1>
            <p className="text-slate-500 font-medium mt-2">يرجى تسجيل الدخول للوصول إلى لوحة التحكم</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 flex items-center gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
              <p className="text-xs font-bold text-rose-700">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={onLogin}
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 font-black text-sm shadow-sm hover:bg-slate-50 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
              ) : (
                <>
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                  <span>تسجيل الدخول عبر Google</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <p className="text-center text-[10px] text-slate-400 font-medium leading-relaxed">
              هذا النظام مخصص للمصرح لهم فقط. يتم استخدام حساب Google المؤسسي للتحقق من الهوية. يتم تسجيل جميع محاولات الدخول.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
