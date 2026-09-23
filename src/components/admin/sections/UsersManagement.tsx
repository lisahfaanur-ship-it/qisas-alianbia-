import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  UserPlus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ShieldAlert, 
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Mail,
  Calendar,
  Shield
} from 'lucide-react';
import { AppUser, AdminRole } from '../../../types';

interface UsersManagementProps {
  // In a real app, these would come from Firestore
  users: AppUser[];
  onUpdateUser: (uid: string, updates: Partial<AppUser>) => void;
  onDeleteUser: (uid: string) => void;
}

export const UsersManagement: React.FC<UsersManagementProps> = ({
  users,
  onUpdateUser,
  onDeleteUser
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'user' | 'admin'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSuspension = (user: AppUser) => {
    if (window.confirm(`هل أنت متأكد من ${user.isSuspended ? 'تفعيل' : 'تعطيل'} حساب ${user.displayName}؟`)) {
      onUpdateUser(user.uid, { isSuspended: !user.isSuspended });
    }
  };

  const handleDelete = (user: AppUser) => {
    if (window.confirm(`تحذير: هل أنت متأكد من حذف حساب ${user.displayName} نهائياً؟ لا يمكن التراجع عن هذا الإجراء.`)) {
      onDeleteUser(user.uid);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" dir="rtl">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">إدارة الأعضاء والمستخدمين</h2>
          <p className="text-xs text-slate-500">عرض وتعديل والتحكم في حسابات مستخدمي المنصة</p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm">
          <UserPlus className="w-4 h-4" />
          <span>إضافة مستخدم جديد</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="بحث بالاسم أو البريد الإلكتروني..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="bg-transparent text-xs font-bold outline-none cursor-pointer"
            >
              <option value="all">جميع الرتب</option>
              <option value="user">مستخدم عادي</option>
              <option value="admin">مدير</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-black text-slate-600">المستخدم</th>
                <th className="px-6 py-4 text-xs font-black text-slate-600">الرتبة</th>
                <th className="px-6 py-4 text-xs font-black text-slate-600">الحالة</th>
                <th className="px-6 py-4 text-xs font-black text-slate-600">تاريخ الانضمام</th>
                <th className="px-6 py-4 text-xs font-black text-slate-600">النجوم</th>
                <th className="px-6 py-4 text-xs font-black text-slate-600">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr key={user.uid} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-600 overflow-hidden">
                          {user.displayName.charAt(0)}
                        </div>
                        <div>
                          <span className="text-sm font-bold text-slate-900 block">{user.displayName}</span>
                          <span className="text-[10px] text-slate-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                        user.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role === 'admin' ? 'مدير' : 'مستخدم'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 text-[10px] font-bold ${
                        user.isSuspended ? 'text-rose-600' : 'text-emerald-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.isSuspended ? 'bg-rose-600' : 'bg-emerald-600'}`} />
                        {user.isSuspended ? 'معطل' : 'نشط'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(user.createdAt).toLocaleDateString('ar-SA')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-700">
                      ⭐ {user.achievements.totalStars}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors" title="تعديل">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => toggleSuspension(user)}
                          className={`p-2 rounded-lg transition-colors ${
                            user.isSuspended ? 'hover:bg-emerald-50 text-emerald-600' : 'hover:bg-amber-50 text-amber-600'
                          }`} 
                          title={user.isSuspended ? 'تفعيل' : 'تعطيل'}
                        >
                          {user.isSuspended ? <UserCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={() => handleDelete(user)}
                          className="p-2 hover:bg-rose-50 rounded-lg text-rose-500 transition-colors" 
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm italic">
                    لا يوجد مستخدمون يطابقون معايير البحث
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
            <span className="text-xs text-slate-500 font-medium">عرض {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredUsers.length)} من {filteredUsers.length}</span>
            <div className="flex items-center gap-2">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="p-2 rounded-lg border border-slate-200 bg-white disabled:opacity-50 hover:bg-slate-100 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold px-4">{currentPage} / {totalPages}</span>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="p-2 rounded-lg border border-slate-200 bg-white disabled:opacity-50 hover:bg-slate-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
