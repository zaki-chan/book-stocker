import { Hono } from 'hono'
import { serve } from '@hono/node-server'
// packages/db/clientでPoolを用いてDBに接続している。
import { pool, setupDbListenerAndTest } from '../../../packages/db/src/client.js'
// import { STATUS_CODES } from 'http'

// Honoインスタンスの作成
const app = new Hono()
// ポートの指定
const port = 3001

// Honoサーバーヘルスチェック
app.get('/api/health',(c)=>{
    return c.json({ status:'ok', message: 'Hono server is running!'})
})

// バックエンドからのDB接続テスト
app.get('/api/test-db', async (c) => {
    try {
        // DBに現在の時間を問い合わせて接続チェック
        const result = await pool.query('SELECT NOW()')
        // レスポンスが得られたら接続成功でreturnする
        return c.json({
            status: 'ok',
            database:'connected',
            serverTime: result.rows[0].now
        })
    } catch (e) {
        // 接続できなかった場合はErrorとして出力
        console.error('Database connection failed during request:', e)
        // レスポンスが得られなければ、HTTPコード500:Internal server errorでreturnする
        return c.json({
            status:'error',
            message:'DB Connection Failed.'
        },500)
    }
})
// DB接続はpackage/db/src/clientで行っている
// バックエンドサーバー起動時にclientがDBに接続するように呼び出す
async function startServer(){
    try {
        // clientの接続テスト
        await setupDbListenerAndTest();
        // Node.js形式のHTTPリクエストをWeb標準のRequestオブジェクトに変換
        serve({
            fetch: app.fetch,
            port
        }, (info)=>{
            console.log(`Hono server listening on port http://localhost:${info.port}`)
        })
    } catch (err) {
        // errがmessageプロパティを持つ場合にエラー内容を変える
        if(err instanceof Error){
            console.error('Server failed to start due to DB error:', err.message)
        } else {
            console.error('An unknown error occurred:', err)
        }
        process.exit(1)
    }
}

startServer()
