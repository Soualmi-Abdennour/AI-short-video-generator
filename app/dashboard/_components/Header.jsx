"use client"
import { userDetailsContext } from '@/app/provider'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'

function Header() {
    // const {userDetails, setUserDetails}=useContext(userDetailsContext);
    return (
        <div className='p-3 px-5 flex items-center justify-between shadow-md'>
            <div className='flex gap-2 items-center'>
                <Image src="/logo.svg" width={30} height={30} alt='logo image'></Image>
                <h2 className='text-xl font-bold'>AI Short Video Generator</h2>
            </div>
            <div className='flex items-center gap-3'>
                {/* <div className='flex gap-2 items-center'>
                    <h2>{userDetails.credits}</h2>
                    <Image src="/coin.png" width={20} height={20}  alt='coin image'></Image>
                </div> */}
                <Link href={"/dashboard"}>
                    <Button>Dashboard</Button>
                </Link>
                <UserButton></UserButton>
            </div>
        </div>
    )
}

export default Header
