import Result from 'react'

import { BookInfoResult } from '@/packages/common-types/src/BooksAPItypes'
import BookCard from './BookCard'
// import styles from './SearchResultsList.module.css'

interface SearchResultListProps {
    books: BookInfoResult[]
    currentUserId: number
    isLoading: boolean
}

export default function SearchResultList({ books, currentUserId, isLoading }:SearchResultListProps){
    if(!books || books.length === 0){
        return(
            <div>
                {isLoading ? (
                    ''
                ) : (
                    ''
                )}
            </div>
        )
    }

    return(
        <div>
            <h2>
                検索結果 ({books.length} 件)
            </h2>

            <div>
                {books.map((book) => (
                    <BookCard key = {book.id} bookInfo = {book}/>
                ))}
            </div>
        </div>
    )
}