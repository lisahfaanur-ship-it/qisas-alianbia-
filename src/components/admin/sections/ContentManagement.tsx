import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  CheckSquare,
  Square,
  Plus,
  CheckCircle2,
  Clock,
  Mic,
  Music,
  ChevronDown,
  Volume2
} from 'lucide-react';
import { ProphetStory, StoryStatus, ReviewChecklist, AgeGroup } from '../../../types';

interface ContentManagementProps {
  prophets: ProphetStory[];
  onUpdateProphet: (prophet: ProphetStory) => void;
  onAddProphet: (prophet: ProphetStory) => void;
}

export const ContentManagement: React.FC<ContentManagementProps> = ({
  prophets,
  onUpdateProphet,
  onAddProphet
}) => {
  const [selectedProphetId, setSelectedProphetId] = useState<string>(prophets[0]?.id || 'adam');
  const [notification, setNotification] = useState<string | null>(null);
  const [editingAge, setEditingAge] = useState<AgeGroup>('8-10');

  const currentProphet = prophets.find(p => p.id === selectedProphetId) || prophets[0];

  const checklistDef: { key: keyof ReviewChecklist; label: string; note: string }[] = [
    {
      key: 'quranicVersesChecked',
      label: 'هل الآيات القرآنية مدققة ومضبوطة بالشكل الصحيح ورقم السورة؟',
      note: 'مراجعة نص الآية وتخريجها الدقيق.'
    },
    {
      key: 'hadithReferencedAndAuthentic',
      label: 'هل الأحاديث النبوية مخرجة في الصحاح والسنن الثابتة؟',
      note: 'الاقتصار على صحيح البخاري ومسلم وما صححه الأئمة.'
    },
    {
      key: 'noProphetDepiction',
      label: 'هل تم استبعاد أي تجسيد أو رسم للأنبياء والرسل عليهم السلام؟',
      note: 'شرط قطعي غير قابل للتساهل: رسوم رمزية فقط.'
    },
    {
      key: 'israiliyatExcluded',
      label: 'هل تم استبعاد الروايات الضعيفة والإسرائيليات غير الثابتة؟',
      note: 'عدم الجزم بتفاصيل لم تثبت في القرآن أو الصحيحين.'
    },
    {
      key: 'ageAppropriateLanguage',
      label: 'هل صياغة اللغة وأسلوب السرد مناسبان لعقلية وعمر الطفل؟',
      note: 'كلمات سهلة وواضحة خالية من التراكيب الوعرة والمعقدة.'
    },
    {
      key: 'quizQuestionsReviewed',
      label: 'هل تمت مراجعة أسئلة الاختبار للتأكد من استنادها إلى وقائع ثابتة؟',
      note: 'الابتعاد عن الأسئلة التخمينية أو التي تعتمد على غرائب.'
    },
    {
      key: 'sourcesExplicitlyStated',
      label: 'هل المصادر والمراجع محددة ومكتوبة بوضوح لكل حدث؟',
      note: 'إدراج السورة، الآية، واسم الكتاب ورقم الحديث إن وجد.'
    },
    {
      key: 'coreValuesClarified',
      label: 'هل تم إبراز القيم التربوية والعقدية المستفادة من القصة؟',
      note: 'الصبر، التوحيد، التوكل، الأمانة، التوبة الصادقة.'
    },
    {
      key: 'audioScriptMatchesText',
      label: 'هل النص الصوتي مطابق 100% للنص المعتمد دون تحريف؟',
      note: 'توافق كامل بين القراءة الصوتية والنص المقروء.'
    }
  ];

  const handleToggleChecklist = (key: keyof ReviewChecklist) => {
    const updatedProphet: ProphetStory = {
      ...currentProphet,
      reviewChecklist: {
        ...currentProphet.reviewChecklist,
        [key]: !currentProphet.reviewChecklist[key]
      }
    };
    onUpdateProphet(updatedProphet);
    showNotice('تم تحديث معيار التحقق بنجاح');
  };

  const handleStatusChange = (newStatus: StoryStatus) => {
    if (newStatus === 'verified') {
      const allChecked = Object.values(currentProphet.reviewChecklist).every(val => val === true);
      if (!allChecked) {
        showNotice('⚠️ تنبيه: لا يمكن اعتماد القصة ونشرها حتى تكتمل جميع بنود التحقق الشرعي التسعة!');
        return;
      }
    }

    const updatedProphet: ProphetStory = {
      ...currentProphet,
      status: newStatus
    };
    onUpdateProphet(updatedProphet);
    showNotice(`تم تغيير حالة القصة إلى: ${getStatusLabel(newStatus)}`);
  };

  const handleUpdateAudioUrl = (chapterIndex: number, url: string, isVerse: boolean = false) => {
    const updatedProphet = { ...currentProphet };
    const chapters = [...updatedProphet.ageVariants[editingAge].chapters];
    
    if (isVerse) {
      if (chapters[chapterIndex].associatedAyah) {
        chapters[chapterIndex].associatedAyah = {
          ...chapters[chapterIndex].associatedAyah!,
          audioUrl: url
        };
      }
    } else {
      chapters[chapterIndex] = {
        ...chapters[chapterIndex],
        audioUrl: url
      };
    }
    
    updatedProphet.ageVariants[editingAge].chapters = chapters;
    onUpdateProphet(updatedProphet);
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const getStatusBadge = (status: StoryStatus) => {
    switch (status) {
      case 'verified':
        return <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">موثق</span>;
      case 'under_review':
        return <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">قيد المراجعة</span>;
      case 'needs_correction':
        return <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">يحتاج تصحيح</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-bold">مسودة</span>;
    }
  };

  const getStatusLabel = (status: StoryStatus) => {
    switch (status) {
      case 'verified': return 'موثق ومعتمد';
      case 'under_review': return 'قيد المراجعة';
      case 'needs_correction': return 'يحتاج تعديل';
      default: return 'مسودة';
    }
  };

  const checkedCount = Object.values(currentProphet.reviewChecklist).filter(Boolean).length;
  const isFullyVerified = checkedCount === 9;

  if (!currentProphet) return <div>لا توجد بيانات متاحة.</div>;

  return (
    <div className="space-y-6 animate-fade-in" dir="rtl">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-8 left-8 p-4 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs shadow-2xl z-50 animate-bounce">
          {notification}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Story Selector */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b pb-3">قائمة قصص الأنبياء</h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {prophets.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedProphetId(p.id)}
                className={`w-full p-3 rounded-xl border text-right transition-all flex items-center justify-between gap-2 ${
                  p.id === currentProphet.id ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
                }`}
              >
                <div className="truncate">
                  <span className="text-xs font-bold text-slate-900 block truncate">{p.name}</span>
                  <span className="text-[10px] text-slate-500">{p.epithet}</span>
                </div>
                {getStatusBadge(p.status)}
              </button>
            ))}
          </div>
          <button
            onClick={() => onAddProphet({ ...currentProphet, id: `new_${Date.now()}`, name: 'نبي جديد' })}
            className="w-full py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة نبي جديد</span>
          </button>
        </div>

        {/* Review Panel */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 border-b pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">{currentProphet.name}</h2>
                <p className="text-xs text-slate-500">{currentProphet.epithet}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold">الحالة:</span>
                <select
                  value={currentProphet.status}
                  onChange={e => handleStatusChange(e.target.value as StoryStatus)}
                  className="px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold outline-none"
                >
                  <option value="draft">مسودة</option>
                  <option value="under_review">قيد المراجعة</option>
                  <option value="needs_correction">يحتاج تعديل</option>
                  <option value="verified">موثق ومعتمد</option>
                </select>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span>جاهزية الاعتماد الشرعي (9 بنود):</span>
                <span className={isFullyVerified ? 'text-emerald-600' : 'text-amber-600'}>{checkedCount} / 9</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-500 ${isFullyVerified ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${(checkedCount / 9) * 100}%` }} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {checklistDef.map(item => (
                  <div
                    key={String(item.key)}
                    onClick={() => handleToggleChecklist(item.key)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      currentProphet.reviewChecklist[item.key] ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="shrink-0 pt-0.5">
                      {currentProphet.reviewChecklist[item.key] ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-slate-300" />}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-800 leading-tight">{item.label}</p>
                      <p className="text-[9px] text-slate-400 mt-0.5">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t flex flex-wrap gap-3">
              <button
                disabled={!isFullyVerified}
                onClick={() => handleStatusChange('verified')}
                className={`px-6 py-2.5 rounded-xl text-xs font-black shadow-sm flex items-center gap-2 ${
                  isFullyVerified ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-slate-100 text-slate-400'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>اعتماد ونشر القصة</span>
              </button>
              <button
                onClick={() => handleStatusChange('needs_correction')}
                className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-100 hover:bg-rose-100"
              >
                طلب تصحيح
              </button>
            </div>
          </div>

          {/* Audio Content Editor */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                  <Mic className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">إدارة الملفات الصوتية والتلاوات</h3>
              </div>
              
              <div className="flex gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                {(['5-7', '8-10', '11-13'] as AgeGroup[]).map(age => (
                  <button
                    key={age}
                    onClick={() => setEditingAge(age)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                      editingAge === age ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border-r-4 border-amber-400">
                يمكنك هنا إضافة روابط الملفات الصوتية (MP3) لكل فصل من فصول القصة، بالإضافة إلى روابط التلاوة الخاصة بالآيات القرآنية المرتبطة بكل فصل.
              </p>

              <div className="space-y-6">
                {currentProphet.ageVariants[editingAge].chapters.map((chap, idx) => (
                  <div key={`${editingAge}-${chap.id}-${idx}`} className="p-4 rounded-2xl border border-slate-100 bg-white shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        <h4 className="text-xs font-black text-slate-800">{chap.title}</h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Chapter Narration Audio */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-600 flex items-center gap-1">
                          <Volume2 className="w-3 h-3" />
                          رابط صوت السرد (فصل {idx + 1}):
                        </label>
                        <input
                          type="url"
                          placeholder="https://example.com/audio.mp3"
                          value={chap.audioUrl || ''}
                          onChange={(e) => handleUpdateAudioUrl(idx, e.target.value, false)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                        />
                      </div>

                      {/* Verse Recitation Audio */}
                      {chap.associatedAyah && (
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                            <Music className="w-3 h-3" />
                            رابط تلاوة الآية ({chap.associatedAyah.surah}):
                          </label>
                          <input
                            type="url"
                            placeholder="https://example.com/recitation.mp3"
                            value={chap.associatedAyah.audioUrl || ''}
                            onChange={(e) => handleUpdateAudioUrl(idx, e.target.value, true)}
                            className="w-full px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-[11px] outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
