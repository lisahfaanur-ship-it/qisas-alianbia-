import React, { useState } from 'react';
import { Headphones, Play, Pause, Volume2, Sparkles, BookOpen, Clock, ShieldCheck } from 'lucide-react';
import { ProphetStory, AgeGroup } from '../types';
import { AudioPlayerBar } from './AudioPlayerBar';
import { SymbolicArt } from './SymbolicArt';

interface AudioHubViewProps {
  prophets: ProphetStory[];
  selectedAge: AgeGroup;
  onSelectStory: (id: string) => void;
}

export const AudioHubView: React.FC<AudioHubViewProps> = ({
  prophets,
  selectedAge,
  onSelectStory
}) => {
  const [selectedProphetId, setSelectedProphetId] = useState<string>(prophets[0]?.id || 'adam');

  const currentProphet = prophets.find(p => p.id === selectedProphetId) || prophets[0];

  return (
    <div className="space-y-8 pb-16" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-teal-700">
        <div className="max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-800 text-amber-300 text-xs font-bold">
            <Headphones className="w-3.5 h-3.5" />
            <span>الاستماع الصوتي النقي للأطفال</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black">
            مكتبة الاستماع الصوتي لقصص الأنبياء
          </h1>
          <p className="text-sm text-teal-100 leading-relaxed font-medium">
            استمع للقصص القرآنية بلفظ عربي فصيح ومناسب لنوم هادئ أو رحلة تعليمية مباركة، مع النص المطابق تماماً لما ورد في الموقع.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Active Player Showcase */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block">
                  القصة المحددة حالياً للاستماع:
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  {currentProphet.name} ({currentProphet.epithet})
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>المدة التقريبية: ~{currentProphet.audioScript.estimatedMinutes} دقائق</span>
              </div>
            </div>

            {/* Symbolic Scenery Visual while listening */}
            <div className="rounded-2xl overflow-hidden shadow-inner">
              <SymbolicArt theme={currentProphet.symbolicTheme} className="w-full h-56 sm:h-72" />
            </div>

            {/* The Audio Player Bar */}
            <AudioPlayerBar
              storyText={currentProphet.audioScript.fullText}
              prophetName={currentProphet.name}
            />

            {/* Display the spoken script for following along */}
            <div className="bg-amber-50/50 dark:bg-slate-850 p-6 rounded-2xl border border-amber-200/80 dark:border-slate-700 space-y-3 transition-colors">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-300">
                <span>نص السرد الصوتي المعتمد (تابع بعينيك أثناء الاستماع):</span>
                <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  مطابق للمصادر المعتمدة
                </span>
              </div>
              <p className="text-base sm:text-lg leading-loose text-slate-800 dark:text-slate-200 font-normal">
                {currentProphet.audioScript.fullText}
              </p>
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={() => onSelectStory(currentProphet.id)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>عرض الفصول المصورة والشواهد القرآنية كاملة</span>
              </button>
            </div>
          </div>
        </div>

        {/* Story Playlist Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-amber-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>قائمة القصص الصوتية</span>
            </h3>

            <div className="space-y-2">
              {prophets.map(p => {
                const isSelected = p.id === currentProphet.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProphetId(p.id)}
                    className={`w-full p-4 rounded-2xl border text-right transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 dark:border-emerald-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-slate-750'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                          isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {isSelected ? <Volume2 className="w-5 h-5" /> : '🎧'}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{p.name}</h4>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{p.epithet}</span>
                      </div>
                    </div>

                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      {p.audioScript.estimatedMinutes} د
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
