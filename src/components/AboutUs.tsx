import React from 'react';
import { Home, ArrowLeft, Users, Target, BookOpen, ShieldCheck, Mail, CheckCircle2, Award, ExternalLink } from 'lucide-react';

interface AboutUsProps {
  onBackToHome: () => void;
  onNavigateToContact: () => void;
  onNavigateToPrivacy: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onBackToHome, onNavigateToContact, onNavigateToPrivacy }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb navigation with anchor keyword 自宅 */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 mb-6">
        <button 
          onClick={onBackToHome}
          className="flex items-center gap-1 font-bold text-emerald-800 hover:text-emerald-900 transition cursor-pointer underline-offset-2 hover:underline"
          title="自宅総合ポータル トップへ"
        >
          <Home className="w-4 h-4" />
          <span>自宅</span>
        </button>
        <span>/</span>
        <span className="text-stone-800 font-medium">当サイトについて（運営者情報）</span>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-stone-900 via-emerald-950 to-stone-900 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-800 border border-emerald-600/50 flex items-center justify-center font-bold text-xl text-white">
            宅
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">About jitakus.com</span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">当サイトについて・運営者情報</h1>
          </div>
        </div>
        <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
          jitakus.comは、「自宅で過ごす時間をより豊かに、安心・安全に、そして楽しく」をコンセプトに、在宅ワークや内職、おうち時間の趣味や運動、自宅周辺の移動計算まで、自宅にまつわるあらゆる役立つ情報をわかりやすく発信する総合ポータルサイトです。
        </p>
      </div>

      {/* Body Sections */}
      <div className="space-y-8 text-stone-800 leading-relaxed text-sm sm:text-base">
        
        {/* Mission & Purpose */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <Target className="w-5 h-5 text-emerald-700" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">サイトのミッション・目的</h2>
          </div>
          <p>
            近年のライフスタイルの変化に伴い、自宅で過ごす時間、自宅で働く機会、自宅で趣味や運動を楽しむ人々が急増しています。しかし一方で、インターネット上には「怪しい在宅ワークや内職詐欺」や「難解で専門用語ばかりの情報」が多く存在しています。
          </p>
          <p>
            <strong>jitakus.com</strong>は、誰でも（小学生のお子様からシニア世代まで）安心して理解できるように、<strong>「やさしい日本語」「具体的で実践的な手順」「安全性の徹底確認」</strong>を基準にコンテンツを制作・提供しています。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-bold text-stone-900 text-sm">やさしい解説</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                難しい専門用語を使わず、3年生でも理解できる明瞭な日本語で解説します。
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-bold text-stone-900 text-sm">安全第一の内職ガイド</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                高額な初期費用を請求する悪質商法の見分け方や安全な公的相談窓口を明記します。
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-bold text-stone-900 text-sm">プライバシー完全配慮</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                自宅ナビや距離計算機能はすべて端末内計算。自宅住所データをサーバーに保存しません。
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Policy */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">編集方針・コンテンツ制作基準</h2>
          </div>
          <p>
            当サイトで発信する記事は、以下の基準を厳守して執筆・校正・更新を行っています。
          </p>

          <ul className="space-y-3 pl-2">
            <li className="flex items-start gap-2.5 text-stone-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <strong className="text-stone-900">公的機関・一次情報の参照：</strong>
                <span className="text-stone-600">
                  厚生労働省（家内労働法）、消費者庁（特定商取引法・副業詐欺対策）、日本道路交通情報センター等の公的機関の一次情報を精査して記事を作成しています。
                </span>
              </div>
            </li>
            <li className="flex items-start gap-2.5 text-stone-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <strong className="text-stone-900">定期的な情報の更新：</strong>
                <span className="text-stone-600">
                  制度やサービス内容の変更に合わせ、記事の定期的な見直しとアップデートを行っています。
                </span>
              </div>
            </li>
            <li className="flex items-start gap-2.5 text-stone-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <strong className="text-stone-900">誤解を招く誇大広告の排除：</strong>
                <span className="text-stone-600">
                  「誰でも簡単に月100万円」といった非現実的な誇大広告や怪しい案件を一切排除し、現実的な単価や所要時間を客観的に伝えます。
                </span>
              </div>
            </li>
          </ul>
        </section>

        {/* Site Profile Table */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <Users className="w-5 h-5 text-emerald-700" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">運営者情報（サイト概要）</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <tbody>
                <tr className="border-b border-stone-200">
                  <th className="py-3 px-4 bg-stone-100 text-stone-700 font-semibold w-1/3">サイト名</th>
                  <td className="py-3 px-4 text-stone-900">jitakus.com（自宅生活総合ポータル）</td>
                </tr>
                <tr className="border-b border-stone-200">
                  <th className="py-3 px-4 bg-stone-100 text-stone-700 font-semibold">サイトURL</th>
                  <td className="py-3 px-4 text-emerald-800 font-mono">https://jitakus.com</td>
                </tr>
                <tr className="border-b border-stone-200">
                  <th className="py-3 px-4 bg-stone-100 text-stone-700 font-semibold">運営者 / 編集組織</th>
                  <td className="py-3 px-4 text-stone-900">jitakus.com 編集部（Jitakus Editorial Board）</td>
                </tr>
                <tr className="border-b border-stone-200">
                  <th className="py-3 px-4 bg-stone-100 text-stone-700 font-semibold">サポート・お問い合わせ窓口</th>
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-emerald-800">info@jitakus.com</span>
                  </td>
                </tr>
                <tr className="border-b border-stone-200">
                  <th className="py-3 px-4 bg-stone-100 text-stone-700 font-semibold">主要コンテンツ</th>
                  <td className="py-3 px-4 text-stone-700 leading-relaxed">
                    自宅の意味・定義、自宅でできること・趣味・暇つぶし、在宅ワーク・内職（シール貼り・袋詰め等）安全ガイド、自宅トレーニング・健康、節約術、自宅ナビ・距離計算シミュレーター
                  </td>
                </tr>
                <tr className="border-b border-stone-200">
                  <th className="py-3 px-4 bg-stone-100 text-stone-700 font-semibold">準拠法令・ポリシー</th>
                  <td className="py-3 px-4 text-stone-700">
                    日本国個人情報保護法、Google AdSense プログラムポリシー、著作権法
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-gradient-to-r from-emerald-50 to-stone-100 p-6 sm:p-8 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1">
            <h3 className="font-bold text-base sm:text-lg text-emerald-950">記事に関するご意見・ご質問はこちら</h3>
            <p className="text-xs sm:text-sm text-stone-600">
              記事内容の修正依頼、誤字脱字のご指摘、取材・メディア掲載に関するご連絡は下記窓口までお気軽にどうぞ。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onBackToHome}
              className="px-4 py-2.5 bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-800 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-1.5"
            >
              <Home className="w-4 h-4" />
              <span>「自宅」トップへ</span>
            </button>
            <button
              onClick={onNavigateToContact}
              className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>お問い合わせ窓口</span>
            </button>
            <button
              onClick={onNavigateToPrivacy}
              className="px-4 py-2.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer"
            >
              <span>プライバシーポリシー</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
