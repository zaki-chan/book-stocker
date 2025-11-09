// データベースへの接続をpackages/db内で管理するためにPoolを使用
import { Pool } from 'pg'
// 環境変数を読み込むためのモジュール類
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
// 環境変数用のパス設定
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// 特定の環境変数を読むためのdotenvのパス設定
dotenv.config({
    path: resolve(__dirname,'..','.env')
})
// データベースURLの読み込み
const connectionString = process.env.DATABASE_URL
// Nullチェック
if(!connectionString){
    console.error("DATABASE_URL environment variable is not set.")
    throw new Error("DATABASE_URL is required for database connection.")
}
// poolインスタンスの作成
export const pool = new Pool({
    connectionString,
    max:20,
})

// データベース接続のイベントリスナーを設定し、接続テストを実行する
// サーバー起動時に一度だけ呼び出される
export async function setupDbListenerAndTest(){
    // 接続テストを実行
    await pool.query('SELECT 1')
    console.log("DB Test Query Succeeded!")

    // イベントリスナーの追加
    pool.on('connect', () => {
        console.log('PostgreSQL client connected to pool.')
    })
    pool.on('error',(err) => {
        console.error('Unexpected error on idle client', err)
    })
}