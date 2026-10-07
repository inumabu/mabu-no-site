import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'

type Bindings = { ASSETS: Fetcher }
const app = new Hono<{ Bindings: Bindings }>()

const projects = [
  { name: 'Mabu No Site', category: 'site', description: '設計・実装・検証を一つの流れとして見せるCloudflare Pages向けの静的ポートフォリオ', stack: ['HTML', 'JavaScript', 'Cloudflare Pages', 'Hono'], url: 'https://github.com/inumabu/mabu-no-site' },
  { name: 'Yanagi', category: 'ecosystem', description: 'Discord Botを支える統合エコシステム基盤', stack: ['TypeScript', 'Cloudflare Workers', 'Hono', 'discord.js', 'React/Vite', 'Docker'], url: 'https://github.com/inumabu/yanagi' },
  { name: 'MabuBot', category: 'bot', description: 'コミュニティを楽しく便利にするDiscord Bot', stack: ['TypeScript', 'discord.js'], url: 'https://github.com/inumabu/mabubot' },
  { name: 'Mojule', category: 'ai', description: '知識と機能を組み合わせるモジュール型AIエージェント', stack: ['TypeScript', 'React', 'Vite', 'Express'], url: 'https://github.com/inumabu/mojule' },
  { name: 'Touwa Editor', category: 'desktop', description: 'Windows向けのモダンなデスクトップコードエディタ', stack: ['Electron', 'React', 'TypeScript', 'Monaco Editor'], url: 'https://github.com/inumabu/touwa-editor' },
  { name: 'Yomiage', category: 'bot', description: 'Discordの会話をVOICEVOXで読み上げるBot', stack: ['Go', 'discordgo', 'VOICEVOX'], url: 'https://github.com/inumabu/yomiage' },
  { name: 'AsobiBot', category: 'bot', description: 'みんなで遊べる日本語向けDiscord Bot', stack: ['Python', 'discord.py'], url: 'https://github.com/inumabu/asobibot' },
  { name: 'Kokoneads', category: 'tools', description: '日常の開発作業を効率化するWebツール集', stack: ['HTML', 'Ruby', 'Rails', 'JavaScript', 'SQLite'], url: 'https://github.com/inumabu/kokoneads' },
  { name: 'Java Learning Support', category: 'education', description: 'Javaを学ぶためのWeb学習支援サイト', stack: ['Java 21', 'Spring Boot', 'Thymeleaf', 'Oracle'], url: 'https://github.com/inumabu/java-learning-support' },
  { name: 'Aurora Sauce Language', category: 'language', description: '料理をテーマにした学習用プログラミング言語', stack: ['Python 3.11+'], url: 'https://github.com/inumabu/aurorasauce' },
]

app.get('/api/health', (c) => c.json({ ok: true, service: 'inumabu-portfolio', runtime: 'hono-cloudflare-pages' }))
app.get('/api/profile', (c) => c.json({
  username: 'inumabu',
  displayName: 'まぶ / Mabu',
  bio: '🛠️ なんでも作る個人開発者',
  location: 'Gunma, Japan',
  email: 'wanko.marble@gmail.com',
  links: {
    github: 'https://github.com/inumabu',
    x: ['https://x.com/xx_mabu_xx', 'https://x.com/i_mabu_'],
  },
  description: 'Webアプリ、Discord Bot、開発者向けツール、ゲーム、実験的なプロジェクトまで。TypeScript・Python・Go・Rubyを中心に、作りたいものを形にしています。',
  focus: ['Web apps / Websites', 'Discord bots / Community tools', 'Developer tools / Utilities', 'Games / Interactive projects', 'Voice / Audio related projects', 'Experiments / Prototypes'],
  howIWork: ['作りたい', '試す', '動かす', '使ってみる', '改善する'],
  publicProjects: 10,
  publicRepositories: 11,
  archivedRepositories: 1,
}))
app.get('/api/projects', (c) => c.json({
  projects,
  source: 'https://github.com/inumabu',
  synchronizedFrom: 'https://github.com/inumabu/inumabu',
  synchronizedAt: '2026-10-07',
  activePublicProjects: projects.length,
}))

app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export const onRequest = handle(app)
