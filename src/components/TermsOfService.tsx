import React from 'react';
import { FileText, ArrowLeft, ShieldAlert, CheckCircle2, AlertTriangle, Scale, Mail } from 'lucide-react';

interface TermsOfServiceProps {
  onBackToHome: () => void;
  onNavigateToContact: () => void;
  onNavigateToPrivacy: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({
  onBackToHome,
  onNavigateToContact,
  onNavigateToPrivacy,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb navigation with anchor keyword 自宅 */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 mb-6">
        <button 
          onClick={onBackToHome}
          className="flex items-center gap-1 font-bold text-emerald-800 hover:text-emerald-900 transition cursor-pointer underline-offset-2 hover:underline"
          title="自宅総合ポータル トップへ"
        >
          <Scale className="w-4 h-4 text-emerald-700" />
          <span>自宅</span>
        </button>
        <span>/</span>
        <span className="text-stone-800 font-medium">利用規約・免責事項</span>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-stone-700 border border-stone-600 flex items-center justify-center text-stone-200">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">Terms of Service & Disclaimer</span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">利用規約および免責事項</h1>
          </div>
        </div>
        <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
          jitakus.com（以下「当サイト」）をご利用いただくにあたり、利用規約および免責事項を定めています。当サイトをご利用いただくことで、本規約に同意したものとみなされます。
        </p>
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-stone-400 gap-2">
          <span>制定日：2026年1月15日</span>
          <span>最終改定日：2026年8月18日</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="space-y-8 text-stone-800 leading-relaxed text-sm sm:text-base">
        
        {/* Section 1: 免責事項 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">1. 免責事項（情報の正確性と責任）</h2>
          </div>
          <p>
            当サイトに掲載されているコンテンツや情報につきましては、可能な限り正確な情報を掲載するよう細心の注意を払っておりますが、必ずしもその正確性、完全性、最新性、信頼性を恒久的に保証するものではありません。
          </p>
          <p>
            当サイトの情報を用いて行う一切の行為、およびそれによって生じた損害・トラブルについて、当サイトおよび運営者は一切の責任を負いかねます。
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-1.5 text-xs sm:text-sm">
              <strong className="text-stone-900 block font-bold">在宅ワーク・内職・副業に関する免責：</strong>
              <p className="text-stone-600">
                当サイトで紹介する内職の単価、作業スピード、月収目安は一般的な目安であり、特定の収入を保証するものではありません。個々の契約・お仕事の発注元とのトラブルについて当サイトは関与いたしません。契約前に必ず条件をご確認ください。
              </p>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-1.5 text-xs sm:text-sm">
              <strong className="text-stone-900 block font-bold">自宅トレーニング・運動・健康情報に関する免責：</strong>
              <p className="text-stone-600">
                当サイトに記載されている筋トレやストレッチ等の健康情報は、一般的な知識の提供を目的としたものです。持病のある方や体調に不安のある方は、必ず事前に専門医にご相談のうえ、無理のない範囲で行ってください。
              </p>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-1.5 text-xs sm:text-sm">
              <strong className="text-stone-900 block font-bold">自宅距離・所要時間シミュレーターに関する免責：</strong>
              <p className="text-stone-600">
                移動時間や距離の計算は、不動産の公正競争規約（徒歩80m=1分）や平均車速・自転車速度に基づく理論値です。実際の信号待ち、天候、道路工事、地形等の影響により実際の時間とは異なる場合があります。
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: 著作権・引用について */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <FileText className="w-5 h-5 text-emerald-700" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">2. 著作権および引用の要件</h2>
          </div>
          <p>
            当サイトで掲載しているすべての文章、画像、デザイン、レイアウト等の著作権は、当サイト（jitakus.com 編集部）または正当な権利を有する第三者に帰属します。
          </p>
          <p>
            著作権法で認められている「引用」の範囲を超えて、当サイトのコンテンツを無断で転載・複製・改変・販売することは固く禁止いたします。
          </p>
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-950 space-y-2">
            <strong className="font-bold block">当サイトの引用ルール：</strong>
            <p>
              当サイトの文章を引用する場合は、引用部分を引用符（blockquote）で明示し、当サイト名（jitakus.com）および引用元URLへのリンクを必ず記載してください。
            </p>
          </div>
        </section>

        {/* Section 3: リンクについて */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <CheckCircle2 className="w-5 h-5 text-indigo-700" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">3. リンクについて</h2>
          </div>
          <p>
            当サイトは原則としてリンクフリーです。リンクを行う場合の事前連絡や許可申請は不要です。ただし、インラインフレームでの表示や画像の直リンクなど、当サイトの独立性が損なわれる形でのリンクはご遠慮ください。
          </p>
        </section>

        {/* Section 4: 規約の変更 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <Scale className="w-5 h-5 text-stone-700" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">4. 規約の変更と準拠法</h2>
          </div>
          <p>
            当サイトは、法令の改正やサイト運営方針の変更に伴い、本規約を予告なく変更することがあります。変更後の規約は、当サイトに掲載された時点で効力を生じるものとします。
          </p>
          <p>
            本規約の解釈および適用にあたっては、日本法を準拠法とします。
          </p>
        </section>

        {/* Section 5: お問い合わせ先 */}
        <section className="bg-gradient-to-r from-stone-50 to-emerald-50 p-6 sm:p-8 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-stone-900">規約に関するお問い合わせ</h3>
            <p className="text-xs sm:text-sm text-stone-600">
              サポートメール：<span className="font-mono font-bold text-emerald-800">info@jitakus.com</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onNavigateToContact}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer"
            >
              お問い合わせへ
            </button>
            <button
              onClick={onNavigateToPrivacy}
              className="px-4 py-2 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer"
            >
              プライバシーポリシー
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
