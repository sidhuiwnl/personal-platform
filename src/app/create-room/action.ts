"use server"

import { Room } from "@prisma/client"
import { PrismaClient } from "@prisma/client"
import { getSession } from "@/lib/auth"
const prisma = new PrismaClient()

export async function createRoomAction(roomData : Room){
    const session = await getSession()
    if(!session){
        throw new Error("please sign in to create a room")
    }
    await prisma.room.create({...roomData,userId : session.user.id})

}