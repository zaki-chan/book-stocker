import Image from 'next/image'
import React from 'react'
import { BookInfoResult } from '../../../../packages/common-types/src/BooksAPItypes'
import styles from './BookCard.module.css'
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
    // 書籍画像と情報を表示する
    return(
        <div className={styles.container}>
            <Image
                src={bookInfo.coverUrl as string}
                width={200}
                height={280}
                alt={bookInfo.title}
                className={styles.image}
            />
            <div className={styles.rightitem}>
                <ul className={styles.info}>
                    <li>書籍名：{bookInfo.title}</li>
                    <li>著者：{bookInfo.author}</li>
                    <li>出版社：{bookInfo.publisher}</li>
                    <li>{bookInfo.isRegistered ? '登録済み': '未登録'}</li>
                </ul>
                <button onClick={handleClick}>
                    登録
                </button>
            </div>
        </div>
    )
}