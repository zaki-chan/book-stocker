# apps
- アプリのディレクトリ
## client
- フロントエンド
## server
- バックエンド

# packages
- 共通の型定義、関数の共有用

## db
- データベース情報
### node-pg-migrate/migrations
- データベーススキーマの情報変更履歴
- データベーススキーマを更新した場合
  - (マイグレーション)ルートディレクトリでpnpm run db:create <Migration's name>
  - (生成)ルートディレクトリでpnpm run db:generate