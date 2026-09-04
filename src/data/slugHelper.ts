/**
 * Kotobank-style Japanese Slug & Blog URL Routing Helper
 * Example: /blog/自宅-520420
 */

// Japanese Kotobank-style short slug dictionary
export const SLUG_MAP: Record<string, string> = {
  'jitaku-meaning': '自宅-520420',
  'jitaku-dekirkoto-50': 'できること-520101',
  'jitaku-hitori': '一人時間-520102',
  'jitaku-himatsubushi': '暇つぶし-520103',
  'jitaku-syumi': '趣味-520104',
  'jitaku-kantan': '簡単-520105',
  'jitaku-kaiteki': '快適-520106',
  'jitaku-shigoto-20': '仕事-520201',
  'jitaku-fukugyo-15': '副業-520202',
  'jitaku-naishoku-start': '内職始め方-520203',
  'jitaku-naishoku-todoku': '内職-520204',
  'jitaku-naishoku-sagashikata': '内職探し方-520205',
  'zaitaku-vs-naishoku': '在宅ワーク-520206',
  'jitaku-shigoto-merit-demerit': '仕事メリット-520207',
  'jitaku-undou': '運動-520301',
  'jitaku-kintore': '筋トレ-520302',
  'jitaku-yuusanso': '有酸素-520303',
  'jitaku-exercise-shizuka': '静音運動-520304',
  'jitaku-undou-merit': '運動効果-520305',
  'jitaku-stretch': 'ストレッチ-520306',
  'jitaku-undou-chuui': '運動注意点-520307',
  'jitaku-setsuyaku': '節約-520401',
  'jitaku-kyuujitsu': '休日-520402',
  'jitaku-ryouri': '料理-520403',
  'jitaku-benkyou': '勉強-520404',
  'jitaku-relax': 'リラックス-520405',
  'jitaku-kara-kyori': '距離計算-520501',
  'jitaku-kara-eki': '駅までの距離-520502',
  'koko-kara-jitaku': '自宅までの距離-520503',
  'jitaku-made-ikikata': '帰り方-520504',
  'jitaku-juusho-privacy': 'プライバシー-520505',
};

// Reverse mapping from Kotobank Japanese slug to canonical key
const REVERSE_SLUG_MAP: Record<string, string> = Object.entries(SLUG_MAP).reduce((acc, [key, val]) => {
  acc[val] = key;
  acc[encodeURIComponent(val)] = key;
  return acc;
}, {} as Record<string, string>);

/**
 * Get Kotobank Japanese style slug for an article
 * @example getJapaneseSlug('jitaku-meaning') => '自宅-520420'
 */
export function getJapaneseSlug(canonicalSlug: string): string {
  return SLUG_MAP[canonicalSlug] || canonicalSlug;
}

/**
 * Resolve any slug (Kotobank Japanese slug, URI encoded slug, or legacy English slug) to canonical article key
 * @example resolveCanonicalSlug('自宅-520420') => 'jitaku-meaning'
 * @example resolveCanonicalSlug('%E8%87%AA%E5%AE%85-520420') => 'jitaku-meaning'
 * @example resolveCanonicalSlug('jitaku-meaning') => 'jitaku-meaning'
 */
export function resolveCanonicalSlug(inputSlug: string): string {
  if (!inputSlug) return '';
  const decoded = decodeURIComponent(inputSlug).trim();

  // Check direct reverse map
  if (REVERSE_SLUG_MAP[decoded]) return REVERSE_SLUG_MAP[decoded];
  if (REVERSE_SLUG_MAP[inputSlug]) return REVERSE_SLUG_MAP[inputSlug];

  // Check direct key in SLUG_MAP
  if (SLUG_MAP[decoded]) return decoded;
  if (SLUG_MAP[inputSlug]) return inputSlug;

  // Check partial match on Japanese slug (e.g. 自宅 or 自宅-520420)
  for (const [key, jpSlug] of Object.entries(SLUG_MAP)) {
    if (jpSlug === decoded || jpSlug.startsWith(decoded) || decoded.startsWith(jpSlug)) {
      return key;
    }
  }

  return decoded;
}

/**
 * Generate full blog URL (clean Unicode slug for display & sharing)
 * @example getBlogUrl('jitaku-meaning') => '/blog/自宅-520420'
 */
export function getBlogUrl(canonicalSlug: string): string {
  const jpSlug = getJapaneseSlug(canonicalSlug);
  return `/blog/${jpSlug}`;
}
