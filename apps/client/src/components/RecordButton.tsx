'use client'

import { BookInfoResult } from '@/packages/common-types/src/BooksAPItypes'
import { Button } from '../../components/ui/button'
import { Loader2, Plus, Check } from 'lucide-react'
import React, { useState } from 'react'

// BookInfoResultをPropsに受け取る
interface RecordActionButtonProps {
    book: BookInfoResult
}

export default function RecordActionButton({ book }: RecordActionButtonProps){
    const [ isSaving, setIsSaving ] = useState(false)

    const [ hasRecord, setHasRecord ] = useState(book.isRegistered)

    const handleClick = async () => {
        if (hasRecord){
            alert('編集ページに遷移')
            return
        }

        setIsSaving(true)

        try{
            console.log(`${book.title}の記録を開始...`)
            alert('新規記録ページに遷移')

            // setHasRecord(true)
        } catch (error) {
            console.error('記録失敗')
            alert('記録に失敗')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <Button
            onClick={handleClick}
            disabled={isSaving}
            variant={hasRecord ? 'secondary' : 'default'}
            className='w-full'
        >
            {isSaving ? (
                <Loader2 className='animate-spin'/>
            ) : hasRecord ?(
                <Check className='mr-2 h-4 w-4'/>
            ) : (
                <Plus className='mr-2 h-4 w-4'/>
            )}
            {hasRecord ? '編集' : '記録'}
        </Button>
    )
}