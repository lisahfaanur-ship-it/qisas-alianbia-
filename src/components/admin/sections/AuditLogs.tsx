import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  Download,
  AlertCircle,
  CheckCircle2,
  XCircle,
  User,
  Clock,
  Shield
} from 'lucide-react';
import { AuditLogEntry } from '../../../types';

export const AuditLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock logs
  const logs: AuditLogEntry[] = [
    {
      id: 'log_1',
      timestamp: new Date().toISOString(),
      userId: 'admin_1',
      userEmail: 'superadmin@lightstories.com',
      userName: 'المدير الخارق',
      action: 'STORY_PUBLISH',
      category: 'content',
      targetId: 'yusuf',
      targetType: 'story',
      status: 'success',
      ipAddress: '192.168.1.1'
    },
    {
      id: 'log_2',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      userId: 'admin_2',
      userEmail: 'editor@lightstories.com',
      userName: 'محرر المحتوى',
      action: 'USER_SUSPEND',
      category: 'user_management',
      targetId: 'user_123',
      targetType: 'user',
      status: 'success',
      ipAddress: '192.168.1.5'
    },
    {
      id: 'log_3',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      userId: 'unknown',
      userEmail: 'attacker@bad.com',
      userName: 'محاولة مجهولة',
      action: 'AUTH_LOGIN_FAIL',
      category: 'auth',
      status: 'failure',
      ipAddress: '45.12.33.1',
      metadata: { reason: 'Wrong password' }
    }
  ];

  const getCategoryBadge = (cat: AuditLogEntry['category']) => {
    switch (cat) {
      case 'auth': return <span className="px-2 py-0.5 rounded-lg bg-blue-100 text-blue-700 text-[9px] font-bold">مصادقة</span>;
      case 'content': return <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-700 text-[9px] font-bold">محتوى</span>;
      case 'user_management': return <span className="px-2 py-0.5 rounded-lg bg-purple-100 text-purple-700 text-[9px] font-bold">أعضاء</span>;
      case 'security': return <span className="px-2 py-0.5 rounded-lg bg-rose-100 text-rose-700 text-[9px] font-bold">أمن</span>;
      default: return <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[9px] font-bold">عام</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" dir="rtl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">سجلات النشاط والرقابة</h2>
          <p className="text-xs text-slate-500">تتبع جميع العمليات الحساسة التي تتم في لوحة التحكم</p>
        </div>
        <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" />
          <span>تصدير السجلات (CSV)</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="بحث بالاسم، الإجراء، أو البريد..."
            className="w-full pr-10 pl-4 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select className="bg-transparent text-xs font-bold outline-none cursor-pointer">
              <option>جميع الفئات</option>
              <option>الأمن</option>
              <option>المحتوى</option>
              <option>الأعضاء</option>
            </select>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-black text-slate-600">الوقت</th>
                <th className="px-6 py-4 text-xs font-black text-slate-600">المسؤول</th>
                <th className="px-6 py-4 text-xs font-black text-slate-600">الإجراء</th>
                <th className="px-6 py-4 text-xs font-black text-slate-600">الفئة</th>
                <th className="px-6 py-4 text-xs font-black text-slate-600">الحالة</th>
                <th className="px-6 py-4 text-xs font-black text-slate-600">عنوان IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(log.timestamp).toLocaleString('ar-SA')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{log.userName}</span>
                      <span className="text-[9px] text-slate-400">{log.userEmail}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-700">{log.action}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getCategoryBadge(log.category)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 text-[10px] font-bold ${
                      log.status === 'success' ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {log.status === 'success' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {log.status === 'success' ? 'نجاح' : 'فشل'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[10px] text-slate-400 font-mono">
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
        <p className="text-[11px] text-amber-800 leading-relaxed">
          <strong>تنبيه أمني:</strong> يتم الاحتفاظ بسجلات النشاط لمدة 90 يوماً بشكل تلقائي. أي عملية حذف أو تعديل في هذه السجلات تتطلب صلاحيات "Super Admin" ويتم تسجيلها في قناة أمنية خارجية مشفرة.
        </p>
      </div>
    </div>
  );
};
