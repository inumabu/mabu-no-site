# Hono Functions

Cloudflare Pages FunctionsのAPI層です。Honoを使って、以下のエンドポイントを提供します。

- `GET /api/health` — Pages Functionsの稼働確認
- `GET /api/profile` — GitHubプロフィールを反映した表示用データ
- `GET /api/projects` — GitHubリポジトリを整理したプロジェクト一覧

静的なポートフォリオ本体は `public/`、Honoのエントリポイントは `functions/[[path]].ts` に分離しています。
