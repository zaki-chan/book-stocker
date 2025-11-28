import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
// prismaでDB接続 & BEサーバー起動時にDB接続テストを実行
import { prisma, onStartDbTest } from '../../../packages/db/index.js'
import booksRouter from '../src/api/books.js'

// Honoインスタンスの作成
const app = new Hono()
// ポートの指定
const port = 3001

// localhostで起動したFEの接続を許可するためのCORSミドルウェア
app.use(
    '/api/*',
    cors({
        origin : ['http://localhost:3000'],
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
)
// APIルートでのレスポンスを作成
app.get('/', (c)=>{
    return c.text('Hello, Hono !')
})

// Honoサーバーヘルスチェック
app.get('/api/health',(c)=>{
    return c.json({ status:'ok', message: 'Hono server is running!'})
})

// バックエンドからのDB接続テスト
app.get('/api/test-db', async (c) => {
    try {
        // DBに現在の時間を問い合わせて接続チェック
        const res = await prisma.$queryRaw`SELECT NOW()`
        // レスポンスが得られたら接続成功でreturnする
        return c.json({
            status: 'ok',
            database:'connected',
            serverTime: res,
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
// ルーターの設定
app.route('/api/books', booksRouter)

// DB接続はpackage/db/src/indexで行っている
// バックエンドサーバー起動時にclientがDBに接続するように呼び出す
async function startServer(){
    try {
        await onStartDbTest()
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