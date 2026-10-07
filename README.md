# INUMABU Portfolio

まぶ / Mabu（@inumabu）のプロフィールと制作物を紹介する、Cloudflare Pages向けの静的ポートフォリオです。

## ローカル実行

```bash
npm run verify
npm run dev
```

`http://localhost:8788` を開きます。

単独監査:

```bash
npm run audit
```

## Cloudflare Pages設定

- **Framework preset**: None
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/`
- **Node.js**: 18以上
- **Functions**: Hono（`functions/[[path]].ts`）
- **CSS**: Tailwind CSS v4（`src/tailwind.css` → `dist/tailwind.css`）

GitHubリポジトリをCloudflare Pagesに接続する場合は、`main` ブランチへのPushをデプロイ対象にします。静的サイトのため、Workersやデータベースは不要です。

## コンテンツの出典

自己紹介、開発対象、技術スタック、主要プロジェクトの説明は、以下のGitHubリポジトリにあるプロフィールREADMEを正本として反映しています。

- [inumabu/inumabu](https://github.com/inumabu/inumabu)

ポートフォリオの`/api/profile`と`/api/projects`にも、GitHubプロフィールを同期元として記録しています。現在は自動更新ではなく、内容を確認した上で手動同期する構成です。

## デザイン方針

- **Movement**: 編集部のケーススタディ × インタラクティブなインディーWeb
- **Palette**: 墨色を土台に、蛍光イエローを意図、青を思考、オレンジを行動のサインとして使用
- **Layout**: 中央寄せのカード一覧ではなく、余白のある縦長エディトリアル構成
- **Typography**: 日本語の太い見出しと、Space Grotesk / DM Monoの技術的なメタ情報
- **Interaction**: 作品フィルター、モバイルメニュー、Reduced Motion対応
- **Visual layer**: Tailwindのテーマトークンに、サイト固有のCSSアニメーション・ホバー・フォーカス表現を重ねる構成

BuildスクリプトはWindows互換のため、`npx.cmd`を子プロセスとして起動せず、`node_modules`内のTailwind CLIとWrangler CLIをNode.jsから直接起動します。

## 同期しているプロフィール情報

GitHubプロフィールを基準に、以下を反映しています。

- 表示名: `まぶ / Mabu`
- ユーザー名: `inumabu`
- Bio: `🛠️ なんでも作る個人開発者`
- Location: `Gunma, Japan`
- Email: `wanko.marble@gmail.com`
- X: `@xx_mabu_xx` / `@i_mabu_`
- 現在の公開プロジェクト: 10件

Archived の `minase-cfw-bot` は現行プロジェクト一覧から除外しています。プロフィールREADMEやサイトの文言を変更する場合は、GitHubの `inumabu/inumabu` と合わせて更新してください。

## Hono API

Cloudflare Pages Functionsで以下を提供します。

```text
GET /api/health
GET /api/profile
GET /api/projects
```

ローカルでPages Functionsまで含めて起動する場合は `npm run dev` を使用します。8788番ポートが使用中の場合は、8789番以降の空きポートを自動選択します。

特定のポートを指定する場合:

```bash
PORT=9000 npm run dev
```

## ファイル構成

| パス | 役割 |
| --- | --- |
| `public/index.html` | ポートフォリオ本体のマークアップ |
| `public/styles.css` | レイアウト・ブランド表現・アニメーション |
| `src/tailwind.css` | Tailwind v4のテーマとスキャン設定 |
| `functions/[[path]].ts` | Hono + Cloudflare Pages Functions API |
| `scripts/build.mjs` | 静的ファイルとTailwind CSSのBuild |
| `scripts/audit.mjs` | 全ファイル・制御文字・必須構成の監査 |
