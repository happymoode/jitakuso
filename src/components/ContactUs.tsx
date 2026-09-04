import React, { useState } from 'react';
import { Mail, Copy, Check, Clock, ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';

interface ContactUsProps {
  onBackToHome: () => void;
  onNavigateToPrivacy: () => void;
}

export const ContactUs: React.FC<ContactUsProps> = ({ onBackToHome, onNavigateToPrivacy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info@jitakus.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 mb-6">
        <button 
          onClick={onBackToHome}
          className="flex items-center gap-1 font-bold text-emerald-800 hover:text-emerald-900 transition cursor-pointer underline-offset-2 hover:underline"
          title="自宅総合ポータル トップへ"
        >
          <Mail className="w-4 h-4 text-emerald-700" />
          <span>自宅</span>
        </button>
        <span>/</span>
        <span className="text-stone-800 font-medium">お問い合わせ</span>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-900 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-800 border border-emerald-500/30 flex items-center justify-center text-white shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">Contact & Support</span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">お問い合わせ窓口</h1>
          </div>
        </div>
        <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
          jitakus.com へのご質問、記事内容の誤字・情報修正のご依頼、広告・タイアップ掲載のご相談、その他ご意見等は、下記公式サポートメール宛てにお気軽にお問い合わせください。
        </p>
      </div>

      {/* Main Mail Contact Card */}
      <div className="space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div>
              <h2 className="font-bold text-stone-900 text-lg flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-700" />
                公式サポート専用メールアドレス
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                下記のメールアドレス宛てに直接ご連絡いただけます。
              </p>
            </div>
          </div>

          {/* Email Display Box */}
          <div className="p-4 sm:p-5 bg-stone-50 border-2 border-emerald-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-stone-500 font-medium block">サポートメールアドレス</span>
                <span className="font-mono font-bold text-emerald-950 text-base sm:text-xl select-all tracking-wide">
                  info@jitakus.com
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopyEmail}
                type="button"
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 font-medium transition cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm"
                title="メールアドレスをコピー"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">コピー完了</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-500" />
                    <span>アドレスをコピー</span>
                  </>
                )}
              </button>

              <a
                href="mailto:info@jitakus.com?subject=%E3%80%90jitakus.com%E3%80%91%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B"
                className="flex-1 sm:flex-none px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center justify-center gap-2 shadow-sm text-center"
              >
                <ExternalLink className="w-4 h-4" />
                <span>メールを送る</span>
              </a>
            </div>
          </div>

          {/* Response & Reception Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-3">
              <Clock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-stone-900 block">受付時間</span>
                <span className="text-stone-600 leading-relaxed block">24時間 365日いつでも受付</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-stone-900 block">回答の目安</span>
                <span className="text-stone-600 leading-relaxed block">原則 2営業日以内にご返信</span>
              </div>
            </div>
          </div>

          {/* Acceptable Inquiries */}
          <div className="pt-4 border-t border-stone-100 space-y-3">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-700" />
              主な受付内容
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                <span>記事内容のご意見・誤字脱字のご指摘</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                <span>安全な内職・在宅ワーク情報の提供</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                <span>広告掲載・企業提携・タイアップのご相談</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                <span>著作権・プライバシーに関するお問い合わせ</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Privacy Policy & Terms Note */}
        <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-xs text-stone-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-stone-800">個人情報の取扱いについて</h4>
            <p className="text-stone-500 leading-relaxed max-w-xl">
              お送りいただいた個人情報は、お問い合わせ内容への確認および回答のみに利用いたします。
            </p>
          </div>
          <button
            onClick={onNavigateToPrivacy}
            className="text-emerald-800 hover:text-emerald-900 font-bold underline cursor-pointer flex items-center gap-1 shrink-0"
          >
            <span>プライバシーポリシー</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Back to Home Button */}
        <div className="text-center pt-4">
          <button
            onClick={onBackToHome}
            className="px-6 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs sm:text-sm transition cursor-pointer shadow-sm"
          >
            ← 自宅総合ポータル トップへ戻る
          </button>
        </div>
      </div>
    </div>
  );
};
