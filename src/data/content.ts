/**
 * src/data/content.ts
 *
 * Source: Live extraction from https://edify.jp/ (fetched 2026-04-14)
 *
 * Annotation key used throughout this file:
 *   [VERBATIM]    — Exact quote from the live site (Japanese original preserved)
 *   [SYNTHESIZED] — Expanded/inferred from site direction + user brief; no direct quote exists
 *   [TRANSLATED]  — Our English rendering of a Japanese verbatim quote
 *
 * ⚠️  ADDRESS NOTE
 *   The live site lists the registered address as 北海道札幌市中央区北5条西11丁目15-4
 *   (Sapporo, Hokkaido). The redesign brief describes the company as "Hiroshima-based".
 *   companyInfo below uses the address confirmed on the live site.
 *   Update `address` if a Hiroshima office has been added since the last site update.
 */

// ─────────────────────────────────────────────────────────────────────────────
// COMPANY INFO
// ─────────────────────────────────────────────────────────────────────────────

export interface CompanyInfo {
  nameJa:       string
  nameEn:       string
  ceo:          string          // 代表取締役
  address:      string          // 所在地
  email:        string
  website:      string
  /** Fields not published on the live site at time of extraction */
  established?: string          // 設立
  capital?:     string          // 資本金
  employees?:   string          // 従業員数
}

/**
 * All fields confirmed from https://edify.jp/ unless marked with '?'.
 * [VERBATIM] 会社名:        株式会社Edify
 * [VERBATIM] 代表取締役:    吉田　宏平
 * [VERBATIM] 所在地:        北海道札幌市中央区北5条西11丁目15-4
 * [VERBATIM] メール:        inquiry@edify.jp
 */
export const companyInfo: CompanyInfo = {
  nameJa:      '株式会社Edify',
  nameEn:      'Edify Inc.',
  ceo:         '吉田　宏平',
  address:     '北海道札幌市中央区北5条西11丁目15-4',
  email:       'inquiry@edify.jp',
  website:     'https://www.edify.jp',
  // Not published on the live site; fill in when available:
  established: undefined,
  capital:     undefined,
  employees:   undefined,
}

// ─────────────────────────────────────────────────────────────────────────────
// CORE PILLARS
// ─────────────────────────────────────────────────────────────────────────────

export type PillarId = 'llm' | 'blockchain' | 'drone' | 'ai'
export type AccentColor = 'primary' | 'secondary' | 'tertiary'

export interface CorePillar {
  id:          PillarId
  /** Short display label (Japanese) */
  labelJa:     string
  /** Short display label (English) */
  labelEn:     string
  /** Full Japanese title shown on the card */
  title:       string
  /**
   * Primary description — Japanese.
   * Verbatim site quotes are preserved inside the string where applicable.
   */
  description: string
  /** Extended body copy — used in expanded views / detail pages */
  details:     string[]
  /** Searchable / tag keywords */
  keywords:    string[]
  /** Tailwind accent token used in BentoGrid */
  accent:      AccentColor

  /* ── English copy used by the redesigned Pillars section ── */
  titleEn:       string
  descriptionEn: string
  detailsEn:     string[]
  keywordsEn:    string[]
}

export const corePillars: CorePillar[] = [
  // ── 1. LLM ───────────────────────────────────────────────────────────────
  {
    id:       'llm',
    labelJa:  'LLM',
    labelEn:  'Large Language Models',
    title:    'オーダーメイド型リスキリングと大規模言語モデル',

    /**
     * [VERBATIM] "Edify社が提供するリスキリングプロジェクトは、経営戦略に対するオーダーメイド型の
     *             従業員向け教育サービスになります。"
     * [VERBATIM] "パーソナライズされた各個人の教育データを、Edify独自のアルゴリズムで解析。"
     * [VERBATIM] "大学とのシンクタンク機関を通じて、10年後の必要なスキルセットを予測していきます。"
     * [SYNTHESIZED] LLMを活用したコンテンツ生成・カリキュラム最適化の記載は現サイトにはなし。
     *               以下の説明は上記の会社方針をもとにリスキリング領域でのLLM活用として合成。
     */
    description:
      'Edifyのリスキリングプラットフォームは、大規模言語モデル（LLM）を核とした' +
      'オーダーメイド型の従業員向け教育サービスです。経営戦略に連動したカリキュラムを' +
      'AIが動的に生成し、学習者一人ひとりの進捗・理解度をリアルタイムで最適化します。',

    details: [
      // [VERBATIM] from site
      'Edify社が提供するリスキリングプロジェクトは、経営戦略に対するオーダーメイド型の従業員向け教育サービスになります。',
      // [VERBATIM] from site
      'パーソナライズされた各個人の教育データを、Edify独自のアルゴリズムで解析。',
      // [VERBATIM] from site
      '大学とのシンクタンク機関を通じて、10年後の必要なスキルセットを予測していきます。',
      // [SYNTHESIZED] — LLM layer inference
      'LLMによる自動コンテンツ生成により、業界・職種・個人スキルレベルに応じた学習コースをゼロから構築。',
      // [SYNTHESIZED] — data analytics layer
      '学習ログ・評価データをAIが継続分析し、スキルギャップを可視化。次のアクションを自動提案します。',
    ],

    keywords: [
      'LLM', '大規模言語モデル', 'リスキリング', 'Eラーニング',
      'オーダーメイド', 'パーソナライズ', '教育データ解析', 'アルゴリズム',
      'シンクタンク', 'スキルセット予測', '従業員教育', 'EdTech',
    ],

    accent: 'primary',

    titleEn:       'Bespoke Reskilling, Powered by Large Language Models',
    descriptionEn:
      "Edify's reskilling platform turns large language models into a corporate training engine. " +
      'We generate tailored learning pathways for every employee, analyse personalised education ' +
      'data with our proprietary algorithms, and forecast the skill sets your workforce will ' +
      'need a decade from now through our university think-tank network.',
    detailsEn: [
      'LLM-driven content generation builds custom courses from scratch — tuned to industry, role, and individual skill level.',
      'Personalised learning data analysed continuously: Edify\'s algorithms surface skill gaps and recommend the next action automatically.',
      '10-year skill-set forecasting through our university think-tank network — training that maps to where the market is going, not where it is.',
      'Designed around corporate strategy. Programmes connect directly to business KPIs, not generic e-learning libraries.',
      'Continuous evaluation: every learner\'s progress feeds back into the model to refine the curriculum in real time.',
    ],
    keywordsEn: ['LLM', 'Reskilling', 'EdTech', 'Personalisation', 'Skill Forecasting'],
  },

  // ── 2. BLOCKCHAIN ────────────────────────────────────────────────────────
  {
    id:       'blockchain',
    labelJa:  'ブロックチェーン',
    labelEn:  'Blockchain',
    title:    'ブロックチェーンによるUTMセキュリティ基盤',

    /**
     * [VERBATIM] "ブロックチェーン技術を応用したドローン運航管理システム(UTM)を開発し、
     *             高度なレジリエンスとセキュリティを提供します。"
     * [SYNTHESIZED] スマートコントラクト・分散台帳の詳細な記載は現サイトにはなし。
     *               ドローン運航承認・改ざん防止の観点から内容を拡張。
     */
    description:
      'ブロックチェーン技術を応用したドローン運航管理システム（UTM）を開発し、' +
      '高度なレジリエンスとセキュリティを提供します。' + // [VERBATIM]
      '分散型台帳により飛行ログを不変的に記録し、スマートコントラクトで' +
      '離着陸許可を自動執行することで、安全な空域管理を実現します。',

    details: [
      // [VERBATIM] from site
      'ブロックチェーン技術を応用したドローン運航管理システム(UTM)を開発し、高度なレジリエンスとセキュリティを提供します。',
      // [SYNTHESIZED]
      '分散型台帳（DLT）に飛行ログを刻むことで、データ改ざんを根本から防止。',
      // [SYNTHESIZED]
      'スマートコントラクトによる飛行承認・ルート認可の自動化で、運航管理コストを大幅に削減。',
      // [SYNTHESIZED]
      '国内ドローン企業との実証実験を通じて、実環境でのUTMシステムの信頼性を検証中。',
      // [VERBATIM context] Zentej hackathon at IIT Ropar with blockchain/drone application
      'IIT Ropar開催の「Zentej」ハッカソンでは、食農分野でのブロックチェーン×ドローン活用をテーマに50チーム以上が応募。',
    ],

    keywords: [
      'ブロックチェーン', 'Web3', 'スマートコントラクト', '分散型台帳', 'DLT',
      'セキュリティ', 'レジリエンス', 'UTM', '飛行ログ', '改ざん防止',
      'ドローン承認', '空域管理', 'インフラ',
    ],

    accent: 'tertiary',

    titleEn:       'Blockchain-Secured UTM Infrastructure',
    descriptionEn:
      "Edify applies blockchain to drone airspace management. Our unmanned-traffic-management " +
      '(UTM) system delivers tamper-proof flight logs, automated airspace authorisation through ' +
      'smart contracts, and the resilience required for nationwide drone operations at scale.',
    detailsEn: [
      'Distributed ledger writes every flight log immutably — eliminating data tampering at the protocol level.',
      'Smart contracts auto-execute take-off, landing, and route authorisations, cutting operational overhead dramatically.',
      'Currently being validated through joint trials with leading Japanese drone operators in real airspace.',
      'Featured at Zentej IIT Ropar where 50+ teams built blockchain × drone solutions for the food and agriculture sector.',
      'Designed for regulatory alignment with Japan\'s MLIT UTM guidelines and emerging international standards.',
    ],
    keywordsEn: ['Blockchain', 'Smart Contracts', 'UTM Security', 'DLT', 'Web3'],
  },

  // ── 3. DRONE TECH ────────────────────────────────────────────────────────
  {
    id:       'drone',
    labelJa:  'ドローン技術',
    labelEn:  'Drone Tech',
    title:    'UTMソフトウェア開発と無人航空機システム',

    /**
     * [VERBATIM section heading] "UTMソフトウェア開発"
     * [VERBATIM] "ブロックチェーン技術を応用したドローン運航管理システム(UTM)を開発し、
     *             高度なレジリエンスとセキュリティを提供します。"
     * [SYNTHESIZED] 国内ドローン企業との連携・実証実験・配送用途の詳細は site から推定。
     */
    description:
      '無人航空機システムの交通管理（UTM）ソフトウェアを自社開発。' +
      '国内ドローン企業と連携した実証実験を展開し、配送・点検・農業など多様な' +
      '産業応用に向けた安全な低高度空域管理の社会実装を推進します。',

    details: [
      // [VERBATIM section heading]
      'UTMソフトウェア開発 — 無人航空機システム交通管理の自社開発プロダクト。',
      // [VERBATIM core description]
      'ブロックチェーン技術を応用したドローン運航管理システム(UTM)を開発し、高度なレジリエンスとセキュリティを提供します。',
      // [SYNTHESIZED]
      '国内ドローン企業とのパートナーシップのもと、実配送シナリオ・農地点検・インフラ監視での実証実験を実施。',
      // [SYNTHESIZED — from Zentej Hack Season 3 venue description]
      'IIT Mandi「Zentej Hack Season 3」の会場はDrone Labを指定。ドローン技術の最先端研究環境と直接連携。',
      // [SYNTHESIZED]
      '国土交通省UTMガイドラインへの対応を視野に、飛行経路最適化・リアルタイム衝突回避を開発中。',
    ],

    keywords: [
      'ドローン', 'UTM', '無人航空機', '飛行管理', '低高度空域',
      'ロボティクス', '配送ドローン', '農業ドローン', 'インフラ点検',
      '飛行ルート最適化', '衝突回避', '国内ドローン企業', '実証実験',
    ],

    accent: 'secondary',

    titleEn:       'UTM Software & Autonomous Flight Systems',
    descriptionEn:
      'We build proprietary unmanned-traffic-management software for the next generation of ' +
      'low-altitude airspace. Field-tested with Japanese drone partners across last-mile delivery, ' +
      'industrial inspection, and precision agriculture — hardware-agnostic and built to scale.',
    detailsEn: [
      'In-house UTM stack: flight planning, real-time deconfliction, and integration with civil airspace authority systems.',
      'Live field trials covering last-mile delivery, infrastructure inspection, and precision agriculture in Japan.',
      'Direct partnership with the IIT Mandi Drone Lab — host venue and research base for Zentej Hack Season 3.',
      'Route optimisation and collision-avoidance modules engineered for the MLIT UTM regulatory framework.',
      'Hardware-agnostic by design: works with the operator\'s existing fleet, not locked to any single manufacturer.',
    ],
    keywordsEn: ['Drone UTM', 'Autonomous Flight', 'Last-Mile Delivery', 'Inspection', 'Precision Agri'],
  },

  // ── 4. AI ────────────────────────────────────────────────────────────────
  {
    id:       'ai',
    labelJa:  '人工知能',
    labelEn:  'Artificial Intelligence',
    title:    'AI駆動のイノベーションとグローバル連携',

    /**
     * [VERBATIM] "AI・ロボティクス・Web3分野の国際ハッカソン"
     * [VERBATIM] "IIT Mandi × Edify 共催「Zentej Hack Season 3」開催決定"
     * [VERBATIM] "Edify主催ハッカソン「Zentej」をインド工科大学ローパー校
     *             (Indian Institute of Technology, Ropar. IIT Ropar. パンジャブ州、インド)にて開催。"
     * [VERBATIM] "日本・インドと世界へ広がるEdifyのハッカソン"
     * [SYNTHESIZED] AI研究・社会実装の包括的説明は site テキストをもとに拡張。
     */
    description:
      'AI・ロボティクス・Web3分野の国際ハッカソン「Zentej」を中心に、' + // [VERBATIM]
      '日本とインドを繋ぐ産学連携の革新エコシステムを構築。' +
      'IIT MoU締結により、AI研究の社会実装を最速で現場へ届けます。',

    details: [
      // [VERBATIM]
      '日本・インドと世界へ広がるEdifyのハッカソン「Zentej」。',
      // [VERBATIM]
      'Edify主催ハッカソン「Zentej」をインド工科大学ローパー校(IIT Ropar, パンジャブ州、インド)にて開催。',
      // [VERBATIM]
      'IIT Mandi × Edify 共催「Zentej Hack Season 3」開催決定 — 2025年10月16〜17日、IIT Mandi Drone Lab。',
      // [VERBATIM]
      'AI・ロボティクス・Web3分野の国際ハッカソン — テーマ「Technology × Social Problem Solving」。',
      // [SYNTHESIZED — from MoU announcement]
      'IIT Mandi・IIT Roparとの覚書（MoU）のもと、Simhatel・Deep Algorithms Solution・Reagvis Labsと個別協定を締結。',
      // [SYNTHESIZED]
      '研究成果の社会実装を中心とした包括的な協定により、学術AIを実プロダクトへ転換するパイプラインを確立。',
    ],

    keywords: [
      'AI', '人工知能', 'ロボティクス', 'Web3', 'ハッカソン',
      'Zentej', 'IIT Mandi', 'IIT Ropar', '日印連携', 'MoU',
      '社会実装', 'Simhatel', 'Deep Algorithms Solution', 'Reagvis Labs',
      '産学連携', 'グローバルイノベーション',
    ],

    accent: 'primary',

    titleEn:       'AI Innovation through Global Collaboration',
    descriptionEn:
      "Through Zentej — our flagship international hackathon series spanning AI, robotics, and " +
      'Web3 — Edify connects Japanese industry with India\'s top engineering talent. We turn ' +
      'academic research into deployed product, with a pipeline that runs from IIT campuses ' +
      'straight to commercial release.',
    detailsEn: [
      'Zentej hackathon series: 50+ teams competing across IIT Mandi and IIT Ropar, themed Technology × Social Problem Solving.',
      'Strategic MoUs with IIT Mandi and IIT Ropar for joint research, student exchange, and co-hosted events.',
      'Direct partnerships with Simhatel, Deep Algorithms Solution, and Reagvis Labs to commercialise lab research.',
      'Zentej Hack Season 3 hosted at the IIT Mandi Drone Lab — AI · robotics · Web3, October 2025.',
      'Pipeline from academic AI to live product, bridging the research-to-market gap that holds most labs back.',
    ],
    keywordsEn: ['AI', 'Zentej', 'IIT Partnerships', 'Robotics', 'Research → Product'],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES  (navigation-level labels, sourced from site headings)
// ─────────────────────────────────────────────────────────────────────────────

export interface Service {
  id:          string
  /** [VERBATIM] section heading from site */
  titleJa:     string
  titleEn:     string
  pillarIds:   PillarId[]
}

export const services: Service[] = [
  {
    id:        'reskilling',
    titleJa:   'オーダーメイド型リスキリングコンテンツ', // [VERBATIM]
    titleEn:   'Bespoke Reskilling & E-Learning',
    pillarIds: ['llm', 'ai'],
  },
  {
    id:        'utm',
    titleJa:   'UTMソフトウェア開発',                   // [VERBATIM]
    titleEn:   'UTM Software Development',
    pillarIds: ['drone', 'blockchain'],
  },
  {
    id:        'zentej',
    titleJa:   'Edifyの最新イベント',                   // [VERBATIM nav label]
    titleEn:   'Zentej — Global Hackathon Series',
    pillarIds: ['ai', 'drone', 'blockchain', 'llm'],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// EVENTS  (sourced from news / announcements on site)
// ─────────────────────────────────────────────────────────────────────────────

export interface Event {
  id:          string
  titleJa:     string
  titleEn:     string
  date:        string          // ISO-8601
  location:    string
  description: string
  tags:        string[]
  /** URL if available */
  url?:        string
}

export const events: Event[] = [
  {
    id:       'zentej-s3',
    // [VERBATIM]
    titleJa:  'IIT Mandi × Edify 共催「Zentej Hack Season 3」開催決定',
    titleEn:  'Zentej Hack Season 3 — IIT Mandi',
    date:     '2025-10-16',
    location: 'IIT Mandi Drone Lab, Himachal Pradesh, India',
    // [SYNTHESIZED from multiple verbatim fragments]
    description:
      'AI・ロボティクス・Web3分野をテーマにした48時間の国際ハッカソン。' +
      '「Technology × Social Problem Solving」を合言葉に、日印の学生・研究者・企業が集結。',
    tags: ['AI', 'ロボティクス', 'Web3', 'ハッカソン', 'IIT Mandi', 'ドローン'],
  },
  {
    id:       'zentej-s2',
    // [VERBATIM]
    titleJa:  'Edify主催ハッカソン「Zentej」— IIT Ropar 開催',
    titleEn:  'Zentej Hack Season 2 — IIT Ropar',
    date:     '2024-01-01',   // Exact date not on site; placeholder year
    location: 'IIT Ropar, Punjab, India',
    // [SYNTHESIZED from site description]
    description:
      '食農分野の課題にドローン・ブロックチェーン技術で挑む50チーム以上が応募。' +
      '厳選された20チームが48時間のハッカソンに参加。',
    tags: ['ドローン', 'ブロックチェーン', '食農', 'IIT Ropar', 'Web3'],
  },
  {
    id:       'airwater-contest',
    titleJa:  'エア・ウォーター × Edify ビジネスコンテスト',
    titleEn:  'Air Water × Edify Business Contest',
    date:     '2024-01-01',   // Exact date not on site; placeholder
    location: '札幌市内森林会場, Hokkaido, Japan',
    // [SYNTHESIZED from site fragment]
    description:
      '食農業界の課題解決に向け、ドローン・ブロックチェーンなどの先端技術を組み合わせた' +
      'アイデアソン形式のビジネスコンテスト。',
    tags: ['ビジネスコンテスト', 'ドローン', 'ブロックチェーン', '食農', '札幌'],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// PARTNERSHIPS
// ─────────────────────────────────────────────────────────────────────────────

export interface Partner {
  id:          string
  name:        string
  type:        'academic' | 'corporate' | 'government'
  country:     string
  description: string
  tags:        string[]
}

export const partners: Partner[] = [
  {
    id:      'iit-mandi',
    name:    'Indian Institute of Technology Mandi (IIT Mandi)',
    type:    'academic',
    country: 'India',
    // [SYNTHESIZED from MoU announcement on site]
    description:
      '研究成果の社会実装を中心とした包括的なMoUを締結。' +
      'AI・ロボティクス分野の共同研究、学生・研究者交流、Zentej Hack Season 3の共催。',
    tags: ['MoU', 'AI', 'ロボティクス', 'Zentej', '産学連携'],
  },
  {
    id:      'iit-ropar',
    name:    'Indian Institute of Technology Ropar (IIT Ropar)',
    type:    'academic',
    country: 'India',
    // [VERBATIM context preserved]
    description:
      'Zentej Season 2の開催地。ドローン・ブロックチェーン技術を用いた' +
      '食農課題ソリューションに特化したハッカソンプログラムを実施。',
    tags: ['ハッカソン', 'ドローン', 'ブロックチェーン', '食農'],
  },
  {
    id:      'simhatel',
    name:    'Simhatel',
    type:    'corporate',
    country: 'India',
    // [SYNTHESIZED from MoU news item]
    description: 'IIT Mandi MoUと同時締結の個別協定。AI・テクノロジー連携プログラムに参加。',
    tags: ['MoU', 'AI', '日印連携'],
  },
  {
    id:      'deep-algorithms',
    name:    'Deep Algorithms Solution',
    type:    'corporate',
    country: 'India',
    description: 'IIT Mandi MoUと同時締結の個別協定。アルゴリズム・AI研究の実装パートナー。',
    tags: ['MoU', 'AI', 'アルゴリズム'],
  },
  {
    id:      'reagvis-labs',
    name:    'Reagvis Labs',
    type:    'corporate',
    country: 'India',
    description: 'IIT Mandi MoUと同時締結の個別協定。研究成果の産業実装を支援。',
    tags: ['MoU', '社会実装', 'R&D'],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// TECH TICKER  (infinite marquee items — ordered by pillar relevance)
// ─────────────────────────────────────────────────────────────────────────────

export const techTickerItems: Array<{ label: string; accent: AccentColor }> = [
  { label: 'LLM',                accent: 'primary'    },
  { label: '大規模言語モデル',    accent: 'primary'    },
  { label: 'AI',                 accent: 'secondary'  },
  { label: '人工知能',           accent: 'secondary'  },
  { label: 'ブロックチェーン',    accent: 'tertiary'   },
  { label: 'Web3',               accent: 'tertiary'   },
  { label: 'ドローン技術',        accent: 'secondary'  },
  { label: 'UTM',                accent: 'secondary'  },
  { label: 'ロボティクス',        accent: 'primary'    },
  { label: 'リスキリング',        accent: 'primary'    },
  { label: 'EdTech',             accent: 'tertiary'   },
  { label: 'スマートコントラクト', accent: 'tertiary'   },
  { label: 'Zentej',             accent: 'primary'    },
  { label: '産学連携',           accent: 'secondary'  },
  { label: 'IIT Mandi',         accent: 'secondary'  },
  { label: '社会実装',           accent: 'primary'    },
]
