import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Volume2,
  Copy,
  Check,
  BookOpen,
  Heart,
  HelpCircle,
  ShieldCheck,
  Star,
  Compass,
  ArrowRight
} from 'lucide-react';
import { AgeGroup, TadabburVerse } from '../types';

interface TadabburModalProps {
  isOpen: boolean;
  onClose: () => void;
  verse: TadabburVerse | null;
  defaultAge?: AgeGroup;
  prophetName?: string;
  onTadabburComplete?: (verseId: string) => void;
}

export const TadabburModal: React.FC<TadabburModalProps> = ({
  isOpen,
  onClose,
  verse,
  defaultAge = '8-10',
  prophetName,
  onTadabburComplete
}) => {
  const [currentAge, setCurrentAge] = useState<AgeGroup>(defaultAge);
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [hasReflected, setHasReflected] = useState(false);

  // Sync currentAge when modal opens or defaultAge changes
  useEffect(() => {
    if (defaultAge) {
      setCurrentAge(defaultAge);
    }
  }, [defaultAge, verse]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !verse) return null;

  const ageData = verse.ageExplanations[currentAge] || verse.ageExplanations['8-10'];

  const handleCopy = () => {
    navigator.clipboard.writeText(`﴿ ${verse.text} ﴾ [سورة ${verse.surah}: ${verse.ayahNumber}]`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayRecitation = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(verse.text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85; // Slightly slower, contemplative recitation pace
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleMarkComplete = () => {
    setHasReflected(true);
    if (onTadabburComplete) {
      onTadabburComplete(verse.id);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in"
      dir="rtl"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border-2 border-amber-300 dark:border-slate-750 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-all transform animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tadabbur-modal-title"
      >
        {/* Top Decorative Header */}
        <div className="relative bg-gradient-to-l from-amber-500 via-emerald-600 to-teal-700 p-5 sm:p-6 text-white shrink-0">
          {/* Subtle Islamic Geometric BG Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)] pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-amber-200 shadow-inner border border-white/25">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-200 uppercase tracking-wider block">
                  محطة التدبر القرآني 🌟
                </span>
                <h2 id="tadabbur-modal-title" className="text-xl sm:text-2xl font-black">
                  تدبر الآية الكريمة
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-2xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/20"
              title="إغلاق النافذة (Esc)"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Verse Surah & Context Tag */}
          <div className="relative z-10 mt-3 flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-200" />
              <span>سورة {verse.surah} — آية {verse.ayahNumber}</span>
            </span>
            {verse.theme && (
              <span className="px-3 py-1 rounded-full bg-amber-400/90 text-slate-950 text-xs font-black shadow-xs">
                💡 {verse.theme}
              </span>
            )}
            {prophetName && (
              <span className="text-xs text-emerald-100 font-medium hidden sm:inline">
                من قصة {prophetName}
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6 flex-1 text-right">
          {/* Main Quranic Verse Box with Calligraphic Styling */}
          <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-amber-50/70 via-white to-amber-50/40 dark:from-slate-850 dark:via-slate-900 dark:to-slate-850 border-2 border-amber-200/90 dark:border-slate-750 shadow-sm text-center space-y-4">
            {/* Ornamental Quran Bracket Accent */}
            <div className="text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-2">
              <span className="w-8 h-[1px] bg-emerald-300 dark:bg-emerald-700" />
              <span>قال الله تعالى</span>
              <span className="w-8 h-[1px] bg-emerald-300 dark:bg-emerald-700" />
            </div>

            <p className="text-xl sm:text-2xl lg:text-3xl font-['Amiri',serif] leading-loose text-slate-900 dark:text-amber-100 font-bold px-2 selection:bg-amber-200 selection:text-amber-950">
              ﴿ {verse.text} ﴾
            </p>

            {/* Action Bar for the Verse: Recite / Copy */}
            <div className="pt-2 flex items-center justify-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={handlePlayRecitation}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs border ${
                  isPlayingAudio
                    ? 'bg-amber-400 text-slate-950 border-amber-500 scale-105 animate-pulse'
                    : 'bg-white dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
                title="استمع لنطق الآية"
              >
                <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{isPlayingAudio ? 'إيقاف الاستماع' : 'استمع للآية'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                title="نسخ الآية الكريمة"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'تم النسخ!' : 'نسخ الآية'}</span>
              </button>
            </div>
          </div>

          {/* Age Tier Selector Tabs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>اختر الفئة العمرية للطفل لتبسيط التفسير:</span>
              </span>
              <span className="text-[11px] text-slate-400">مخصص لمستوى استيعاب طفلك</span>
            </div>

            <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setCurrentAge('5-7')}
                className={`py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex flex-col items-center justify-center gap-0.5 ${
                  currentAge === '5-7'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-md border border-emerald-300 dark:border-emerald-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>👶 ٥–٧ سنوات</span>
                <span className="text-[10px] font-normal opacity-80">معنى بسيط ولطيف</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentAge('8-10')}
                className={`py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex flex-col items-center justify-center gap-0.5 ${
                  currentAge === '8-10'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-md border border-emerald-300 dark:border-emerald-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>🧒 ٨–١٠ سنوات</span>
                <span className="text-[10px] font-normal opacity-80">مستكشف ناشئ</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentAge('11-13')}
                className={`py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex flex-col items-center justify-center gap-0.5 ${
                  currentAge === '11-13'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-md border border-emerald-300 dark:border-emerald-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>👦 ١١–١٣ سنة</span>
                <span className="text-[10px] font-normal opacity-80">تدبر وتحليل واعي</span>
              </button>
            </div>
          </div>

          {/* Section 1: Simplified Age-Appropriate Meaning */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-slate-800/80 border border-emerald-200/80 dark:border-emerald-900/60 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300">
              <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <h3 className="text-base font-black">
                المعنى التفسيري المبسط ({currentAge === '5-7' ? 'للصغار ٥–٧' : currentAge === '8-10' ? 'للناشئة ٨–١٠' : 'لليافعين ١١–١٣'}):
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200 pr-7 font-medium">
              {ageData.summary}
            </p>

            {ageData.deeperTafsir && currentAge === '11-13' && (
              <div className="mt-3 pt-3 border-t border-emerald-200 dark:border-emerald-800/60 pr-7 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong className="text-emerald-900 dark:text-emerald-300">إضاءة بلاغية وتفسيرية: </strong>
                {ageData.deeperTafsir}
              </div>
            )}
          </div>

          {/* Section 2: Daily Practical Action (كيف نعمل بالآية؟) */}
          <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/50 space-y-2">
            <div className="flex items-center gap-2 text-amber-950 dark:text-amber-200">
              <Heart className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <h3 className="text-base font-black">
                🌱 كيف نعمل بهذه الآية في يومنا؟ (خطوة عملية للطفل):
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200 pr-7 font-semibold">
              {ageData.actionPoint}
            </p>
          </div>

          {/* Section 3: Question for Reflection / Parent Discussion */}
          <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/50 space-y-2">
            <div className="flex items-center gap-2 text-indigo-950 dark:text-indigo-200">
              <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <h3 className="text-base font-black">
                ❓ سؤال للتفكر والمشاركة مع الوالدين:
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-indigo-950 dark:text-indigo-200 pr-7 font-medium">
              {ageData.discussionQuestion}
            </p>
          </div>

          {/* Section 4: Authentic Tafsir Source Verification */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                <strong>المرجع التفسيري المعتمد: </strong>
                {verse.tafsirSource}
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold shrink-0">
              موثق شرعياً ✓
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors"
          >
            إغلاق
          </button>

          <button
            type="button"
            onClick={handleMarkComplete}
            className={`px-5 py-2.5 rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-2 ${
              hasReflected
                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950 active:scale-95'
            }`}
          >
            {hasReflected ? (
              <>
                <Check className="w-4 h-4" />
                <span>أحسنت! تم تدبر هذه الآية 🌟</span>
              </>
            ) : (
              <>
                <Star className="w-4 h-4 fill-slate-950" />
                <span>وضعت الآية في قلبي وتدبرتها ⭐</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
