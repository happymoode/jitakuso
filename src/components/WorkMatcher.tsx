import React, { useState } from 'react';
import { 
  Briefcase, Truck, ShieldAlert, CheckCircle2, 
  HelpCircle, DollarSign, Clock, AlertTriangle, ArrowRight 
} from 'lucide-react';
import { WORK_CATEGORIES } from '../data/activities';

interface WorkMatcherProps {
  onSelectArticle: (slug: string) => void;
}

export const WorkMatcher: React.FC<WorkMatcherProps> = ({ onSelectArticle }) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [targetIncome, setTargetIncome] = useState<number>(30000); // 30,000 yen
  const [hasPC, setHasPC] = useState<boolean>(true);
  const [hasSpace, setHasSpace] = useState<boolean>(true);

  const filteredCategories = WORK_CATEGORIES.filter(cat => {
    if (selectedType === 'all') return true;
    if (selectedType === 'naishoku') return cat.type.includes('内職');
    if (selectedType === 'cloud') return cat.type.includes('在宅ワーク');
    if (selectedType === 'sidejob') return cat.type.includes('副業');
    if (selectedType === 'skill') return cat.type.includes('スキル');
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 border border-stone-800 relative overflow-hidden shadow-md">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-600/50 text-amber-300 text-xs font-semibold">
            <Truck className="w-3.5 h-3.5" />
            内職・在宅ワーク・自宅副業 総合ナビ
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            「内職 自宅に届く（40.5K/KD24）」から<br className="hidden sm:inline" />
            パソコン副業まで！安全な自宅ワーク適性診断
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            自宅に資材が届くシール貼り・手作業内職から、未経験から始められるWebライティング・不用品販売まで。月収目安と詐欺防止チェックで安心スタート！
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-amber-600" />
            <span>希望条件で絞り込む</span>
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { id: 'all', label: 'すべて' },
              { id: 'naishoku', label: '自宅に届く内職（手作業）', badge: 'KD24' },
              { id: 'cloud', label: '在宅ワーク（PC・スマホ）' },
              { id: 'sidejob', label: '自宅副業（物販・ハンドメイド）' },
              { id: 'skill', label: 'スキル販売' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`px-3 py-1.5 rounded-lg border font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  selectedType === tab.id
                    ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[10px] bg-amber-900 text-amber-200 px-1 py-0.2 rounded font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Simulator Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs">
          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 space-y-2">
            <label className="font-bold text-stone-700 flex items-center justify-between">
              <span>目標月収</span>
              <span className="text-amber-700 font-mono font-bold">{targetIncome.toLocaleString()} 円</span>
            </label>
            <input
              type="range"
              min="5000"
              max="150000"
              step="5000"
              value={targetIncome}
              onChange={(e) => setTargetIncome(parseInt(e.target.value))}
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>5千円</span>
              <span>5万円</span>
              <span>15万円</span>
            </div>
          </div>

          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 flex items-center justify-between">
            <div>
              <div className="font-bold text-stone-800">パソコン環境</div>
              <div className="text-[11px] text-stone-500">PCの有無で案件幅が変化</div>
            </div>
            <button
              onClick={() => setHasPC(!hasPC)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                hasPC ? 'bg-emerald-700 text-white' : 'bg-stone-200 text-stone-600'
              }`}
            >
              {hasPC ? 'PCあり' : 'スマホのみ'}
            </button>
          </div>

          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 flex items-center justify-between">
            <div>
              <div className="font-bold text-stone-800">段ボール置場スペース</div>
              <div className="text-[11px] text-stone-500">手作業内職の必須要件</div>
            </div>
            <button
              onClick={() => setHasSpace(!hasSpace)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                hasSpace ? 'bg-amber-700 text-white' : 'bg-stone-200 text-stone-600'
              }`}
            >
              {hasSpace ? '置場あり' : '置場なし'}
            </button>
          </div>
        </div>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map(cat => (
          <div 
            key={cat.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs flex flex-col justify-between hover:border-amber-400/80 transition"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  {cat.type}
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  初心者おすすめ度：{'★'.repeat(cat.beginnerScore)}{'☆'.repeat(5 - cat.beginnerScore)}
                </span>
              </div>

              <h3 className="text-lg font-bold text-stone-900 leading-snug">
                {cat.title}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                {cat.description}
              </p>

              {/* Income & Flexibility */}
              <div className="grid grid-cols-2 gap-2 p-3 bg-stone-50 rounded-xl text-xs">
                <div>
                  <div className="text-[10px] text-stone-400">平均月収目安</div>
                  <div className="font-bold text-amber-700 font-mono text-xs">{cat.monthlyIncomeEstimate}</div>
                </div>
                <div>
                  <div className="text-[10px] text-stone-400">時間の自由度</div>
                  <div className="font-bold text-stone-800 text-xs">{cat.timeFlexibility}</div>
                </div>
              </div>

              {/* Typical tasks */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-bold text-stone-700">主な作業内容：</div>
                <ul className="space-y-1 text-xs text-stone-600">
                  {cat.typicalTasks.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safety note / Fraud warning */}
              <div className="p-3 rounded-xl bg-red-50/70 border border-red-200/80 text-red-900 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <p className="leading-tight text-[11px]">{cat.safetyNote}</p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => {
                  if (cat.id.includes('naishoku')) {
                    onSelectArticle('jitaku-naishoku-todoku');
                  } else {
                    onSelectArticle('jitaku-shigoto-20');
                  }
                }}
                className="w-full py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>詳しい解説記事を読む</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Safety & Compliance Guide Box */}
      <div className="bg-stone-900 text-stone-200 rounded-2xl p-6 sm:p-7 border border-stone-800 space-y-3">
        <h4 className="font-bold text-white text-sm flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>自宅内職・在宅ワークを始める前の安心3原則</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-300 pt-1">
          <div className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700/60 space-y-1">
            <div className="font-bold text-amber-300">1. 事前費用は一切払わない</div>
            <p className="text-stone-400 leading-relaxed">「登録料」「専用キット代」を求めるものは100%詐欺です。優良内職は費用0円です。</p>
          </div>
          <div className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700/60 space-y-1">
            <div className="font-bold text-amber-300">2. 公的窓口・大手を利用</div>
            <p className="text-stone-400 leading-relaxed">ハローワークや自治体の内職相談窓口、または大手クラウドソーシングを利用しましょう。</p>
          </div>
          <div className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700/60 space-y-1">
            <div className="font-bold text-amber-300">3. 年間20万円の確定申告</div>
            <p className="text-stone-400 leading-relaxed">副業所得が年間20万円を超える場合は確定申告が必要です。内職の必要経費特例も活用可能。</p>
          </div>
        </div>
      </div>
    </div>
  );
};
