/**
 * 中文词典。
 * key 结构与 ko.ts 完全一致，缺失的 key 会自动回退到韩文。
 * [方括号] 内的值为占位符，上线前需替换为真实资料。
 */
import type { Dictionary } from './ko';

const zh: Dictionary = {
  meta: {
    siteName: 'IUYU',
    defaultTitle: '硅胶保护套 OEM/ODM 制造商',
    defaultDescription:
      'IUYU 是专业从事电子烟设备硅胶保护套、收纳袋的 OEM/ODM 制造商。结构设计、模具制作、LSR 液态硅胶注塑、品牌包装均在自有产线完成。',
    keywords: [
      '硅胶保护套制造',
      '保护壳 OEM',
      '保护套 ODM',
      '硅胶注塑',
      'LSR 液态硅胶',
      '模具设计',
      '电子烟配件制造',
      '收纳袋制造',
      '硅胶套工厂',
      'IUYU',
    ],
  },

  nav: [
    { href: '/', label: '首页' },
    { href: '/capabilities/', label: '制造实力' },
    { href: '/products/', label: '产品线' },
    { href: '/oem/', label: '代工流程' },
    { href: '/about/', label: '公司介绍' },
    { href: '/social/', label: '社交渠道' },
    { href: '/contact/', label: '询价' },
  ],

  brand: {
    role: '电子烟配件 OEM/ODM 制造商',
    description:
      'IUYU 是专业从事电子烟设备硅胶保护套、收纳袋的 OEM/ODM 制造商。结构设计、模具制作、自有注塑产线、品牌产品企划均在一处完成。',
    tagline: '一只硅胶套，从设计到量产。',
    subline: 'SILICONE CASE MFG.',
    hours: '周一至周五 09:00 – 18:00（韩国时间）',
    since: '2016',
  },

  gate: {
    eyebrow: 'BUSINESS SCOPE',
    titleLine1: 'IUYU 是',
    titleAccent: '硅胶配件制造商',
    titleLine2: '。',
    scopeTitle: '经营范围',
    scopeItems: ['硅胶保护套', '收纳袋 / 握把套', '设备防护配件'],
    outOfScopeTitle: '不涉及的产品',
    outOfScopeItems: ['尼古丁烟油 / 烟弹 / 补充装', '设备整机'],
    body:
      '本站是硅胶配件的制造与供应渠道。本站信息面向 19 岁以上成年人。',
    accept: '我已了解',
    privacyNote: '该确认记录仅保存在您的浏览器中，不会上传至服务器。',
  },

  hero: {
    chips: ['OEM / ODM', '自有模具 · 注塑产线'],
    h1Line1: '一只硅胶套，',
    h1Accent: '从设计到量产',
    h1Line2: '都在一处完成。',
    lede:
      '我们专注电子烟设备硅胶保护套、收纳袋的制造。结构设计、模具制作、注塑成型、品牌包装全部在厂内完成。没有图纸也没关系，提供实物样品即可启动。',
    ctaPrimary: '索取报价',
    ctaSecondary: '查看制造实力',
    facts: [
      { k: '主体尺寸', v: '96 × 53.5 × 29 mm', d: '含烟嘴套整体 111 mm' },
      { k: '结构', v: '硅胶保护套 + 挂绳', d: '挂绳 44 cm · 可拆卸' },
      { k: '自有工序', v: '设计 → 模具 → 注塑', d: '全部厂内完成' },
    ],
    productAlt: '硅胶保护套与挂绳实物照片 — IUYU 制造',
    dimW: '53.5',
    dimH: '96',
    dimTotal: '111',
  },

  summaryBand: [
    { k: '生产模式', v: 'OEM · ODM', d: '客户设计 / 自有设计' },
    { k: '厂内工序', v: '设计 → 模具 → 注塑', d: '不外包' },
    { k: '材料', v: 'LSR · HCR 硅胶', d: 'PC/TPU 双色注塑' },
    { k: '覆盖范围', v: '试产 → 量产', d: '支持出口包装' },
  ],

  capabilities: {
    eyebrow: 'CAPABILITIES',
    h2Line1: '不只是说自己能做什么，',
    h2Line2: '而是说清楚哪些环节自己做到。',
    lede: '设计、开模、注塑都不外包。每一道工序换一家供应商，交期和品质就会失控。',
    items: [
      {
        id: 'oem',
        no: '01',
        title: 'OEM / ODM 生产',
        titleEn: 'OEM / ODM Manufacturing',
        lead: '按您的设计做，也按我们的设计做。',
        body:
          '同时承接 OEM（按客户图纸、样品生产）与 ODM（将 IUYU 已积累的设计资产以客户品牌供货）。针对多款设备机型已有验证过的模具，可缩短初期开发周期。',
        points: [
          '基于客户图纸 / 样品的 OEM 生产',
          '基于 IUYU 设计资产的 ODM 供货',
          '小批量试产验证后转量产',
          '客户品牌包装与标签',
        ],
      },
      {
        id: 'design',
        no: '02',
        title: '结构设计 · 模具设计',
        titleEn: 'Structural & Mold Design',
        lead: '从 3D 建模到模具设计，都在厂内完成。',
        body:
          '流程为：设备实测 → 3D 扫描 → 结构设计 → 模流分析 → 模具设计。磁吸扣合、开合结构、滑块抽芯等保护套特有的结构问题，由厂内设计团队直接评审。',
        points: [
          '设备实测与 3D 扫描',
          '3D 建模（SolidWorks / NX）',
          '注塑模流分析（Moldflow）',
          '模具结构设计与修改配合',
        ],
      },
      {
        id: 'mold',
        no: '03',
        title: '自有模具 · 注塑产线',
        titleEn: 'In-house Mold & Injection',
        lead: '模具加工与注塑不外发。',
        body:
          '自有模具加工设备与注塑机，模具修改与量产在同一条线上管理。试模结果可以立即反馈到模具，因此开发周期短。',
        points: [
          '自有模具加工设备',
          '自有注塑机（含 LSR 产线）',
          '试模 → 尺寸验证 → 修模的循环配合',
          '量产数量变动时的灵活响应',
        ],
      },
      {
        id: 'brand',
        no: '04',
        title: '自有品牌产品企划',
        titleEn: 'Own-brand Product Development',
        lead: '把已验证的设计资产交给您的品牌。',
        body:
          'IUYU 拥有自主企划并验证过的保护套产品线。新品牌启动时，可直接在已验证产品上应用客户品牌，省去设计与开模环节，显著缩短交期。',
        points: [
          '已完成验证的保护套设计资产',
          '品牌标签与包装定制',
          '按机型提供的适配验证数据',
          '颜色与质感定制',
        ],
      },
    ],
  },

  materials: {
    eyebrow: 'MATERIAL',
    h2: '硅胶这件事，0.2 毫米就分胜负。',
    lede: '保护套的全部在于手感、回弹性，以及不夹伤设备的精度。IUYU 按用途区分硅胶体系。',
    grades: [
      {
        k: 'LSR',
        v: '液态硅胶',
        d: '用于需要精密尺寸与透明度的薄壁保护套。注塑在自有产线完成。',
        temp: '耐温 −50 ~ 200 ℃',
      },
      {
        k: 'HCR',
        v: '固态硅胶',
        d: '用于需要回弹性与抗撕裂强度的加厚收纳袋、握把套。',
        temp: '抗撕裂强度 [数值] N/mm',
      },
      {
        k: 'PC / TPU',
        v: '硬软复合',
        d: '通过双色注塑将硅胶与硬质树脂结合，兼顾形状保持与握持感。',
        temp: '支持双色注塑',
      },
    ],
    finishesLabel: 'FINISH OPTIONS',
    finishes: [
      { k: '哑光', v: 'Matte', d: '默认表面处理，不留指纹。采用硅油涂层。' },
      { k: '柔感', v: 'Soft-touch', d: '提升防滑性的表面。用于需要握持感的形态。' },
      { k: '亮面', v: 'Glossy', d: '高光处理。色彩表现鲜明，适合呈现品牌色。' },
      { k: '压纹', v: 'Embossed', d: '图案压纹。可用于品牌元素或 logo 立体标识。' },
    ],
    note: '※ 表面质感由模具放电纹与涂层工艺决定。索取样品时会附上实际质感样板。',
  },

  process: {
    eyebrow: 'PROCESS',
    h2: '从询价到量产，按这个顺序推进。',
    steps: [
      { no: '01', t: '询价 · 沟通', d: '告知设备型号、期望形态、预估数量，我们会回复可行性与预估周期。', dur: '1–2 天' },
      { no: '02', t: '设计 · 3D 建模', d: '对设备实测或依据图纸建立 3D 模型，并同步给出结构评审结果。', dur: '[周期]' },
      { no: '03', t: '模具制作', d: '在厂内模具产线制作。确认模具结构与进胶位置后开始加工。', dur: '[周期]' },
      { no: '04', t: '试模 · 验证', d: '以试模样品确认尺寸与扣合手感。必要时修模后重新验证。', dur: '[周期]' },
      { no: '05', t: '量产 · 出货', d: '按确认样品量产，检验后包装出货。支持品牌包装。', dur: '[周期]' },
    ],
  },

  equipment: {
    eyebrow: 'EQUIPMENT',
    h2: '设备情况',
    lede: '模具加工与注塑均在自有产线完成。以下数值请替换为实际台数。',
    items: [
      { k: '注塑机', v: '[台数]', d: '[吨位范围]' },
      { k: '模具加工', v: '[台数]', d: 'CNC · 线切割 · 放电' },
      { k: '检测', v: '[台数]', d: '三坐标 · 卡尺 · 硬度计' },
      { k: '试模', v: '[台数]', d: '专用于模具验证' },
    ],
    note: '※ 以上为占位数据，请替换为实际台数与吨位。',
  },

  qa: {
    eyebrow: 'QUALITY',
    h2: '出货前检验项目',
    lede: '为了让量产与确认样品保持同一标准，以下项目按批次确认。',
    checks: [
      { k: '尺寸', d: '三坐标测量关键尺寸，确认进胶口与分型面' },
      { k: '扣合', d: '磁铁拉力、反复开合耐久确认' },
      { k: '外观', d: '目视检查流痕、毛边、异物、色差' },
      { k: '材料', d: '硬度（邵氏 A）、拉伸强度确认' },
      { k: '装配', d: '装入实际设备后确认干涉与间隙' },
      { k: '包装', d: '标签、数量、包装状态确认' },
    ],
    certsTitle: '认证情况',
    certsNote: '请替换为实际持有的证书扫描件。无法提供证明的项目，建议直接从列表中删除。',
    certs: [
      { k: 'ISO 9001', v: '是否持有待确认' },
      { k: 'ISO 14001', v: '是否持有待确认' },
      { k: 'RoHS / REACH', v: '可提供材料检测报告' },
      { k: 'FDA / LFGB', v: '需要食品接触级时可配合' },
      { k: 'BSCI / Sedex', v: '是否持有待确认' },
    ],
  },

  lines: {
    eyebrow: 'PRODUCT LINES',
    h2: '可承接的产品形态',
    lede: '以下四条产品线覆盖大部分需求。形态尚未确定时，提供参考图也可以先沟通。',
    items: [
      { id: 'shell', name: 'Shell Series', nameKo: '硅胶保护套', desc: '包裹设备本体的超薄硅胶保护套。屏幕区域开放，侧边按键与充电口均可正常使用。', specs: ['主体 96 × 53.5 × 29 mm 基准', '含烟嘴套整体 111 mm', '哑光硅胶 · 防指纹', '颜色可定制'] },
      { id: 'lanyard', name: 'Lanyard Series', nameKo: '挂绳', desc: '可将设备挂在颈部的可拆卸挂绳，扣在保护套侧边的挂环上。', specs: ['总长 44 cm', '可拆卸挂环', '硅胶防滑扣', '可选金属配件'] },
      { id: 'mouthpiece', name: 'Mouthpiece Cover', nameKo: '烟嘴套', desc: '覆盖烟嘴部分的小型保护套，兼顾卫生与防护。', specs: ['15 × 25 × 14 mm 基准', '卫生防护', '可拆卸结构', '颜色配套'] },
      { id: 'custom', name: 'Custom Development', nameKo: '定制开发', desc: '基于客户图纸或实物样品的新品开发。从实测到开模、量产一体承接。', specs: ['3D 扫描 / 实测', '新开模具', '试模验证', '转入量产'] },
    ],
  },

  factory: {
    eyebrow: 'FACILITY',
    h2: '设备与产线，直接给您看。',
    lede: '以下照片均拍摄于我们自有生产车间：无尘检验、组装称重、自动化设备、出货暂存区、样品展示间。',
    note: '※ 员工面部已做隐私处理。',
    items: [
      { src: '/assets/factory-cleanroom-inspection.jpg', cap: '无尘车间检验', d: '在洁净室内完成外观与尺寸检查。', ratio: 1.33 },
      { src: '/assets/factory-assembly-station.jpg', cap: '组装 · 称重', d: '称重与组装在同一工位完成。', ratio: 1.33 },
      { src: '/assets/factory-equipment-detail.jpg', cap: '自动化设备', d: '含 IPQC 检验区的自动化产线。', ratio: 1.33 },
      { src: '/assets/factory-warehouse.jpg', cap: '出货暂存', d: '已检验产品等待发运的区域。', ratio: 1.33 },
      { src: '/assets/factory-showroom.jpg', cap: '样品展示间', d: '模具资产与表面处理样品常设陈列。', ratio: 1.33 },
      { src: '/assets/factory-showroom-side.jpg', cap: '样品展示间（侧视）', d: '按客户分类留存的验证样品。', ratio: 1.33 },
    ],
    cta: '咨询设备与产能',
    stat: [
      { k: '生产车间', v: '自有产权' },
      { k: '洁净室', v: '检验 · 组装' },
      { k: '自动化', v: '含 IPQC' },
    ],
  },

  stats: {
    eyebrow: 'AT A GLANCE',
    items: [
      { k: '行业年限', v: '[年数]', d: '硅胶注塑经验' },
      { k: '适配机型', v: '[机型数]', d: '已持有验证模具' },
      { k: '月产能', v: '[数量]', d: '量产口径' },
      { k: '出口国家', v: '[国家数]', d: 'OEM 供货记录' },
    ],
    note: '※ 以上为占位数据，请替换为真实业绩。',
  },

  howToStart: {
    eyebrow: 'HOW TO START',
    h2: '启动项目，只需要告诉我们三件事。',
    items: [
      { k: '设备型号', d: '需要适配的机型名称，或实测尺寸（宽 · 厚 · 高）' },
      { k: '期望形态', d: '保护套 / 收纳袋 / 握把套，以及参考图' },
      { k: '预估数量', d: '首次数量与月用量（小批量试产也可以谈）' },
    ],
    note: '没有图纸或 3D 数据也可以沟通。寄实物样品过来，我们实测后提出设计方案。',
    cta: '索取报价',
  },

  scope: {
    title: '经营范围与声明',
    inTitle: '我们制造与供应的产品',
    inBody:
      '电子烟设备用硅胶保护套、收纳袋、握把套及设备防护配件。以 OEM/ODM 方式对 B 端供货为主，也接受少量个人购买咨询。',
    outTitle: '我们不制造也不销售的产品',
    outBody:
      '尼古丁烟油、烟弹、补充装，以及加热不燃烧型与雾化型设备整机。相关品类一律不涉及，也不做线上销售与广告。',
    footer:
      '本站是 B2B 制造询价渠道，所载信息面向企业客户。产品图片均为实际生产产品实拍，规格可能随协商调整。标注为占位的数据将在确认后更新。',
  },

  retail: {
    text: '如需单独购买，可通过下方联系方式与我们沟通。',
    cta: '通过渠道联系我们',
  },

  cta: {
    eyebrow: 'START A PROJECT',
    h2Line1: '告诉我们机型与形态就可以，',
    h2Line2: '其余由我们评审后回复。',
    body: '没有图纸也行。寄实物样品过来，我们实测后一并给出设计方案与预估周期。',
    primary: '索取报价',
    secondary: '详细了解制造实力',
    note: '通常在 1–2 个工作日内回复',
  },

  faq: {
    eyebrow: 'FAQ',
    h2: '常见问题',
    items: [
      { q: '最小起订量（MOQ）是多少？', a: '为 [MOQ]。需要新开模具的开发单与沿用现有模具的订单，起订量不同，询价时会分别说明。' },
      { q: '你们也生产设备整机吗？', a: '不生产。IUYU 只生产保护套、收纳袋、握把套等配件。尼古丁烟油、烟弹、补充装、设备整机均不涉及。' },
      { q: '模具归谁所有？', a: '客户承担开模费用的，模具所有权归客户。保管与移交方式在合同中约定。' },
      { q: '开发周期多久？', a: '新开模具大约 [周期]。若可沿用 IUYU 已有设计资产，无需开模，[周期] 内可供货。' },
      { q: '可以先拿样品吗？', a: '可以。已有模具的机型可直接寄样；新开发项目在试模阶段即可确认样品。' },
      { q: '支持出口订单吗？', a: '支持。我们有出口包装、标签、单据的处理经验，也可按目的国要求安排材料检测报告。' },
      { q: '能提供硅胶材料检测报告吗？', a: 'RoHS、REACH 等可按要求出具。询价时请告知具体需要哪些项目。' },
      { q: '可以调色和做 logo 吗？', a: '可以。支持 Pantone 对色，以及压纹、印刷方式的 logo 标识。' },
    ],
  },

  pages: {
    capabilities: {
      title: '制造实力 — 设计 · 开模 · LSR 注塑自有产线',
      description:
        'IUYU 的制造能力：结构设计与 3D 建模、模具设计制作、LSR/HCR 硅胶注塑、双色注塑、出货检验，均在自有产线完成。含设备情况与检验项目。',
      h1Line1: '从设计到出货，',
      h1Line2: '在同一条产线完成。',
      lede:
        '硅胶保护套一旦设计与注塑分家，必然出问题。0.2 毫米的壁厚差异就会改变扣合手感，进胶位置差一点表面就会留下流痕。IUYU 的设计团队与注塑团队在同一栋楼，反馈当天就能回来。',
      materialTableHead: ['体系', '名称', '适用'],
      specTable: [
        ['主体尺寸', '96 × 53.5 × 29 mm'],
        ['烟嘴套', '15 × 25 × 14 mm'],
        ['整体高度', '111 mm（含烟嘴套）'],
        ['挂绳长度', '44 cm'],
        ['材质', '硅胶（哑光 · 防指纹）'],
        ['连接', '可拆卸挂绳扣'],
      ],
      ctaPrimary: '索取报价',
      ctaSecondary: '查看代工流程',
      processH2: '推进顺序',
      durLabel: '周期',
    },
    products: {
      title: '产品线 — 保护套 · 收纳袋 · 握把套 · 定制开发',
      description:
        'IUYU 制造的四种产品形态：硅胶保护套（Shell）、收纳袋（Pouch）、握把套（Grip）、定制开发。按形态列出材料、表面处理与定制选项。',
      h1Line1: '四种形态，',
      h1Line2: '覆盖大部分需求。',
      lede:
        '以下是我们实际在量产的形态。如果您有图纸或参考图，也可以从零设计新形态。价格取决于形态、数量与模具条件，因此按询价单独报价。',
      galleryH2: '产品实拍',
      galleryLede: '均为实际生产产品实拍，可确认形态与表面处理状态。',
      views: [
        { src: '/assets/view-full-set.png', cap: '全套配置', note: '两种保护套 + 三条挂绳', ratio: 0.66 },
        { src: '/assets/hero-product.png', cap: '保护套特写', note: '开合一对', ratio: 1.59 },
        { src: '/assets/lanyard-a.png', cap: '挂绳 A', note: '环形 · 可拆卸', ratio: 1.48 },
        { src: '/assets/lanyard-b.png', cap: '挂绳 B', note: '含防滑扣', ratio: 1.84 },
      ],
      finishH2: '表面处理选项',
      finishNote: '※ 表面质感由模具放电纹与涂层工艺决定。索取样品时会附上实际质感样板。',
      customH2: '可定制范围',
      customRows: [
        ['形态', '基于客户图纸的新设计、沿用现有模具、局部形态调整'],
        ['颜色', 'Pantone 对色。考虑硅胶特性，目标控制在 ±ΔE 1.0 以内'],
        ['表面', '哑光 / 柔感 / 亮面 / 压纹图案'],
        ['Logo', '压纹标识、丝印、贴标'],
        ['扣合', '磁铁数量与位置调整，滑块或卡扣结构选择'],
        ['包装', '客户品牌盒、胶袋、标签、出口包装'],
        ['附件', '备用磁铁、超细纤维袋、说明书随附'],
      ],
    },
    oem: {
      title: 'OEM/ODM 流程 — 从询价到量产',
      description:
        'IUYU 的 OEM/ODM 流程分步说明：询价沟通 → 设计 3D 建模 → 模具制作 → 试模验证 → 量产出货。含各阶段所需资料与周期。',
      h1Line1: '从询价到量产，',
      h1Line2: '分五个阶段推进。',
      lede:
        '每个阶段都设置了确认与签样节点。中途改方向就要重新开模，所以我们在设计阶段把评审做到最充分。',
      durLabel: '周期',
      stepsNote:
        '※ [周期] 为占位内容，请替换为实际开发周期。沿用现有模具的项目可跳过 02–04 阶段，直接进入量产。',
      contractH2: '合同中需要确认的事项',
      contracts: [
        { k: '模具所有权', d: '客户承担开模费用的，模具所有权归客户。保管与移交方式由合同约定。' },
        { k: '保密（NDA）', d: '客户图纸与 3D 数据按保密信息处理。要求时可先签署 NDA 再接收资料。' },
        { k: 'MOQ', d: '新开模具的开发单与沿用现有模具的订单，起订量不同，询价时分别说明。' },
        { k: '品质标准', d: '以确认的试模样品作为量产标准。偏离标准时以返工或重做处理。' },
        { k: '付款条件', d: '模具费与量产费分开结算。具体条件按项目规模协商。' },
        { k: '交期', d: '根据签样时点与数量确定。旺季可能需要提前排期。' },
      ],
      ipLink: '查看知识产权政策全文',
    },
    about: {
      title: '公司介绍 — 硅胶保护套专业制造商 IUYU',
      description:
        'IUYU 是专业从事电子烟设备硅胶保护套、收纳袋制造的厂商。含经营范围、自有能力、设备情况与公司信息。',
      h1Line1: '把一种材料，',
      h1Line2: '做了很多年。',
      paragraphs: [
        'IUYU 专业生产电子烟设备的防护配件。保护套是个小东西，但真的做好，需要材料配方、模具精度、注塑条件同时到位。壁厚差 0.2 毫米扣合手感就变了，进胶位置不对表面就会留下流痕。',
        '所以我们没有把设计和注塑分开。结构设计团队与注塑团队在同一条线上，试模结果当天就能变成设计修改。这个迭代速度，才是开发周期短的真正原因。',
        '我们同时承接 OEM（按客户图纸生产）和 ODM（把 IUYU 已验证的设计资产以客户品牌供货）。准备做新品牌的话，后者能大幅缩短交期。',
      ],
      scopeLabel: '经营范围',
      scopeBody:
        '硅胶保护套 · 收纳袋 · 握把套 · 设备防护配件的 OEM/ODM 制造。不涉及尼古丁烟油、烟弹、补充装与设备整机。',
      capLabel: '自有能力',
      bizH2: '公司信息',
      bizRows: [
        ['商号（韩）', 'companyKo'],
        ['商号（英）', 'companyEn'],
        ['代表人', 'ceo'],
        ['营业执照号', 'bizNo'],
        ['本社 · 工厂', 'address'],
        ['办事处', 'addressOffice'],
        ['业务咨询', 'email'],
        ['电话', 'tel'],
        ['工作时间', 'hours'],
      ],
    },
    contact: {
      title: '索取报价 — OEM/ODM 咨询',
      description:
        '硅胶保护套、收纳袋 OEM/ODM 报价咨询。告知设备型号、期望形态与预估数量，通常在 1–2 个工作日内回复。',
      h1Line1: '只要告诉我们机型',
      h1Line2: '和期望形态就可以。',
      lede:
        '填写以下内容提交后，负责人会评审并回复。没有图纸或 3D 数据也可以沟通；寄实物样品过来，我们实测后提出设计方案。',
      formH2: '询价表单',
      formNote: '标注为必填的项目请完整填写，其余按您了解的填就好。',
      directLabel: '直接联系',
      socialLabel: '社交媒体',
      whatsappLabel: 'WhatsApp',
      whatsappCta: '通过 WhatsApp 咨询',
      salesLabel: '业务 · 报价',
      emailLabel: '邮箱',
      telLabel: '电话',
      hoursLabel: '工作时间',
      prepLabel: '建议提前准备',
      replyLabel: '回复时间',
      replyBody:
        '收到后通常在 1–2 个工作日内回复。开发类项目评审可能需要更久，这种情况下我们也会先同步进度。',
      scopeLabel: '经营范围说明',
      scopeBody:
        'IUYU 只制造硅胶保护套、收纳袋等配件。关于尼古丁烟油、烟弹、补充装、设备整机的咨询恕不接待。',
    },    social: {
      title: '社交媒体 — 硅胶保护壳制造现场',
      description:
        'IUYU 的 Instagram、TikTok、X、YouTube、Telegram 渠道汇总。产品实拍、生产现场与新品动态，可按渠道查看。',
      h1Line1: '制造现场，',
      h1Line2: '直接给您看。',
      lede:
        '我们在各渠道发布产品实拍与生产现场视频。询价之前，不妨先看看我们实际在做什么产品。各渠道侧重略有不同。',
      followLabel: '打开渠道',
      note: '各渠道更新频率可能不同。报价咨询请使用询价页面。',
    },

  },

  form: {
    company: '公司名称',
    name: '联系人',
    email: '邮箱',
    phone: '联系电话',
    country: '国家 / 地区',
    device: '目标机型',
    line: '期望形态',
    qty: '预估数量',
    message: '咨询内容',
    selectPlaceholder: '请选择',
    lineUndecided: '尚未确定（希望先沟通）',
    placeholderCompany: '例：XX 有限公司',
    placeholderName: '例：张三',
    placeholderEmail: 'name@company.com',
    placeholderPhone: '+86 138 0000 0000',
    placeholderCountry: '例：中国 / 美国',
    placeholderDevice: '机型名称，或实测尺寸（宽 · 厚 · 高）',
    placeholderQty: '例：首单 1,000 只 / 月用量 5,000 只',
    placeholderMessage: '期望形态、参考图说明、时间安排、目前进展等，都可以写在这里。',
    consent:
      '我同意收集与使用我的个人信息。所收集信息仅用于本次咨询的回复，目的达成后即销毁。详情请见隐私政策。',
    consentLink: '隐私政策',
    submit: '发送咨询',
    replyNote: '通常在 1–2 个工作日内回复',
    requiredError: '请填写所有必填项目。',
    sentNote: '如果邮件客户端没有打开，请直接发送至 {EMAIL}。表单提交后端将在部署时接入。',
    mailSubjectPrefix: '[IUYU] 报价咨询 — ',

    labels: {
      company: '公司',
      name: '联系人',
      email: '邮箱',
      phone: '电话',
      country: '国家',
      device: '机型',
      line: '形态',
      qty: '数量',
      message: '咨询内容',
    },
  },

  footer: {
    menuLabel: 'MENU',
    policyLabel: 'POLICY',
    contactLabel: 'CONTACT',
    socialLabel: 'CHANNELS',
    serviceNote:
      'IUYU 是制造与供应电子烟设备硅胶保护套、收纳袋等配件的 B2B 制造商。不制造也不销售尼古丁烟油、烟弹、补充装与设备整机。',
    rights: 'All rights reserved.',
    tagline: '电子烟配件 OEM/ODM 制造',
    bizRows: [
      ['商号', 'companyKo'],
      ['代表人', 'ceo'],
      ['营业执照号', 'bizNo'],
      ['本社 · 工厂', 'address'],
      ['办事处', 'addressOffice'],
    ],
    scopeTitle: '经营范围说明',
  },

  floating: {
    mobileTitle: 'OEM / ODM 报价咨询',
    mobileSub: '告知机型，我们即可评审',
    mobileCta: '立即咨询',
    desktopCta: '索取报价',
    whatsapp: '通过 WhatsApp 咨询',
    social: '查看社交渠道',
  },

  legal: {
    eyebrow: 'POLICY',
    updatedLabel: '最后修订日',
    otherDocsLabel: '其他文件',
    scopeLabel: '经营范围',
    scopeBody:
      'IUYU 只制造硅胶保护套、收纳袋等配件。不涉及尼古丁烟油、烟弹、补充装与设备整机。',
    cta: '索取报价',
    reviewerNote:
      '本文档基于 IUYU 的业务形态起草，待实际合同结构（模具归属、付款条件、受托方）确定后，须经法务审核并替换为最终版本。联系方式：',
    docs: {
      terms: { title: '使用条款', desc: 'IUYU B2B 网站使用条款，规定询价、合同、知识产权与责任范围。' },
      privacy: { title: '隐私政策', desc: 'IUYU 收集的咨询信息项目、使用目的、保存期限、销毁流程与信息主体权利。' },
      youth: { title: '青少年保护政策', desc: 'IUYU 的青少年保护措施，以及不涉及尼古丁产品的经营范围说明。' },
      quality: { title: '品质与索赔政策', desc: '出货检验标准、品质索赔受理流程、返工与赔偿依据。' },
      ip: { title: '知识产权政策', desc: '模具所有权、客户图纸保密义务、设计资产归属标准。' },
    },
  },

  notFound: {
    eyebrow: '404',
    h1: '页面不存在。',
    body: '地址可能已变更，或页面已被删除。请通过以下入口继续浏览。',
    home: '返回首页',
    capabilities: '制造实力',
    contact: '索取报价',
  },

  common: {
    loading: 'LOADING',
    skipToContent: '跳到正文',
    ariaMenuOpen: '打开菜单',
    ariaMenuClose: '关闭菜单',
    ariaPrimaryNav: '主导航',
    ariaMobileNav: '移动端导航',
    ariaBreadcrumb: '当前位置',
    home: '首页',
    langLabel: '语言',
  },
};

export default zh;
