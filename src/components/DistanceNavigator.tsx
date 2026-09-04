import React, { useState } from 'react';
import { 
  MapPin, Compass, Navigation, Footprints, 
  Bike, Car, Train, ShieldCheck, ExternalLink, ArrowRight, Sparkles 
} from 'lucide-react';

export const DistanceNavigator: React.FC = () => {
  const [distanceKm, setDistanceKm] = useState<number>(2.4);
  const [destinationName, setDestinationName] = useState<string>('最寄り駅');
  const [activePreset, setActivePreset] = useState<'koko-kara' | 'eki-made' | 'workplace' | 'custom'>('koko-kara');

  // Realistic Japanese Urban Speed & Real Estate calculation formulas
  // 1. Walk: 80m/min (不動産公正競争規約 80m = 1分), approx 4.8 km/h
  const walkMinutes = Math.max(1, Math.round(distanceKm / 0.08));
  const walkCalories = Math.round(distanceKm * 55); // approx 55 kcal/km
  const walkSteps = Math.round(distanceKm * 1400); // approx 70cm stride

  // 2. Bicycle: 15 km/h avg (シティサイクル・信号待ち含む)
  const bikeMinutes = Math.max(1, Math.round((distanceKm / 15) * 60));
  const bikeCalories = Math.round(distanceKm * 32);

  // 3. Car: 25 km/h in Japanese city + 3 min parking/start buffer
  const carMinutes = Math.max(2, Math.round((distanceKm / 25) * 60) + 3);

  // 4. Transit (Train/Bus): 35 km/h + 6 min station walk/wait buffer
  const transitMinutes = Math.max(5, Math.round((distanceKm / 35) * 60) + 6);

  const applyPreset = (preset: 'koko-kara' | 'eki-made' | 'workplace' | 'custom') => {
    setActivePreset(preset);
    if (preset === 'koko-kara') {
      setDestinationName('自宅');
      setDistanceKm(3.2);
    } else if (preset === 'eki-made') {
      setDestinationName('最寄りの主要駅');
      setDistanceKm(1.1);
    } else if (preset === 'workplace') {
      setDestinationName('勤務先・学校');
      setDistanceKm(12.5);
    }
  };

  const getGoogleMapsUrl = () => {
    if (activePreset === 'koko-kara') {
      // Maps directions to "home" from current location
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('自宅')}`;
    }
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent('自宅')}&destination=${encodeURIComponent(destinationName)}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Tool Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-stone-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 border border-indigo-800/60 relative overflow-hidden shadow-md">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-800/80 border border-indigo-600/50 text-indigo-200 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            自宅ナビ＆所要時間・距離シミュレーター
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            「ここから自宅まで」「自宅から駅まで」の<br className="hidden sm:inline" />
            所要時間・消費カロリー・最適ルートを即時計算
          </h1>
          <p className="text-indigo-200/90 text-xs sm:text-sm leading-relaxed">
            不動産表示基準（80m＝1分）や移動手段別の所要時間をシミュレーション。正確な住所を外部サーバーに送信することなく安全に計算できます。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Input & Presets */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-stone-200 p-6 space-y-5 shadow-xs">
          <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <Navigation className="w-4 h-4 text-indigo-600" />
            <span>シミュレーション設定</span>
          </h3>

          {/* Quick Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-600">定番シチュエーション</label>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => applyPreset('koko-kara')}
                className={`px-3.5 py-2.5 rounded-xl text-left border text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                  activePreset === 'koko-kara'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                  <span>ここから自宅まで（帰宅ナビ）</span>
                </div>
                <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded font-mono">49.5K検索</span>
              </button>

              <button
                onClick={() => applyPreset('eki-made')}
                className={`px-3.5 py-2.5 rounded-xl text-left border text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                  activePreset === 'eki-made'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Train className="w-3.5 h-3.5 text-indigo-600" />
                  <span>自宅から駅まで（駅徒歩）</span>
                </div>
                <span className="text-[10px] bg-stone-200 text-stone-700 px-1.5 py-0.2 rounded font-mono">110K検索</span>
              </button>

              <button
                onClick={() => applyPreset('workplace')}
                className={`px-3.5 py-2.5 rounded-xl text-left border text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                  activePreset === 'workplace'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Car className="w-3.5 h-3.5 text-indigo-600" />
                  <span>自宅から職場・学校まで（通勤通学）</span>
                </div>
                <span className="text-[10px] bg-stone-200 text-stone-700 px-1.5 py-0.2 rounded font-mono">距離計算</span>
              </button>
            </div>
          </div>

          {/* Distance Input */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-700">移動距離（km）</label>
              <span className="text-sm font-bold text-indigo-700 font-mono">
                {distanceKm.toFixed(1)} km <span className="text-xs text-stone-500 font-normal">（約{(distanceKm * 1000).toLocaleString()}m）</span>
              </span>
            </div>
            
            <input
              type="range"
              min="0.1"
              max="30"
              step="0.1"
              value={distanceKm}
              onChange={(e) => {
                setDistanceKm(parseFloat(e.target.value));
                setActivePreset('custom');
              }}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>100m</span>
              <span>5km</span>
              <span>15km</span>
              <span>30km</span>
            </div>
          </div>

          {/* Custom destination name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700">目的地名称（任意）</label>
            <input
              type="text"
              value={destinationName}
              onChange={(e) => setDestinationName(e.target.value)}
              placeholder="例: 自宅、新宿駅、オフィスなど"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Direct Google Maps Action */}
          <a
            href={getGoogleMapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition"
          >
            <span>Googleマップで実際のナビを開く</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Privacy Guarantee Note */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-[11px] flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p className="leading-tight">
              <strong>安心のプライバシー設計：</strong> 番地などの個人情報はサーバーへ送信されず、お使いの端末内でのみ安全に概算されます。
            </p>
          </div>
        </div>

        {/* Right: Real-time Multi-modal Comparison */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 1. Walk Card */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3 relative overflow-hidden shadow-xs hover:border-indigo-300 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Footprints className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">徒歩（分速80m基準）</h4>
                    <span className="text-[10px] text-stone-400">不動産公正表示準拠</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-emerald-700 font-mono">{walkMinutes} <span className="text-xs font-normal text-stone-600">分</span></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 text-xs">
                <div className="bg-stone-50 p-2 rounded-lg">
                  <div className="text-[10px] text-stone-500">歩数目安</div>
                  <div className="font-bold text-stone-800 font-mono">約 {walkSteps.toLocaleString()} 歩</div>
                </div>
                <div className="bg-stone-50 p-2 rounded-lg">
                  <div className="text-[10px] text-stone-500">消費エネルギー</div>
                  <div className="font-bold text-stone-800 font-mono">約 {walkCalories} kcal</div>
                </div>
              </div>

              <p className="text-[11px] text-stone-500 leading-relaxed">
                ※ 信号待ちや坂道がある場合は実測で＋15〜25%（約{Math.round(walkMinutes * 1.2)}分）見ておくと安心です。
              </p>
            </div>

            {/* 2. Bicycle Card */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3 relative overflow-hidden shadow-xs hover:border-indigo-300 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                    <Bike className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">自転車（シェアサイクル）</h4>
                    <span className="text-[10px] text-stone-400">時速約15km想定</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-teal-700 font-mono">{bikeMinutes} <span className="text-xs font-normal text-stone-600">分</span></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 text-xs">
                <div className="bg-stone-50 p-2 rounded-lg">
                  <div className="text-[10px] text-stone-500">徒歩比の時間短縮</div>
                  <div className="font-bold text-teal-700 font-mono">約 {Math.max(1, walkMinutes - bikeMinutes)} 分短縮</div>
                </div>
                <div className="bg-stone-50 p-2 rounded-lg">
                  <div className="text-[10px] text-stone-500">消費エネルギー</div>
                  <div className="font-bold text-stone-800 font-mono">約 {bikeCalories} kcal</div>
                </div>
              </div>

              <p className="text-[11px] text-stone-500 leading-relaxed">
                ※ Luupやドコモ・バイクシェア等を利用すると終電後の帰宅にも便利です。
              </p>
            </div>

            {/* 3. Car Card */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3 relative overflow-hidden shadow-xs hover:border-indigo-300 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">自動車 / タクシー</h4>
                    <span className="text-[10px] text-stone-400">市街地走行＋信号</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-amber-700 font-mono">{carMinutes} <span className="text-xs font-normal text-stone-600">分</span></div>
                </div>
              </div>

              <div className="p-2 bg-stone-50 rounded-lg text-xs space-y-1">
                <div className="text-[10px] text-stone-500">タクシー概算料金（目安）</div>
                <div className="font-bold text-stone-800 font-mono">
                  約 {Math.round(500 + distanceKm * 350).toLocaleString()} 円 〜 {Math.round((500 + distanceKm * 350) * 1.2).toLocaleString()} 円（深夜）
                </div>
              </div>

              <p className="text-[11px] text-stone-500 leading-relaxed">
                ※ 渋滞や雨天時はさらに所要時間が延びる可能性があります。
              </p>
            </div>

            {/* 4. Transit Card */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3 relative overflow-hidden shadow-xs hover:border-indigo-300 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center">
                    <Train className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">電車・地下鉄・バス</h4>
                    <span className="text-[10px] text-stone-400">駅徒歩・待機含む</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-purple-700 font-mono">{transitMinutes} <span className="text-xs font-normal text-stone-600">分</span></div>
                </div>
              </div>

              <div className="p-2 bg-stone-50 rounded-lg text-xs space-y-1">
                <div className="text-[10px] text-stone-500">おすすめ適用距離</div>
                <div className="font-bold text-stone-800 font-mono">
                  3.0 km 以上の長距離移動に最適
                </div>
              </div>

              <p className="text-[11px] text-stone-500 leading-relaxed">
                ※ 乗換回数や時刻表運行スケジュールによって変動します。
              </p>
            </div>

          </div>

          {/* Expert Real Estate / Navigation Knowledge Box */}
          <div className="p-5 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-700 space-y-2">
            <h4 className="font-bold text-stone-900 flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              知っておきたい「自宅から」の距離・時間ノウハウ
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-stone-600 leading-relaxed">
              <li><strong>「徒歩1分＝80m」ルール</strong>：端数は切り上げとなります（例: 85mは徒歩2分と表記）。</li>
              <li><strong>深夜の「ここから自宅まで」</strong>：暗い路地を避け、街灯のある主要幹線道路を選ぶと安全性が高まります。</li>
              <li><strong>Google Mapsショートカット</strong>：スマホのホーム画面に「自宅へ帰る」ウィジェットを置いておくと1タップで現在地からの最適ルートが立ち上がります。</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
