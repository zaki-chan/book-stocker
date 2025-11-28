'use client'

import React from 'react'
import { Controller ,useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../../components/ui/card'

import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl } from '../../components/ui/form'

interface SearchFormProps {
    onSubmit: (keyword: string) => void
    isLoading: boolean
}

const formSchema = z.object({
    // キーワードは必須（1文字以上）
    keyword: z.string().min(1, {
        message: "検索キーワードは1文字以上で入力してください。"
    }).trim() // 検索前に空白を削除
})

type FormValues = z.infer<typeof formSchema>

function SearchFormFunc({ onSubmit, isLoading }:SearchFormProps){
    const form = useForm<FormValues>({
        defaultValues: {
            keyword: ''
        }
    })

    function onSearch({ keyword }: FormValues){
        onSubmit(keyword)
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSearch)} className='mx-5 flex gap-3 justify-between'>
                <FormField
                    control = {form.control}
                    name = 'keyword'
                    render = {({ field }) => (
                        <FormItem className='flex-auto'>
                            {/* <FormLabel>検索フォーム</FormLabel> */}
                            <FormControl>
                                <Input placeholder='書籍を検索' {...field}/>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type='submit' disabled={isLoading} className='flex-none' variant='default'>検索</Button>
            </form>
        </Form>
    )
}
export default function SearchForm({ onSubmit, isLoading}: SearchFormProps){
    return(
        <Card className='max-w-200'>
            <CardHeader>
                <CardTitle>書籍検索フォーム</CardTitle>
            </CardHeader>
            <CardContent>
                <SearchFormFunc onSubmit={onSubmit} isLoading={isLoading}/>
            </CardContent>
        </Card>
    )
}
