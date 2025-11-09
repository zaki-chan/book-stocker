import { PrismaClient } from "./generated/prisma/client.js";
import { withAccelerate } from '@prisma/extension-accelerate'
import { demo } from './demo.js'

export const prisma = new PrismaClient().$extends(withAccelerate())
// DBの接続テスト用関数
export async function onStartDbTest(){
    try{
        await prisma.$connect()
        console.log("DB Test Query Succeeded!")
        await demo()
    } catch(e) {
        console.error('DB connection faild.')
        throw e;
    }
}