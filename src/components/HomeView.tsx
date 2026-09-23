import React from 'react';
import {
  Sparkles,
  BookOpen,
  Headphones,
  Trophy,
  ArrowLeft,
  ShieldCheck,
  Heart,
  Compass,
  Hourglass,
  Shield,
  Layers,
  Award,
  History,
  Palette
} from 'lucide-react';
import { ProphetStory, AgeGroup, UserAchievementsState } from '../types';
import { SymbolicArt } from './SymbolicArt';
import { DailyChallengeCard } from './DailyChallengeCard';
import { DhikrCard } from './DhikrCard';

interface HomeViewProps {
  prophets: ProphetStory[];
  selectedAge: AgeGroup;
  achievementsState: UserAchievementsState;
  onSelectStory: (id: string) => void;
  onNavigateTab: (tab: string) => void;
  onCompleteChallenge: (earnedStars: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  prophets,
  selectedAge,
  achievementsState,
  onSelectStory,
  onNavigateTab,
  onCompleteChallenge
}) => {
  const educationalValues = [
    {
      title: 'الإيمان والتوحيد',
      desc: 'معرفة الله الواحد الخالق وعبادته وحده لا شريك له.',
      icon: '✨',
      color: 'from-amber-400 to-amber-500'
    },
    {
      title: 'الصبر والمثابرة',
      desc: 'الثبات عند الشدائد كما صبر نوح عليه السلام ٩٥٠ عاماً.',
      icon: '⏳',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'الصدق والأمانة',
      desc: 'القول الصادق والأمانة في المعاملة كصفة موسى القوي الأمين.',
      icon: '🛡️',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'التوبة السريعة',
      desc: 'الاعتذار الصادق والرجوع إلى الله فور الخطأ كاقتداء بآدم.',
      icon: '🌱',
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      title: 'الشجاعة في الحق',
      desc: 'الجهر بالعدل ومساعدة الضعفاء دون خوف من الطغيان.',
      icon: '🦁',
      color: 'from-rose-400 to-red-500'
    },
    {
      title: 'التوكل على الله',
      desc: 'الأخذ بالأسباب مع الثقة الكاملة بمعية الله وتوفيقه.',
      icon: '🕊️',
      color: 'from-violet-500 to-purple-600'
    }
  ];

  return (
    <div className="space-y-14 pb-16" dir="rtl">
      {/* 16. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-amber-100/90 via-amber-50/50 to-white dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 p-8 sm:p-14 border-2 border-amber-300 dark:border-slate-800 shadow-md transition-colors">
        {/* Background ambient elements */}
        <div className="absolute top-4 left-6 text-3xl opacity-20 select-none">🌙</div>
        <div className="absolute bottom-6 right-10 text-4xl opacity-15 select-none">⭐</div>

        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-sm">
            <span>🌟</span>
            <span>رحلة الطفل المسلم مع قصص القرآن الكريم</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            اكتشف قصص الأنبياء
          </h1>

          <p className="text-base sm:text-xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
            قصص عظيمة من القرآن والسنة نتعلم منها الإيمان والصبر والأمل، مصممة بطريقة ممتعة ومبسطة وموثقة بالكامل دون أي تخمين أو تجسيد.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => onSelectStory(prophets[0].id)}
              id="hero-start-journey-btn"
              className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
            >
              <span>ابدأ الرحلة</span>
              <span>🚀</span>
            </button>

            <button
              onClick={() => onNavigateTab('stories')}
              id="hero-browse-stories-btn"
              className="px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-black text-sm sm:text-base border-2 border-amber-300 dark:border-slate-700 shadow-sm transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
            >
              <span>تصفح القصص</span>
              <span>📚</span>
            </button>
          </div>

          {/* Safety & Academic Guarantee Notice */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              موثق من القرآن وصحيح السنة
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/70 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
              <span>🎨</span>
              صور رمزية فقط (خالية من تجسيد الأنبياء)
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-sky-900 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/70 px-3 py-1 rounded-full border border-sky-200 dark:border-sky-800">
              <span>👶</span>
              نظام مخصص حسب عمر الطفل ({selectedAge})
            </span>
          </div>
        </div>
      </section>

      {/* Dhikr of the Day Section */}
      <DhikrCard />

      {/* Daily Challenge Component: تحدي اليوم وعداد الأيام المتتالية */}
      <DailyChallengeCard
        prophets={prophets}
        selectedAge={selectedAge}
        achievementsState={achievementsState}
        onSelectStory={onSelectStory}
        onCompleteChallenge={onCompleteChallenge}
        onNavigateTab={onNavigateTab}
      />

      {/* Featured Stories Section: أشهر القصص */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
              نماذج عالية الجودة موثقة بالسند
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              أشهر قصص الأنبياء
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('stories')}
            className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300"
          >
            <span>عرض جميع الأنبياء ({prophets.length})</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {prophets.slice(0, 6).map(p => {
            const ageSummary = p.ageVariants[selectedAge].summary;
            return (
              <div
                key={p.id}
                className="group bg-white dark:bg-slate-900 rounded-3xl p-5 border-2 border-amber-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Symbolic Scene Image */}
                  <div className="relative overflow-hidden rounded-2xl">
                    <SymbolicArt theme={p.symbolicTheme} className="w-full h-44 sm:h-48" />
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[11px] font-bold text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-slate-700 shadow-sm">
                      {p.epithet}
                    </span>
                  </div>

                  {/* Title & info */}
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mt-0.5 line-clamp-1">
                      {p.title}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed line-clamp-3">
                      {ageSummary}
                    </p>
                  </div>

                  {/* Core Value Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.coreValues.slice(0, 2).map(v => (
                      <span
                        key={v.id}
                        className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-[11px] font-semibold border border-amber-200/70 dark:border-amber-800/60"
                      >
                        ⭐ {v.title}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => onSelectStory(p.id)}
                    id={`read-story-${p.id}-btn`}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>اقرأ القصة</span>
                  </button>

                  <button
                    onClick={() => onSelectStory(p.id)}
                    id={`listen-story-${p.id}-btn`}
                    className="px-3 py-2.5 rounded-xl bg-amber-100 dark:bg-slate-800 hover:bg-amber-200 dark:hover:bg-slate-700 text-amber-900 dark:text-amber-300 text-xs font-bold transition-all flex items-center gap-1"
                    title="الاستماع الصوتي"
                  >
                    <Headphones className="w-4 h-4" />
                    <span className="hidden sm:inline">استمع</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Timeline Teaser */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border-2 border-amber-200 dark:border-slate-800 shadow-sm relative overflow-hidden group transition-colors">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 dark:bg-slate-800 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
        
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-100 dark:bg-slate-800 flex items-center justify-center text-4xl shrink-0 shadow-inner">
            ⏳
          </div>
          
          <div className="flex-1 space-y-4 text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-slate-800 text-amber-700 dark:text-amber-400 text-xs font-bold border border-amber-100 dark:border-slate-700">
              <History className="w-3.5 h-3.5" />
              <span>ميزة جديدة</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              الخط الزمني للأنبياء والرسل
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl">
              استكشف التسلسل التاريخي لبعثة الأنبياء عليهم السلام منذ بداية الخلق وحتى خاتم المرسلين، وتعرف على الفترات الزمانية لكل نبي بطريقة تفاعلية.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('timeline')}
            className="px-8 py-4 rounded-2xl bg-slate-950 dark:bg-emerald-700 hover:bg-slate-900 dark:hover:bg-emerald-600 text-white font-black text-sm sm:text-base shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
          >
            <span>عرض الخط الزمني</span>
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </section>
      
      {/* Digital Coloring Book Teaser */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/60 rounded-3xl p-8 sm:p-10 border-2 border-indigo-100 dark:border-slate-800 shadow-sm relative overflow-hidden group transition-colors">
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-100 dark:bg-indigo-900/30 rounded-full blur-3xl opacity-50 group-hover:scale-125 transition-transform" />
        
        <div className="relative flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 space-y-4 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
              <Palette className="w-3.5 h-3.5" />
              <span>إبداع وفن</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              لوّن وعبر عن إبداعك في كتيب التلوين الرقمي 🎨
            </h3>
            <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl">
              حول القصص التي قرأتها إلى لوحات فنية رائعة بألوانك المفضلة، واحفظ أعمالك الفنية في معرض إنجازاتك الخاص.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigateTab('coloring')}
                className="px-10 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base sm:text-lg shadow-xl shadow-indigo-200 dark:shadow-none transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-3 mx-auto lg:mr-0"
              >
                <span>ابدأ التلوين الآن</span>
                <ArrowLeft className="w-6 h-6 rotate-180" />
              </button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64">
              <div className="absolute inset-0 bg-white dark:bg-slate-800 rounded-3xl border-4 border-slate-900 dark:border-slate-700 rotate-6 shadow-xl" />
              <div className="absolute inset-0 bg-white dark:bg-slate-800 rounded-3xl border-4 border-slate-900 dark:border-slate-700 -rotate-3 shadow-lg flex items-center justify-center p-4">
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-200 dark:text-slate-600">
                  <circle cx="50" cy="50" r="30" fill="currentColor" stroke="currentColor" strokeWidth="2" />
                  <path d="M50 20 L50 80 M20 50 L80 50" stroke="currentColor" strokeWidth="2" />
                </svg>
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-amber-400 border-2 border-slate-900 dark:border-slate-700" />
                <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-rose-400 border-2 border-slate-900 dark:border-slate-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ماذا ستتعلم؟ Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-amber-50/50 to-teal-50 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/40 rounded-3xl p-8 sm:p-12 border-2 border-emerald-200/80 dark:border-slate-800 shadow-sm space-y-8 transition-colors">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-emerald-200 dark:border-slate-700 inline-block shadow-sm">
            ثمار المعرفة القرآنية
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            ماذا ستتعلم من قصص الأنبياء؟
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
            الهدف ليس مجرد سرد أحداث، بل استخلاص العبر وتزكية القلب وبناء الأخلاق الرفيعة
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {educationalValues.map((val, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-slate-800 text-2xl flex items-center justify-center shrink-0 shadow-inner">
                {val.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {val.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Teaser for Audio & Interactive Quiz */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Audio Hub Teaser */}
        <div className="bg-gradient-to-br from-teal-900 to-emerald-950 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden border border-teal-700/60">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/80 text-amber-300 text-xs font-bold">
              <Headphones className="w-3.5 h-3.5" />
              <span>مكتبة الاستماع الصوتي</span>
            </div>
            <h3 className="text-2xl font-black text-white">
              استمع لقصص الأنبياء بصوت واضح
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
              تحويل النص إلى سرد عربي واضح ملائم للأطفال، مع إمكانية التحكم بسرعة القراءة والإيقاف والإعادة التفاعلية.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('audio')}
            id="home-audio-hub-btn"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>فتح مكتبة الاستماع الصوتي</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Quiz Hub Teaser */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 border border-amber-400">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/60 text-white text-xs font-bold">
              <Trophy className="w-3.5 h-3.5" />
              <span>اختبر معلوماتك</span>
            </div>
            <h3 className="text-2xl font-black text-slate-950">
              مسابقة الأنبياء التفاعلية
            </h3>
            <p className="text-xs sm:text-sm text-slate-900 font-medium leading-relaxed">
              أسئلة ممتعة مع تصحيح فوري وعرض للشواهد من القرآن الكريم والسنة الصحيحة، مع وسام الباحث الصغير عند الإكمال!
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('quiz-hub')}
            id="home-quiz-hub-btn"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>ابدأ الاختبار التفاعلي</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
