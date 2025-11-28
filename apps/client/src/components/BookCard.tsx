import Image from 'next/image'
import React from 'react'
import { BookInfoResult } from '../../../../packages/common-types/src/BooksAPItypes'
import RecordActionButton from './RecordButton'
// import styles from './BookCard.module.css'
import { Button } from '../../components/ui/button'
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription} from '../../components/ui/card'
// 書籍情報を受け取るためのインターフェース
interface BookCardProps {
    bookInfo:BookInfoResult
}
// 書籍1冊の情報を表示するコンポーネント
// SearchResultsList.tsxで呼びだす
export default function BookCard({bookInfo}:BookCardProps){
    // 登録機能は未実装
    const handleClick = () => {
        console.log('register')
    }

    // 登録済みフラグ
    const registrationStatus = bookInfo.isRegistered
                                ?"bg-green-50 border-green-300"
                                :"border-gray-200";

    // 書籍画像と情報を表示する
    return(
        <div className=''>
            {/* <Image
                src={bookInfo.coverUrl as string}
                width={200}
                height={280}
                alt={bookInfo.title}
                className=''
            />
            <div className=''>
                <ul className=''>
                    <li>書籍名：{bookInfo.title}</li>
                    <li>著者：{bookInfo.author}</li>
                    <li>出版社：{bookInfo.publisher}</li>
                    <li>{bookInfo.isRegistered ? '登録済み': '未登録'}</li>
                </ul>
                <Button
                    variant="outline"
                    onClick={handleClick}>
                        登録
                </Button>
            </div> */}
            <Card className={`flex flex-col h-full ${registrationStatus}`}>
                <CardHeader className='flex flex-row items-start space-x-4 pb-2'>
                    {bookInfo.coverUrl && (
                        <div className='w-16 h-24 shrink-0 bg-gray-100 border rounded'>
                            <Image
                                src={bookInfo.coverUrl as string}
                                width={200}
                                height={280}
                                alt={bookInfo.title}
                                className='w-full h-full object-cover'
                            />
                        </div>
                    )}

                    <div className='grow min-w-0'>
                        <CardTitle className='text-base font-bold line-clamp-2'>
                            {bookInfo.title}
                        </CardTitle>
                        <CardDescription className='text-sm line-clamp-2 mt-1'>
                            {bookInfo.author} / {bookInfo.publisher}
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className='pt-2 text-sm'>
                    {bookInfo.isRegistered ? (
                        <span className='text-green-600 font-semibold flex items-center gap-1'>
                            記録済み
                        </span>
                    ):(
                        <span className='text-gray-500'>未登録</span>
                    )}
                </CardContent>

                <CardFooter className='pt-0 mt-auto'>
                    {/* アクションボタン */}
                    <RecordActionButton book={bookInfo}/>
                </CardFooter>
            </Card>
        </div>
    )
}