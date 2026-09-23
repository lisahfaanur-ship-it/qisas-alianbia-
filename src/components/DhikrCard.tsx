import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  Heart,
  ShieldCheck,
  Music
} from 'lucide-react';

interface Dhikr {
  text: string;
  translation: string;
  merit: string; // Fadhilah
}

const DHIKR_LIST: Dhikr[] = [
  {
    text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    translation: "Glory be to Allah and His is the praise",
    merit: "من قالها مائة مرة حطت خطاياه وإن كانت مثل زبد البحر."
  },
  {
    text: "سُبْحَانَ اللَّهِ الْعَظِيمِ",
    translation: "Glory be to Allah the Magnificent",
    merit: "كلمتان خفيفتان على اللسان، ثقيلتان في الميزان، حبيبتان إلى الرحمن."
  },
  {
    text: "لا حَوْلَ وَلا قُوَّةَ إِلا بِاللَّهِ",
    translation: "There is no might nor power except with Allah",
    merit: "كنز من كنوز الجنة."
  },
  {
    text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
    translation: "I seek Allah's forgiveness and turn to Him in repentance",
    merit: "من لزم الاستغفار جعل الله له من كل هم فرجاً."
  },
  {
    text: "الْحَمْدُ لِلَّهِ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ",
    translation: "Praise be to Allah, much, good and blessed praise",
    merit: "تملأ الميزان بالخيرات."
  },
  {
    text: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ",
    translation: "O Allah, send blessings and peace upon our Prophet Muhammad",
    merit: "من صلى عليّ واحدة صلى الله عليه بها عشراً."
  }
];

export const DhikrCard: React.FC = () => {
  const [currentDhikr, setCurrentDhikr] = useState<Dhikr>(DHIKR_LIST[0]);
  const [isRotating, setIsRotating] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const rotateDhikr = () => {
    setIsRotating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * DHIKR_LIST.length);
      setCurrentDhikr(DHIKR_LIST[randomIndex]);
      setIsRotating(false);
    }, 600);
  };

  const playAudio = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentDhikr.text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.8;
      utterance.onstart = () => setIsAudioPlaying(true);
      utterance.onend = () => setIsAudioPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Select a random one on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * DHIKR_LIST.length);
    setCurrentDhikr(DHIKR_LIST[randomIndex]);
  }, []);

  return (
    <div className="relative group overflow-hidden bg-white rounded-3xl border-2 border-emerald-100 shadow-sm hover:shadow-md transition-all p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6" dir="rtl">
      {/* Islamic Pattern Background Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,_#10b981_1px,_transparent_1px)] bg-[length:20px_20px]" />
      
      {/* Icon/Decoration */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20 relative">
        <Sparkles className="w-10 h-10 animate-pulse" />
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full border-2 border-white flex items-center justify-center">
          <Heart className="w-3 h-3 text-rose-600 fill-rose-600" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 text-center md:text-right space-y-3">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 uppercase tracking-widest">
            ذكر اليوم المبارك
          </span>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        </div>
        
        <div className={`transition-all duration-500 ${isRotating ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
            {currentDhikr.text}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2">
            {currentDhikr.merit}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-row md:flex-col gap-3">
        <button
          onClick={playAudio}
          disabled={isAudioPlaying}
          className={`p-3.5 rounded-2xl transition-all shadow-sm flex items-center justify-center group/btn ${
            isAudioPlaying 
              ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' 
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
          }`}
          title="استمع للذكر"
        >
          {isAudioPlaying ? (
            <div className="flex gap-0.5 items-end h-5">
              <div className="w-1 bg-white rounded-full animate-[music_0.8s_ease-in-out_infinite]" style={{height: '60%'}} />
              <div className="w-1 bg-white rounded-full animate-[music_0.8s_ease-in-out_infinite_0.1s]" style={{height: '100%'}} />
              <div className="w-1 bg-white rounded-full animate-[music_0.8s_ease-in-out_infinite_0.2s]" style={{height: '80%'}} />
            </div>
          ) : (
            <Volume2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          )}
        </button>

        <button
          onClick={rotateDhikr}
          disabled={isRotating}
          className="p-3.5 rounded-2xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition-all shadow-sm group/btn"
          title="ذكر آخر"
        >
          <RefreshCw className={`w-5 h-5 group-hover/btn:rotate-180 transition-all duration-500 ${isRotating ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <style>{`
        @keyframes music {
          0%, 100% { height: 40%; }
          50% { height: 100%; }
        }
      `}</style>
    </div>
  );
};
