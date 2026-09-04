import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Clock, Calendar, User, Bookmark, 
  Share2, CheckCircle2, AlertTriangle, Lightbulb, 
  Info, ChevronDown, ChevronUp, Tag, ArrowRight, Printer, Home, BookOpen 
} from 'lucide-react';
import { Article } from '../types';
import { ARTICLES } from '../data/articles';
import { getJapaneseSlug, getBlogUrl } from '../data/slugHelper';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (slug: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (slug: string) => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article,
  onBack,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const kotobankSlug = getJapaneseSlug(article.slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.slug]);

  const toggleChecklist = (idx: number) => {
    const key = `${article.slug}-${idx}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      const shareUrl = `${window.location.origin}${getBlogUrl(article.slug)}`;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Find related articles
  const relatedArticles = (article.relatedArticleSlugs || [])
    .map(slug => ARTICLES.find(a => a.slug === slug))
    .filter((a): a is Article => !!a);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Japanese Breadcrumb Navigation with anchor keyword 自宅 */}
      <nav className="flex items-center gap-1.5 text-xs text-stone-500 overflow-x-auto whitespace-nowrap py-1">
        <a 
          href="/"
          onClick={(e) => { e.preventDefault(); onBack(); }}
          className="flex items-center gap-1 font-bold text-emerald-800 hover:text-emerald-900 transition cursor-pointer underline-offset-2 hover:underline"
          title="自宅総合ポータル トップへ"
        >
          <Home className="w-3.5 h-3.5" />
          <span>自宅</span>
        </a>
        <span className="text-stone-300">/</span>
        <span className="flex items-center gap-1 text-stone-600">
          <BookOpen className="w-3 h-3" />
          <span>ブログ</span>
        </span>
        <span className="text-stone-300">/</span>
        <span className="text-stone-600">{article.categoryName}</span>
        <span className="text-stone-300">/</span>
        <span className="text-emerald-800 font-bold max-w-[200px] truncate">{kotobankSlug}</span>
      </nav>

      {/* Back Button & Top Action Controls */}
      <div className="flex items-center justify-between gap-4">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); onBack(); }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-xs font-medium text-stone-700 transition cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>記事一覧へ戻る</span>
        </a>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleBookmark(article.slug)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
              isBookmarked
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current text-amber-600" />
            <span>{isBookmarked ? '保存済み' : 'ブックマーク'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-xs font-medium text-stone-700 transition cursor-pointer shadow-xs"
            title="記事URLをコピー"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'URLコピー済' : '共有 (URL)'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition cursor-pointer hidden sm:flex shadow-xs"
            title="印刷 / PDF保存"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Article Main Header Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs">
        {/* Meta badges & Kotobank Japanese URL Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              {article.categoryName}
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-xs bg-stone-100 text-stone-600 font-medium">
              ブログ解説
            </span>
          </div>

          <span className="text-[11px] font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
            /blog/{kotobankSlug}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight tracking-tight">
          {article.title}
        </h1>

        {/* Lead / Summary */}
        <p className="text-sm sm:text-base text-stone-700 leading-relaxed bg-stone-50 p-4 sm:p-5 rounded-xl border border-stone-200/80">
          {article.summary}
        </p>

        {/* Author, Date & Reading Time */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500 border-t border-stone-100">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-stone-400" />
              <span>{article.author}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>更新日: {article.updatedDate}</span>
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>読了目安: 約 {article.readingTimeMinutes} 分</span>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      {article.sections.length > 0 && (
        <div className="bg-stone-50 rounded-2xl border border-stone-200 p-5 sm:p-6 space-y-2.5">
          <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
            目次（Contents）
          </h3>
          <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
            {article.sections.map((sec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">•</span>
                <span className="font-medium text-stone-800">{sec.heading}</span>
              </li>
            ))}
            {article.checklist && (
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">•</span>
                <span className="font-medium text-stone-800">実践チェックリスト</span>
              </li>
            )}
            {article.faqs && article.faqs.length > 0 && (
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">•</span>
                <span className="font-medium text-stone-800">よくある質問（FAQ）</span>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Main Body Content Sections */}
      <div className="space-y-8 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
        {article.sections.map((section, idx) => (
          <section key={idx} className="space-y-4 pb-6 border-b border-stone-100 last:border-0 last:pb-0">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug border-l-4 border-emerald-700 pl-3">
              {section.heading}
            </h2>

            {section.subheading && (
              <h3 className="text-base sm:text-lg font-bold text-stone-800">
                {section.subheading}
              </h3>
            )}

            <div className="text-sm sm:text-base text-stone-700 leading-relaxed whitespace-pre-line">
              {section.content}
            </div>

            {/* Bullet Points */}
            {section.bulletPoints && section.bulletPoints.length > 0 && (
              <ul className="space-y-2 bg-stone-50 p-4 sm:p-5 rounded-xl border border-stone-200/80 text-xs sm:text-sm text-stone-800">
                {section.bulletPoints.map((bp, bpIdx) => (
                  <li key={bpIdx} className="flex items-start gap-2.5">
                    <span className="text-emerald-700 font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{bp}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Table (Responsive, Beautifully Styled, No Layout Glitches) */}
            {section.table && (
              <div className="my-5 rounded-2xl border border-stone-200/90 overflow-hidden bg-white shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-full">
                    <thead className="bg-stone-100/90 text-stone-900 font-bold border-b border-stone-200">
                      <tr>
                        {section.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="py-3 px-3.5 sm:px-4 text-xs font-bold text-stone-900 leading-snug whitespace-nowrap sm:whitespace-normal">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-stone-700">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-emerald-50/40 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="py-3 px-3.5 sm:px-4 text-xs sm:text-sm leading-relaxed align-top">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Callout Box */}
            {section.callout && (
              <div className={`p-4 sm:p-5 rounded-xl border text-xs sm:text-sm space-y-1.5 ${
                section.callout.type === 'warning'
                  ? 'bg-red-50 border-red-200 text-red-900'
                  : section.callout.type === 'tip'
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                <div className="font-bold flex items-center gap-2">
                  {section.callout.type === 'warning' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                  {section.callout.type === 'tip' && <Lightbulb className="w-4 h-4 text-amber-600" />}
                  {section.callout.type === 'info' && <Info className="w-4 h-4 text-emerald-600" />}
                  <span>{section.callout.title}</span>
                </div>
                <p className="leading-relaxed">{section.callout.text}</p>
              </div>
            )}
          </section>
        ))}

        {/* Contextual In-Article 2-Way Internal Linking Box */}
        {relatedArticles.length >= 2 && (
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>関連おすすめ解説（内部リンク）</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedArticles.slice(0, 2).map((rel) => (
                <a
                  key={rel.id}
                  href={getBlogUrl(rel.slug)}
                  onClick={(e) => { e.preventDefault(); onSelectArticle(rel.slug); }}
                  className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-emerald-600 text-left transition group cursor-pointer flex flex-col justify-between hover:shadow-xs block"
                >
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {rel.categoryName}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900 mt-1.5 group-hover:text-emerald-800 line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-emerald-800 font-semibold">
                    <span>詳しく読む</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Checklist */}
        {article.checklist && article.checklist.length > 0 && (
          <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
            <h3 className="font-bold text-emerald-950 text-sm sm:text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>この記事の実践・確認チェックリスト</span>
            </h3>
            <div className="space-y-2">
              {article.checklist.map((item, idx) => {
                const key = `${article.slug}-${idx}`;
                const isChecked = !!checkedItems[key];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition cursor-pointer flex items-center gap-3 ${
                      isChecked
                        ? 'bg-white border-emerald-500 text-emerald-900 line-through opacity-80'
                        : 'bg-white/80 border-emerald-200 text-stone-800 hover:bg-white'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 ${
                      isChecked ? 'bg-emerald-700 border-emerald-700 text-white' : 'border-stone-300 bg-white'
                    }`}>
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* FAQs Accordion */}
        {article.faqs && article.faqs.length > 0 && (
          <div className="space-y-3 pt-4">
            <h3 className="font-bold text-stone-900 text-base sm:text-lg">
              よくある質問（FAQ）
            </h3>
            <div className="space-y-2">
              {article.faqs.map((faq, fIdx) => {
                const isOpen = openFaqIndex === fIdx;
                return (
                  <div key={fIdx} className="border border-stone-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                      className="w-full p-4 text-left font-bold text-xs sm:text-sm text-stone-900 flex items-center justify-between gap-3 hover:bg-stone-50 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-700 font-bold">Q.</span>
                        <span>{faq.question}</span>
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 text-xs sm:text-sm text-stone-600 bg-stone-50 border-t border-stone-100 leading-relaxed">
                        <span className="text-amber-700 font-bold mr-1">A.</span>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Target Keywords / Tag Footer */}
        <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-stone-400 mr-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              関連タグ:
            </span>
            {article.tags.map((tag, idx) => (
              <span key={idx} className="text-xs text-stone-600 bg-stone-100 px-2.5 py-1 rounded-md">
                #{tag}
              </span>
            ))}
          </div>

          {/* Single Clean Home / Blog Backlink Button */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onBack(); }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl transition cursor-pointer border border-emerald-200/60 shadow-2xs"
            title="自宅生活総合ガイド トップページへ戻る"
          >
            <Home className="w-3.5 h-3.5" />
            <span>「自宅」トップへ戻る</span>
          </a>
        </div>

        {/* Primary SEO Anchor Backlink Box to Home Page for Keyword: 自宅 */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50/90 to-stone-50 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs sm:text-sm">
              <Home className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>自宅生活・在宅ワーク総合ポータル（jitakus.com）</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              当サイトでは
              <a
                href="/"
                onClick={(e) => { e.preventDefault(); onBack(); }}
                className="font-black text-emerald-800 hover:text-emerald-950 underline underline-offset-4 decoration-2 decoration-emerald-500 mx-1 cursor-pointer inline-block"
                title="自宅 総合ポータル トップページへ"
              >
                「自宅」
              </a>
              でできること・仕事・内職・運動・暮らしの全情報を発信しています。
            </p>
          </div>
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onBack(); }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs transition"
          >
            <span>「自宅」トップへ戻る</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-stone-900 text-lg">
            あわせて読みたい関連記事
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <a
                key={rel.id}
                href={getBlogUrl(rel.slug)}
                onClick={(e) => { e.preventDefault(); onSelectArticle(rel.slug); }}
                className="bg-white rounded-xl border border-stone-200 p-4 text-left hover:border-emerald-600 hover:shadow-sm transition group cursor-pointer flex flex-col justify-between block"
              >
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {rel.categoryName}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900 mt-2 group-hover:text-emerald-800 line-clamp-2">
                    {rel.title}
                  </h4>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-emerald-800 font-medium">
                  <span>記事を読む</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
