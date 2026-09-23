import React, { useState } from 'react';
import {
  Trophy,
  Star,
  Sparkles,
  Award,
  CheckCircle2,
  Lock,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Flame,
  ArrowRight,
  Palette,
  Calendar
} from 'lucide-react';
import { ChildBadge, UserAchievementsState, ProphetStory } from '../types';
import { INITIAL_BADGES } from '../utils/achievementsManager';

interface AchievementsDashboardViewProps {
  achievementsState: UserAchievementsState;
  prophets: ProphetStory[];
  onSelectStory: (prophetId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const AchievementsDashboardView: React.FC<AchievementsDashboardViewProps> = ({
  achievementsState,
  prophets,
  onSelectStory,
  onNavigateTab
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [activeCategory, setActiveCategory] = useState<'all' | 'story' | 'quiz' | 'explorer' | 'streak'>('all');

  const unlockedCount = achievementsState.unlockedBadgeIds.length;
  const totalBadges = INITIAL_BADGES.length;
  const progressPercent = Math.round((unlockedCount / totalBadges) * 100);

  const completedStoriesCount = achievementsState.completedStoryIds.length;
  const completedQuizzesCount = Object.keys(achievementsState.completedQuizScores).length;

  const filteredBadges = INITIAL_BADGES.filter(badge => {
    const isUnlocked = achievementsState.unlockedBadgeIds.includes(badge.id);
    if (activeFilter === 'unlocked' && !isUnlocked) return false;
    if (activeFilter === 'locked' && isUnlocked) return false;
    if (activeCategory !== 'all' && badge.category !== activeCategory) return false;
    return true;
  });

  const getLevelBorder = (level: ChildBadge['level'], isUnlocked: boolean) => {
    if (!isUnlocked) return 'border-slate-200 dark:border-slate-750 bg-slate-50/70 dark:bg-slate-800/40 opacity-70';
    switch (level) {
      case 'diamond':
        return 'border-sky-300 dark:border-sky-700 bg-gradient-to-b from-sky-50 dark:from-slate-850 to-white dark:to-slate-900 shadow-md ring-1 ring-sky-200 dark:ring-sky-800';
      case 'gold':
        return 'border-amber-300 dark:border-amber-700 bg-gradient-to-b from-amber-50/80 dark:from-slate-850 to-white dark:to-slate-900 shadow-md ring-1 ring-amber-200 dark:ring-amber-800';
      case 'silver':
        return 'border-slate-300 dark:border-slate-700 bg-gradient-to-b from-slate-50 dark:from-slate-850 to-white dark:to-slate-900 shadow-sm';
      case 'bronze':
      default:
        return 'border-amber-700/30 dark:border-slate-700 bg-gradient-to-b from-amber-50/40 dark:from-slate-850 to-white dark:to-slate-900 shadow-sm';
    }
  };

  const getLevelBadgeText = (level: ChildBadge['level']) => {
    switch (level) {
      case 'diamond':
        return 'ماسي 💎';
      case 'gold':
        return 'ذهبي 🥇';
      case 'silver':
        return 'فضي 🥈';
      case 'bronze':
      default:
        return 'برونزي 🥉';
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-fade-in" dir="rtl">
      {/* Top Banner / Hero */}
      <div className="relative rounded-3xl bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-700 text-white p-6 sm:p-10 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-900/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>لوحة الأوسمة والإنجازات للطفل المتدبر</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              أوسمتك المباركة ورحلتك في النور 🌟
            </h1>
            <p className="text-sm sm:text-base text-amber-100 font-medium leading-relaxed">
              كل قصة تتدبرها وكل سؤال تجيب عنه يرفعك درجات في الفهم ويزيدك نجوماً وأوسمة تعتز بها!
            </p>
          </div>

          {/* Big Stars Counter Widget */}
          <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-3xl p-5 sm:p-6 text-center shrink-0 min-w-[200px] shadow-lg">
            <span className="text-xs text-amber-200 font-bold block mb-1">مجموع النجوم المكتسبة</span>
            <div className="flex items-center justify-center gap-2 text-4xl sm:text-5xl font-black text-amber-300">
              <Star className="w-8 h-8 fill-amber-300 text-amber-400 animate-pulse" />
              <span>{achievementsState.totalStars}</span>
            </div>
            <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between text-xs text-white/90 font-medium">
              <span>{unlockedCount} من {totalBadges} أوسمة</span>
              <span className="font-bold text-amber-200">{progressPercent}٪</span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <div className="flex items-center justify-between text-xs text-amber-100 mb-2 font-bold">
            <span>التقدم في جمع الأوسمة النبوية</span>
            <span>{unlockedCount} / {totalBadges} وسام</span>
          </div>
          <div className="w-full h-3.5 rounded-full bg-black/20 p-0.5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-300 via-amber-200 to-white transition-all duration-700 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center text-xl font-bold shrink-0">
            📖
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">قصص أتممت قراءتها</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {completedStoriesCount} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">من {prophets.length}</span>
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xl font-bold shrink-0">
            🎯
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">اختبارات منجزة بنجاح</span>
            <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
              {completedQuizzesCount} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">اختبار</span>
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 flex items-center justify-center text-xl font-bold shrink-0">
            🏆
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">الأوسمة المفتوحة</span>
            <span className="text-2xl font-black text-indigo-900 dark:text-indigo-300">
              {unlockedCount} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">وسام</span>
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 flex items-center justify-center text-xl font-bold shrink-0">
            🔥
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">أيام المواظبة على القراءة</span>
            <span className="text-2xl font-black text-rose-700 dark:text-rose-400">
              {achievementsState.readingStreakDays} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">أيام</span>
            </span>
          </div>
        </div>
      </div>

      {/* Coloring Gallery Section */}
      {achievementsState.savedColoringWorks.length > 0 && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-indigo-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-slate-800 flex items-center justify-center text-2xl">🎨</div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  معرض أعمالي الفنية الملونة
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  لوحات فنية من إبداع أناملك الصغيرة
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('coloring')}
              className="px-5 py-2 rounded-xl bg-indigo-50 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-slate-700 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-all flex items-center gap-2"
            >
              <span>أضف لوحة جديدة</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {achievementsState.savedColoringWorks.map((work) => (
              <div 
                key={work.id}
                className="group relative bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-slate-100 dark:border-slate-700 overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-500 transition-all aspect-square flex flex-col"
              >
                {/* SVG Render Preview (Simplified) */}
                <div className="flex-1 bg-white dark:bg-slate-900 p-4 flex items-center justify-center">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    {prophets.find(p => p.id === work.storyId)?.coloringPages?.find(cp => cp.id === work.pageId)?.svgPaths.map(path => (
                      <path
                        key={path.id}
                        d={path.d}
                        fill={work.svgData[path.id] || '#FFFFFF'}
                        stroke="#94a3b8"
                        strokeWidth="1"
                      />
                    ))}
                  </svg>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-[10px] font-black text-slate-900 dark:text-white truncate">{work.title}</h4>
                  <div className="flex items-center gap-1 mt-1 text-[8px] text-slate-500 dark:text-slate-400 font-bold">
                    <Calendar className="w-2.5 h-2.5" />
                    <span>{new Date(work.savedAt).toLocaleDateString('ar-SA')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Filter and Categories Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        {/* Status Filter */}
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeFilter === 'all' ? 'bg-white dark:bg-slate-700 text-emerald-900 dark:text-emerald-300 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            جميع الأوسمة ({totalBadges})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('unlocked')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeFilter === 'unlocked' ? 'bg-white dark:bg-slate-700 text-emerald-900 dark:text-emerald-300 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            المكتسبة 🌟 ({unlockedCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('locked')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeFilter === 'locked' ? 'bg-white dark:bg-slate-700 text-emerald-900 dark:text-emerald-300 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            قيد الفتح 🔒 ({totalBadges - unlockedCount})
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeCategory === 'all' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            الكل
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('story')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeCategory === 'story' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            📚 إتمام القصص
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('quiz')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeCategory === 'quiz' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            🎯 الاختبارات المعرفية
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('explorer')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeCategory === 'explorer' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            🔎 البحث والتلوين
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('streak')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeCategory === 'streak' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            🔥 الأيام المتتالية
          </button>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredBadges.map(badge => {
          const isUnlocked = achievementsState.unlockedBadgeIds.includes(badge.id);
          const unlockDate = achievementsState.badgeUnlockDates[badge.id];

          return (
            <div
              key={badge.id}
              className={`rounded-3xl p-5 border-2 transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${getLevelBorder(
                badge.level,
                isUnlocked
              )}`}
            >
              {/* Badge Header: Level and Points */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {getLevelBadgeText(badge.level)}
                </span>
                <span className="text-xs font-black text-amber-700 dark:text-amber-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>+{badge.points}</span>
                </span>
              </div>

              {/* Badge Center Icon */}
              <div className="text-center my-2">
                <div className="relative inline-flex items-center justify-center">
                  <div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-inner transition-transform ${
                      isUnlocked
                        ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 transform hover:scale-110 shadow-md'
                        : 'bg-slate-200/80 dark:bg-slate-800 text-slate-400 dark:text-slate-500 grayscale'
                    }`}
                  >
                    {badge.iconEmoji}
                  </div>
                  {!isUnlocked && (
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-slate-700 dark:bg-slate-600 text-white flex items-center justify-center shadow-md">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-black text-slate-900 dark:text-white mt-3 mb-1">
                  {badge.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed min-h-[36px]">
                  {badge.description}
                </p>
              </div>

              {/* Bottom: Criteria / Unlock Date */}
              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-750 text-center">
                {isUnlocked ? (
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تم الفتح بنجاح ✨</span>
                  </div>
                ) : (
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 py-1.5 px-2 rounded-xl">
                    المطلوب: {badge.criteriaDescription}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggested Next Stories to Unlock More Badges */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              🚀 قصص مقترحة لفتح المزيد من الأوسمة
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              اقرأ هذه القصص لحصد المزيد من النجوم وإكمال سجل بطولاتك المعرفية
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('stories')}
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1"
          >
            <span>استعراض كل القصص</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {prophets.slice(0, 4).map(p => {
            const isCompleted = achievementsState.completedStoryIds.includes(p.id);
            const quizRecord = achievementsState.completedQuizScores[p.id];

            return (
              <div
                key={p.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col justify-between gap-3 hover:border-amber-300 dark:hover:border-amber-500 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{p.epithet}</span>
                    {isCompleted ? (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold">
                        مقروءة ✅
                      </span>
                    ) : (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 font-bold">
                        بانتظارك ✨
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-black text-slate-900 dark:text-white">قصة {p.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{p.shortSummary}</p>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {quizRecord ? `نتيجة الاختبار: ${quizRecord.score}/${quizRecord.total}` : 'لم يختبر بعد'}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectStory(p.id)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                  >
                    ابدأ الآن
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
