import { prisma } from './index.js'

// デモデータを生成するための関数
export async function demo(){
    console.log(`Start seeding ...`);

    // 1. ユーザーのデモデータを挿入
    const user1 = await prisma.user.upsert({
        where:{
            email: 'user1@example.com'
        },
        update:{

        },
        create: {
            email: 'user1@example.com',
            username: 'user1',
            password: 'password1', // 実際はBcryptでハッシュ化
        },
    });

    // 2. 書籍のデモデータを挿入
    const book1 = await prisma.book.findFirst({
        where:{
            title:'砂漠',
            author:'伊坂幸太郎',
        }
    });
    if (!book1){
        await prisma.book.create({
            data: {
                title: '砂漠',
                author: '伊坂幸太郎',
                publisher: '実業之日本社',
                coverUrl:'http://books.google.com/books/content?id=CDA9DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            },
        })
    }
    const book = await prisma.book.findFirst({
        where:{
            title:'砂漠',
            author:'伊坂幸太郎',
        }
    });
    if(book){
        // 3. 記録のデモデータを挿入
        const record1 = await prisma.record.findFirst({
            where:{
                userId: user1.id,
                bookId: book.id
            }
        })
        if(!record1){
            await prisma.record.create({
            data: {
                userId: user1.id,
                bookId: book.id,
                rating: 5,
                memo: 'Prismaのシードテスト用の記録です。',
                isPublic: true,
            },
        });
        }
    }

    console.log(`Seeding finished.`);
}