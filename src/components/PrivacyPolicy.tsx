import React from 'react';
import { ShieldCheck, Mail, Lock, Eye, Cookie, ArrowLeft, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

interface PrivacyPolicyProps {
  onBackToHome: () => void;
  onNavigateToContact: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBackToHome, onNavigateToContact }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb navigation with anchor keyword 自宅 */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 mb-6">
        <button 
          onClick={onBackToHome}
          className="flex items-center gap-1 font-bold text-emerald-800 hover:text-emerald-900 transition cursor-pointer underline-offset-2 hover:underline"
          title="自宅総合ポータル トップへ"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>自宅</span>
        </button>
        <span>/</span>
        <span className="text-stone-800 font-medium">プライバシーポリシー</span>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-900 to-stone-900 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-700/80 border border-emerald-500/30 flex items-center justify-center text-emerald-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">Compliance & Trust</span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">プライバシーポリシー（個人情報保護方針）</h1>
          </div>
        </div>
        <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
          jitakus.com（以下「当サイト」）は、ユーザーの皆様に安心してご利用いただけるよう、個人情報の保護に関する日本の法令（個人情報の保護に関する法律）およびGoogle AdSense等の広告配信・アクセス解析ポリシーを遵守し、以下のとおりプライバシーポリシーを定めます。
        </p>
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-stone-400 gap-2">
          <span>制定日：2026年1月15日</span>
          <span>最終改定日：2026年8月18日</span>
          <span className="text-emerald-300 font-medium">運営責任者：jitakus.com 編集部</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="space-y-8 text-stone-800 leading-relaxed text-sm sm:text-base">
        
        {/* Section 1: 個人情報の収集と利用目的 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <Lock className="w-5 h-5 text-emerald-700" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">1. 個人情報の収集と利用目的</h2>
          </div>
          <p>
            当サイトでは、お問い合わせフォームのご利用時やメールでのご連絡時に、お名前（ハンドルネーム含む）やメールアドレス等の個人情報をご入力いただく場合がございます。
          </p>
          <p className="font-semibold text-stone-900">
            収集した個人情報は、以下の目的のみに使用し、目的外での利用は行いません。
          </p>
          <ul className="space-y-2 pl-2">
            <li className="flex items-start gap-2 text-stone-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
              <span>お問い合わせ・ご意見に対する回答や確認のご連絡のため</span>
            </li>
            <li className="flex items-start gap-2 text-stone-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
              <span>記事内容の正確性向上およびサイト運営の利便性向上のため</span>
            </li>
            <li className="flex items-start gap-2 text-stone-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
              <span>不正行為の防止や利用規約に違反する行為への対応のため</span>
            </li>
          </ul>
        </section>

        {/* Section 2: 広告配信について（Google AdSense） */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <Eye className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">2. 広告配信について（Google AdSense・第三者配信事業者）</h2>
          </div>
          <p>
            当サイトでは、第三者配信の広告サービス（Google AdSense 等）を利用しています。
          </p>
          <p>
            Google等の第三者広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報である「Cookie（クッキー）」（氏名、住所、メールアドレス、電話番号は含まれません）を使用することがあります。
          </p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-900 space-y-2">
            <p className="font-bold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              パーソナライズ広告の無効化（オプトアウト）について
            </p>
            <p>
              Cookieを無効にする設定およびGoogle AdSenseに関する詳細は、
              <a 
                href="https://policies.google.com/technologies/ads?hl=ja" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-700 underline font-semibold hover:text-emerald-800 ml-1"
              >
                Googleポリシーと規約「広告」
              </a>
              をご覧ください。
            </p>
            <p>
              また、ユーザーは
              <a 
                href="https://adssettings.google.com/authenticated" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-700 underline font-semibold hover:text-emerald-800 mx-1"
              >
                Googleの広告設定
              </a>
              からパーソナライズド広告を無効にできます。または、
              <a 
                href="https://www.aboutads.info/choices/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-700 underline font-semibold hover:text-emerald-800 ml-1"
              >
                www.aboutads.info
              </a>
              にアクセスして第三者配信事業者のCookieを無効化することも可能です。
            </p>
          </div>
        </section>

        {/* Section 3: アクセス解析ツールについて（Google Analytics） */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <Cookie className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">3. アクセス解析ツールについて</h2>
          </div>
          <p>
            当サイトでは、サイトの利用状況を把握し、コンテンツの改善を図るためにGoogle社が提供するアクセス解析ツール「Google Analytics」を利用する場合があります。
          </p>
          <p>
            Google Analyticsはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。ブラウザの設定でCookieを無効にすることで、トラフィックデータの収集を拒否することができます。
          </p>
          <p className="text-xs text-stone-500">
            ※Google Analyticsの利用規約およびプライバシーポリシーについては、Google社の公式サイトをご確認ください。
          </p>
        </section>

        {/* Section 4: 個人情報の第三者への開示・提供 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">4. 個人情報の第三者への開示・提供の禁止</h2>
          </div>
          <p>
            当サイトは、ユーザーよりお預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。
          </p>
          <ul className="space-y-2 pl-2">
            <li className="flex items-start gap-2 text-stone-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
              <span>ご本人の同意がある場合</span>
            </li>
            <li className="flex items-start gap-2 text-stone-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
              <span>法令に基づき開示することが必要である場合（警察・裁判所等の公的機関からの要請）</span>
            </li>
            <li className="flex items-start gap-2 text-stone-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
              <span>人の生命、身体または財産の保護のために必要がある場合</span>
            </li>
          </ul>
        </section>

        {/* Section 5: 自宅位置情報・ナビゲーション機能の取り扱い */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <FileText className="w-5 h-5 text-emerald-700" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">5. 自宅位置情報・ナビゲーション機能の取り扱い</h2>
          </div>
          <p>
            当サイトが提供する「自宅ナビ」「距離・所要時間計算シミュレーター」においてユーザーが入力した住所や出発地・目的地情報は、ユーザーのブラウザ（クライアント環境）上でのみ処理されます。
          </p>
          <p className="font-semibold text-emerald-900 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
            当サイトのサーバーにユーザーの自宅住所やGPS座標などの個人位置情報を保存・記録・追跡することは一切ございません。
          </p>
        </section>

        {/* Section 6: 免責事項 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <AlertCircle className="w-5 h-5 text-stone-700" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">6. 免責事項</h2>
          </div>
          <p>
            当サイトからのリンクやバナーなどで移動した外部サイトで提供される情報、サービス等について一切の責任を負いません。
          </p>
          <p>
            また、当サイトのコンテンツ・情報について、できる限り正確な情報を掲載するよう努めておりますが、正確性や安全性を完全に保証するものではありません。情報が古くなっていることもございます。
          </p>
          <p>
            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
          </p>
        </section>

        {/* Section 7: 著作権・肖像権 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <FileText className="w-5 h-5 text-stone-700" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">7. 著作権・肖像権について</h2>
          </div>
          <p>
            当サイトで掲載している文章や画像などにつきましては、無断転載することを禁止します。当サイトは著作権や肖像権の侵害を目的としたものではありません。著作権や肖像権に関して問題がございましたら、下記のお問い合わせ先よりご連絡ください。迅速に対応いたします。
          </p>
        </section>

        {/* Section 8: お問い合わせ先 */}
        <section className="bg-gradient-to-r from-emerald-50 to-stone-50 p-6 sm:p-8 rounded-2xl border border-emerald-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-200">
            <Mail className="w-5 h-5 text-emerald-800" />
            <h2 className="text-lg sm:text-xl font-bold text-emerald-950">8. お問い合わせ窓口（サポートメール）</h2>
          </div>
          <p className="text-stone-700">
            本プライバシーポリシーに関するご質問、個人情報の開示・訂正・削除のご請求、または記事内容に関するご指摘は、以下の公式サポート窓口までご連絡ください。
          </p>
          
          <div className="bg-white p-4 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-stone-500 font-medium">jitakus.com 公式サポートメール</div>
              <div className="text-base sm:text-lg font-mono font-bold text-emerald-800 select-all">
                info@jitakus.com
              </div>
              <div className="text-xs text-stone-500 mt-0.5">受付時間：24時間年中無休（原則2営業日以内に回答）</div>
            </div>

            <button
              onClick={onNavigateToContact}
              className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer shadow-sm flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>お問い合わせフォームへ</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
