export type ArticleCategory = 
  | 'definition'
  | 'activities'
  | 'work'
  | 'fitness'
  | 'lifestyle'
  | 'navigation';

export type NavView = 
  | ArticleCategory 
  | 'all' 
  | 'nav-tool' 
  | 'work-tool' 
  | 'ai-advisor'
  | 'privacy'
  | 'about'
  | 'contact'
  | 'terms';

export interface ArticleSection {
  heading: string;
  subheading?: string;
  content: string;
  bulletPoints?: string[];
  callout?: {
    type: 'tip' | 'warning' | 'info' | 'highlight';
    title: string;
    text: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: ArticleCategory;
  categoryName: string;
  targetKeywords: string[];
  searchVolume: string;
  kd: number;
  intent: 'Informational' | 'Commercial' | 'Navigational' | 'Transactional';
  summary: string;
  readingTimeMinutes: number;
  author: string;
  publishedDate: string;
  updatedDate: string;
  thumbnailIcon: string;
  sections: ArticleSection[];
  checklist?: string[];
  faqs?: FAQItem[];
  relatedArticleSlugs?: string[];
  tags: string[];
}

export interface KeywordCluster {
  id: string;
  name: string;
  japaneseName: string;
  mainKeyword: string;
  monthlyVolume: string;
  kd: number;
  intent: 'Informational' | 'Commercial' | 'Navigational' | 'Transactional';
  description: string;
  color: string;
  articleCount: number;
  exampleQueries: string[];
}

export interface ActivityIdea {
  id: string;
  title: string;
  category: 'relax' | 'active' | 'productive' | 'creative' | 'save' | 'study';
  categoryLabel: string;
  timeRequiredMinutes: number;
  cost: '0円' | '〜500円' | '〜2000円' | '初期投資あり';
  target: '一人' | '家族・カップル' | '誰でも';
  difficulty: '★☆☆☆☆' | '★★☆☆☆' | '★★★☆☆';
  description: string;
  steps: string[];
  proTip: string;
  iconName: string;
}

export interface WorkCategory {
  id: string;
  title: string;
  type: '内職（自宅に届く）' | '在宅ワーク（PC・スマホ）' | '自宅副業' | 'スキル販売';
  monthlyIncomeEstimate: string;
  timeFlexibility: '高（完全自由）' | '中（納期あり）' | '定時型';
  beginnerScore: number; // 1-5
  safetyNote: string;
  description: string;
  typicalTasks: string[];
  pros: string[];
  cons: string[];
}
