'use client'
import { useState } from "react"
import { BookInfoResult } from '../../../../packages/common-types/src/BooksAPItypes'
import SearchForm from './SearchForm'
import BookResultList from './SearchResultsList'
// import styles from './SearchPage.module.css'


interface SearchPageProps{
    initialResults: BookInfoResult[];
    currentUserId: number;}

export default function SearchPage({ initialResults, currentUserId}:SearchPageProps){
    const [ results, setResults ] = useState<BookInfoResult[]>(initialResults)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState<string | null>(null);

    const handleSearch = async (keyword: string) => {
        if(!keyword.trim()) return

        setIsLoading(true)
        setError(null)

        try{
            const apiUrl = `http://localhost:3001/api/books/search?keyword='${encodeURIComponent(keyword)}'`
            const response = await fetch(apiUrl)

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.error || '検索に失敗しました')
            }

            setResults(data.results)
        } catch(err) {
            console.error('Search API Error:', err)
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('予期せぬエラーが発生しました')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-200 ml-auto mr-auto pl-5 pr-5">
            {/* <h1>書籍検索</h1> */}
            <div className="mt-3">
                <SearchForm
                    onSubmit={handleSearch}
                    isLoading={isLoading}
                />
            </div>

            <BookResultList
                books={results}
                currentUserId={currentUserId}
                isLoading={isLoading}
                error={error}
            />
        </div>
    )
}