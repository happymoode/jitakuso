import React from 'react';
import { 
  Clock, ArrowRight, Bookmark, Tag, Sparkles, 
  Home, Briefcase, Activity, PiggyBank, Navigation, ShieldCheck 
} from 'lucide-react';
import { Article } from '../types';
import { getJapaneseSlug } from '../data/slugHelper';

interface ArticleCardProps {
  article: Article;
  onSelect: (slug: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (slug: string, e: React.MouseEvent) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
}) => {
  const kotobankSlug = getJapaneseSlug(article.slug);

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat) {
      case 'definition':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'activities':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'work':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'fitness':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'lifestyle':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'navigation':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  return (
    <article
      onClick={() => onSelect(article.slug)}
      className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 flex flex-col justify-between hover:border-emerald-600/60 hover:shadow-md transition duration-200 group cursor-pointer relative"
    >
      <div className="space-y-3">
        {/* Top Badges & Bookmark */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getCategoryBadgeColor(article.category)}`}>
              {article.categoryName}
            </span>
            <span className="text-[10px] font-mono text-stone-400 bg-stone-50 px-1.5 py-0.5 rounded border border-stone-100">
              blog
            </span>
          </div>

          <button
            onClick={(e) => onToggleBookmark(article.slug, e)}
            className={`p-1.5 rounded-lg border transition cursor-pointer shrink-0 z-10 ${
              isBookmarked
                ? 'bg-amber-50 text-amber-700 border-amber-300'
                : 'text-stone-400 border-transparent hover:border-stone-200 hover:bg-stone-50'
            }`}
            title={isBookmarked ? 'ブックマーク解除' : 'ブックマークに保存'}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base sm:text-lg text-stone-900 leading-snug group-hover:text-emerald-800 transition">
          <a
            href={`/blog/${kotobankSlug}`}
            onClick={(e) => {
              e.preventDefault();
              onSelect(article.slug);
            }}
            className="hover:underline focus:outline-none"
          >
            {article.title}
          </a>
        </h3>

        {/* Summary */}
        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
          {article.summary}
        </p>

        {/* Tags & Kotobank-style Slug indicator */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1">
          <div className="flex flex-wrap gap-1.5">
            {article.tags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="text-[10px] text-stone-500 bg-stone-50 px-2 py-0.5 rounded border border-stone-100">
                #{tag}
              </span>
            ))}
          </div>
          <span className="text-[10px] text-stone-400 font-mono">
            {kotobankSlug}
          </span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
        <div className="flex items-center gap-1.5 text-[11px]">
          <Clock className="w-3.5 h-3.5 text-stone-400" />
          <span>読了約 {article.readingTimeMinutes} 分</span>
        </div>

        <a
          href={`/blog/${kotobankSlug}`}
          onClick={(e) => {
            e.preventDefault();
            onSelect(article.slug);
          }}
          className="flex items-center gap-1 text-emerald-800 font-semibold text-xs group-hover:translate-x-0.5 transition"
        >
          <span>ブログを読む</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
};
