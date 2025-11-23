'use client'

import React, { useState } from 'react'

interface SearchFormProps {
    onSubmit: (keyword: string) => void
    isLoading: boolean
}

export default function SearchForm({ onSubmit, isLoading}: SearchFormProps){
    // フォームの入力状態の管理
    const [ keyword, setKeyword ] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // 空欄での検索を防ぐ
        const trimmedKeyword = keyword.trim()
        if(trimmedKeyword){
            onSubmit(trimmedKeyword)
        }
    }

    return(
        <form
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='書籍名、著者名、キーワードを入力'
                disabled={isLoading}
                aria-label='検索キーワード'
            />

            <button
                type='submit'
                disabled = {isLoading || !keyword.trim()}
            >
                {isLoading ? '検索中' : '検索'}
            </button>
        </form>
    )
}