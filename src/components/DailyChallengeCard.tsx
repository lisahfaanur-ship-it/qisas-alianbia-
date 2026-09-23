import React, { useState, useMemo } from 'react';
import {
  Flame,
  Sparkles,
  Calendar,
  Trophy,
  CheckCircle2,
  ArrowLeft,
  BookOpen,
  HelpCircle,
  Volume2,
  VolumeX,
  Award,
  Star,
  Zap,
  Check
} from 'lucide-react';
import { ProphetStory, AgeGroup, UserAchievementsState, QuizQuestion } from '../types';

interface DailyChallengeCardProps {
  prophets: ProphetStory[];
  selectedAge: AgeGroup;
  achievementsState: UserAchievementsState;
  onSelectStory: (prophetId: string) => void;
  onCompleteChallenge: (earnedStars: number) => void;
  onNavigateTab?: (tab: string) => void;
}

export const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({
  prophets,
  selectedAge,
  achievementsState,
  onSelectStory,
  onCompleteChallenge,
  onNavigateTab
}) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'reading'>('quiz');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [justCompletedAnim, setJustCompletedAnim] = useState<boolean>(false);

  // Today's date calculations
  const today = useMemo(() => new Date(), []);
  const todayStr = useMemo(() => today.toISOString().split('T')[0], [today]);

  const arabicDateStr = useMemo(() => {
    try {
      return new Intl.DateTimeFormat('ar-SA', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(today);
    } catch {
      return today.toLocaleDateString('ar-EG');
    }
  }, [today]);

  // Deterministic daily prophet selection based on calendar day
  const dailyProphet = useMemo(() => {
    if (!prophets || prophets.length === 0) return null;
    const epochDays = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
    const prophetIndex = Math.abs(epochDays) % prophets.length;
    return prophets[prophetIndex];
  }, [prophets, today]);

  // Suitable daily quiz question
  const dailyQuestion: QuizQuestion | null = useMemo(() => {
    if (!dailyProphet || !dailyProphet.quiz || dailyProphet.quiz.length === 0) return null;
    const suitable = dailyProphet.quiz.find(
      q => q.ageGroup === selectedAge || q.ageGroup === 'all'
    );
    return suitable || dailyProphet.quiz[0];
  }, [dailyProphet, selectedAge]);

  // Check if today's challenge is already completed
  const isCompletedToday = useMemo(() => {
    const dates = achievementsState.completedChallengeDates || [];
    return dates.includes(todayStr);
  }, [achievementsState.completedChallengeDates, todayStr]);

  const streakDays = achievementsState.readingStreakDays || 1;

  // Streak milestone calculation (Next goal: 3 days, then 7 days, then 14 days, then 30 days)
  const streakMilestone = useMemo(() => {
    if (streakDays < 3) return { target: 3, label: 'وسام ملازم الذكر (٣ أيام) 🥈' };
    if (streakDays < 7) return { target: 7, label: 'وسام بطل الأسبوع (٧ أيام) 🥇' };
    if (streakDays < 14) return { target: 14, label: 'وسام شعلة العزيمة (١٤ يوماً) 💎' };
    return { target: streakDays + 7, label: 'وسام المواظبة الأسطوري 👑' };
  }, [streakDays]);

  const milestoneProgress = Math.min(
    100,
    Math.round((streakDays / streakMilestone.target) * 100)
  );

  // Week days representation (Last 7 days or current week)
  const weekDays = useMemo(() => {
    const daysName = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
    const currentDayIdx = today.getDay(); // 0 is Sunday
    
    // Generate 7 days ending with today or around today
    return Array.from({ length: 7 }, (_, i) => {
      const offset = i - 6; // from -6 days ago to 0 (today)
      const d = new Date(today);
      d.setDate(today.getDate() + offset);
      const dStr = d.toISOString().split('T')[0];
      const name = daysName[d.getDay()];
      const isPastOrToday = offset <= 0;
      const isToday = offset === 0;
      const isCompleted = (achievementsState.completedChallengeDates || []).includes(dStr);

      return {
        dateStr: dStr,
        dayName: name,
        dayNumber: d.getDate(),
        isToday,
        isCompleted: isCompleted || (isToday && isCompletedToday),
        isPastOrToday
      };
    });
  }, [today, achievementsState.completedChallengeDates, isCompletedToday]);

  // Handle answering the quick quiz
  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted || isCompletedToday) return;
    setSelectedOption(index);
  };

  const handleVerifyQuizAnswer = () => {
    if (selectedOption === null || !dailyQuestion) return;
    setIsAnswerSubmitted(true);

    if (selectedOption === dailyQuestion.correctIndex) {
      setJustCompletedAnim(true);
      onCompleteChallenge(30);
      setTimeout(() => setJustCompletedAnim(false), 3000);
    }
  };

  // Handle completing by reading
  const handleCompleteViaReading = () => {
    if (!dailyProphet) return;
    onSelectStory(dailyProphet.id);
  };

  const handleClaimReadingReward = () => {
    if (isCompletedToday) return;
    setJustCompletedAnim(true);
    onCompleteChallenge(30);
    setTimeout(() => setJustCompletedAnim(false), 3000);
  };

  // Audio speech synthesis for question
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window) || !dailyQuestion) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${dailyQuestion.question}. الخيارات هي: ${dailyQuestion.options.join('، أو ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  if (!dailyProphet) return null;

  return (
    <section
      id="daily-challenge-section"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 p-1 sm:p-1.5 shadow-xl border-2 border-amber-300 transition-all duration-300"
      dir="rtl"
    >
      {/* Outer frame styling for child-friendly premium gamified look */}
      <div className="relative rounded-[22px] bg-gradient-to-b from-white via-[#fffdf9] to-[#fffaf0] dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-950 p-6 sm:p-8 space-y-6 transition-colors">
        
        {/* Top Header: Badge, Date & Bonus Stars */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-100 dark:border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-orange-500/25">
              <Zap className="w-6 h-6 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  تحدي اليوم
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-800 dark:text-orange-300 text-[11px] font-bold border border-orange-200 dark:border-orange-800">
                  مهمة يومية
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{arabicDateStr}</span>
              </div>
            </div>
          </div>

          {/* Reward Pill */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-amber-100/90 dark:bg-slate-800 border border-amber-300 dark:border-slate-700 text-amber-950 dark:text-amber-300 font-black text-xs sm:text-sm shadow-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>مكافأة الإنجاز: +30 نجمة</span>
            </div>

            {isCompletedToday && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>مكتمل اليوم</span>
              </span>
            )}
          </div>
        </div>

        {/* 2. Consecutive Days Streak Bar (عداد الأيام المتتالية) */}
        <div className="bg-gradient-to-r from-orange-50 via-amber-50/70 to-orange-50/40 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-850 rounded-2xl p-4 sm:p-5 border border-orange-200/80 dark:border-slate-700 shadow-inner flex flex-col lg:flex-row items-center justify-between gap-5 transition-colors">
          {/* Flame Counter Badge */}
          <div className="flex items-center gap-4 w-full lg:w-auto justify-between sm:justify-start">
            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/30 transform hover:scale-105 transition-transform">
              <Flame className="w-9 h-9 fill-amber-200 text-amber-100 animate-bounce" />
              <span className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-slate-900 text-amber-300 text-[10px] font-black border border-amber-400">
                شعلة
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                  {streakDays}
                </span>
                <span className="text-sm sm:text-base font-bold text-orange-950 dark:text-orange-300">
                  {streakDays === 1 ? 'يوم متواصل' : 'أيام متتالية'}
                </span>
              </div>
              <p className="text-xs text-orange-800/80 dark:text-orange-300/80 font-medium">
                {streakDays >= 3
                  ? 'ما شاء الله! همتك مستمرة وشعلة المعرفة تتألق 🔥'
                  : 'واصل التحدي غداً للحفاظ على استمرار الشعلة!'}
              </p>
            </div>
          </div>

          {/* 7-Days Weekly Activity Tracker */}
          <div className="flex items-center gap-2 sm:gap-3">
            {weekDays.map((day, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all min-w-[38px] sm:min-w-[44px] ${
                  day.isToday
                    ? 'bg-amber-400 text-amber-950 ring-2 ring-orange-500 ring-offset-2 font-black shadow-md scale-105'
                    : day.isCompleted
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span className="text-[10px] font-bold block mb-1">
                  {day.dayName}
                </span>
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  {day.isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : day.isToday ? (
                    <Flame className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <span>{day.dayNumber}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Next Streak Milestone Goal */}
          <div className="w-full lg:w-48 text-right space-y-1.5 border-t lg:border-t-0 lg:border-r border-orange-200 dark:border-slate-700 lg:pr-5 pt-3 lg:pt-0">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>الهدف القادم:</span>
              <span className="text-orange-700 dark:text-orange-400 font-black">{streakMilestone.target} أيام</span>
            </div>
            <div className="w-full h-2.5 bg-orange-200/70 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${milestoneProgress}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
              {streakMilestone.label}
            </p>
          </div>
        </div>

        {/* 3. Challenge Mode Selection Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800 max-w-md mx-auto sm:mx-0">
          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-white dark:bg-slate-750 text-slate-900 dark:text-white shadow-sm font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-orange-500" />
            <span>سؤال التحدي السريع</span>
            <span className="px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-slate-700 text-amber-800 dark:text-amber-300 text-[10px]">
              +30 ⭐
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reading')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'reading'
                ? 'bg-white dark:bg-slate-750 text-slate-900 dark:text-white shadow-sm font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-orange-500" />
            <span>سؤال التحدي السريع</span>
            <span className="px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px]">
              +30 ⭐
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reading')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'reading'
                ? 'bg-white text-slate-900 shadow-sm font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>قراءة قصة اليوم</span>
          </button>
        </div>

        {/* 4. Tab 1: Quick Quiz Challenge */}
        {activeTab === 'quiz' && dailyQuestion && (
          <div className="space-y-5 animate-fade-in">
            {/* Question Banner */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border-2 border-amber-200/90 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>عن قصة: {dailyProphet.name}</span>
                </div>

                {/* Audio speech button */}
                <button
                  type="button"
                  onClick={toggleSpeech}
                  className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
                    isSpeaking
                      ? 'bg-amber-100 dark:bg-slate-800 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-500 ring-2 ring-amber-400'
                      : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                  title="استمع إلى السؤال بصوت ناطق"
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                      <span className="hidden sm:inline">إيقاف الصوت</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                      <span className="hidden sm:inline">استمع للسؤال</span>
                    </>
                  )}
                </button>
              </div>

              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-relaxed">
                {dailyQuestion.question}
              </h3>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {dailyQuestion.options.map((option, idx) => {
                  const letters = ['أ', 'ب', 'ج', 'د'];
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === dailyQuestion.correctIndex;
                  const showResult = isAnswerSubmitted || isCompletedToday;

                  let optionStyle = 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200';

                  if (showResult) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-400 dark:border-emerald-600 text-emerald-950 dark:text-emerald-300 font-bold ring-2 ring-emerald-400';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-rose-50 dark:bg-rose-950/80 border-rose-300 dark:border-rose-700 text-rose-950 dark:text-rose-300 opacity-75';
                    } else {
                      optionStyle = 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-amber-100 dark:bg-amber-950/80 border-amber-500 text-amber-950 dark:text-amber-200 ring-2 ring-amber-400 font-bold';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={showResult}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-4 rounded-xl border-2 text-right transition-all flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold active:scale-[0.99] ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-black flex items-center justify-center shrink-0">
                          {letters[idx]}
                        </span>
                        <span>{option}</span>
                      </div>

                      {showResult && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Submit / Verification Action */}
              {!isAnswerSubmitted && !isCompletedToday && (
                <div className="pt-2 flex items-center justify-end">
                  <button
                    type="button"
                    disabled={selectedOption === null}
                    onClick={handleVerifyQuizAnswer}
                    className={`px-8 py-3 rounded-2xl font-black text-sm transition-all shadow-md flex items-center gap-2 ${
                      selectedOption !== null
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:opacity-95 shadow-orange-500/20 active:scale-95'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>تحقق من الإجابة واجمع النجوم</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              )}

              {/* Instant Educational Feedback & Source */}
              {(isAnswerSubmitted || isCompletedToday) && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-right space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-black text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span>إجابة صحيحة ومباركة! بارك الله فيك 🌟</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {dailyQuestion.explanation}
                  </p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold border-t border-emerald-200/80 dark:border-emerald-800/80 pt-1.5">
                    📖 المصدر: {dailyQuestion.sourceReference}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 5. Tab 2: Reading Challenge */}
        {activeTab === 'reading' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 border-emerald-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
              <div className="space-y-3 flex-1 text-center md:text-right">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>قصة اليوم المقترحة</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {dailyProphet.name} ({dailyProphet.epithet})
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl">
                  {dailyProphet.shortSummary}
                </p>

                {/* Core Values tags */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
                  {dailyProphet.coreValues.slice(0, 3).map(v => (
                    <span
                      key={v.id}
                      className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 text-[11px] font-semibold border border-amber-200 dark:border-amber-800"
                    >
                      ⭐ {v.title}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={handleCompleteViaReading}
                  className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>اقرأ القصة الآن</span>
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>

                {!isCompletedToday && (
                  <button
                    type="button"
                    onClick={handleClaimReadingReward}
                    className="px-6 py-3 rounded-2xl bg-amber-100 dark:bg-slate-800 hover:bg-amber-200 dark:hover:bg-slate-700 text-amber-950 dark:text-amber-300 font-bold text-xs transition-all border border-amber-300 dark:border-slate-700 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    <span>سجل إتمام القراءة اليوم (+30 ⭐)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 6. Success / Celebratory State Notice */}
        {(isCompletedToday || justCompletedAnim) && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-amber-50 to-emerald-50 dark:from-slate-800 dark:via-slate-850 dark:to-slate-800 border-2 border-emerald-300 dark:border-emerald-700 text-center sm:text-right flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-xl shadow-md">
                🏆
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  أحسنت يا بطل! أتممت تحدي اليوم بنجاح
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  تمت إضافة +30 نجمة إلى رصيدك، وشعلة الأيام المتتالية ارتفعت إلى ({streakDays} {streakDays === 1 ? 'يوم' : 'أيام'})!
                </p>
              </div>
            </div>

            {onNavigateTab && (
              <button
                type="button"
                onClick={() => onNavigateTab('achievements')}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-800 dark:text-white text-xs font-bold border border-slate-200 dark:border-slate-600 shadow-xs flex items-center gap-1.5 transition-all"
              >
                <Award className="w-4 h-4 text-amber-500" />
                <span>لوحة الأوسمة</span>
              </button>
            )}
          </div>
        )}

        {/* 7. Motivational Hadith Footer */}
        <div className="pt-2 text-center text-[11px] text-slate-500 font-medium border-t border-slate-100">
          <span>قال رسول الله ﷺ: «أَحَبُّ الأَعْمَالِ إِلَى اللهِ أَدْوَمُهَا وَإِنْ قَلَّ» (صحيح مسلم) — واظب على قراءة القصص يومياً لتنال الأجر والحكمة.</span>
        </div>
      </div>
    </section>
  );
};
