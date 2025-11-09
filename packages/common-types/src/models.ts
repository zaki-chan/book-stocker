// ユーザーテーブルのレコード型
// ユーザーID、メールアドレス、ユーザー名などの基本情報を格納
export type User = {
    id:number;
    email:string;
    username:string;
    password:string;
}
// 書籍テーブルのレコード型
// ISBNコード、タイトル、著者など、書籍の基本情報を格納
export type Book = {
    id:number;
    // isbn:string;
    title:string;
    author:string;
    publisher:string;
    coverUrl:string | null;
}
// 記録テーブルのレコード型
// ユーザーの書籍評価、メモなどを格納
export type Record = {
    id:number;
    uesrId:number;
    bookId:number;
    rating:number; //書籍評価
    memo:string;
    isPublic:boolean; // 記録の公開状態
}
// タグテーブルのレコード型
// 記録につけるタグの種類を管理する
// タグIDと名前を格納
export type Tag = {
    id:number;
    name:string;
}
// 読みたい本テーブルのレコード型
// ユーザーIDと書籍IDの複合キーとして機能(中間テーブル)
export type WishList = {
    userId: number;
    bookId: number;
}
// 記録タグテーブルのレコード型
// 記録とタグの組み合わせを管理する
// 記録IDとタグIDの複合キーとして機能(中間テーブル)
export type RecordTag = {
    recordId:number;
    tagId:number;
}