import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'

type Bindings = { ASSETS: Fetcher }
const app = new Hono<{ Bindings: Bindings }>()

const projects = [
  { name: 'Yanagi', category: 'ecosystem', stack: ['TypeScript', 'Hono', 'Cloudflare Workers', 'discord.js'], url: 'https://github.com/inumabu/yanagi' },
  { name: 'Mojule', category: 'ai', stack: ['TypeScript', 'React', 'Vite', 'Express'], url: 'https://github.com/inumabu/mojule' },
  { name: 'Touwa Editor', category: 'desktop', stack: ['Electron', 'React', 'Monaco Editor'], url: 'https://github.com/inumabu/touwa-editor' },
  { name: 'Java Learning Support', category: 'education', stack: ['Java 21', 'Spring Boot', 'Thymeleaf', 'Oracle'], url: 'https://github.com/inumabu/java-learning-support' },
  { name: 'MabuBot', category: 'bot', stack: ['TypeScript', 'discord.js'], url: 'https://github.com/inumabu/mabubot' },
  { name: 'Yomiage', category: 'bot', stack: ['Go', 'discordgo', 'VOICEVOX'], url: 'https://github.com/inumabu/yomiage' },
  { name: 'AsobiBot', category: 'bot', stack: ['Python', 'discord.py'], url: 'https://github.com/inumabu/asobibot' },
  { name: 'Aurora Sauce Language', category: 'language', stack: ['Python'], url: 'https://github.com/inumabu/aurorasauce' },
]

app.get('/api/health', (c) => c.json({ ok: true, service: 'inumabu-portfolio', runtime: 'hono-cloudflare-pages' }))
app.get('/api/profile', (c) => c.json({ name: 'まぶ / Mabu', handle: 'inumabu', bio: '🛠️ なんでも作る個人開発者', github: 'https://github.com/inumabu', publicRepositories: 12 }))
app.get('/api/projects', (c) => c.json({ projects, source: 'https://github.com/inumabu' }))

// API以外はPagesの静的アセットへ委譲する。
app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export const onRequest = handle(app)
