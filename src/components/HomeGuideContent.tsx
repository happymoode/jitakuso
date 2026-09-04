import React from 'react';
import { 
  Home, Sparkles, Briefcase, Activity, PiggyBank, 
  BookOpen, Compass, Heart, CheckCircle2, 
  ArrowRight, HelpCircle, Layers
} from 'lucide-react';
import { NavView } from '../types';

interface HomeGuideContentProps {
  onSelectCategory: (category: NavView) => void;
  onSelectArticle: (slug: string) => void;
}

export const HomeGuideContent: React.FC<HomeGuideContentProps> = ({
  onSelectCategory,
  onSelectArticle,
}) => {
  return (
    <article className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 lg:p-12 shadow-xs space-y-10">
      
      {/* Main Header / Title Section */}
      <header className="space-y-4 border-b border-stone-100 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Home className="w-3.5 h-3.5" />
            <span>自宅生活・完全総合ガイド（2026年最新版）</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-stone-500 font-medium">
            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              <CheckCircle2 className="w-3 h-3" />
              編集部ファクトチェック済み
            </span>
            <span>更新：2026年</span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
          自宅生活・在宅ワーク・おうち時間総合ガイド
        </h2>

        <div className="space-y-3 pt-2 text-[15px] leading-relaxed text-stone-700">
          <p>
            <strong>Jitakus.com（自宅ポータル）</strong>へようこそ。当サイトは、自宅で過ごす時間をより有意義で快適にするための実用情報サイトです。日々の過ごし方やアイデア、在宅ワーク、趣味、運動、学び、リフレッシュ、そして毎日の暮らしに役立つ知識をわかりやすくお届けしています。
          </p>
          <p>
            私たちの目的は、おうちでの生活に関するシンプルで実践的な情報を提供することです。数分のすきま時間から1日ゆっくり過ごす休日まで、時間・興味・予算・ライフスタイルにぴったり合ったガイドが見つかります。
          </p>
          <p>
            自宅でできる仕事や副業から、インドア趣味、フィットネス、自炊料理、勉強法、節約術、さらには移動・距離の計算まで、暮らしに役立つリソースをひとまとめにしました。
          </p>
        </div>
      </header>

      {/* Section 1: Things to Do at Home */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
          <span>自宅でできること（おうち時間の過ごし方）</span>
        </h3>
        <div className="space-y-3 text-[15px] leading-relaxed text-stone-700">
          <p>
            お家での時間の過ごし方には、数え切れないほどの選択肢があります。自由な時間を楽しむために、必ずしも大きな予算や広いスペース、特別な道具を用意する必要はありません。
          </p>
          <p>
            ほんの数分のすきま時間でも、美味しいコーヒーを淹れたり、軽くストレッチをしたり、身の回りを片付けたり、音楽を聴いたり、読書を数ページ進めるだけで心地よい気分転換になります。
          </p>
          <p>
            まとまった時間があるなら、新しいスキルの習得、料理レシピへの挑戦、創作活動、映画鑑賞、ワークアウト、個人のプロジェクトに取り組むのもおすすめです。
          </p>
          <p>
            Jitakus.comでは、一人時間、カップル、家族、大人、学生など、様々なシチュエーションに応じたアイデアを整理しています。くつろぎたいときも、生産的に動きたいときも、状況に合わせた過ごし方が見つかります。
          </p>
          <p>
            予算面でも無理のない工夫を大切にしています。多くのアイデアは、家にある身近なものを活用して0円や少額ですぐに始められます。
          </p>
        </div>
        <div className="pt-2">
          <a
            href="/blog/自宅でできること50選-520430"
            onClick={(e) => {
              e.preventDefault();
              onSelectArticle('jitaku-dekirkoto-50');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            <span>「自宅でできること50選」の記事を見る</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Section 2: Things to Do When Bored */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
          <span>自宅で暇なときの過ごし方・暇つぶし</span>
        </h3>
        <div className="space-y-3 text-[15px] leading-relaxed text-stone-700">
          <p>
            特に予定のない日は、退屈に感じることもあれば、普段できないことに取り組む絶好のチャンスにもなります。少しのきっかけがあれば、退屈な時間を充実したひとときに変えることができます。
          </p>
          <p>
            手軽にリフレッシュしたいときは、パズル、ポッドキャスト鑑賞、部屋の模様替え、新しいプレイリスト作りなどが効果的です。
          </p>
          <p>
            生産的に過ごしたいなら、スマートフォンの写真整理、デジタルファイルのバックアップ、クローゼットの整理、簡単な自炊レシピの開拓なども充実感につながります。
          </p>
          <p>
            気分に合わせて選べるよう、数分で終わる手軽なアクティビティから没頭できる本格的な趣味まで、幅広いインドアアイデアを網羅しています。
          </p>
        </div>
        <div className="pt-2">
          <a
            href="/category/activities"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('activities');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            <span>「自宅でできること・趣味・暇つぶし」一覧を見る</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Section 3: Work from Home & Home-Delivered Tasks */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-600 shrink-0" />
          <span>自宅でできる仕事・在宅ワーク・自宅に届く内職</span>
        </h3>
        <div className="space-y-3 text-[15px] leading-relaxed text-stone-700">
          <p>
            働き方の多様化に伴い、自宅で収入を得る方法は大きく広がりました。フルタイムの在宅勤務から、すきま時間に行う軽作業や副業まで、選択肢は多岐にわたります。
          </p>
          <p>
            パソコンやスマートフォンを活用したリモートワークには、データ入力、記事執筆、オンラインカスタマーサポート、文字起こし、デザイン制作などがあります。
          </p>
          <p>
            また、自宅に資材が届いて作業を行う手作業の内職（シール貼り、梱包、検品、組み立てなど）に関心を持つ方も増えています。
          </p>
          <p>
            当サイトでは、安全で信頼できる仕事の探し方、作業効率を上げる環境づくり、そして注意すべき詐欺案件の見分け方について、分かりやすく解説しています。
          </p>
        </div>
        <div className="pt-2">
          <a
            href="/blog/自宅に届く内職-520440"
            onClick={(e) => {
              e.preventDefault();
              onSelectArticle('jitaku-naishoku-todoku');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-800 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            <span>「自宅に届く安全な内職」の記事を見る</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Section 4: Home-Based Side Jobs */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
          <PiggyBank className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>自宅でできる副業</span>
        </h3>
        <div className="space-y-3 text-[15px] leading-relaxed text-stone-700">
          <p>
            本業や学業と並行して副収入を得たい方にとって、在宅副業は心強い味方です。適した選択肢は、スキル、確保できる時間、作業機材、これまでの経験によって異なります。
          </p>
          <p>
            スキマ時間にできる軽作業を好む方もいれば、作品販売、執筆、Web制作、オンライン指導など、得意分野を活かした取り組みに挑戦する方もいます。
          </p>
          <p>
            Jitakus.comでは、多様な副業の選択肢と、始める前に押さえておくべき現実的なポイントを客観的に解説しています。
          </p>
          <p>
            誇大な収入を約束するのではなく、それぞれの仕組みや必要な準備、注意すべきリスクを正確に理解していただくことを目指しています。
          </p>
        </div>
      </section>

      {/* Section 5: Exercise & Fitness at Home */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-600 shrink-0" />
          <span>自宅でできる運動・フィットネス</span>
        </h3>
        <div className="space-y-3 text-[15px] leading-relaxed text-stone-700">
          <p>
            運動習慣を続けるために、必ずしもジムへ通う必要はありません。室内の省スペースと自重を活用するだけで、効果的なエクササイズが十分に行えます。
          </p>
          <p>
            代表例として、ストレッチ、スクワット、ランジ、プッシュアップ、プランク、静かな有酸素運動などが挙げられます。
          </p>
          <p>
            アパートやマンションにお住まいの方には、階下に音が響かない静音メニュー（ジャンプを伴わない低衝撃トレーニング）が適しています。
          </p>
          <p>
            運動を無理なく習慣化するためのポイントや、器具を使わない安全なトレーニング法、短時間でできるリフレッシュ体操などを紹介しています。
          </p>
        </div>
        <div className="pt-2">
          <a
            href="/category/fitness"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('fitness');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            <span>「自宅での運動・フィットネス」一覧を見る</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Section 6: Muscle Training at Home */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>自宅での筋トレ（自重トレーニング）</span>
        </h3>
        <div className="space-y-3 text-[15px] leading-relaxed text-stone-700">
          <p>
            基礎体力の向上や姿勢の改善、引き締まった体づくりを目指す方にとって、自宅での筋力トレーニングは手軽で効果的な選択肢です。
          </p>
          <p>
            重い器具を使わなくても、自分の体重（自重）を利用することで全身をバランスよく鍛えることができます。動作のスピードや回数、インターバルを調節することで負荷を自在に変えられます。
          </p>
          <p>
            胸、背中、脚、体幹など、部位ごとの基本種目と正しいフォームのコツを整理しています。安全を最優先に、ケガを防ぎながら着実に継続できるステップを大切にしています。
          </p>
        </div>
      </section>

      {/* Section 7: Hobbies & Entertainment at Home */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-600 shrink-0" />
          <span>自宅での趣味・エンタメ</span>
        </h3>
        <div className="space-y-3 text-[15px] leading-relaxed text-stone-700">
          <p>
            心地よい趣味を持つことは、日々のストレスを和らげ、おうち時間を格段に豊かにしてくれます。
          </p>
          <p>
            クリエイティブなもの（イラスト、工芸、楽器演奏、写真編集）、知的なもの（読書、語学学習、プログラミング、パズル）、リラックスできるもの（ガーデニング、料理、アロマテラピー、瞑想）など、関心に合わせて選べる分野は豊富です。
          </p>
          <p>
            初心者でも気軽に始められる趣味のステップや、必要な道具、無理のない楽しみ方を分かりやすくまとめています。
          </p>
        </div>
      </section>

      {/* Section 8: Home Cooking & Simple Recipes */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-orange-600 shrink-0" />
          <span>自宅での自炊・簡単料理</span>
        </h3>
        <div className="space-y-3 text-[15px] leading-relaxed text-stone-700">
          <p>
            お家で料理をすることは、食費の節約になるだけでなく、健康管理や楽しいリフレッシュの時間にもなります。
          </p>
          <p>
            凝った料理を作る必要はありません。手軽なワンパン料理、作り置きおかず、身近な食材を使ったシンプルなレシピから始めるのが長続きのコツです。
          </p>
          <p>
            忙しい日でもサッと作れる時短料理の工夫や、買い出しの無駄を省く食材管理のアイデアをご紹介しています。
          </p>
        </div>
      </section>

      {/* Section 9: Learning & Skill Development at Home */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-600 shrink-0" />
          <span>自宅での勉強・自己研鑽</span>
        </h3>
        <div className="space-y-3 text-[15px] leading-relaxed text-stone-700">
          <p>
            インターネットの普及により、自宅にいながら質の高い学習リソースへアクセスできるようになりました。
          </p>
          <p>
            語学学習、資格取得、プログラミング、ビジネススキルの向上など、無料の講座やアプリを活用して自分のペースで進めることができます。
          </p>
          <p>
            集中力を維持するための環境づくり（ポモドーロ・テクニックの活用や作業スペースの整理）や、継続しやすい学習ルーティンの作り方を解説しています。
          </p>
        </div>
      </section>

      {/* Section 10: Distance, Travel Time & Home Navigation */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
          <Compass className="w-5 h-5 text-rose-700 shrink-0" />
          <span>自宅からの距離・移動時間・ナビゲーション</span>
        </h3>
        <div className="space-y-3 text-[15px] leading-relaxed text-stone-700">
          <p>
            日常生活や引っ越し、通勤・通学の計画において、「自宅から駅までの距離」や「自宅までの帰り道」を正確に把握したい場面が多くあります。
          </p>
          <p>
            最寄り駅までの徒歩分数、通勤・通学路の所要時間、自転車や車での所要時間など、マップやナビツールを活用することでスムーズに把握できます。
          </p>
          <p>
            徒歩基準（分速80mルール）や直線距離と実走行距離の違い、交通手段ごとの計算の仕組みをやさしく解説しています。
          </p>
          <p>
            なお、位置情報サービスを利用する際はプライバシーに配慮し、SNS等で正確な番地を公開しないようご注意ください。
          </p>
        </div>
        <div className="pt-2">
          <a
            href="/tool/distance"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('nav-tool');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-800 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            <span>「自宅ナビ・距離所要時間計算ツール」を試す</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Section 11: Practical Information for Everyday Home Life */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
          <Home className="w-5 h-5 text-emerald-800 shrink-0" />
          <span>毎日の自宅生活を豊かにする実用情報</span>
        </h3>
        <div className="space-y-3 text-[15px] leading-relaxed text-stone-700">
          <p>
            私たちがこれらのテーマを幅広く扱うのは、住まいが単なる休息の場にとどまらず、暮らしのすべての基盤だからです。
          </p>
          <p>
            仕事、学び、健康づくり、食事、創作、そして心安らぐ休息まで、多面的な役割を担っています。自分自身と向き合い、大切な人との時間を育む場所でもあります。
          </p>
          <p>
            住まいをどう活用するかは人それぞれです。生産性を高めたい方、心身を休めたい方、新しい挑戦を始めたい方、それぞれのライフスタイルに寄り添えるよう、総合的な視点で情報を届けています。
          </p>
        </div>
      </section>

      {/* Section 12: Explore Jitakus.com Call to Action */}
      <section className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>Jitakus.comを活用しよう</span>
        </h3>
        <div className="space-y-3 text-[15px] leading-relaxed text-stone-700">
          <p>
            暇な時間の過ごし方、在宅ワークの探し方、室内トレーニング、趣味の開拓、節約、住環境の整備、距離の計測など、知りたい情報へスムーズにアクセスできるよう構成されています。
          </p>
          <p>
            各カテゴリの記事や計算シミュレーターをご活用いただき、毎日の時間をより便利で心地よくするヒントを見つけてみてください。
          </p>
        </div>

        {/* Action Grid - Complete 6 Categories + All 30 Blogs */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('all');
            }}
            className="p-3.5 bg-emerald-800 text-white rounded-xl hover:bg-emerald-900 text-left transition cursor-pointer group shadow-2xs flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-bold block flex items-center justify-between">
                <span>全記事アーカイブ</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </span>
              <span className="text-[11px] text-emerald-100 mt-1 block">全30記事を一覧表示</span>
            </div>
          </a>

          <a
            href="/category/definition"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('definition');
            }}
            className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-emerald-500 text-left transition cursor-pointer group hover:bg-emerald-50/50"
          >
            <span className="text-xs font-bold text-stone-900 group-hover:text-emerald-800 block">自宅とは？</span>
            <span className="text-[11px] text-stone-500">意味・使い方を解説</span>
          </a>

          <a
            href="/category/activities"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('activities');
            }}
            className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-blue-500 text-left transition cursor-pointer group hover:bg-blue-50/50"
          >
            <span className="text-xs font-bold text-stone-900 group-hover:text-blue-800 block">自宅でできること</span>
            <span className="text-[11px] text-stone-500">趣味・暇つぶしアイデア</span>
          </a>

          <a
            href="/category/work"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('work');
            }}
            className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-indigo-500 text-left transition cursor-pointer group hover:bg-indigo-50/50"
          >
            <span className="text-xs font-bold text-stone-900 group-hover:text-indigo-800 block">在宅ワーク・内職</span>
            <span className="text-[11px] text-stone-500">安全な仕事と副業</span>
          </a>

          <a
            href="/category/fitness"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('fitness');
            }}
            className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-teal-500 text-left transition cursor-pointer group hover:bg-teal-50/50"
          >
            <span className="text-xs font-bold text-stone-900 group-hover:text-teal-800 block">自宅で運動・筋トレ</span>
            <span className="text-[11px] text-stone-500">静音宅トレ＆ストレッチ</span>
          </a>

          <a
            href="/category/lifestyle"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('lifestyle');
            }}
            className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-amber-500 text-left transition cursor-pointer group hover:bg-amber-50/50"
          >
            <span className="text-xs font-bold text-stone-900 group-hover:text-amber-800 block">自宅暮らし・節約</span>
            <span className="text-[11px] text-stone-500">光熱費削減＆料理・学び</span>
          </a>

          <a
            href="/category/navigation"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('navigation');
            }}
            className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-rose-500 text-left transition cursor-pointer group hover:bg-rose-50/50"
          >
            <span className="text-xs font-bold text-stone-900 group-hover:text-rose-800 block">自宅から/自宅まで</span>
            <span className="text-[11px] text-stone-500">駅徒歩・距離計算ガイド</span>
          </a>

          <a
            href="/tool/distance"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('nav-tool');
            }}
            className="p-3.5 bg-stone-900 text-stone-100 rounded-xl hover:bg-stone-800 text-left transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-bold block flex items-center justify-between text-amber-300">
                <span>距離シミュレーター</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </span>
              <span className="text-[11px] text-stone-400 mt-1 block">徒歩・自転車・車計算</span>
            </div>
          </a>
        </div>
      </section>

      {/* Section 13: Frequently Asked Questions (FAQ) */}
      <section className="space-y-6 pt-4 border-t border-stone-100">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 font-bold">
            <HelpCircle className="w-4 h-4" />
            <span>よくある質問（FAQ）</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
            自宅生活・在宅ワークに関するQ&A
          </h3>
        </div>

        <div className="space-y-4">
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-2">
            <h4 className="font-bold text-sm sm:text-base text-stone-900 flex items-start gap-2">
              <span className="text-emerald-700 font-extrabold text-base">Q.</span>
              <span>「自宅」とお金をかけずに楽しく過ごすおすすめの方法は？</span>
            </h4>
            <p className="text-[14px] text-stone-600 leading-relaxed pl-6">
              ストレッチや自重筋トレ、読書、身の回りの断捨離、オンライン無料講座の受講、手軽な自炊スイーツ作りなど、0円ですぐに試せるアイデアが豊富にあります。当サイトの「自宅でできること50選」もぜひ参考にしてください。
            </p>
          </div>

          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-2">
            <h4 className="font-bold text-sm sm:text-base text-stone-900 flex items-start gap-2">
              <span className="text-emerald-700 font-extrabold text-base">Q.</span>
              <span>自宅でできる安全な内職や在宅ワークはどう探せばいいですか？</span>
            </h4>
            <p className="text-[14px] text-stone-600 leading-relaxed pl-6">
              公的機関（ハローワークや各自治体の就労支援窓口）や大手クラウドソーシングサービスを利用するのが安心です。事前の教材費や登録料を請求する悪質な詐欺案件には十分注意し、契約内容を必ず事前に確認しましょう。
            </p>
          </div>

          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-2">
            <h4 className="font-bold text-sm sm:text-base text-stone-900 flex items-start gap-2">
              <span className="text-emerald-700 font-extrabold text-base">Q.</span>
              <span>アパートやマンションで階下に音が響かない室内運動はありますか？</span>
            </h4>
            <p className="text-[14px] text-stone-600 leading-relaxed pl-6">
              ヨガマットを敷いた状態でのプランク、スロースクワット、静止ストレッチ、踏み台を使わないステップ運動など、足音を立てない静音メニューが最適です。
            </p>
          </div>

          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-2">
            <h4 className="font-bold text-sm sm:text-base text-stone-900 flex items-start gap-2">
              <span className="text-emerald-700 font-extrabold text-base">Q.</span>
              <span>「自宅」「家」「実家」「自分の家」の言葉の違いは？</span>
            </h4>
            <p className="text-[14px] text-stone-600 leading-relaxed pl-6">
              「自宅」は公私問わず自分がいま現実に生活している住まいを客観的・丁寧に指す言葉です。「実家」は両親が住む故郷の家、「家」は建物や家庭全般を指す日常表現です。
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Trust & Transparency Footer */}
      <footer className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-500">
        <div className="space-y-1">
          <p className="font-bold text-stone-700">Jitakus.com 暮らし情報編集部 監修</p>
          <p>正確性と中立性に配慮し、信頼できる情報源に基づき定期的に内容を検証・更新しています。</p>
        </div>
        <div className="flex items-center gap-3 shrink-0 font-medium">
          <a href="/category/definition" onClick={(e) => { e.preventDefault(); onSelectCategory('definition'); }} className="hover:text-emerald-800 underline cursor-pointer">免責事項</a>
          <span>•</span>
          <a href="/" onClick={(e) => { e.preventDefault(); onSelectCategory('all'); }} className="hover:text-emerald-800 underline cursor-pointer">編集ポリシー</a>
        </div>
      </footer>

    </article>
  );
};
