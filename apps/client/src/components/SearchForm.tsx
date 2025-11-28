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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../components/ui/field"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl } from '../../components/ui/form'

// ----------------------------------------------------------------
// 1. Props と Schema の定義
// ----------------------------------------------------------------
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

// ----------------------------------------------------------------
// 2. コンポーネント本体
// ----------------------------------------------------------------
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
// ↑生成後のプログラム
// ↓生成前のプログラム
// 'use client'

// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import { Button } from '../../components/ui/button'
// import { Spinner } from '../../components/ui/spinner'
// import { Input } from '../../components/ui/input'
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../../components/ui/form"
// import { zodResolver } from '@hookform/resolvers/zod'

// interface SearchFormProps {
//     onSubmit: (keyword: string) => void
//     isLoading: boolean
// }

// const formSchema = z.object({
//     keyword: z.string().min(1, {
//         message:"Search Keyword mus be at least 1"
//         }
//     )
// })

// export default function SearchForm({ onSubmit, isLoading}: SearchFormProps){
//     // フォームの入力状態の管理
//     const [ keyword, setKeyword ] = useState('')

//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues:{
//             keyword: '',
//         },
//     })

//     function onSearch(values: z.infer<typeof formSchema>){
//         // 空欄での検索を防ぐ
//         const trimmedKeyword = keyword.trim()
//         if(trimmedKeyword){
//             onSubmit(trimmedKeyword)
//         }
//     }

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault()

//         // 空欄での検索を防ぐ
//         const trimmedKeyword = keyword.trim()
//         if(trimmedKeyword){
//             onSubmit(trimmedKeyword)
//         }
//     }

//     return(
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSearch)}>
//                 <FormField
//                     name='searchbooks'
//                     render={() => (
//                         <FormItem>
//                             {/* <FormLabel>SearchKeyword</FormLabel> */}
//                             <FormControl>
//                                 <Input
//                                     placeholder='書籍名、著者名、キーワードを入力'/>
//                                     disabled={isLoading}
//                             </FormControl>
//                             {/* <FormDescription>
//                                 This is book search form
//                             </FormDescription> */}
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <Button
//                     type='submit'
//                 >
//                     {
//                         isLoading?
//                             <Spinner>
//                                 '検索中'
//                             </Spinner>
//                             :
//                             '検索'
//                     }
//                 </Button>
//             </form>
//         </Form>
//         // <form
//         //     onSubmit={handleSubmit}
//         // >
//         //     <Input
//         //         type="text"
//         //         value={keyword}
//         //         onChange={(e) => setKeyword(e.target.value)}
//         //         placeholder='書籍名、著者名、キーワードを入力'
//         //         disabled={isLoading}
//         //         aria-label='検索キーワード'
//         //     />

//         //     <Button
//         //         size='lg'
//         //         variant="outline"
//         //         type='submit'
//         //         disabled = {isLoading || !keyword.trim()}
//         //     >
//         //         {isLoading ?
//         //             <Spinner>
//         //                 '検索中'
//         //             </Spinner>
//         //             :
//         //             '検索'
//         //         }
//         //     </Button>
//         // </form>
//     )
// }