import { MigrationBuilder } from 'node-pg-migrate';


export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('User',{
        // ユーザーID
        id:{
            type:'serial',
            primaryKey:true,
        },
        // メールアドレス
        email:{
            type:'varchar(255)',
            notNull:true,
            unique:true,
        },
        // ユーザー名
        username:{
            type:'varchar(255)',
            notNull:true,
        },
        // タイムスタンプ
        createdAt:{
            type:'timestamp',
            notNull:true,
            default:pgm.func('CURRENT_TIMESTAMP'),
        },
    });
    // Bookテーブル
    pgm.createTable('Book', {
        // 書籍ID
        id:{
            type:'serial',
            primaryKey:true,
        },
        // ISBNコード
        isbn: {
            type: 'varchar(255)',
            notNull: true,
            unique: true,
        },
        // 書籍名
        title: {
            type: 'varchar(255)',
            notNull: true,
        },
        // 著者
        author: {
            type: 'varchar(255)',
        },
        // 出版社
        publisher: {
            type: 'varchar(255)',
        },
        // 表紙URL
        coverUrl: {
            type: 'text', // URLは長くなる可能性があるため TEXT型
        },
    });
    // Tagテーブル(記録につけるタグ)
    pgm.createTable('Tag', {
        id: {
            type: 'serial',
            primaryKey: true,
        },
        name: {
            type: 'varchar(50)',
            notNull: true,
            unique: true,
        },
    });
    // Recordテーブル(User,Bookへの外部キー)
    pgm.createTable('Record', {
        // 記録ID
        id: {
            type: 'serial',
            primaryKey: true,
        },
        // ユーザーID
        userId: {
            type: 'integer',
            notNull: true,
            references: '"User"(id)',
            onDelete: 'CASCADE',
        },
        // 書籍ID
        bookId: {
            type: 'integer',
            notNull: true,
            references: '"Book"(id)',
            onDelete: 'CASCADE',
        },
        // 書籍の評価
        rating: {
            type: 'integer',
            default: 0,
        },
        // 記録メモ
        memo: {
            type: 'text',
        },
        // 公開状態フラグ
        isPublic: {
            type: 'boolean',
            default: false,
        },
    });
    // WishListテーブル(中間テーブル)
    pgm.createTable('WishList', {
        userId: {
            type: 'integer',
            notNull: true,
            references: '"User"(id)',
            onDelete: 'CASCADE',
        },
        bookId: {
            type: 'integer',
            notNull: true,
            references: '"Book"(id)',
            onDelete: 'CASCADE',
        },
    },{
        constraints:{
            // 複合主キーの定義
            primaryKey: ['userId', 'bookId'],
        },
    });
    // RecordTag(中間テーブル)
    pgm.createTable('RecordTag', {
        recordId: {
            type: 'integer',
            notNull: true,
            references: '"Record"(id)',
            onDelete: 'CASCADE',
        },
        tagId: {
            type: 'integer',
            notNull: true,
            references: '"Tag"(id)',
            onDelete: 'CASCADE',
        },
    },{
            constraints:{
                // 複合主キーの定義
                primaryKey: ['recordId', 'tagId'],
            }
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    // 外部キーの依存関係が深いテーブルから順に削除
    pgm.dropTable('RecordTag');
    pgm.dropTable('WishList');
    pgm.dropTable('Record');
    pgm.dropTable('Tag');
    pgm.dropTable('Book');
    pgm.dropTable('User');
}
