import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Monitor, 
  Globe, 
  AlertTriangle,
  Smartphone,
  LogOut,
  RefreshCw
} from 'lucide-react';

export const SecuritySettings: React.FC = () => {
  const activeSessions = [
    { id: '1', device: 'Chrome on macOS', location: 'الرياض، السعودية', ip: '192.168.1.1', current: true },
    { id: '2', device: 'Safari on iPhone', location: 'دبي، الإمارات', ip: '172.16.0.44', current: false },
  ];

  return (
    <div className="space-y-8 animate-fade-in" dir="rtl">
      <div>
        <h2 className="text-xl font-black text-slate-900">الأمن والجلسات النشطة</h2>
        <p className="text-xs text-slate-500">إدارة حماية الحساب والتحكم في الأجهزة المتصلة</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Security Controls */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>إعدادات المصادقة</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-900">المصادقة الثنائية (2FA)</p>
                  <p className="text-[10px] text-slate-500">إضافة طبقة حماية إضافية عبر تطبيق Google Authenticator</p>
                </div>
                <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-[10px] font-bold">تفعيل الآن</button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-900">سياسة كلمة المرور</p>
                  <p className="text-[10px] text-slate-500">فرض تغيير كلمة المرور كل 90 يوماً</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                    <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full translate-x-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Monitor className="w-4 h-4 text-blue-600" />
              <span>الجلسات النشطة حالياً</span>
            </h3>

            <div className="divide-y divide-slate-100">
              {activeSessions.map((session) => (
                <div key={session.id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                      {session.device.includes('iPhone') ? <Smartphone className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-slate-900">{session.device}</p>
                        {session.current && <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[8px] font-bold">هذا الجهاز</span>}
                      </div>
                      <p className="text-[10px] text-slate-500">{session.location} • {session.ip}</p>
                    </div>
                  </div>
                  {!session.current && (
                    <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="إنهاء الجلسة">
                      <LogOut className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-4">
            <ShieldCheck className="w-8 h-8 text-amber-400" />
            <h3 className="text-sm font-black">حالة الحماية العامة</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-slate-400">قوة التشفير</span>
                <span className="text-emerald-400">عالية (AES-256)</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-[95%] h-full bg-emerald-500" />
              </div>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              يتم مراقبة جميع محاولات الدخول غير المصرح بها وإرسال تنبيهات فورية للفريق الأمني.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 space-y-2">
            <div className="flex items-center gap-2 text-rose-700">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-black">تحذير أمني</span>
            </div>
            <p className="text-[10px] text-rose-600 leading-relaxed">
              في حال لاحظت أي نشاط غير معتاد، يرجى تغيير كلمة المرور فوراً وتسجيل الخروج من جميع الأجهزة الأخرى.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
