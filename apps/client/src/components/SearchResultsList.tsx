import Result from 'react'

import { BookInfoResult } from '@/packages/common-types/src/BooksAPItypes'
import BookCard from './BookCard'
// import styles from './SearchResultsList.module.css'

interface SearchResultListProps {
    books: BookInfoResult[]
    currentUserId: number
    isLoading: boolean
    error: string | null
}

export default function SearchResultList({ books, currentUserId, isLoading, error }:SearchResultListProps){
    if(error){
        return(
            <p>{error}</p>
        )
    }

    if(!books || books.length === 0){
        return(
            <p>検索結果がありません。</p>
        )
    }

    return(
        <div>
            <h2>
                { isLoading ? (
                        '検索中'
                    ): (
                        `検索結果 (${books.length} 件)`
                    )
                }
            </h2>

            <div className='grid grid-cols-1 gap-6 mt-6'>
                {books.map((book) => (
                    <BookCard key = {book.id} bookInfo = {book}/>
                ))}
            </div>
        </div>
    )
}