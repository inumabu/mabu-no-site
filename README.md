# INUMABU Portfolio

設計・実装・検証を一つの流れとして見せる、Cloudflare Pages向けの静的ポートフォリオです。

## ローカル実行

```bash
npm run verify
npm run dev
```

`http://localhost:8788` を開きます。

## Cloudflare Pages設定

- **Framework preset**: None
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/`
- **Node.js**: 18以上
- **Functions**: Hono（`functions/[[path]].ts`）

GitHubリポジトリをCloudflare Pagesに接続する場合は、`main` ブランチへのPushをデプロイ対象にします。静的サイトのため、Workersやデータベースは不要です。

## デザイン方針

- **Movement**: 編集部のケーススタディ × インタラクティブなインディーWeb
- **Palette**: 墨色を土台に、蛍光イエローを意図、青を思考、オレンジを行動のサインとして使用
- **Layout**: 中央寄せのカード一覧ではなく、余白のある縦長エディトリアル構成
- **Typography**: 日本語の太い見出しと、Space Grotesk / DM Monoの技術的なメタ情報
- **Interaction**: 作品フィルター、モバイルメニュー、Reduced Motion対応

## 公開前に差し替える項目

- `public/index.html` の表示名、自己紹介、メールアドレス
- GitHubプロフィールURLと各プロジェクトURL
- `2026 / TOKYO` などのプロフィール情報

## Hono API

Cloudflare Pages Functionsで以下を提供します。

```text
GET /api/health
GET /api/profile
GET /api/projects
```

ローカルでPages Functionsまで含めて起動する場合は `npm run dev` を使用します。
