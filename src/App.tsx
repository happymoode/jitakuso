import React, { useState, useEffect, useMemo } from 'react';
import { 
  Home, Sparkles, Briefcase, Activity, PiggyBank, 
  MapPin, Compass, Bot, Search, 
  ArrowRight, Bookmark, Layers 
} from 'lucide-react';
import { ARTICLES } from './data/articles';
import { ArticleCategory, Article, ActivityIdea, NavView } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetail } from './components/ArticleDetail';
import { DistanceNavigator } from './components/DistanceNavigator';
import { WorkMatcher } from './components/WorkMatcher';
import { ActivityRoulette } from './components/ActivityRoulette';
import { AiHomeAdvisor } from './components/AiHomeAdvisor';
import { BookmarkDrawer } from './components/BookmarkDrawer';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { AboutUs } from './components/AboutUs';
import { ContactUs } from './components/ContactUs';
import { TermsOfService } from './components/TermsOfService';
import { HomeGuideContent } from './components/HomeGuideContent';
import { getJapaneseSlug, resolveCanonicalSlug } from './data/slugHelper';

// Helper to parse path / hash into state (supports root domain & GitHub Pages subpaths)
function parseLocationToState(): { category: NavView; articleSlug: string | null } {
  let rawPath = window.location.pathname.replace(/\/+$/, '') || '/';
  let rawHash = window.location.hash.replace(/^#\/?/, '');

  // Handle GitHub Pages SPA redirection param (?p=/path)
  const urlParams = new URLSearchParams(window.location.search);
  const pParam = urlParams.get('p');
  if (pParam) {
    rawPath = pParam;
  }

  try {
    rawPath = decodeURIComponent(rawPath);
    rawHash = decodeURIComponent(rawHash);
  } catch {
    // ignore decode errors
  }

  // Check path or hash
  const effective = rawHash ? `/${rawHash}` : rawPath;

  // Blog & Article routing: /blog/:slug, /word/:slug, /article/:slug (supports subdirectories like /reponame/blog/:slug)
  const blogMatch = effective.match(/(?:^|\/)(?:blog|word|article)\/([^/?#]+)/);
  if (blogMatch) {
    const rawSlug = blogMatch[1];
    const resolvedSlug = resolveCanonicalSlug(rawSlug);
    return { category: 'all', articleSlug: resolvedSlug };
  }

  // Category routing: /category/:cat
  const categoryMatch = effective.match(/(?:^|\/)category\/([a-zA-Z0-9_-]+)/);
  if (categoryMatch) {
    const cat = categoryMatch[1] as NavView;
    return { category: cat, articleSlug: null };
  }

  // Tool routing: /tool/:toolName
  if (effective.includes('/tool/distance')) return { category: 'nav-tool', articleSlug: null };
  if (effective.includes('/tool/work')) return { category: 'work-tool', articleSlug: null };
  if (effective.includes('/tool/ai-advisor')) return { category: 'ai-advisor', articleSlug: null };

  // Static / Legal pages
  if (effective.endsWith('/about')) return { category: 'about', articleSlug: null };
  if (effective.endsWith('/privacy')) return { category: 'privacy', articleSlug: null };
  if (effective.endsWith('/terms')) return { category: 'terms', articleSlug: null };
  if (effective.endsWith('/contact')) return { category: 'contact', articleSlug: null };

  // Default Home
  return { category: 'all', articleSlug: null };
}

// Helper to push URL slug to browser history with Kotobank-style Japanese slug
function pushUrlSlug(category: NavView, articleSlug: string | null) {
  let targetPath = '/';

  if (articleSlug) {
    const jpSlug = getJapaneseSlug(articleSlug);
    targetPath = `/blog/${jpSlug}`;
  } else if (category === 'about') {
    targetPath = '/about';
  } else if (category === 'privacy') {
    targetPath = '/privacy';
  } else if (category === 'terms') {
    targetPath = '/terms';
  } else if (category === 'contact') {
    targetPath = '/contact';
  } else if (category === 'nav-tool') {
    targetPath = '/tool/distance';
  } else if (category === 'work-tool') {
    targetPath = '/tool/work';
  } else if (category === 'ai-advisor') {
    targetPath = '/tool/ai-advisor';
  } else if (category !== 'all') {
    targetPath = `/category/${category}`;
  }

  try {
    // If hosted on GitHub Pages subfolder (e.g. /my-repo/), keep base
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const hasSubfolder = pathParts.length > 0 && !['blog', 'word', 'article', 'category', 'tool', 'about', 'privacy', 'terms', 'contact'].includes(pathParts[0]);
    const basePath = hasSubfolder ? `/${pathParts[0]}` : '';
    const fullTarget = `${basePath}${targetPath}`;

    if (window.location.pathname !== fullTarget) {
      window.history.pushState({ category, articleSlug }, '', fullTarget);
    }
  } catch {
    // Fallback if pushState fails or is restricted
    try {
      window.location.hash = targetPath;
    } catch (e) {
      console.warn('Navigation state synced locally', e);
    }
  }
}

export default function App() {
  const initial = useMemo(() => parseLocationToState(), []);

  // Navigation & Category states
  const [currentCategory, setCurrentCategory] = useState<NavView>(initial.category);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(initial.articleSlug);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Browser Back / Forward and Hash navigation listener
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseLocationToState();
      setCurrentCategory(parsed.category);
      setSelectedArticleSlug(parsed.articleSlug);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Bookmarks persistence
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('jitakus_bookmarked_slugs');
      return saved ? JSON.parse(saved) : ['jitaku-meaning', 'jitaku-naishoku-todoku', 'koko-kara-jitaku'];
    } catch {
      return [];
    }
  });

  const [bookmarkedActivityIds, setBookmarkedActivityIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('jitakus_bookmarked_acts');
      return saved ? JSON.parse(saved) : ['act-1'];
    } catch {
      return [];
    }
  });

  const [bookmarkDrawerOpen, setBookmarkDrawerOpen] = useState<boolean>(false);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jitakus_bookmarked_slugs', JSON.stringify(bookmarkedSlugs));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedSlugs]);

  useEffect(() => {
    try {
      localStorage.setItem('jitakus_bookmarked_acts', JSON.stringify(bookmarkedActivityIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedActivityIds]);

  const toggleBookmark = (slug: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedSlugs(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const toggleActivityBookmark = (act: ActivityIdea) => {
    setBookmarkedActivityIds(prev => 
      prev.includes(act.id) ? prev.filter(id => id !== act.id) : [...prev, act.id]
    );
  };

  const isActivityBookmarked = (id: string) => bookmarkedActivityIds.includes(id);

  // Selected article object
  const currentArticle = useMemo(() => {
    if (!selectedArticleSlug) return null;
    return ARTICLES.find(a => a.slug === selectedArticleSlug) || null;
  }, [selectedArticleSlug]);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(art => {
      // Category filter
      if (currentCategory !== 'all' && 
          currentCategory !== 'nav-tool' && 
          currentCategory !== 'work-tool' && 
          currentCategory !== 'ai-advisor') {
        if (art.category !== currentCategory) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = art.title.toLowerCase().includes(query);
        const matchesSummary = art.summary.toLowerCase().includes(query);
        const matchesKeywords = art.targetKeywords.some(k => k.toLowerCase().includes(query));
        const matchesTags = art.tags.some(t => t.toLowerCase().includes(query));
        const matchesCategory = art.categoryName.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSummary && !matchesKeywords && !matchesTags && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [currentCategory, searchQuery]);

  // Sync document.title, meta description, and canonical dynamically for target keyword: 自宅
  useEffect(() => {
    let title = '自宅 - 仕事 運動';
    let description = '【自宅 (jitakus.com)】自宅での仕事・内職・在宅ワーク、自宅での運動・筋トレ、できることや暮らしを分かりやすく解説。安心で快適な自宅生活とおうち時間をサポートします。';
    let canonicalUrl = 'https://jitakus.com/';

    if (currentArticle) {
      title = `${currentArticle.title} | 自宅 (jitakus.com)`;
      description = currentArticle.summary 
        ? `${currentArticle.summary.slice(0, 120)}... 自宅総合ポータル jitakus.com`
        : `「${currentArticle.title}」について分かりやすく解説。自宅生活・在宅ワーク総合ポータル jitakus.com`;
      const jpSlug = getJapaneseSlug(currentArticle.slug);
      canonicalUrl = `https://jitakus.com/blog/${jpSlug}`;
    } else if (currentCategory === 'definition') {
      title = '「自宅」の意味・定義・使い方・類語の違いまとめ | 自宅 (jitakus.com)';
      description = '「自宅」の正しい意味や定義、我が家・実家・在宅・自室との違い、公的書類での使い方をわかりやすく解説。';
      canonicalUrl = 'https://jitakus.com/category/definition';
    } else if (currentCategory === 'activities') {
      title = '自宅でできること50選・一人時間の暇つぶし＆趣味 | 自宅 (jitakus.com)';
      description = '自宅でできること・休日の過ごし方・一人時間の暇つぶしアイデア50選を完全網羅。お金をかけずに楽しめるおうち時間ガイド。';
      canonicalUrl = 'https://jitakus.com/category/activities';
    } else if (currentCategory === 'work') {
      title = '自宅でできる仕事・内職・在宅ワークおすすめ一覧 | 自宅 (jitakus.com)';
      description = '自宅でできる仕事・安全な内職・手作業シール貼り・データ入力から在宅ワークの始め方と注意点を解説。';
      canonicalUrl = 'https://jitakus.com/category/work';
    } else if (currentCategory === 'fitness') {
      title = '自宅でできる運動・筋トレ・静音フィットネスまとめ | 自宅 (jitakus.com)';
      description = '自宅でできる運動・器具なし筋トレ・マンションでも安心なドタバタしない静音有酸素運動を解説。';
      canonicalUrl = 'https://jitakus.com/category/fitness';
    } else if (currentCategory === 'lifestyle') {
      title = '自宅暮らし・節約・自炊・生活改善アイデアまとめ | 自宅 (jitakus.com)';
      description = '自宅での快適な暮らし・光熱費節約・自炊料理・読書や資格勉強・断捨離で住環境を整える実践的なおうち生活ガイド。';
      canonicalUrl = 'https://jitakus.com/category/lifestyle';
    } else if (currentCategory === 'navigation') {
      title = '自宅からの距離・移動所要時間ナビゲーション | 自宅 (jitakus.com)';
      description = '自宅から1km・3km・5km・10km圏内の徒歩・自転車・車での移動時間や距離感をわかりやすく解説。';
      canonicalUrl = 'https://jitakus.com/category/navigation';
    } else if (currentCategory === 'nav-tool') {
      title = '自宅ナビ・距離所要時間計算シミュレーター | 自宅 (jitakus.com)';
      description = '自宅からの距離や移動手段別（徒歩・自転車・車・電車）の所要時間を自動計算できる無料ナビツール。';
      canonicalUrl = 'https://jitakus.com/tool/distance';
    } else if (currentCategory === 'work-tool') {
      title = '在宅ワーク・内職適性診断シミュレーター | 自宅 (jitakus.com)';
      description = 'あなたに合った自宅でできる仕事や安全な内職を1分で簡単診断できる無料ツール。';
      canonicalUrl = 'https://jitakus.com/tool/work';
    } else if (currentCategory === 'ai-advisor') {
      title = '自宅AIアドバイザー・おうち時間相談室 | 自宅 (jitakus.com)';
      description = '暇つぶし、在宅ワーク、運動、片付けなど自宅での過ごし方をAIがパーソナライズ提案。';
      canonicalUrl = 'https://jitakus.com/tool/ai-advisor';
    } else if (currentCategory === 'about') {
      title = '当サイトについて（運営者情報・編集方針） | 自宅 (jitakus.com)';
      description = '自宅生活・在宅ワーク総合ポータル「jitakus.com」の運営者情報、編集方針、信頼性への取り組み。';
      canonicalUrl = 'https://jitakus.com/about';
    } else if (currentCategory === 'privacy') {
      title = 'プライバシーポリシー | 自宅 (jitakus.com)';
      description = '自宅生活総合ポータル jitakus.com のプライバシーポリシーおよび個人情報の取り扱いについて。';
      canonicalUrl = 'https://jitakus.com/privacy';
    } else if (currentCategory === 'terms') {
      title = '利用規約・免責事項 | 自宅 (jitakus.com)';
      description = '自宅生活総合ポータル jitakus.com の利用規約および免責事項について。';
      canonicalUrl = 'https://jitakus.com/terms';
    } else if (currentCategory === 'contact') {
      title = 'お問い合わせ（サポート窓口） | 自宅 (jitakus.com)';
      description = '自宅生活総合ポータル jitakus.com へのお問い合わせ窓口（info@jitakus.com）。ご意見・ご質問はこちら。';
      canonicalUrl = 'https://jitakus.com/contact';
    }

    document.title = title;
    
    // Update meta description tag dynamically
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Update canonical link dynamically to prevent duplicate content issues
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // Update OpenGraph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

    // Send pageview to Google Analytics 4 for client-side navigation
    if (typeof window !== 'undefined' && typeof (window as unknown as { gtag?: Function }).gtag === 'function') {
      (window as unknown as { gtag: Function }).gtag('config', 'G-C7TE7VYJQL', {
        page_title: title,
        page_location: window.location.href,
        page_path: window.location.pathname + window.location.search,
      });
    }
  }, [currentArticle, currentCategory]);

  // Handler for category/page selection
  const handleSelectCategory = (cat: NavView) => {
    setCurrentCategory(cat);
    setSelectedArticleSlug(null);
    pushUrlSlug(cat, null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler for article selection
  const handleSelectArticle = (slug: string) => {
    setSelectedArticleSlug(slug);
    pushUrlSlug(currentCategory, slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-stone-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        bookmarkedCount={bookmarkedSlugs.length + bookmarkedActivityIds.length}
        onOpenBookmarks={() => setBookmarkDrawerOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {/* VIEW 1: Article Detail Page */}
        {currentArticle ? (
          <ArticleDetail
            article={currentArticle}
            onBack={() => {
              setSelectedArticleSlug(null);
              pushUrlSlug(currentCategory, null);
            }}
            onSelectArticle={handleSelectArticle}
            isBookmarked={bookmarkedSlugs.includes(currentArticle.slug)}
            onToggleBookmark={toggleBookmark}
          />
        ) : currentCategory === 'privacy' ? (
          /* VIEW: Privacy Policy (AdSense compliant) */
          <PrivacyPolicy 
            onBackToHome={() => handleSelectCategory('all')} 
            onNavigateToContact={() => handleSelectCategory('contact')} 
          />
        ) : currentCategory === 'about' ? (
          /* VIEW: About Us / 運営者情報 */
          <AboutUs 
            onBackToHome={() => handleSelectCategory('all')} 
            onNavigateToContact={() => handleSelectCategory('contact')} 
            onNavigateToPrivacy={() => handleSelectCategory('privacy')} 
          />
        ) : currentCategory === 'contact' ? (
          /* VIEW: Contact Us (info@jitakus.com) */
          <ContactUs 
            onBackToHome={() => handleSelectCategory('all')} 
            onNavigateToPrivacy={() => handleSelectCategory('privacy')} 
          />
        ) : currentCategory === 'terms' ? (
          /* VIEW: Terms of Service & Disclaimer */
          <TermsOfService 
            onBackToHome={() => handleSelectCategory('all')} 
            onNavigateToContact={() => handleSelectCategory('contact')} 
            onNavigateToPrivacy={() => handleSelectCategory('privacy')} 
          />
        ) : currentCategory === 'nav-tool' ? (
          /* VIEW 2: Distance & Commute Navigator Tool */
          <DistanceNavigator />
        ) : currentCategory === 'work-tool' ? (
          /* VIEW 3: Work & Naishoku Matcher Tool */
          <WorkMatcher onSelectArticle={handleSelectArticle} />
        ) : currentCategory === 'ai-advisor' ? (
          /* VIEW 4: AI Home Concierge */
          <AiHomeAdvisor />
        ) : (
          /* VIEW 5: Home / Category Articles Portal View */
          <div className="space-y-12">
            
            {/* Top Hero Showcase (Visible when on 'all' and no active search) */}
            {currentCategory === 'all' && !searchQuery && (
              <div className="space-y-8">
                {/* Hero Banner with Official 自宅 Logo */}
                <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 border border-stone-800 relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left Column: Headline & Content */}
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-xs">
                          <img 
                            src="/logo.svg" 
                            alt="自宅ポータル jitakus.com" 
                            className="w-4 h-4 rounded-full" 
                            width={16} 
                            height={16} 
                          />
                          <span>自宅 (jitakus.com) 総合ポータル</span>
                        </div>
                        <span className="text-[11px] text-stone-300 hidden sm:inline">
                          やさしい日本語でわかる自宅生活ガイド
                        </span>
                      </div>

                      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                        自宅でできること・自宅の仕事・運動・暮らし
                      </h1>

                      <p className="text-stone-300 text-xs sm:text-base leading-relaxed max-w-2xl">
                        「<strong>自宅</strong>で楽しく過ごしたい」「<strong>自宅</strong>に届く安全な内職」「<strong>自宅</strong>でできる静かな運動」「ここから<strong>自宅</strong>までの距離」など、毎日の自宅生活を安心・快適にする役立つ情報をやさしく解説しています。
                      </p>

                      {/* Quick Action Badges */}
                      <div className="pt-2 flex flex-wrap gap-2.5">
                        <button
                          onClick={() => handleSelectArticle('jitaku-meaning')}
                          className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                          title="自宅とは？意味と使い方"
                        >
                          <span>自宅とは？意味・使い方</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleSelectArticle('jitaku-naishoku-todoku')}
                          className="px-3.5 py-2 rounded-xl bg-amber-700 hover:bg-amber-600 text-white text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                          title="自宅に届く内職・安全ガイド"
                        >
                          <span>自宅に届く内職・仕事</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleSelectArticle('jitaku-exercise-shizuka')}
                          className="px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                          title="自宅で運動・静音トレーニング"
                        >
                          <span>自宅で静かに運動</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleSelectCategory('nav-tool')}
                          className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-indigo-300 border border-stone-700 text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-1.5"
                          title="自宅からの距離・ナビ計算ツール"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>自宅ナビ・距離計算</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Hero Logo Badge Showcase */}
                    <div className="lg:col-span-4 flex flex-col items-center justify-center">
                      <div className="relative group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="absolute -inset-1.5 bg-gradient-to-r from-red-600 to-pink-500 rounded-full blur-md opacity-30 group-hover:opacity-60 transition duration-500" />
                        <div className="relative p-2 rounded-full bg-stone-900/90 border border-stone-700/80 shadow-2xl flex flex-col items-center">
                          <img 
                            src="/logo.svg" 
                            alt="自宅公式エンブレムロゴ (桜・富士山・日の丸)" 
                            className="w-32 h-32 sm:w-40 sm:h-40 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                            width={160}
                            height={160}
                          />
                        </div>
                      </div>
                      <div className="mt-3 text-center">
                        <span className="text-[11px] font-semibold text-emerald-300 tracking-wide">
                          jitakus.com 公式シンボル
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* 5 Topic Cluster Quick Cards Grid */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-emerald-700" />
                      <span>カテゴリから探す</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                    
                    <button
                      onClick={() => handleSelectCategory('activities')}
                      className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-blue-500 hover:shadow-sm transition text-left group cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-2">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-stone-900 text-xs sm:text-sm group-hover:text-blue-700">
                          自宅でできること
                        </h3>
                        <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                          一人時間、暇つぶし、大人の趣味50選
                        </p>
                      </div>
                      <span className="text-[10px] text-blue-700 font-bold mt-2">6記事 →</span>
                    </button>

                    <button
                      onClick={() => handleSelectCategory('work')}
                      className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-amber-500 hover:shadow-sm transition text-left group cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center mb-2">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div className="flex items-center gap-1">
                          <h3 className="font-bold text-stone-900 text-xs sm:text-sm group-hover:text-amber-800">
                            自宅で仕事・内職
                          </h3>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                          自宅に届く内職、在宅ワーク、副業
                        </p>
                      </div>
                      <span className="text-[10px] text-amber-800 font-bold mt-2">7記事 →</span>
                    </button>

                    <button
                      onClick={() => handleSelectCategory('fitness')}
                      className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-teal-500 hover:shadow-sm transition text-left group cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center mb-2">
                          <Activity className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-stone-900 text-xs sm:text-sm group-hover:text-teal-800">
                          自宅で運動・筋トレ
                        </h3>
                        <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                          マンション静音有酸素、自重筋トレ
                        </p>
                      </div>
                      <span className="text-[10px] text-teal-800 font-bold mt-2">6記事 →</span>
                    </button>

                    <button
                      onClick={() => handleSelectCategory('lifestyle')}
                      className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-purple-500 hover:shadow-sm transition text-left group cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center mb-2">
                          <PiggyBank className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-stone-900 text-xs sm:text-sm group-hover:text-purple-800">
                          自宅暮らし・節約
                        </h3>
                        <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                          光熱費節約、おうち料理、休日プラン
                        </p>
                      </div>
                      <span className="text-[10px] text-purple-800 font-bold mt-2">5記事 →</span>
                    </button>

                    <button
                      onClick={() => handleSelectCategory('navigation')}
                      className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-indigo-500 hover:shadow-sm transition text-left group cursor-pointer flex flex-col justify-between col-span-2 sm:col-span-1"
                    >
                      <div>
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-800 flex items-center justify-center mb-2">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="flex items-center gap-1">
                          <h3 className="font-bold text-stone-900 text-xs sm:text-sm group-hover:text-indigo-800">
                            自宅から/自宅まで
                          </h3>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                          ここから自宅まで、駅徒歩距離計算
                        </p>
                      </div>
                      <span className="text-[10px] text-indigo-800 font-bold mt-2">5記事 →</span>
                    </button>

                  </div>
                </div>

                {/* Interactive Activity Roulette Section */}
                <div className="pt-2">
                  <ActivityRoulette 
                    onBookmarkActivity={toggleActivityBookmark}
                    isBookmarked={isActivityBookmarked}
                  />
                </div>
              </div>
            )}

            {/* Category Header or Search Header (Only shown when searching or viewing a filtered category) */}
            {(searchQuery || currentCategory !== 'all') && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                      {searchQuery
                        ? `「${searchQuery}」の検索結果`
                        : currentCategory === 'definition'
                        ? '「自宅」の定義・日本語解説'
                        : currentCategory === 'activities'
                        ? '自宅でできること・趣味・暇つぶし'
                        : currentCategory === 'work'
                        ? '自宅で仕事・副業・内職'
                        : currentCategory === 'fitness'
                        ? '自宅で運動・筋トレ・ヘルスケア'
                        : currentCategory === 'lifestyle'
                        ? '自宅暮らし・節約・学び・料理'
                        : '自宅から / 自宅まで / 移動・ナビ'}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-stone-200 text-stone-700">
                      {filteredArticles.length}件
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    {searchQuery
                      ? 'タイトル、概要、タグからマッチした記事を表示しています。'
                      : 'カテゴリに属する専門ガイド記事一覧です。'}
                  </p>
                </div>

                {/* Category quick switcher tabs */}
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {[
                    { id: 'all', label: 'すべて' },
                    { id: 'definition', label: '自宅とは' },
                    { id: 'activities', label: 'できること' },
                    { id: 'work', label: '仕事・内職' },
                    { id: 'fitness', label: '運動' },
                    { id: 'lifestyle', label: '暮らし' },
                    { id: 'navigation', label: '移動ナビ' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => handleSelectCategory(tab.id as any)}
                      className={`px-3 py-1.5 rounded-lg border font-medium transition cursor-pointer ${
                        currentCategory === tab.id
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Articles Grid Container (Only shown when searching or viewing a filtered category) */}
            {(searchQuery || currentCategory !== 'all') && (
              <div className="space-y-4">
                {filteredArticles.length === 0 ? (
                  <div className="py-20 text-center space-y-3 bg-white rounded-2xl border border-stone-200 p-8">
                    <Search className="w-10 h-10 text-stone-400 mx-auto" />
                    <h3 className="font-bold text-stone-800 text-base">該当する記事が見つかりませんでした</h3>
                    <p className="text-xs text-stone-500 max-w-sm mx-auto">
                      キーワードを変更して再検索するか、カテゴリ一覧からお探しください。
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setCurrentCategory('all');
                      }}
                      className="px-4 py-2 bg-emerald-800 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 transition cursor-pointer"
                    >
                      トップページへ戻る
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        onSelect={handleSelectArticle}
                        isBookmarked={bookmarkedSlugs.includes(article.slug)}
                        onToggleBookmark={toggleBookmark}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Comprehensive SEO Pillar Guide: Home Life, Remote Work & At-Home Living */}
            {currentCategory === 'all' && !searchQuery && (
              <HomeGuideContent 
                onSelectCategory={handleSelectCategory}
                onSelectArticle={handleSelectArticle}
              />
            )}

            {/* Bottom Callout: Home Living & AI Concierge */}
            <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                  <Bot className="w-4 h-4" />
                  <span>おうち時間の過ごし方に迷ったら</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  AI 自宅相談コンシェルジュがお答えします
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  「今日の気分に合わせた過ごし方」「おすすめの在宅ワーク」「マンションでできる静かな運動メニュー」など、あなたの状況に合わせたアイデアを瞬時にご提案します。
                </p>
              </div>

              <button
                onClick={() => handleSelectCategory('ai-advisor')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm whitespace-nowrap transition cursor-pointer shadow-sm"
              >
                AIに相談してみる →
              </button>
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Bookmarks Drawer */}
      <BookmarkDrawer
        isOpen={bookmarkDrawerOpen}
        onClose={() => setBookmarkDrawerOpen(false)}
        bookmarkedSlugs={bookmarkedSlugs}
        bookmarkedActivityIds={bookmarkedActivityIds}
        onSelectArticle={handleSelectArticle}
        onRemoveBookmark={(slug) => setBookmarkedSlugs(prev => prev.filter(s => s !== slug))}
        onRemoveActivityBookmark={(id) => setBookmarkedActivityIds(prev => prev.filter(i => i !== id))}
        onClearAll={() => {
          setBookmarkedSlugs([]);
          setBookmarkedActivityIds([]);
        }}
      />
    </div>
  );
}
