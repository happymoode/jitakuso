import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ARTICLES } from '../src/data/articles.ts';
import { getJapaneseSlug } from '../src/data/slugHelper.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const publicDir = path.resolve(rootDir, 'public');

interface RouteConfig {
  path: string; // e.g. 'privacy' or 'blog/自宅-520420'
  title: string;
  description: string;
  canonicalUrl: string;
  heading?: string;
  contentHtml?: string;
  changefreq?: string;
  priority?: string;
}

const STATIC_ROUTES: RouteConfig[] = [
  {
    path: '',
    title: '自宅 - 仕事・運動・できること総合ガイド | jitakus.com',
    description: '【自宅 (jitakus.com)】自宅での仕事・内職・在宅ワーク、自宅での運動・筋トレ、できることや暮らしを分かりやすく解説。安心で快適な自宅生活とおうち時間をサポートします。',
    canonicalUrl: 'https://www.jitakus.com/',
    heading: '自宅 - 仕事・運動・できること総合ガイド (jitakus.com)',
    contentHtml: '<p>自宅での仕事・内職・在宅ワーク、自宅での運動・筋トレ、できることや暮らしを分かりやすく解説する総合情報ポータル。</p>',
    changefreq: 'daily',
    priority: '1.0',
  },
  {
    path: 'privacy',
    title: 'プライバシーポリシー | 自宅 (jitakus.com)',
    description: 'jitakus.com（自宅総合ポータル）のプライバシーポリシーです。個人情報の保護、Cookie利用、アクセス解析、広告配信（Google AdSense等）に関する方針を明記しています。',
    canonicalUrl: 'https://www.jitakus.com/privacy',
    heading: 'プライバシーポリシー（Privacy Policy）',
    contentHtml: '<p>jitakus.com（以下「当サイト」）における個人情報の保護方針、Cookieの使用、アクセス解析ツール、広告配信（Google AdSense等）に関する利用規約を定めています。</p>',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: 'about',
    title: '当サイトについて（運営者情報） | 自宅 (jitakus.com)',
    description: 'jitakus.com（自宅総合ポータル）のサイト概要、運営理念、編集方針、サポート窓口についてご案内します。',
    canonicalUrl: 'https://www.jitakus.com/about',
    heading: '当サイトについて（運営者情報・編集方針）',
    contentHtml: '<p>jitakus.comは、自宅での生活・在宅ワーク・運動・趣味・暮らしを豊かにするための実用的な情報を提供する総合情報ポータルサイトです。</p>',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: 'contact',
    title: 'お問い合わせ | 自宅 (jitakus.com)',
    description: 'jitakus.com（自宅総合ポータル）のお問い合わせ窓口です。ご質問、情報提供、取材依頼、広告掲載などのご連絡はこちらから。',
    canonicalUrl: 'https://www.jitakus.com/contact',
    heading: 'お問い合わせ（Contact Us）',
    contentHtml: '<p>当サイトに関するご意見・ご質問・情報提供・広告掲載のお問い合わせは info@jitakus.com までお気軽にご連絡ください。</p>',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: 'terms',
    title: '利用規約・免責事項 | 自宅 (jitakus.com)',
    description: 'jitakus.com（自宅総合ポータル）の利用規約および免責事項を掲載しています。',
    canonicalUrl: 'https://www.jitakus.com/terms',
    heading: '利用規約および免責事項',
    contentHtml: '<p>当サイトのご利用にあたっての利用規約、著作権、免責事項について定めています。</p>',
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    path: 'category/definition',
    title: '「自宅」の意味・定義・使い方まとめ | 自宅 (jitakus.com)',
    description: '「自宅」の正しい意味や定義、家・実家・在宅・自室との違い、公的書類での使い方をわかりやすく解説。',
    canonicalUrl: 'https://www.jitakus.com/category/definition',
    heading: '「自宅」の意味・定義・公的書類での使い方',
    contentHtml: '<p>「自宅」という言葉の正確な意味、法的な定義、家・実家・在宅との違い、書類記入時の注意点などを詳しく解説しています。</p>',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: 'category/activities',
    title: '自宅でできること・おうち時間の過ごし方 | 自宅 (jitakus.com)',
    description: '自宅でできること・休日の過ごし方・一人時間の暇つぶしアイデア50選を完全網羅。お金をかけずに楽しめるおうち時間ガイド。',
    canonicalUrl: 'https://www.jitakus.com/category/activities',
    heading: '自宅でできること・趣味・暇つぶしアイデアまとめ',
    contentHtml: '<p>お金をかけずに0円でできるおうち時間の過ごし方、インドア趣味、リフレッシュ法、スキルの習得アイデアをご紹介します。</p>',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: 'category/work',
    title: '自宅でできる仕事・内職・在宅ワーク完全ガイド | 自宅 (jitakus.com)',
    description: '自宅に届く安全な内職、在宅ワーク、シール貼り、初心者向け副業の始め方や探し方を徹底解説。',
    canonicalUrl: 'https://www.jitakus.com/category/work',
    heading: '自宅でできる仕事・在宅ワーク・安全な内職ガイド',
    contentHtml: '<p>自宅に届く手作業内職、パソコンやスマホを使ったリモートワーク、安全な副業の探し方と注意点を詳しく解説。</p>',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: 'category/fitness',
    title: '自宅での運動・静音トレーニング・筋トレ | 自宅 (jitakus.com)',
    description: 'マンションでも響かない静音有酸素運動、器具なし自重筋トレ、毎日のストレッチ習慣化ガイド。',
    canonicalUrl: 'https://www.jitakus.com/category/fitness',
    heading: '自宅での運動・静音宅トレ・自重筋トレガイド',
    contentHtml: '<p>マンションやアパートでも階下に響かない静音トレーニング、自重筋トレ、ストレッチの習慣化をサポートします。</p>',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: 'category/lifestyle',
    title: '自宅暮らし・節約・おうちご飯 | 自宅 (jitakus.com)',
    description: '自宅でのおうち時間充実法、電気代・光熱費節約術、簡単自炊料理、休日のリラックス習慣まとめ。',
    canonicalUrl: 'https://www.jitakus.com/category/lifestyle',
    heading: '自宅暮らし・光熱費節約・自炊料理ガイド',
    contentHtml: '<p>おうち時間を快適にする節約術、電気代・ガス代の見直し、簡単時短料理、心地よい住環境づくりの知恵。</p>',
    changefreq: 'weekly',
    priority: '0.8',
  },
  {
    path: 'category/navigation',
    title: '自宅からの距離・移動ナビ・帰り方計算 | 自宅 (jitakus.com)',
    description: '「ここから自宅までの距離」「最寄り駅までの徒歩分数」「帰り道のルート計算」など、自宅まわりの距離ナビゲーション。',
    canonicalUrl: 'https://www.jitakus.com/category/navigation',
    heading: '自宅からの距離・所要時間・駅徒歩計算ナビ',
    contentHtml: '<p>ここから自宅までの直線距離・徒歩所要時間・自転車や車の移動時間を簡単にシミュレーションできます。</p>',
    changefreq: 'weekly',
    priority: '0.8',
  },
  {
    path: 'tool/distance',
    title: '自宅距離計算シミュレーター | 自宅 (jitakus.com)',
    description: '現在地や特定地点から自宅までの距離と徒歩・自転車・車での所要時間を瞬時に算出する計算ツール。',
    canonicalUrl: 'https://www.jitakus.com/tool/distance',
    heading: '自宅距離計算シミュレーター',
    contentHtml: '<p>現在地から自宅までの直線距離や移動所要時間をブラウザ上で安全に算出する無料ツールです。</p>',
    changefreq: 'weekly',
    priority: '0.8',
  },
];

function getArticleContentHtml(article: typeof ARTICLES[0]): string {
  const sectionsHtml = (article.sections || []).map((sec) => `
    <section style="margin-top:1.5rem;">
      <h2 style="font-size:1.25rem;font-weight:bold;margin-bottom:0.5rem;color:#1c1917;">${sec.heading}</h2>
      <p style="line-height:1.75;color:#44403c;">${sec.content}</p>
      ${sec.bulletPoints ? `<ul style="margin:0.75rem 0;padding-left:1.5rem;">${sec.bulletPoints.map(bp => `<li style="margin-bottom:0.35rem;line-height:1.6;">${bp}</li>`).join('')}</ul>` : ''}
    </section>
  `).join('');

  const faqsHtml = (article.faqs && article.faqs.length > 0) ? `
    <section style="margin-top:2rem;padding-top:1.5rem;border-top:1px solid #e7e5e4;">
      <h2 style="font-size:1.25rem;font-weight:bold;margin-bottom:1rem;color:#1c1917;">よくある質問（FAQ）</h2>
      ${article.faqs.map(faq => `
        <div style="margin-bottom:1rem;padding:0.75rem 1rem;background:#f5f5f4;border-radius:0.5rem;">
          <h3 style="font-size:1rem;font-weight:bold;color:#047857;margin-bottom:0.25rem;">Q. ${faq.question}</h3>
          <p style="margin:0;color:#44403c;font-size:0.95rem;line-height:1.6;">A. ${faq.answer}</p>
        </div>
      `).join('')}
    </section>
  ` : '';

  return `
    <article>
      <p style="font-size:1.1rem;color:#44403c;margin-bottom:1.5rem;background:#f5f5f4;padding:1rem;border-radius:0.5rem;border-left:4px solid #047857;"><strong>概要:</strong> ${article.summary}</p>
      ${sectionsHtml}
      ${faqsHtml}
    </article>
  `;
}

// Add article routes
const articleRoutes: RouteConfig[] = ARTICLES.map((article) => {
  const jpSlug = getJapaneseSlug(article.slug);
  return {
    path: `blog/${jpSlug}`,
    title: `${article.title} | 自宅 (jitakus.com)`,
    description: article.summary
      ? `${article.summary.slice(0, 120)}... 自宅 (jitakus.com)`
      : `「${article.title}」について分かりやすく解説。自宅 (jitakus.com)`,
    canonicalUrl: `https://www.jitakus.com/blog/${jpSlug}`,
    heading: article.title,
    contentHtml: getArticleContentHtml(article),
    changefreq: 'weekly',
    priority: '0.9',
  };
});

const allRoutes = [...STATIC_ROUTES, ...articleRoutes];

function getJsonLdForRoute(route: RouteConfig): string {
  // Find if this is an article
  const foundArticle = ARTICLES.find(a => {
    const jpSlug = getJapaneseSlug(a.slug);
    return route.path === `blog/${jpSlug}` || route.path === `articles/${a.slug}` || route.path === `blog/${a.slug}`;
  });

  if (foundArticle) {
    const jpSlug = getJapaneseSlug(foundArticle.slug);
    const articleUrl = `https://www.jitakus.com/blog/${jpSlug}`;
    
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": foundArticle.title,
      "description": foundArticle.summary,
      "url": articleUrl,
      "datePublished": `${foundArticle.publishedDate}T09:00:00+09:00`,
      "dateModified": `${foundArticle.updatedDate}T12:00:00+09:00`,
      "author": {
        "@type": "Organization",
        "name": "自宅 (jitakus.com) 編集部",
        "url": "https://www.jitakus.com/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "自宅 (jitakus.com)",
        "url": "https://www.jitakus.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.jitakus.com/logo.svg"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": articleUrl
      },
      "articleSection": foundArticle.categoryName,
      "keywords": (foundArticle.targetKeywords || []).join(', ')
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "自宅",
          "item": "https://www.jitakus.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": foundArticle.categoryName,
          "item": `https://www.jitakus.com/category/${foundArticle.category}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": foundArticle.title,
          "item": articleUrl
        }
      ]
    };

    let faqSchema = null;
    if (foundArticle.faqs && foundArticle.faqs.length > 0) {
      faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": foundArticle.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };
    }

    const schemas = [articleSchema, breadcrumbSchema];
    if (faqSchema) schemas.push(faqSchema);

    return schemas.map(s => `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`).join('\n');
  }

  return '';
}

function generateHtmlForRoute(templateHtml: string, route: RouteConfig): string {
  let html = templateHtml;

  // Replace title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[\s\S]*?"\s*\/?>/i,
    `<meta name="description" content="${route.description.replace(/"/g, '&quot;')}" />`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[\s\S]*?"\s*\/?>/i,
    `<link rel="canonical" href="${route.canonicalUrl}" />`
  );

  // Replace OpenGraph Title & URL
  html = html.replace(
    /<meta property="og:title" content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:title" content="${route.title.replace(/"/g, '&quot;')}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:url" content="${route.canonicalUrl}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:description" content="${route.description.replace(/"/g, '&quot;')}" />`
  );

  // Replace Twitter Card Title
  html = html.replace(
    /<meta name="twitter:title" content="[\s\S]*?"\s*\/?>/i,
    `<meta name="twitter:title" content="${route.title.replace(/"/g, '&quot;')}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[\s\S]*?"\s*\/?>/i,
    `<meta name="twitter:description" content="${route.description.replace(/"/g, '&quot;')}" />`
  );

  // Inject Route-specific JSON-LD Structured Data
  const jsonLd = getJsonLdForRoute(route);
  if (jsonLd) {
    html = html.replace('</head>', `${jsonLd}\n</head>`);
  }

  // Inject Pre-rendered SEO crawl content inside root div so crawlers read it instantly
  if (route.heading || route.contentHtml) {
    const preRenderContent = `
    <main style="max-width:800px;margin:2rem auto;padding:1rem;font-family:sans-serif;">
      <h1 style="font-size:1.75rem;font-weight:bold;color:#1c1917;margin-bottom:1rem;">${route.heading || route.title}</h1>
      <div style="font-size:1rem;line-height:1.7;color:#44403c;">${route.contentHtml || `<p>${route.description}</p>`}</div>
      <nav style="margin-top:2rem;padding-top:1rem;border-top:1px solid #e7e5e4;">
        <a href="/" style="color:#047857;margin-right:1rem;font-weight:bold;">自宅 - ホーム</a>
        <a href="/category/definition" style="color:#047857;margin-right:1rem;">自宅とは</a>
        <a href="/category/activities" style="color:#047857;margin-right:1rem;">できること</a>
        <a href="/category/work" style="color:#047857;margin-right:1rem;">在宅ワーク</a>
        <a href="/category/fitness" style="color:#047857;margin-right:1rem;">運動・筋トレ</a>
        <a href="/category/lifestyle" style="color:#047857;margin-right:1rem;">暮らし・節約</a>
        <a href="/category/navigation" style="color:#047857;margin-right:1rem;">自宅からの距離</a>
        <a href="/privacy" style="color:#047857;margin-right:1rem;">プライバシー</a>
        <a href="/contact" style="color:#047857;">お問い合わせ</a>
      </nav>
    </main>`;

    html = html.replace(
      /<div id="root">[\s\S]*?<\/div>/i,
      `<div id="root">${preRenderContent}</div>`
    );
  }

  return html;
}

export function generateStaticFiles() {
  if (!fs.existsSync(distDir)) {
    console.error('Dist directory does not exist! Please run build first.');
    return;
  }

  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html does not exist!');
    return;
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf-8');
  console.log(`Generating static route HTML files for ${allRoutes.length} routes...`);

  // Ensure directories and generate index.html in each route directory
  for (const route of allRoutes) {
    if (!route.path) continue; // Root is already dist/index.html

    const routeDir = path.join(distDir, route.path);
    fs.mkdirSync(routeDir, { recursive: true });

    const htmlContent = generateHtmlForRoute(templateHtml, route);
    fs.writeFileSync(path.join(routeDir, 'index.html'), htmlContent, 'utf-8');

    // Also write encoded variant if non-ASCII (for direct URI encoded crawlers)
    const encodedPath = route.path.split('/').map(segment => encodeURIComponent(segment)).join('/');
    if (encodedPath !== route.path) {
      const encodedRouteDir = path.join(distDir, encodedPath);
      fs.mkdirSync(encodedRouteDir, { recursive: true });
      fs.writeFileSync(path.join(encodedRouteDir, 'index.html'), htmlContent, 'utf-8');
    }
  }

  // Also create aliases for article canonical slugs (e.g. /articles/jitaku-meaning, /blog/jitaku-meaning)
  for (const article of ARTICLES) {
    const articleRoute: RouteConfig = {
      path: `articles/${article.slug}`,
      title: `${article.title} | 自宅 (jitakus.com)`,
      description: article.summary || article.title,
      canonicalUrl: `https://www.jitakus.com/blog/${getJapaneseSlug(article.slug)}`,
      heading: article.title,
      contentHtml: getArticleContentHtml(article),
    };
    const htmlContent = generateHtmlForRoute(templateHtml, articleRoute);

    const dir1 = path.join(distDir, 'articles', article.slug);
    fs.mkdirSync(dir1, { recursive: true });
    fs.writeFileSync(path.join(dir1, 'index.html'), htmlContent, 'utf-8');

    const dir2 = path.join(distDir, 'blog', article.slug);
    fs.mkdirSync(dir2, { recursive: true });
    fs.writeFileSync(path.join(dir2, 'index.html'), htmlContent, 'utf-8');
  }

  // Ensure .nojekyll, robots.txt, CNAME are properly present
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '', 'utf-8');
  fs.writeFileSync(path.join(publicDir, '.nojekyll'), '', 'utf-8');

  // Generate XML Sitemap
  const today = new Date().toISOString().split('T')[0];
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (r) => `  <url>
    <loc>${r.canonicalUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq || 'weekly'}</changefreq>
    <priority>${r.priority || '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');

  console.log('✅ Static route HTML files and sitemap.xml generated successfully!');
}

generateStaticFiles();
