// GoogleBooksAPIのレスポンスのインターフェース
export interface GoogleBooksApiResponse{
    kind:string
    totalItems:number
    items?:GoogleBookItem[]
}
// APIから得られる書籍情報のインターフェース
export interface GoogleBookItem {
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
export interface BookInfoResult {
    id:string
    title:string
    author:string
    publisher:string
    coverUrl: string | null
    isRegistered: boolean
}