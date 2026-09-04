import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { ACTIVITY_IDEAS } from '../data/activities';

interface BookmarkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedSlugs: string[];
  bookmarkedActivityIds: string[];
  onSelectArticle: (slug: string) => void;
  onRemoveBookmark: (slug: string) => void;
  onRemoveActivityBookmark: (id: string) => void;
  onClearAll: () => void;
}

export const BookmarkDrawer: React.FC<BookmarkDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedSlugs,
  bookmarkedActivityIds,
  onSelectArticle,
  onRemoveBookmark,
  onRemoveActivityBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const savedArticles = bookmarkedSlugs
    .map(slug => ARTICLES.find(a => a.slug === slug))
    .filter((a): a is typeof ARTICLES[0] => !!a);

  const savedActivities = bookmarkedActivityIds
    .map(id => ACTIVITY_IDEAS.find(act => act.id === id))
    .filter((act): act is typeof ACTIVITY_IDEAS[0] => !!act);

  const totalCount = savedArticles.length + savedActivities.length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-600 fill-current" />
            <h2 className="font-bold text-stone-900 text-base">保存したブログ・アイデア</h2>
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
              {totalCount}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {totalCount === 0 ? (
            <div className="py-20 text-center space-y-3 text-stone-400">
              <Bookmark className="w-10 h-10 mx-auto stroke-1" />
              <p className="text-sm font-medium text-stone-600">保存されたアイテムはありません</p>
              <p className="text-xs text-stone-400 max-w-xs mx-auto">
                気になる記事や自宅アクティビティの「ブックマーク」ボタンを押すとここにストックされます。
              </p>
            </div>
          ) : (
            <>
              {/* Saved Articles */}
              {savedArticles.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    保存した記事（{savedArticles.length}）
                  </h3>
                  <div className="space-y-2.5">
                    {savedArticles.map((art) => (
                      <div
                        key={art.id}
                        className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-emerald-600 transition flex items-start justify-between gap-3 group"
                      >
                        <div 
                          className="flex-1 cursor-pointer"
                          onClick={() => {
                            onSelectArticle(art.slug);
                            onClose();
                          }}
                        >
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                            {art.categoryName}
                          </span>
                          <h4 className="font-bold text-xs text-stone-900 mt-1 line-clamp-2 group-hover:text-emerald-800">
                            {art.title}
                          </h4>
                          <span className="text-[11px] text-stone-400 mt-1 block">
                            読了目安: {art.readingTimeMinutes}分
                          </span>
                        </div>

                        <button
                          onClick={() => onRemoveBookmark(art.slug)}
                          className="text-stone-300 hover:text-red-600 p-1 transition cursor-pointer"
                          title="削除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Activities */}
              {savedActivities.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    保存した自宅アクティビティ（{savedActivities.length}）
                  </h3>
                  <div className="space-y-2.5">
                    {savedActivities.map((act) => (
                      <div
                        key={act.id}
                        className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white transition flex items-start justify-between gap-3"
                      >
                        <div className="flex-1">
                          <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                            {act.categoryLabel}
                          </span>
                          <h4 className="font-bold text-xs text-stone-900 mt-1">
                            {act.title}
                          </h4>
                          <span className="text-[11px] text-stone-500 mt-0.5 block font-mono">
                            ⏱ {act.timeRequiredMinutes}分 | 💰 {act.cost}
                          </span>
                        </div>

                        <button
                          onClick={() => onRemoveActivityBookmark(act.id)}
                          className="text-stone-300 hover:text-red-600 p-1 transition cursor-pointer"
                          title="削除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Actions */}
        {totalCount > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-stone-500 hover:text-red-600 transition cursor-pointer flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>すべて削除</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition cursor-pointer"
            >
              閉じる
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
