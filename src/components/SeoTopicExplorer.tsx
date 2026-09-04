import React, { useState } from 'react';
import { 
  Database, Search, TrendingUp, Compass, Briefcase, 
  CheckCircle2, ArrowRight, Layers, Eye, ShieldCheck, Flame 
} from 'lucide-react';
import { KEYWORD_CLUSTERS } from '../data/clusters';
import { ARTICLES } from '../data/articles';
import { ArticleCategory } from '../types';

interface SeoTopicExplorerProps {
  onSelectArticle: (slug: string) => void;
  onSelectCategory: (cat: ArticleCategory) => void;
}

export const SeoTopicExplorer: React.FC<SeoTopicExplorerProps> = ({
  onSelectArticle,
  onSelectCategory,
}) => {
  const [selectedClusterId, setSelectedClusterId] = useState<string>('work');

  const selectedCluster = KEYWORD_CLUSTERS.find(c => c.id === selectedClusterId) || KEYWORD_CLUSTERS[0];
  
  // Get articles corresponding to this cluster
  const clusterArticles = ARTICLES.filter(art => {
    if (selectedCluster.id === 'core') return art.category === 'definition';
    if (selectedCluster.id === 'activities') return art.category === 'activities';
    if (selectedCluster.id === 'work') return art.category === 'work';
    if (selectedCluster.id === 'fitness') return art.category === 'fitness';
    if (selectedCluster.id === 'lifestyle') return art.category === 'lifestyle';
    if (selectedCluster.id === 'navigation') return art.category === 'navigation';
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 border border-stone-800 relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold">
            <Database className="w-3.5 h-3.5" />
            jitakus.com ドメイン戦略・トピッククラスター構造
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            「自宅 (2.7M)」を単一キーワードで追わず、<br className="hidden sm:inline" />
            <span className="text-emerald-400">検索意図（Search Intent）別の5大クラスタ</span>で網羅する
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            キーワードスタッフィング（詰め込み）を排除し、ユーザーが本当に求めている「できること」「働く・内職」「運動」「生活」「移動ナビ」の各インテントに対して、網羅的で実用性の高いピラー記事とサブクラスタを階層化しています。
          </p>
        </div>

        {/* High Priority Keyword Badges */}
        <div className="mt-6 pt-6 border-t border-stone-800 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700/60">
            <div className="text-[11px] text-stone-400 font-mono">自宅</div>
            <div className="text-lg font-bold text-white">2.7M <span className="text-xs font-normal text-stone-400">/ KD 47</span></div>
            <div className="text-[10px] text-emerald-400">基本定義・基盤意図</div>
          </div>
          <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700/60">
            <div className="text-[11px] text-stone-400 font-mono">内職 自宅に届く</div>
            <div className="text-lg font-bold text-amber-400">40.5K <span className="text-xs font-normal text-stone-400">/ KD 24</span></div>
            <div className="text-[10px] text-amber-300">🔥 最重要 商業意図</div>
          </div>
          <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700/60">
            <div className="text-[11px] text-stone-400 font-mono">自宅から</div>
            <div className="text-lg font-bold text-indigo-300">110K <span className="text-xs font-normal text-stone-400">/ KD 50</span></div>
            <div className="text-[10px] text-indigo-400">移動・距離ナビ意図</div>
          </div>
          <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700/60">
            <div className="text-[11px] text-stone-400 font-mono">自宅まで</div>
            <div className="text-lg font-bold text-indigo-300">110K <span className="text-xs font-normal text-stone-400">/ KD 42</span></div>
            <div className="text-[10px] text-indigo-400">帰宅・道案内意図</div>
          </div>
          <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700/60 col-span-2 sm:col-span-1">
            <div className="text-[11px] text-stone-400 font-mono">ここから自宅まで</div>
            <div className="text-lg font-bold text-teal-300">49.5K <span className="text-xs font-normal text-stone-400">/ KD 47</span></div>
            <div className="text-[10px] text-teal-400">現在地帰宅ナビ</div>
          </div>
        </div>
      </div>

      {/* Cluster Switcher Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-700" />
            <span>トピッククラスターを選択して詳細を分析</span>
          </h2>
          <span className="text-xs text-stone-500 font-medium hidden sm:inline">
            全30記事・5大クラスタ構造
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {KEYWORD_CLUSTERS.map((cluster) => {
            const isSelected = selectedClusterId === cluster.id;
            return (
              <button
                key={cluster.id}
                onClick={() => setSelectedClusterId(cluster.id)}
                className={`p-3.5 rounded-xl text-left border transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm ring-2 ring-emerald-600/30'
                    : 'bg-white text-stone-800 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-emerald-200' : 'text-stone-400'}`}>
                    {cluster.name}
                  </div>
                  <div className="font-bold text-xs sm:text-sm mt-0.5 leading-snug">
                    {cluster.japaneseName}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-current/10 flex items-center justify-between text-[11px]">
                  <span className="font-semibold">{cluster.monthlyVolume}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                    isSelected ? 'bg-emerald-900/60 text-emerald-200' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {cluster.articleCount}記事
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Cluster Deep-Dive Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                {selectedCluster.intent} Intent
              </span>
              <span className="text-xs text-stone-500 font-mono">
                KD: {selectedCluster.kd} / 100
              </span>
            </div>
            <h3 className="text-xl font-bold text-stone-900 mt-1.5">
              {selectedCluster.japaneseName}（{selectedCluster.mainKeyword}）
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
              {selectedCluster.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const catMap: Record<string, ArticleCategory> = {
                  core: 'definition',
                  activities: 'activities',
                  work: 'work',
                  fitness: 'fitness',
                  lifestyle: 'lifestyle',
                  navigation: 'navigation',
                };
                onSelectCategory(catMap[selectedCluster.id] || 'activities');
              }}
              className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>このクラスタの記事一覧を見る</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Example Queries Covered naturally */}
        <div>
          <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-stone-400" />
            自然に包括される検索クエリ群（Semantic Search Coverage）
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedCluster.exampleQueries.map((q, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 bg-stone-100 text-stone-700 rounded-lg text-xs border border-stone-200/80 font-mono"
              >
                🔍 {q}
              </span>
            ))}
          </div>
        </div>

        {/* Associated Articles In This Cluster */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center justify-between">
            <span>クラスタ内記事一覧（{clusterArticles.length}本）</span>
            <span className="text-[11px] text-stone-400 font-normal">クリックで記事本文を直接閲覧</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {clusterArticles.map((art) => (
              <button
                key={art.id}
                onClick={() => onSelectArticle(art.slug)}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-emerald-600/50 hover:shadow-sm text-left transition group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white text-stone-600 border border-stone-200">
                      {art.searchVolume}
                    </span>
                    <span className="text-[11px] text-stone-400">読了約 {art.readingTimeMinutes}分</span>
                  </div>
                  <h5 className="font-bold text-stone-900 text-xs sm:text-sm group-hover:text-emerald-800 transition line-clamp-2">
                    {art.title}
                  </h5>
                  <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-emerald-800 font-medium">
                  <span>記事を読む</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* SEO Best Practice Callout */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs space-y-1.5">
          <div className="font-bold flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-600" />
            SEO戦略の重要ルール：キーワードの不自然な詰め込みは厳禁
          </div>
          <p className="text-amber-800 leading-relaxed">
            「自宅でできることを自宅でやるなら…」のような無理なキーワード挿入はペナルティ対象となります。jitakus.comでは「一人でも家族でも楽しめる目的別の過ごし方」など自然な日本語文脈の中でトピックを包括し、検索ユーザーの課題を直接解決する構成を採用しています。
          </p>
        </div>
      </div>
    </div>
  );
};
