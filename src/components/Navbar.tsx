import React, { useState } from 'react';
import {
  BookOpen,
  Headphones,
  Trophy,
  BookCheck,
  Users,
  Search,
  Settings,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Award,
  Star,
  History,
  Palette,
  Flame,
  Moon,
  Sun
} from 'lucide-react';
import { AgeGroup } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedAge: AgeGroup;
  setSelectedAge: (age: AgeGroup) => void;
  onOpenSearch: () => void;
  totalStars?: number;
  streakDays?: number;
  isAdmin?: boolean;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  selectedAge,
  setSelectedAge,
  onOpenSearch,
  totalStars = 0,
  streakDays = 1,
  isAdmin = false,
  isDarkMode = false,
  onToggleDarkMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: Sparkles },
    { id: 'timeline', label: 'الخط الزمني', icon: History },
    { id: 'coloring', label: 'كتيب التلوين', icon: Palette },
    { id: 'stories', label: 'قصص الأنبياء', icon: BookOpen },
    { id: 'achievements', label: 'الأوسمة والإنجازات', icon: Award },
    { id: 'audio', label: 'الاستماع الصوتي', icon: Headphones },
    { id: 'quiz-hub', label: 'اختبر نفسك', icon: Trophy },
    { id: 'sources', label: 'المصادر والمراجع', icon: BookCheck },
    { id: 'parents', label: 'دليل الوالدين', icon: Users }
  ];

  if (isAdmin) {
    navItems.push({ id: 'admin', label: 'الإدارة والتوثيق', icon: Settings });
  }

  const ageTiers: { id: AgeGroup; label: string; icon: string; desc: string }[] = [
    { id: '5-7', label: '٥–٧ سنوات', icon: '👶', desc: 'مبسط جداً وقصير' },
    { id: '8-10', label: '٨–١٠ سنوات', icon: '🧒', desc: 'متوسط وغني' },
    { id: '11-13', label: '١١–١٣ سنة', icon: '👦', desc: 'تدبر واستدلال' }
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-amber-200/70 dark:border-slate-800 shadow-sm transition-colors duration-300">
      {/* Top Banner: Authenticity Guarantee & Safe for Kids */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 dark:from-slate-950 dark:via-emerald-950 dark:to-slate-950 text-amber-100 text-[11px] py-1 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-emerald-900/40 dark:border-slate-800/80">
        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
        <span>منصة تعليمية إسلامية موثقة: مستمدة بدقة من القرآن الكريم وصحيح السنة — خالية تماماً من تجسيد الأنبياء</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-3">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            id="brand-logo-btn"
            className="flex items-center gap-3 text-right group text-slate-900 dark:text-white hover:opacity-95 transition-opacity"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-amber-300 flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:rotate-3 transition-transform">
              <span className="text-xl">🌙</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  نور الأنبياء
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                  تفاعلي
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                نور النبوة والرحلة المباركة
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-${item.id}-btn`}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-600 dark:bg-emerald-700 text-white shadow-sm shadow-emerald-600/30'
                      : 'text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-amber-300 hover:bg-emerald-50/70 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Age Selector, Dark Mode Toggle & Search */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Age Tier Selector Pills */}
            <div className="flex items-center bg-amber-100/70 dark:bg-slate-800 p-1 rounded-2xl border border-amber-200 dark:border-slate-700">
              {ageTiers.map(tier => {
                const isSelected = selectedAge === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedAge(tier.id)}
                    id={`age-tier-${tier.id}-btn`}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-amber-300 shadow-sm border border-amber-300 dark:border-slate-600 scale-105'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title={`تبديل المحتوى ليناسب سن: ${tier.desc}`}
                  >
                    <span>{tier.icon}</span>
                    <span className="hidden sm:inline">{tier.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Streak Days Flame Button */}
            <button
              onClick={() => handleNavClick('home')}
              id="header-streak-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border bg-orange-50 dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-slate-700 text-orange-950 dark:text-orange-300 border-orange-200 dark:border-slate-700 transition-all font-black text-xs shadow-xs"
              title={`سلسلة الحماس: ${streakDays} ${streakDays === 1 ? 'يوم' : 'أيام'} متتالية! اضغط لعرض تحدي اليوم`}
            >
              <Flame className="w-4 h-4 fill-orange-500 text-orange-600 animate-pulse" />
              <span>{streakDays} {streakDays === 1 ? 'يوم' : 'أيام'}</span>
            </button>

            {/* Stars & Achievements Badge Link */}
            <button
              onClick={() => handleNavClick('achievements')}
              id="header-achievements-btn"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border transition-all ${
                currentTab === 'achievements'
                  ? 'bg-amber-400 text-slate-950 font-black border-amber-500 shadow-sm'
                  : 'bg-amber-50 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-slate-700 text-amber-900 dark:text-amber-300 border-amber-200/90 dark:border-slate-700'
              }`}
              title="عرض سجل الأوسمة والإنجازات والنجوم"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span className="text-xs font-black">{totalStars}</span>
            </button>

            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              id="search-trigger-btn"
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-amber-300 border border-slate-200 dark:border-slate-700 transition-colors"
              title="ابحث عن نبي أو قصة أو قيمة تربوية"
              aria-label="بحث"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Dark Mode / Night Mode Toggle Switch Button */}
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                id="header-dark-mode-toggle-btn"
                className={`p-2.5 rounded-2xl border transition-all flex items-center gap-1.5 ${
                  isDarkMode
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/25 ring-2 ring-amber-300/30'
                    : 'bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-900 border-slate-200'
                }`}
                title={
                  isDarkMode
                    ? 'الوضع النهاري: اضغط للعودة للإضاءة النهارية'
                    : 'الوضع الليلي: مريح لعين الطفل أثناء القراءة ليلاً ويقلل إجهاد الشاشة'
                }
                aria-label={isDarkMode ? 'تبديل إلى الوضع النهاري' : 'تبديل إلى الوضع الليلي'}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-slate-950 fill-amber-500" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-700 fill-indigo-100" />
                )}
                <span className="hidden md:inline text-xs font-black">
                  {isDarkMode ? 'نهاري' : 'ليلي 🌙'}
                </span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="xl:hidden p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-900 border-b border-amber-200 dark:border-slate-800 p-4 space-y-3 animate-fade-in shadow-xl">
          {/* Quick Night Mode Switch in Mobile Menu */}
          {onToggleDarkMode && (
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-amber-400 text-slate-950 shadow-sm' : 'bg-indigo-100 text-indigo-800'}`}>
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 dark:text-white block">
                    {isDarkMode ? 'الوضع الليلي مفعل 🌙' : 'الوضع الليلي للأطفال 🌙'}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    ألوان هادئة تقلل إجهاد العين قبل النوم
                  </span>
                </div>
              </div>

              <button
                onClick={onToggleDarkMode}
                type="button"
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isDarkMode ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'
                }`}
                aria-label="تبديل الوضع الليلي"
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isDarkMode ? '-translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          )}

          <div className="px-2 py-1 text-xs font-bold text-slate-400">
            أقسام المنصة التعليمية
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all text-right ${
                  isActive
                    ? 'bg-emerald-600 dark:bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-amber-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
