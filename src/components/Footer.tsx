import React from 'react';
import { Mail, Info, ShieldCheck, Scale, HeartHandshake } from 'lucide-react';
import { NavView } from '../types';

interface FooterProps {
  onSelectCategory: (view: NavView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-16 pt-10 pb-10 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-stone-800">
          
          {/* Brand & Description */}
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2.5">
              <img 
                src="/logo.svg" 
                alt="自宅ポータル jitakus.com 公式ロゴ" 
                className="w-8 h-8 rounded-xl shadow-xs" 
                width={32} 
                height={32}
              />
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl text-white tracking-tight">自宅</span>
                <span className="text-stone-500 font-normal text-sm">/</span>
                <span className="font-bold text-lg text-emerald-400 tracking-tight">jitakus.com</span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              自宅生活・在宅ワーク・おうち時間を安心・快適にする総合情報ポータル。
            </p>
          </div>

          {/* Official Trust & Legal Navigation Links */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('about');
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700/60 transition cursor-pointer"
            >
              <Info className="w-4 h-4 text-emerald-400" />
              <span>当サイトについて（About Us）</span>
            </a>

            <a
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('privacy');
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700/60 transition cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>プライバシーポリシー（Privacy）</span>
            </a>

            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('terms');
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700/60 transition cursor-pointer"
            >
              <Scale className="w-4 h-4 text-stone-400" />
              <span>利用規約（Terms）</span>
            </a>

            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('contact');
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 hover:text-white border border-emerald-800/60 font-semibold transition cursor-pointer"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>お問い合わせ（Contact Us）</span>
            </a>
          </div>

        </div>

        {/* Bottom Support & Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="text-stone-400">お問い合わせメール:</span>
            <span className="font-mono text-emerald-400 font-bold select-all">info@jitakus.com</span>
          </div>

          <div>
            © {new Date().getFullYear()} jitakus.com (自宅ポータル). All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
