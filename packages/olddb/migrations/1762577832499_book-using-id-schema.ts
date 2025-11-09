import {  MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
    // Bookテーブル
    // API_DATA_ID(Google Books APIのレスポンスデータのIDを使用)
    // ISBNコードの利用を取りやめ
    pgm.dropColumns('Book', {
        isbn: {
            type: 'varchar(255)',
            notNull: true,
            unique: true,
        }
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    // 外部キーの依存関係が深いテーブルから順に削除
    pgm.addColumns('Book', {
        isbn: {
            type: 'varchar(255)',
            notNull: true,
            unique: true,
        },
    })
}
