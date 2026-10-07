import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'

type Bindings = { ASSETS: Fetcher }
const app = new Hono<{ Bindings: Bindings }>()

const projects = [
  { name: 'Yanagi', category: 'ecosystem', description: 'Discord Bot Ecosystemの統合基盤。API、Bot、TTS、Dashboard、運用基盤を分離', stack: ['TypeScript', 'Cloudflare Workers', 'Hono', 'discord.js', 'React/Vite', 'Docker'], url: 'https://github.com/inumabu/yanagi' },
  { name: 'Mojule', category: 'ai', description: '知識・機能・推論を組み合わせるモジュール型AIエージェント', stack: ['TypeScript', 'React', 'Vite', 'Express'], url: 'https://github.com/inumabu/mojule' },
  { name: 'Touwa Editor', category: 'desktop', description: 'Windowsを主要対象とするデスクトップコードエディタのFoundation', stack: ['Electron', 'React', 'TypeScript', 'Monaco Editor'], url: 'https://github.com/inumabu/touwa-editor' },
  { name: 'Java Learning Support', category: 'education', description: 'Java学習支援WebサイトのSkeleton。Web、DB、Docker、CIの基盤を整備', stack: ['Java 21', 'Spring Boot', 'Thymeleaf', 'Oracle'], url: 'https://github.com/inumabu/java-learning-support' },
  { name: 'MabuBot', category: 'bot', description: 'AI、経済、ゲーム、イベント、管理、Voiceなどをまとめた多機能DiscordコミュニティBot', stack: ['TypeScript', 'discord.js'], url: 'https://github.com/inumabu/mabubot' },
  { name: 'Yomiage', category: 'bot', description: 'Discordの投稿をVOICEVOXで読み上げるBot。キューや話者・音量・速度を制御', stack: ['Go', 'discordgo', 'VOICEVOX'], url: 'https://github.com/inumabu/yomiage' },
  { name: 'AsobiBot', category: 'bot', description: 'おみくじ、サイコロ、じゃんけん、4択クイズを楽しめるDiscord Bot', stack: ['Python', 'discord.py'], url: 'https://github.com/inumabu/asobibot' },
  { name: 'Kokoneads', category: 'developer-tools', description: 'JSON、文字列、URL、Markdownなどを扱う開発者向けWebツールサイト', stack: ['Ruby', 'Rails', 'SQLite', 'JavaScript'], url: 'https://github.com/inumabu/kokoneads' },
  { name: 'Aurora Sauce Language', category: 'language', description: 'オーロラソースをテーマにした学習用プログラミング言語処理系', stack: ['Python 3.11+'], url: 'https://github.com/inumabu/aurorasauce' },
]

app.get('/api/health', (c) => c.json({ ok: true, service: 'inumabu-portfolio', runtime: 'hono-cloudflare-pages' }))
app.get('/api/profile', (c) => c.json({ name: 'inumabu', displayName: 'まぶ / Mabu', bio: '🛠️ なんでも作る個人開発者', description: 'Webアプリ、Discord Bot、AI、開発者向けツール、デスクトップアプリ、プログラミング言語など、「作ってみたい」を実際に動くものへ変えています。', focus: ['Web apps / Websites', 'Discord bots / Community tools', 'AI agents / LLM experiments', 'Developer tools / Utilities', 'Desktop applications', 'Voice / Audio projects', 'Programming languages / Experiments'], howIWork: ['作りたい', '試す', '動かす', '使ってみる', '改善する'], github: 'https://github.com/inumabu', publicRepositories: 12 }))
app.get('/api/projects', (c) => c.json({ projects, source: 'https://github.com/inumabu', synchronizedFrom: 'https://github.com/inumabu/inumabu' }))

// API以外はPagesの静的アセットへ委譲する。
app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export const onRequest = handle(app)
