import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Volume2,
  CheckCircle2,
  ChevronLeft,
  Heart,
  Star,
  Compass,
  Lightbulb
} from 'lucide-react';
import { AgeGroup, ProphetStory, TadabburVerse } from '../types';
import { getTadabburVersesForProphet } from '../data/tadabburVersesData';
import { TadabburModal } from './TadabburModal';

interface VersesTadabburPanelProps {
  prophet: ProphetStory;
  selectedAge: AgeGroup;
  className?: string;
  onVerseTadabbur?: (verseId: string) => void;
}

export const VersesTadabburPanel: React.FC<VersesTadabburPanelProps> = ({
  prophet,
  selectedAge,
  className = '',
  onVerseTadabbur
}) => {
  const [selectedVerseForModal, setSelectedVerseForModal] = useState<TadabburVerse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contemplatedVerseIds, setContemplatedVerseIds] = useState<string[]>([]);
  const [playingVerseId, setPlayingVerseId] = useState<string | null>(null);

  const verses: TadabburVerse[] = getTadabburVersesForProphet(prophet, selectedAge);

  const handleOpenTadabbur = (verse: TadabburVerse) => {
    setSelectedVerseForModal(verse);
    setIsModalOpen(true);
  };

  const handleTadabburCompleted = (verseId: string) => {
    if (!contemplatedVerseIds.includes(verseId)) {
      setContemplatedVerseIds(prev => [...prev, verseId]);
    }
    if (onVerseTadabbur) {
      onVerseTadabbur(verseId);
    }
  };

  const handlePlayRecitation = (verse: TadabburVerse) => {
    if ('speechSynthesis' in window) {
      if (playingVerseId === verse.id) {
        window.speechSynthesis.cancel();
        setPlayingVerseId(null);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(verse.text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;
      utterance.onend = () => setPlayingVerseId(null);
      utterance.onerror = () => setPlayingVerseId(null);
      setPlayingVerseId(verse.id);
      window.speechSynthesis.speak(utterance);
    }
  };

  if (verses.length === 0) return null;

  return (
    <section
      id="story-verses-tadabbur-section"
      className={`rounded-3xl p-6 sm:p-9 bg-gradient-to-br from-amber-50/80 via-white to-emerald-50/60 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-amber-300/80 dark:border-slate-750 shadow-md transition-all duration-300 relative overflow-hidden ${className}`}
      dir="rtl"
    >
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-200/20 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-200/20 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-amber-200/70 dark:border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-600 text-white flex items-center justify-center shadow-md shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                📖 آيات للتدبر
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-black border border-emerald-300 dark:border-emerald-700">
                {verses.length} {verses.length === 1 ? 'آية مختارة' : 'آيات مختارة'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              تأمل في كلام الله تعالى المرتبط بأحداث قصة {prophet.name}، وتعرف على تفسيرها المبسط للأطفال
            </p>
          </div>
        </div>

        {/* Progress Badge */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3.5 py-2 rounded-2xl border border-amber-200 dark:border-slate-700 shadow-xs">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
            أنجزت تدبر {contemplatedVerseIds.length} من {verses.length}
          </span>
        </div>
      </div>

      {/* Verses Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
        {verses.map((v, idx) => {
          const isDone = contemplatedVerseIds.includes(v.id);
          const isPlaying = playingVerseId === v.id;
          const currentExplanation = v.ageExplanations[selectedAge] || v.ageExplanations['8-10'];

          return (
            <div
              key={v.id || idx}
              className={`rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between gap-4 border-2 ${
                isDone
                  ? 'bg-white/95 dark:bg-slate-850 border-emerald-400 dark:border-emerald-700 shadow-sm'
                  : 'bg-white/90 dark:bg-slate-850/90 border-amber-200/90 dark:border-slate-750 hover:border-amber-400 dark:hover:border-slate-600 shadow-xs hover:shadow-md'
              }`}
            >
              {/* Card Top: Surah pill & Chapter theme */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 text-xs font-extrabold border border-amber-300 dark:border-amber-800 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                    <span>سورة {v.surah} — آية {v.ayahNumber}</span>
                  </span>

                  {isDone && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[11px] font-black flex items-center gap-1 border border-emerald-300 dark:border-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>تم التدبر</span>
                    </span>
                  )}
                </div>

                {/* Chapter Title or Theme indicator */}
                {v.theme && (
                  <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{v.theme}</span>
                  </div>
                )}

                {/* Main Quran Verse Text */}
                <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-slate-900/80 border border-amber-100 dark:border-slate-800 text-center">
                  <p className="text-lg sm:text-xl font-['Amiri',serif] leading-loose text-slate-900 dark:text-amber-100 font-bold">
                    ﴿ {v.text} ﴾
                  </p>
                </div>

                {/* Quick Child Summary Preview */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                  <strong className="text-slate-800 dark:text-slate-100">المعنى باختصار: </strong>
                  {currentExplanation.summary}
                </p>
              </div>

              {/* Bottom Actions: Recite + Primary "تدبر" Button */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handlePlayRecitation(v)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    isPlaying
                      ? 'bg-amber-400 text-slate-950 animate-pulse'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                  title="استماع لنطق الآية"
                  aria-label="استماع لنطق الآية"
                >
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="hidden sm:inline">{isPlaying ? 'إيقاف' : 'استماع'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenTadabbur(v)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-l from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-black shadow-sm transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 cursor-pointer"
                  title="افتح نافذة التدبر وشرح المعنى التفسيري المبسط"
                  aria-label="تدبر الآية"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>تدبر الآية</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Educational Note for Parents */}
      <div className="relative z-10 mt-6 pt-4 border-t border-amber-200/60 dark:border-slate-800 flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-500 shrink-0" />
          <span>التدبر هو الغاية العظمى من قراءة القرآن: ﴿أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ﴾</span>
        </div>
        <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">
          تفاسير مبسطة معتمدة موجهة لعقل الطفل
        </span>
      </div>

      {/* Contemplation Popup Modal */}
      <TadabburModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        verse={selectedVerseForModal}
        defaultAge={selectedAge}
        prophetName={prophet.name}
        onTadabburComplete={handleTadabburCompleted}
      />
    </section>
  );
};
