import React, { useState, useEffect } from 'react';
import {
  Settings,
  ShieldCheck,
  Users,
  LayoutDashboard,
  BookOpen,
  FileText,
  Lock,
  LogOut,
  ChevronLeft,
  ShieldAlert,
  History,
  Menu,
  X,
  UserCog
} from 'lucide-react';
import { ProphetStory, AdminUser, AdminRole, AppUser } from '../types';
import { hasPermission } from '../utils/adminPermissions';

// Section Components
import { DashboardHome } from './admin/sections/DashboardHome';
import { ContentManagement } from './admin/sections/ContentManagement';
import { UsersManagement } from './admin/sections/UsersManagement';
import { AuditLogs } from './admin/sections/AuditLogs';
import { SecuritySettings } from './admin/sections/SecuritySettings';

type AdminSection = 'dashboard' | 'content' | 'users' | 'admins' | 'roles' | 'logs' | 'settings' | 'security';

interface AdminDashboardViewProps {
  prophets: ProphetStory[];
  onUpdateProphet: (prophet: ProphetStory) => void;
  onAddProphet: (prophet: ProphetStory) => void;
  currentUser: AdminUser;
  onLogout: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  prophets,
  onUpdateProphet,
  onAddProphet,
  currentUser,
  onLogout
}) => {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Mock data for users - in real app this comes from Firestore
  const [users, setUsers] = useState<AppUser[]>([]);

  // Navigation Items with Permission Checks
  const navItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard, permission: 'all' as const },
    { id: 'content', label: 'إدارة المحتوى', icon: BookOpen, permission: 'content.view' as const },
    { id: 'users', label: 'إدارة الأعضاء', icon: Users, permission: 'users.view' as const },
    { id: 'admins', label: 'إدارة المديرين', icon: UserCog, permission: 'admins.view' as const },
    { id: 'roles', label: 'الصلاحيات والرتب', icon: ShieldCheck, permission: 'users.manage_roles' as const },
    { id: 'logs', label: 'سجلات النشاط', icon: History, permission: 'security.view_logs' as const },
    { id: 'security', label: 'الأمن والجلسات', icon: ShieldAlert, permission: 'security.manage_sessions' as const },
    { id: 'settings', label: 'الإعدادات العامة', icon: Settings, permission: 'settings.view' as const },
  ].filter(item => item.id === 'dashboard' || hasPermission(currentUser, item.permission));

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardHome prophets={prophets} users={users} />;
      case 'content':
        return <ContentManagement prophets={prophets} onUpdateProphet={onUpdateProphet} onAddProphet={onAddProphet} />;
      case 'users':
        return (
          <UsersManagement 
            users={users} 
            onUpdateUser={(uid, updates) => setUsers(prev => prev.map(u => u.uid === uid ? { ...u, ...updates } : u))}
            onDeleteUser={(uid) => setUsers(prev => prev.filter(u => u.uid !== uid))}
          />
        );
      case 'logs':
        return <AuditLogs />;
      case 'security':
        return <SecuritySettings />;
      case 'admins':
      case 'roles':
      case 'settings':
        return (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-4">
            <Lock className="w-16 h-16 opacity-20" />
            <p className="text-sm font-bold">هذا القسم ({activeSection}) قيد التطوير الأمني حالياً</p>
            <p className="text-[10px]">سيتم تفعيله بمجرد اكتمال نظام التشفير والربط مع القاعدة.</p>
          </div>
        );
      default:
        return <DashboardHome prophets={prophets} users={users} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row -mx-4 sm:-mx-6 lg:-mx-8 -mt-8" dir="rtl">
      {/* Sidebar Navigation */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-white transition-all duration-300 flex flex-col z-40 fixed lg:static inset-y-0 right-0 ${
          !isSidebarOpen && 'hidden lg:flex'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
              <span className="font-black text-sm tracking-tight">إدارة النور</span>
            </div>
          ) : (
            <ShieldCheck className="w-6 h-6 text-amber-400 mx-auto" />
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id as AdminSection);
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center px-6 py-4 transition-all relative ${
                activeSection === item.id 
                  ? 'bg-white/10 text-white font-bold' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {isSidebarOpen && <span className="text-xs">{item.label}</span>}
              {!isSidebarOpen && <item.icon className="w-5 h-5 mx-auto" />}
              {activeSection === item.id && isSidebarOpen && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-amber-400" />
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer: User Info & Logout */}
        <div className="p-6 border-t border-white/10 space-y-4">
          <div className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center'}`}>
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-900 flex items-center justify-center font-black text-xs">
              {currentUser.displayName.charAt(0)}
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold truncate">{currentUser.displayName}</p>
                <p className="text-[9px] text-slate-500 truncate">{currentUser.role}</p>
              </div>
            )}
          </div>
          <button 
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-rose-400 hover:bg-rose-400/10 transition-all font-bold text-[11px] ${!isSidebarOpen && 'justify-center'}`}
          >
            <LogOut className="w-4 h-4" />
            {isSidebarOpen && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-6 h-6 text-slate-600" />
            </button>
            <h2 className="text-sm font-black text-slate-900">
              {navItems.find(i => i.id === activeSection)?.label || 'لوحة التحكم'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-600">اتصال آمن وموثوق</span>
            </div>
          </div>
        </header>

        {/* Section Content */}
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            {renderSection()}
          </div>
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};
