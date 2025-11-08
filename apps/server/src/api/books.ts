// 書籍検索、情報取得、DB照合のルート

import { Hono, Context } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

import { pool } from '../../../../packages/db/src/client.js'
import type { Book } from '../../../../packages/common-types/src/models.js'

// GoogleBooksAPIのレスポンスのインターフェース
interface GoogleBooksApiResponse{
    kind:string
    totalItems:number
    items?:GoogleBookItem[]
}
// APIから得られる書籍情報のインターフェース
interface GoogleBookItem {
    id:string
    volumeInfo:{
        title:string
        authors?: string[]
        publishedDate?:string
        publisher?:string
        industryIdentifiers?: Array<{type:string; identifier:string;}>
        imageLinks?:{
            smallThumbnail?:string
            thumbnail?:string
        }
    }
}
// APIから得られた検索結果
interface BookInfoResult {
    id:string
    title:string
    author:string
    publisher:string
    coverUrl: string | null
    isRegistered: boolean
}
// 環境変数を読み込むためのモジュール類
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import test from 'node:test'
// 環境変数用のパス設定
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// 特定の環境変数を読むためのdotenvのパス設定
dotenv.config({
    path: resolve(__dirname,'..','..','.env')
})
// API_KEYの読み込み
const API_KEY = process.env.API_KEY
// Nullチェック
if(!API_KEY){
    console.error("API_KEY environment variable is not set.")
    throw new Error("API_KEY is required for API connection.")
}

const GOOGLE_API_ENDPOINT = 'https://www.googleapis.com/books/v1/volumes'

const books = new Hono();

books.get('/search', async (c) => {
    // 検索キーワード, /search?keyword=''で指定
    const keyword = c.req.query('keyword')
    // 検索キーワードのnullチェック
    if(!keyword){
        return c.json({ error: 'need title'}, 400)
    }
    // APIへのリクエスト用URL生成
    // タイトル検索に変更
    const url = `${GOOGLE_API_ENDPOINT}?q="${encodeURIComponent(keyword)}"&orderBy=relevance&startIndex=0&maxResults=20&langRestrict=ja&key=${API_KEY}`

    try {
        // Google Books APIからのレスポンス取得
        const apiResponse = await fetch(url)
        // 正常にレスポンスを受け取れなかった場合はエラー
        if(!apiResponse.ok){
            return c.json({ error: 'Google Books APIからの応答エラー'}, apiResponse.status as ContentfulStatusCode)
        }
        // レスポンスのjsonに型を付与
        const data = await apiResponse.json() as GoogleBooksApiResponse

        // 取得したデータから情報を取り出す
        const bookResults:BookInfoResult[] = (data.items || []).map(item => ({
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors?.join(', ') || '不明',
            publisher: item.volumeInfo.publisher || '',
            coverUrl: item.volumeInfo.imageLinks?.thumbnail || null,
            isRegistered: false
        }))

        const registeredBooksKeys = await findRegisteredBooks(bookResults)

        const flaggedBookResults = bookResults.map(book => {
            const matchKey = `${book.title.trim()}||${book.author.trim()}`

            return {
                ...book,
                isRegistered: registeredBooksKeys.has(matchKey)
            }
        })

        // json形式で結果を返す
        return c.json({ results: flaggedBookResults || []})
    } catch(err) {
        console.error('Fetch error', err)
        return c.json({ error: 'サーバー側の通信エラー'}, 500)
    }
})
// APIから得られたデータに対して、DBに登録されているデータのIDのSetを返す
async function findRegisteredBooks(searchList: BookInfoResult[]): Promise<Set<string>>{
    if (searchList.length === 0) return new Set()

    const uniqueKeys = new Set(
        searchList.map(b => `${b.title.trim()}||${b.author.trim()}`)
    )

    const titles = [...new Set(searchList.map(b=>b.title.trim()))]
    const authors = [...new Set(searchList.map(b=>b.author.trim()))]

    const queryText = `SELECT title, author FROM "Book"
                    WHERE title = ANY($1) AND author = ANY($2)`


    const dbResult = await pool.query(queryText, [titles, authors])
    // 登録されている書籍のIDを取得
    const registeredKeys = new Set<string>()
    for(const row of dbResult.rows){
        registeredKeys.add(`${(row.title as string).trim()}||${(row.author as string).trim()}`)
    }

    return registeredKeys
}

export default books