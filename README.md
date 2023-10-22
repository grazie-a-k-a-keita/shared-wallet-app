## Shared-Wallet-App 共有家計簿アプリ

## Git の運用について

### Git Flow

- main (本番環境モジュールのブランチ)

  - hotfix (リリース後の緊急対応用ブランチ)

  - develop (開発用のブランチ)

    - feature (追加機能開発用のブランチ)

![GitFlow](https://github.com/grazie-a-k-a-keita/Shared-Wallet-App/assets/106722155/dfe354f3-8268-4d93-a6ef-4da9efdfd259)

### ブランチの運用方法 ([reference](https://takeda-no-nao.net/programming/git/git-branch-naming-convention/))

基本的に「develop ブランチ」から「feature ブランチ」を切る運用。

```shell
# hotfix (リリース後の緊急対応用ブランチ)
git checkout -b hotfix/#12_・・・

# feature (追加機能開発用のブランチ)
git checkout -b feature/#13_・・・

# ※ [・・・]はIssueのタイトルなど
```

### コミットメッセージ ([reference](https://qiita.com/konatsu_p/items/dfe199ebe3a7d2010b3e))

- feat: 新しい機能
- fix: バグの修正
- docs: ドキュメントのみの変更
- style: 空白、フォーマット、セミコロン追加など
- refactor: 仕様に影響がないコード改善(リファクタ)
- perf: パフォーマンス向上関連
- test: テスト関連
- chore: ビルド、補助ツール、ライブラリ関連

### プルリクエストについて

メッセージの最後に **[close #12]** という風に、対応する Issue 番号を記入すると、Issue が自動的に閉じられる。

## 開発について

### Skills

| Skill                                         | Description                                                           |
| --------------------------------------------- | --------------------------------------------------------------------- |
| [React](https://ja.react.dev/)                | Web とネイティブユーザインターフェースのためのライブラリ              |
| [PWA Vite](https://vite-pwa-org.netlify.app/) | Vite 開発ツール用の PWA プラグイン                                    |
| CSS                                           | CSS Modules + [Sass](https://sass-lang.com/)、[MUI](https://mui.com/) |
| [supabase](https://supabase.com/)             | PostgreSQL、Authentication System、API、Storage...                    |

### Command List

```shell
# パッケージインストール
yarn install

# サーバー起動
yarn dev

# ビルド
yarn build

# eslint 起動
yarn lint

# ローカルで静的なウェブサーバを起動し、dist のファイルを http://localhost:4173 で配信する
yarn preview

# testing
yarn test

# モジュールグラフを検索し、関連するテストのみを再実行する
yarn tests:watch

# coverage
yarn coverage
```
