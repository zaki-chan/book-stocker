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
### prisma/migrations
- データベーススキーマの情報変更履歴
- データベーススキーマを更新した場合
  - (マイグレーション)ルートディレクトリでpnpm run db:migrate -- --name <Migration's name>
  - (生成)ルートディレクトリでpnpm run db:generate