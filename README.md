# INUMABU Portfolio

Web、Discord Bot、AI、開発者向けツール、デスクトップアプリ、プログラミング言語など、
**「作ってみたい」を実際に動くものへ**変えていく個人ポートフォリオです。

GitHubプロフィールと同じ内容・表記をベースに、現在公開している主要プロジェクトを掲載しています。

## ローカル実行

Node.js 22.16.0 を使用します。

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
- **Node.js**: 22.16.0

GitHubリポジトリをCloudflare Pagesに接続する場合は、`main` ブランチへのPushをデプロイ対象にします。
このサイト自体は静的サイトとして動作し、アプリケーション用のWorkersやデータベースを必要としません。

## 掲載プロジェクト

現在公開している主要プロジェクトを、GitHubプロフィールと同じ説明方針で掲載しています。

- **yanagi** — Discord Bot Ecosystemの統合基盤
- **mabubot** — 多機能なDiscordコミュニティBot
- **mojule** — モジュール型AIエージェント
- **touwa-editor** — デスクトップコードエディタのFoundation
- **java-learning-support** — Java学習支援WebサイトのSkeleton
- **yomiage** — VOICEVOX連携Discord読み上げBot
- **asobibot** — 遊び系Discord Bot
- **kokoneads** — 開発者向けWebツールサイト
- **aurorasauce** — 学習用プログラミング言語処理系

## セキュリティ

Cloudflare Pagesの `_headers` で CSP、クリックジャッキング対策、Referrer Policy、Permissions Policy を設定しています。
Google Fontsを利用するため、CSPでは `fonts.googleapis.com` と `fonts.gstatic.com` のみ許可しています。

## デザイン方針

- **Movement**: 編集部のケーススタディ × インタラクティブなインディーWeb
- **Palette**: 墨色を土台に、蛍光イエローを意図、青を思考、オレンジを行動のサインとして使用
- **Layout**: 中央寄せのカード一覧ではなく、余白のある縦長エディトリアル構成
- **Typography**: 日本語の太い見出しと、Space Grotesk / DM Monoの技術的なメタ情報
- **Interaction**: 作品フィルター、モバイルメニュー、Escapeキー対応、Reduced Motion対応

## 更新方針

GitHubプロフィールと内容がずれないよう、プロジェクト名、説明、URL、技術スタックは公開リポジトリのREADMEを基準に更新します。
