import React from 'react';
import { 
  Users, 
  BookOpen, 
  ShieldCheck, 
  AlertTriangle,
  TrendingUp,
  Clock,
  ChevronLeft
} from 'lucide-react';
import { ProphetStory, AppUser } from '../../../types';

interface DashboardHomeProps {
  prophets: ProphetStory[];
  users: AppUser[];
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  prophets,
  users
}) => {
  const verifiedCount = prophets.filter(p => p.status === 'verified').length;
  const underReviewCount = prophets.filter(p => p.status === 'under_review').length;
  const draftCount = prophets.filter(p => p.status === 'draft').length;

  const stats = [
    { label: 'إجمالي الأعضاء', value: users.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'قصص معتمدة', value: verifiedCount, icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'تحت التدقيق', value: underReviewCount, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'مسودات', value: draftCount, icon: BookOpen, color: 'text-slate-600', bg: 'bg-slate-50' },
  ];

  return (
    <div className="space-y-8 animate-fade-in" dir="rtl">
      <div>
        <h2 className="text-xl font-black text-slate-900">نظرة عامة على النظام</h2>
        <p className="text-xs text-slate-500">مؤشرات الأداء والحالة الحالية للمنصة</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]">
            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 block">{stat.label}</span>
              <span className="text-2xl font-black text-slate-900">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity Mockup */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>آخر النشاطات</span>
            </h3>
            <button className="text-[10px] font-bold text-emerald-600 hover:underline">عرض الكل</button>
          </div>
          <div className="divide-y divide-slate-50">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs">👤</div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">قام أحمد محمد باعتماد قصة "يوسف عليه السلام"</p>
                    <span className="text-[10px] text-slate-400">منذ 15 دقيقة</span>
                  </div>
                </div>
                <ChevronLeft className="w-3 h-3 text-slate-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Security Alerts Mockup */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>تنبيهات أمنية</span>
            </h3>
          </div>
          <div className="p-12 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <p className="text-sm font-bold text-slate-700">لا توجد ثغرات أمنية مكتشفة</p>
            <p className="text-xs text-slate-500">النظام محمي ومستقر تماماً حالياً</p>
          </div>
        </div>
      </div>
    </div>
  );
};
