import React, { useState, useRef } from 'react';
import { 
  Palette, 
  Trash2, 
  Download, 
  Save, 
  ArrowRight, 
  CheckCircle2, 
  Undo, 
  Image as ImageIcon,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProphetStory, ColoringPage, SavedColoringWork } from '../types';

interface ColoringBookViewProps {
  prophets: ProphetStory[];
  onSaveWork: (work: SavedColoringWork) => void;
  onBack: () => void;
}

const COLORS = [
  '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', 
  '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', 
  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', 
  '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#000000',
  '#FFFFFF'
];

export const ColoringBookView: React.FC<ColoringBookViewProps> = ({ 
  prophets, 
  onSaveWork, 
  onBack 
}) => {
  const [selectedProphet, setSelectedProphet] = useState<ProphetStory | null>(null);
  const [selectedPage, setSelectedPage] = useState<ColoringPage | null>(null);
  const [currentColor, setCurrentColor] = useState(COLORS[0]);
  const [svgData, setSvgData] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<Record<string, string>[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Filter prophets that have coloring pages
  const prophetsWithColoring = prophets.filter(p => p.coloringPages && p.coloringPages.length > 0);

  const handlePathClick = (pathId: string) => {
    setHistory([...history, { ...svgData }]);
    setSvgData({ ...svgData, [pathId]: currentColor });
    setIsSaved(false);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const prevData = history[history.length - 1];
    setSvgData(prevData);
    setHistory(history.slice(0, -1));
  };

  const handleReset = () => {
    if (window.confirm('هل تريد مسح كل الألوان والبدء من جديد؟')) {
      setSvgData({});
      setHistory([]);
    }
  };

  const handleSave = () => {
    if (!selectedPage || !selectedProphet) return;

    // Simulate saving - in a real app we'd generate a base64 from the SVG
    // For now, we'll just save the data structure
    const newWork: SavedColoringWork = {
      id: Math.random().toString(36).substr(2, 9),
      pageId: selectedPage.id,
      storyId: selectedProphet.id,
      title: `${selectedPage.title} - ${selectedProphet.name}`,
      svgData: { ...svgData },
      previewUrl: '', // In a real app, generate from SVG
      savedAt: new Date().toISOString()
    };

    onSaveWork(newWork);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!selectedPage) {
    return (
      <div className="space-y-8 pb-20 animate-fade-in" dir="rtl">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-emerald-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 text-xs font-bold">
              <Palette className="w-4 h-4" />
              <span>كتيب التلوين الرقمي</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">لون قصص الأنبياء 🎨</h1>
            <p className="text-slate-600 dark:text-slate-300 font-medium">اختر مشهداً من قصص الأنبياء وعبّر عن إبداعك بالألوان الجميلة.</p>
          </div>
          <button onClick={onBack} className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold transition-all">العودة للرئيسية</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prophetsWithColoring.map(prophet => (
            <div key={prophet.id} className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-100 dark:border-slate-800 overflow-hidden hover:border-emerald-300 dark:hover:border-emerald-500 transition-all group">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-slate-800 flex items-center justify-center text-2xl">
                    {prophet.id === 'adam' ? '🌳' : prophet.id === 'nuh' ? '🚢' : '🌟'}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white">{prophet.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{prophet.epithet}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {prophet.coloringPages?.map(page => (
                    <button
                      key={page.id}
                      onClick={() => {
                        setSelectedProphet(prophet);
                        setSelectedPage(page);
                      }}
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-750 text-right group/btn transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <ImageIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <span className="font-bold text-slate-700 dark:text-slate-200">{page.title}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover/btn:translate-x-1 transition-transform rotate-180" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 animate-fade-in" dir="rtl">
      {/* Editor Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-emerald-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              setSelectedPage(null);
              setSvgData({});
              setHistory([]);
            }}
            className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">{selectedPage.title}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">تلوين مشهد من قصة {selectedProphet?.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-30 transition-all"
            title="تراجع"
          >
            <Undo className="w-5 h-5" />
          </button>
          <button
            onClick={handleReset}
            className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900 text-rose-600 dark:text-rose-400 transition-all"
            title="مسح الكل"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-md shadow-emerald-600/20"
          >
            <Save className="w-5 h-5" />
            <span>حفظ العمل</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tools & Palette */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
            <h3 className="font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              لوحة الألوان
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => setCurrentColor(color)}
                  className={`w-full aspect-square rounded-xl border-4 transition-all transform hover:scale-110 shadow-sm ${
                    currentColor === color ? 'border-slate-900 dark:border-white scale-110 shadow-md' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800">
                <div className="w-8 h-8 rounded-lg shadow-inner" style={{ backgroundColor: currentColor }} />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">اللون المختار</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-slate-850 p-6 rounded-3xl border border-emerald-100 dark:border-slate-700 transition-colors">
            <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300 mb-2">تعليمات التلوين ✨</h4>
            <ul className="text-xs text-emerald-800 dark:text-slate-300 space-y-2 font-medium">
              <li>• اختر لوناً من اللوحة الجانبية.</li>
              <li>• اضغط على أي جزء من الرسمة لتلوينها.</li>
              <li>• يمكنك التراجع عن آخر خطوة إذا أخطأت.</li>
              <li>• احفظ صورتك لتظهر في معرض إنجازاتك!</li>
            </ul>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-[3rem] border-2 border-slate-100 dark:border-slate-800 shadow-xl flex items-center justify-center min-h-[500px] relative overflow-hidden transition-colors">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <motion.div 
            layout
            className="w-full max-w-2xl aspect-square"
          >
            <svg
              ref={svgRef}
              viewBox="0 0 400 400"
              className="w-full h-full drop-shadow-2xl"
            >
              {selectedPage.svgPaths.map((path) => (
                <path
                  key={path.id}
                  id={path.id}
                  d={path.d}
                  fill={svgData[path.id] || path.defaultColor || '#FFFFFF'}
                  stroke="#334155"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={() => handlePathClick(path.id)}
                  className="cursor-pointer transition-colors duration-300 hover:brightness-95"
                />
              ))}
            </svg>
          </motion.div>

          <AnimatePresence>
            {isSaved && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl z-50"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="font-bold">تم حفظ العمل في معرض إنجازاتك!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
