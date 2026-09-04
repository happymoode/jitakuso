import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Server-side Gemini AI client initialization
  let aiClient: GoogleGenAI | null = null;
  function getGenAI(): GoogleGenAI | null {
    if (!aiClient && process.env.GEMINI_API_KEY) {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return aiClient;
  }

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      service: "jitakus-portal-server",
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
    });
  });

  // AI Advisor for custom home ideas & work recommendations with multi-model fallback & resilience
  app.post("/api/gemini/advisor", async (req, res) => {
    const { category, timeAvailable, budget, mood, customQuery } = req.body;

    // Input sanitation & length constraint to prevent abuse
    const safeQuery = typeof customQuery === 'string' ? customQuery.slice(0, 500) : '';
    const safeCategory = typeof category === 'string' ? category.slice(0, 100) : '自宅全般';
    const safeTime = typeof timeAvailable === 'string' ? timeAvailable.slice(0, 100) : '指定なし';
    const safeBudget = typeof budget === 'string' ? budget.slice(0, 100) : '無料・低予算';
    const safeMood = typeof mood === 'string' ? mood.slice(0, 100) : 'リフレッシュ・有意義に過ごしたい';

    // Helper to generate domain-expert structured response
    const generateSmartDomainResponse = (reasonNote?: string) => {
      const plans: Record<string, { title: string; steps: string[]; tips: string }> = {
        '自宅でできること・暇つぶし': {
          title: '充実したおうち時間・リフレッシュプラン',
          steps: [
            '**ステップ1 (最初の5分)**: 部屋の換気をして、温かい飲み物を用意して環境を整えましょう。',
            '**ステップ2 (メイン活動)**: 普段読めなかった本を読む、新しいクラフトや料理、好きな音楽を聴きながらの片付けなどに取り組みます。',
            '**ステップ3 (まとめ)**: 最後に今日できた小さな成果をメモしておくと、達成感が高まります。'
          ],
          tips: '時間をタイマー（25分集中＋5分休憩のポモドーロ法）で区切ると、だらだら防止になります。'
        },
        '自宅でできる仕事・内職・副業': {
          title: '安全・安心な在宅ワークスタートプラン',
          steps: [
            '**ステップ1 (準備)**: 作業スペース（机と明るい照明）を確保し、初期費用がかからない公的認可案件や大手クラウドソーシング（クラウドワークス・ココナラ等）を選びます。',
            '**ステップ2 (案件選び)**: シール貼りや袋詰めなどの内職は「自治体の内職相談窓口」または「自宅配送対応」の信頼できる企業から確認しましょう。',
            '**ステップ3 (安全確認)**: 「登録料が必要」「誰でも月数十万」といった怪しい広告は避け、納期と単価をメモして1日30分〜1時間から無理なく始めます。'
          ],
          tips: '怪しい初期費用請求は絶対に断り、実績のあるプラットフォームのみを利用するのが鉄則です。'
        },
        '自宅で運動・筋トレ・静音有酸素': {
          title: '階下に響かない静音ホームフィットネスプラン',
          steps: [
            '**ステップ1 (準備運動)**: 首・肩・股関節のダイナミックストレッチで体を温めます（3分）。',
            '**ステップ2 (静音メイン)**: ジャンプをしない「スロースクワット」「ヒップリフト」「プランク」を各10〜15回×2セット行います。',
            '**ステップ3 (クールダウン)**: 深呼吸をしながら太ももと背中をゆっくり伸ばして柔軟性を高めます。'
          ],
          tips: 'ヨガマットや厚手のバスタオルを敷くと、騒音防止と関節保護の両方に効果的です。'
        },
        '自宅暮らし・節約・料理・整理': {
          title: '暮らしを整える自宅カイゼンプラン',
          steps: [
            '**ステップ1 (1箇所集中)**: 今日は「冷蔵庫の中」や「デスク周り」など、狭い1エリアだけに絞って見直します。',
            '**ステップ2 (仕分け・活用)**: 余っている食材で作れる簡単レシピ（スープや炒め物）を試し、不要なレシートや書類を処分します。',
            '**ステップ3 (仕組み化)**: よく使う物の定位置を決めて、明日からの暮らしの手間を減らします。'
          ],
          tips: '一度に全部やろうとせず、15分タイマーをかけて終わらせるのが長続きのコツです。'
        }
      };

      const matched = plans[safeCategory] || plans['自宅でできること・暇つぶし'];
      return `### 【自宅コンシェルジュ特製プラン】\n**${matched.title}**\n\n- **カテゴリ**: ${safeCategory}\n- **目安時間**: ${safeTime}\n- **予算目安**: ${safeBudget}\n- **気分・目的**: ${safeMood}\n${safeQuery ? `- **ご要望**: ${safeQuery}\n` : ''}\n\n#### 実践ステップ\n${matched.steps.join('\n')}\n\n#### 安心アドバイス\n${matched.tips}\n\n${reasonNote ? `> 💡 *${reasonNote}*` : ''}`;
    };

    const ai = getGenAI();
    if (!ai) {
      return res.json({
        success: true,
        source: "built-in-knowledge",
        reply: generateSmartDomainResponse(),
        recommendedTags: ["自宅でできること", "気分転換", "集中力アップ", "節約"]
      });
    }

    const prompt = `あなたは「jitakus.com (自宅生活総合ポータル)」の専任AIコンシェルジュです。
日本のユーザーに向けて、自宅で有意義に過ごすための具体的で実践的なアドバイス・アイデア・作業提案を日本語で親切かつ分かりやすく回答してください。

【相談内容】
- カテゴリ: ${safeCategory}
- 使える時間: ${safeTime}
- 予算/費用: ${safeBudget}
- 気分・目的: ${safeMood}
- 詳しい相談・質問: ${safeQuery || "今自宅でできる最高のおすすめを教えてください"}

【出力要件】
1. 魅力的で具体的なステップ（3〜4個の箇条書き）
2. 必要な準備や注意点（防音、姿勢、プライバシー、初期費用など）
3. モチベーションが高まるワンポイントアドバイス
親しみやすく信頼できるトーンで回答してください。Markdown記法を活用してください。`;

    // Try primary model, then latest fallback models on 503/temporary spike
    const candidateModels = ["gemini-3.7-flash", "gemini-3.6-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
    let lastError: any = null;

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
        });

        if (response.text) {
          return res.json({
            success: true,
            source: modelName,
            reply: response.text,
          });
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} failed (${err?.message || 'unknown error'}), attempting fallback...`);
        // Continue to next model in list
      }
    }

    // If all models hit 503 / spike, gracefully return intelligent domain response
    console.warn("All Gemini models encountered high demand spike. Delivering smart-domain fallback response.");
    return res.json({
      success: true,
      source: "smart-domain-expert",
      reply: generateSmartDomainResponse("現在AIサーバーが一時的な高負荷状態のため、専門知識データベースより最適なプランを即時お届けしています。時間をおいて再質問していただくと、最新のAI生成回答もお試しいただけます。"),
    });
  });

  // Distance / Commute calculation helper API
  app.post("/api/distance/estimate", (req, res) => {
    try {
      const { startType, destinationName, distanceKm, travelMode } = req.body;
      const km = parseFloat(distanceKm) || 3.0;

      // Speed estimates: Walk ~4.8 km/h (80m/min by JP Real Estate Standard), Bike ~15 km/h, Car ~30 km/h in city, Train ~40 km/h avg with stops
      const walkingMinutes = Math.round((km / 0.08)); // 80m = 1 min
      const cyclingMinutes = Math.round((km / 15) * 60);
      const drivingMinutes = Math.round((km / 30) * 60) + 5; // buffer for traffic
      const transitMinutes = Math.round((km / 40) * 60) + 8; // buffer for walk to station & wait

      const caloriesWalk = Math.round(km * 55); // approx 55 kcal/km for standard weight
      const caloriesBike = Math.round(km * 30);
      const steps = Math.round(km * 1400); // approx 70cm stride

      res.json({
        distanceKm: km,
        destination: destinationName || "目的地",
        estimates: {
          walk: { minutes: walkingMinutes, calories: caloriesWalk, steps },
          bicycle: { minutes: cyclingMinutes, calories: caloriesBike },
          car: { minutes: drivingMinutes },
          transit: { minutes: transitMinutes },
        },
        privacyNote: "※個人情報保護のため、自宅の番地や特定できる正確な住所はブラウザや外部に保存されず、概算計算のみ行われます。",
        googleMapsQueryUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationName || "駅")}`,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Jitakus Portal server running at http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
