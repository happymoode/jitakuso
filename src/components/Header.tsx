import React from 'react';
import { 
  Home, Search, Compass, Briefcase, Activity, 
  Sparkles, MapPin, Bot, Menu, X, Smile,
  Info, ShieldCheck, Mail, Scale, ChevronLeft, ChevronRight
} from 'lucide-react';
import { NavView } from '../types';

interface HeaderProps {
  currentCategory: NavView;
  onSelectCategory: (view: NavView) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  bookmarkedCount?: number;
  onOpenBookmarks?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  bookmarkedCount,
  onOpenBookmarks,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const navScrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const navItems: { id: NavView; label: string; icon: any; badge?: string }[] = [
    { id: 'definition', label: '自宅とは？', icon: Smile },
    { id: 'activities', label: 'できること・趣味', icon: Sparkles },
    { id: 'work', label: '仕事・在宅ワーク', icon: Briefcase, badge: '人気' },
    { id: 'fitness', label: '運動・健康', icon: Activity },
    { id: 'navigation', label: '距離・移動ナビ', icon: MapPin },
    { id: 'nav-tool', label: 'ナビツール', icon: Compass },
    { id: 'ai-advisor', label: 'AI相談', icon: Bot },
  ];

  const checkScrollability = () => {
    const el = navScrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
    }
  };

  React.useEffect(() => {
    checkScrollability();
    const el = navScrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollability, { passive: true });
      window.addEventListener('resize', checkScrollability);
      return () => {
        el.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (navScrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      navScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (navScrollRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      navScrollRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleToggleSearch = () => {
    setIsSearchOpen(prev => {
      const next = !prev;
      if (next) {
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      return next;
    });
  };

  const getNavHref = (id: NavView) => {
    if (id === 'nav-tool') return '/tool/distance';
    if (id === 'work-tool') return '/tool/work';
    if (id === 'ai-advisor') return '/tool/ai-advisor';
    if (id === 'about') return '/about';
    if (id === 'privacy') return '/privacy';
    if (id === 'terms') return '/terms';
    if (id === 'contact') return '/contact';
    if (id === 'all') return '/';
    return `/category/${id}`;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-stone-200 text-stone-800">
      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand Logo (Always links to home) */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('all');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer"
          title="自宅 トップページへ戻る"
        >
          <img 
            src="/logo.svg" 
            alt="自宅 公式ロゴ" 
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shadow-xs group-hover:scale-105 transition-transform" 
            width={40} 
            height={40}
          />
          <div>
            <div className="font-black text-xl sm:text-2xl leading-none tracking-tight text-emerald-950 flex items-center gap-1.5 sm:gap-2">
              <span>自宅</span>
              <span className="text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 tracking-normal">ポータル</span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-stone-500 font-sans mt-0.5">安心・やさしい 自宅生活＆在宅ワーク情報</p>
          </div>
        </a>

        {/* Right action buttons: Contact, Search (Replacing AI), Hamburger Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('contact');
            }}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold transition cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-stone-500" />
            <span>お問い合わせ</span>
          </a>

          {/* Search Button (Replaces AI Button in Header) */}
          <button
            onClick={handleToggleSearch}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-semibold transition cursor-pointer ${
              isSearchOpen || searchQuery
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-emerald-800'
            }`}
            aria-label="記事を検索"
            title="記事を検索"
          >
            <Search className="w-4 h-4" />
            <span>検索</span>
          </button>

          {/* Hamburger Menu Toggle (Icon only) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 hover:border-emerald-600/30 text-stone-700 hover:text-emerald-800 transition cursor-pointer flex items-center justify-center shadow-2xs"
            aria-label="メニュー開閉"
            title="メニュー"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-800" /> : <Menu className="w-5 h-5 text-stone-700" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar (Appears when Search button is clicked or has active query) */}
      {(isSearchOpen || searchQuery) && (
        <div className="border-t border-stone-200 bg-stone-50/90 backdrop-blur px-4 py-2.5 animate-in slide-in-from-top-1">
          <div className="max-w-3xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="記事を検索（例: 内職、シール貼り、筋トレ、暇つぶし、一人時間...）"
                className="w-full pl-9 pr-8 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition shadow-xs"
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="px-3 py-2 text-xs text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 rounded-lg transition cursor-pointer font-medium"
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      {/* Category Horizontal Scrolling Navigation Bar (Smooth Scrollable on All Devices) */}
      <nav 
        aria-label="カテゴリナビゲーション"
        className="block relative bg-stone-50 border-t border-stone-200/80 shadow-2xs group select-none"
      >
        <div className="max-w-7xl mx-auto px-1 sm:px-6 relative flex items-center">
          {/* Left scroll chevron button */}
          {canScrollLeft && (
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-1 z-10 p-1.5 rounded-full bg-white/95 border border-stone-200 shadow-md text-stone-700 hover:text-emerald-800 hover:scale-110 transition cursor-pointer flex items-center justify-center"
              aria-label="左へスクロール"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Scrollable Container */}
          <div 
            ref={navScrollRef}
            onWheel={handleWheel}
            className="w-full flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1.5 px-3 text-xs sm:text-sm font-medium touch-pan-x scroll-smooth overscroll-x-contain"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentCategory === item.id;
              const href = getNavHref(item.id);
              return (
                <a
                  key={item.id}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectCategory(item.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-lg shrink-0 whitespace-nowrap transition cursor-pointer text-xs sm:text-sm ${
                    isActive
                      ? 'bg-white text-emerald-800 shadow-xs font-bold border border-stone-200 ring-1 ring-emerald-600/20'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-700' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Right scroll chevron button */}
          {canScrollRight && (
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-1 z-10 p-1.5 rounded-full bg-white/95 border border-stone-200 shadow-md text-stone-700 hover:text-emerald-800 hover:scale-110 transition cursor-pointer flex items-center justify-center"
              aria-label="右へスクロール"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </nav>

      {/* Full Hamburger Drawer Menu (Smooth Mobile Scrolling) */}
      {mobileMenuOpen && (
        <div 
          className="border-t border-stone-200 bg-white px-4 py-4 space-y-4 shadow-2xl animate-in slide-in-from-top-2 max-h-[calc(100dvh-65px)] overflow-y-auto overscroll-contain pb-24 touch-pan-y"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {/* Drawer Search Section */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              サイト内検索
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="キーワードを入力（例: 内職、暇つぶし、運動）"
                className="w-full pl-9 pr-8 py-2 bg-stone-100 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 transition"
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
            
            {/* Quick search tags */}
            <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
              <span className="text-stone-400 text-[10px] self-center">人気検索:</span>
              {['内職', '50選', '筋トレ', '節約', '距離計算'].map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    onSearchChange(tag);
                    setMobileMenuOpen(false);
                  }}
                  className="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-600 border border-stone-200 transition cursor-pointer"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Action: Home button */}
          <div className="pt-1 border-t border-stone-100">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
                onSearchChange('');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer border border-emerald-200/60"
            >
              <Home className="w-4 h-4 text-emerald-700" />
              <span>ホームトップへ戻る</span>
            </a>
          </div>

          {/* Category Navigation Items List */}
          <div className="space-y-1 pt-2 border-t border-stone-100">
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
              カテゴリ一覧
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentCategory === item.id;
              const href = getNavHref(item.id);
              return (
                <a
                  key={item.id}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectCategory(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition text-left cursor-pointer ${
                    isActive
                      ? 'bg-emerald-800 text-white font-bold shadow-xs'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-emerald-900 text-amber-300' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          {/* AI Advisor Callout in Drawer */}
          <div className="p-3 bg-stone-900 text-white rounded-xl border border-stone-800 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                <Bot className="w-3.5 h-3.5" />
                <span>AI 自宅相談コンシェルジュ</span>
              </div>
              <p className="text-[11px] text-stone-300">過ごし方や仕事の質問に即答</p>
            </div>
            <a
              href="/tool/ai-advisor"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('ai-advisor');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shrink-0 cursor-pointer"
            >
              相談する
            </a>
          </div>

          {/* Information & Legal Links */}
          <div className="pt-2 border-t border-stone-200 space-y-1">
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
              インフォメーション
            </div>
            
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('about');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-stone-700 hover:bg-stone-100 rounded-lg cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-stone-500" />
              <span>当サイトについて（運営者情報）</span>
            </a>

            <a
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('privacy');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-stone-700 hover:bg-stone-100 rounded-lg cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
              <span>プライバシーポリシー</span>
            </a>

            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('terms');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-stone-700 hover:bg-stone-100 rounded-lg cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5 text-stone-500" />
              <span>利用規約・免責事項</span>
            </a>

            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs bg-emerald-50 text-emerald-800 font-semibold rounded-lg cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-700" />
                <span>お問い合わせ (info@jitakus.com)</span>
              </div>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};


