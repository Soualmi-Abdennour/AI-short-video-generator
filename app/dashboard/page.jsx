"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import EmptyVideoListPanel from './_components/EmptyVideoListPanel'
import Link from 'next/link'
import { db } from '@/configs/db'
import { videos } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import VideoList from './_components/VideoList'

function Dashboard() {
    const [videosList,setVideosList]=useState([])
    const {user}=useUser()
    async function getVideosList() {
        const videosList=await db.select().from(videos).where(eq(videos.createdBy,user.primaryEmailAddress.emailAddress))
        setVideosList(videosList)        
    }
    useEffect(()=>{
        user && getVideosList()
    },[user])

    return (
        <div>
            <div className='flex items-center justify-between'>
                <h2 className='font-bold text-2xl'>Dashboard</h2>
                <Link href={"/dashboard/create-new"}>
                    <Button>+ Create New</Button>
                </Link>
            </div>
            {videosList.length===0?
            <div>
                <EmptyVideoListPanel></EmptyVideoListPanel>
            </div>:
            <div>
                <VideoList videosList={videosList}></VideoList>
            </div>
            }
        </div>
    )
}

export default Dashboard
