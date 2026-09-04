import React, { useState } from 'react';
import { 
  Sparkles, RotateCw, Clock, DollarSign, 
  CheckSquare, Lightbulb, User, Users, CheckCircle2, Bookmark 
} from 'lucide-react';
import { ACTIVITY_IDEAS } from '../data/activities';
import { ActivityIdea } from '../types';

interface ActivityRouletteProps {
  onBookmarkActivity?: (activity: ActivityIdea) => void;
  isBookmarked?: (id: string) => boolean;
}

export const ActivityRoulette: React.FC<ActivityRouletteProps> = ({
  onBookmarkActivity,
  isBookmarked,
}) => {
  const [selectedTime, setSelectedTime] = useState<number>(0); // 0 = all
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTarget, setSelectedTarget] = useState<string>('all');
  const [activeIdea, setActiveIdea] = useState<ActivityIdea>(ACTIVITY_IDEAS[0]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const filteredIdeas = ACTIVITY_IDEAS.filter(idea => {
    if (selectedTime > 0 && idea.timeRequiredMinutes > selectedTime) return false;
    if (selectedCategory !== 'all' && idea.category !== selectedCategory) return false;
    if (selectedTarget !== 'all' && idea.target !== selectedTarget && idea.target !== '誰でも') return false;
    return true;
  });

  const rollRandomActivity = () => {
    setIsSpinning(true);
    const pool = filteredIdeas.length > 0 ? filteredIdeas : ACTIVITY_IDEAS;
    let counter = 0;
    const interval = setInterval(() => {
      const randomItem = pool[Math.floor(Math.random() * pool.length)];
      setActiveIdea(randomItem);
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 80);
  };

  const toggleStep = (stepIdx: number) => {
    const key = `${activeIdea.id}-${stepIdx}`;
    setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-teal-950 text-white rounded-2xl p-6 sm:p-8 border border-emerald-800/60 relative overflow-hidden shadow-md">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            自宅アクティビティ・プランナー＆ルーレット
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            「今日、自宅で何する？」を1秒で解決！<br className="hidden sm:inline" />
            使える時間・気分に合わせたアイデア提案
          </h1>
          <p className="text-emerald-200/90 text-xs sm:text-sm leading-relaxed">
            15分の手軽なリフレッシュから、休日にじっくり取り組む大人の趣味まで。実践ステップとプロのコツ付きでサポートします。
          </p>
        </div>
      </div>

      {/* Filter & Roulette Controller */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-5 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          
          {/* 1. Time Filter */}
          <div className="space-y-1.5">
            <label className="font-bold text-stone-700 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-700" />
              <span>使える時間</span>
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
            >
              <option value={0}>制限なし（すべての時間）</option>
              <option value={15}>15分以内（サクッと気分転換）</option>
              <option value={30}>30分以内（ちょっとした隙間時間）</option>
              <option value={60}>1時間以内（しっかり没頭）</option>
            </select>
          </div>

          {/* 2. Mood / Category */}
          <div className="space-y-1.5">
            <label className="font-bold text-stone-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>気分・カテゴリ</span>
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
            >
              <option value="all">すべてのジャンル</option>
              <option value="relax">リラックス・癒やし</option>
              <option value="active">運動・フィットネス</option>
              <option value="productive">整理整頓・生産性</option>
              <option value="creative">クリエイティブ・趣味</option>
              <option value="save">節約・家計改善</option>
              <option value="study">勉強・リスキリング</option>
            </select>
          </div>

          {/* 3. Target */}
          <div className="space-y-1.5">
            <label className="font-bold text-stone-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-700" />
              <span>人数・シチュエーション</span>
            </label>
            <select
              value={selectedTarget}
              onChange={(e) => setSelectedTarget(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
            >
              <option value="all">誰でも・指定なし</option>
              <option value="一人">一人で集中・楽しむ</option>
              <option value="家族・カップル">家族・パートナーと</option>
            </select>
          </div>

        </div>

        {/* Action Button: Roll / Randomize */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-stone-100">
          <span className="text-xs text-stone-500 font-medium">
            該当アイデア：<strong>{filteredIdeas.length}</strong> 件
          </span>

          <button
            onClick={rollRandomActivity}
            disabled={isSpinning}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
          >
            <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? '選んでいます...' : 'ルーレットで選ぶ（ランダム提案）'}</span>
          </button>
        </div>
      </div>

      {/* Active Selected Idea Display Card */}
      {activeIdea && (
        <div className="bg-white rounded-2xl border-2 border-emerald-700/60 p-6 sm:p-8 space-y-6 shadow-md relative">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  {activeIdea.categoryLabel}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-stone-100 text-stone-700">
                  ⏱ 約 {activeIdea.timeRequiredMinutes}分
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-stone-100 text-stone-700">
                  💰 {activeIdea.cost}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] bg-stone-100 text-stone-700">
                  難易度: {activeIdea.difficulty}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                {activeIdea.title}
              </h2>
            </div>

            {onBookmarkActivity && (
              <button
                onClick={() => onBookmarkActivity(activeIdea)}
                className={`p-2.5 rounded-xl border transition cursor-pointer shrink-0 ${
                  isBookmarked?.(activeIdea.id)
                    ? 'bg-amber-50 text-amber-700 border-amber-300'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
                title="お気に入りに追加"
              >
                <Bookmark className="w-5 h-5" />
              </button>
            )}
          </div>

          <p className="text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200/80">
            {activeIdea.description}
          </p>

          {/* Interactive Steps Checklist */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-emerald-700" />
              <span>実践ステップ（クリックで完了チェック）</span>
            </h4>
            <div className="space-y-2">
              {activeIdea.steps.map((step, idx) => {
                const key = `${activeIdea.id}-${idx}`;
                const isChecked = !!completedSteps[key];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition cursor-pointer flex items-center gap-3 ${
                      isChecked
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 line-through opacity-75'
                        : 'bg-white border-stone-200 text-stone-800 hover:border-emerald-500'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 ${
                      isChecked ? 'bg-emerald-700 border-emerald-700 text-white' : 'border-stone-300 bg-white'
                    }`}>
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span>{step}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pro Tip */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">プロのアドバイス：</strong>
              <span className="leading-relaxed ml-1">{activeIdea.proTip}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
