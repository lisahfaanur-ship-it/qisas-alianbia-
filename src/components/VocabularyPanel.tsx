import React, { useState } from 'react';
import { 
  BookText, 
  Volume2, 
  ChevronDown, 
  ChevronUp, 
  Search,
  Sparkles
} from 'lucide-react';
import { DifficultWord } from '../types';

interface VocabularyPanelProps {
  words: DifficultWord[];
}

export const VocabularyPanel: React.FC<VocabularyPanelProps> = ({ words }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  if (!words || words.length === 0) return null;

  const filteredWords = words.filter(w => 
    w.word.includes(searchTerm) || w.meaning.includes(searchTerm)
  );

  const playPronunciation = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-sm overflow-hidden transition-all duration-500" dir="rtl">
      {/* Header Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-sm">
            <BookText className="w-5 h-5" />
          </div>
          <div className="text-right">
            <h3 className="text-sm font-black text-slate-900">قاموس المفردات الصعبة</h3>
            <p className="text-[10px] text-slate-500">تعلم معاني الكلمات الجديدة في هذه القصة ({words.length})</p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>

      {/* Expanded Content */}
      <div className={`transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-[600px] border-t border-slate-50' : 'max-h-0'}`}>
        <div className="p-5 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="ابحث عن كلمة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-9 pl-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>

          {/* Words List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredWords.map((word) => (
              <div 
                key={word.id} 
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-black text-emerald-800">{word.word}</h4>
                  <button 
                    onClick={() => playPronunciation(word.word)}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm"
                    title="استمع للنطق الصحيح"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {word.meaning}
                </p>
                {word.pronunciationHint && (
                  <p className="text-[9px] text-slate-400 mt-1 italic">
                    تلميح: {word.pronunciationHint}
                  </p>
                )}
              </div>
            ))}
          </div>

          {filteredWords.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs italic">
              لا توجد نتائج مطابقة لبحثك
            </div>
          )}

          <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-amber-700 font-bold">
            <Sparkles className="w-3 h-3" />
            <span>العلم نور، واللغة العربية مفتاح لفهم قصص الأنبياء</span>
          </div>
        </div>
      </div>
    </div>
  );
};
