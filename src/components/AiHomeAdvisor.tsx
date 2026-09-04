import React, { useState } from 'react';
import { Bot, Send, Sparkles, Loader2, RefreshCw, CheckCircle2 } from 'lucide-react';

export const AiHomeAdvisor: React.FC = () => {
  const [category, setCategory] = useState<string>('自宅でできること・暇つぶし');
  const [timeAvailable, setTimeAvailable] = useState<string>('30分〜1時間');
  const [budget, setBudget] = useState<string>('完全無料（0円）');
  const [mood, setMood] = useState<string>('リフレッシュ・気分転換したい');
  const [customQuery, setCustomQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const handleConsult = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setAiResponse(null);

    try {
      const res = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          timeAvailable,
          budget,
          mood,
          customQuery: customQuery.trim() || '今、自宅でできるおすすめのプランを教えてください',
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setAiResponse(data.reply);
      } else {
        setAiResponse('AIからの回答を取得できませんでした。再度お試しください。');
      }
    } catch (err: any) {
      console.error(err);
      setAiResponse('通信中にエラーが発生しました。時間をおいて再試行してください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 text-white rounded-2xl p-6 sm:p-8 border border-emerald-800/60 relative overflow-hidden shadow-md">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs font-semibold">
            <Bot className="w-3.5 h-3.5" />
            Gemini AI 搭載 自宅生活コンシェルジュ
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            あなたの今の気分と空き時間に合わせた<br className="hidden sm:inline" />
            「完全オーダーメイドの自宅プラン」をAIが即時作成
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            「マンションでできる静かな運動」「冷蔵庫の余り物でできる料理」「月1万円の安全な自宅ワーク」など、どんな質問でもお答えします。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Input Form */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs">
          <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>相談条件を指定</span>
          </h3>

          <form onSubmit={handleConsult} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-stone-700">カテゴリ</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="自宅でできること・暇つぶし">自宅でできること・暇つぶし</option>
                <option value="自宅でできる仕事・内職・副業">自宅でできる仕事・内職・副業</option>
                <option value="自宅で運動・筋トレ・静音有酸素">自宅で運動・筋トレ・静音有酸素</option>
                <option value="自宅暮らし・節約・料理・整理">自宅暮らし・節約・料理・整理</option>
                <option value="自宅からの移動・距離・ルート">自宅からの移動・距離・ルート</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700">使える時間</label>
              <select
                value={timeAvailable}
                onChange={(e) => setTimeAvailable(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="15分以内（スキマ時間）">15分以内（スキマ時間）</option>
                <option value="30分〜1時間">30分〜1時間</option>
                <option value="2〜3時間（しっかり）">2〜3時間（しっかり）</option>
                <option value="休日1日まるごと">休日1日まるごと</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700">予算・費用</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="完全無料（0円）">完全無料（0円）</option>
                <option value="〜500円（手頃）">〜500円（手頃）</option>
                <option value="〜2,000円">〜2,000円</option>
                <option value="特に制限なし">特に制限なし</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700">気分・目的</label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="リフレッシュ・気分転換したい">リフレッシュ・気分転換したい</option>
                <option value="生産性を高めたい・成長したい">生産性を高めたい・成長したい</option>
                <option value="とにかくリラックス・癒やされたい">とにかくリラックス・癒やされたい</option>
                <option value="体を動かして汗をかきたい">体を動かして汗をかきたい</option>
                <option value="お小遣い稼ぎ・収入を作りたい">お小遣い稼ぎ・収入を作りたい</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700">具体的な質問や要望（自由入力）</label>
              <textarea
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                rows={3}
                placeholder="例: ヨガマットがないけどできる筋トレは？ / 初心者向けの内職って何から始めればいい？"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>AIが最適なプランを考案中...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>AIにプランを提案してもらう</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* AI Output Display */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="font-bold text-stone-900 text-sm">自宅コンシェルジュの回答</span>
              </div>
              {aiResponse && (
                <button
                  onClick={() => handleConsult()}
                  className="text-xs text-stone-500 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>再生成</span>
                </button>
              )}
            </div>

            {loading && (
              <div className="py-16 text-center space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-700 mx-auto" />
                <p className="text-xs text-stone-500 font-medium">
                  最適なアクションとアドバイスを構築しています...
                </p>
              </div>
            )}

            {!loading && !aiResponse && (
              <div className="py-14 text-center space-y-3 bg-stone-50 rounded-xl border border-dashed border-stone-200 p-6">
                <Sparkles className="w-8 h-8 text-stone-400 mx-auto" />
                <h4 className="font-bold text-stone-800 text-sm">左側のフォームから条件を選択してください</h4>
                <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                  「今から30分でできること」「一人で集中できる趣味」「安全な内職の始め方」など、あなたの状況にぴったりの実践プランをお届けします。
                </p>
              </div>
            )}

            {!loading && aiResponse && (
              <div className="prose prose-stone text-xs sm:text-sm max-w-none text-stone-800 whitespace-pre-wrap leading-relaxed bg-stone-50 p-5 rounded-xl border border-stone-200/80">
                {aiResponse}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-stone-100 text-[11px] text-stone-400">
            ※ 回答はAI（Gemini）によって生成されており、自宅での安全な生活や作業の参考情報としてご活用ください。
          </div>
        </div>

      </div>
    </div>
  );
};
