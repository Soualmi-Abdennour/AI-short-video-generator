"use client"
import { CircleUser, FileVideo, PanelsTopLeft, ShieldPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const menuOptions=[
    {
        id:1,
        label:"Dashboard",
        path:"/dashboard",
        icon:PanelsTopLeft
    },
    {
        id:2,
        label:"Create New",
        path:"/dashboard/create-new",
        icon:FileVideo
    },
    // {
    //     id:3,
    //     label:"Upgrade",
    //     path:"/upgrade",
    //     icon:ShieldPlus
    // },
    // {
    //     id:4,
    //     label:"Account",
    //     path:"/account",
    //     icon:CircleUser
    // }
]
function SideNav() {
    const pathName=usePathname()
    return (
        <div className='shadow-md h-screen p-5'>
            <div className='grid gap-3'>
                {menuOptions.map((option,index)=>(
                    <Link href={option.path} key={index} >
                        <div className={`flex items-center gap-3 p-3
                            hover:bg-primary hover:text-white 
                            rounded-md cursor-pointer
                            ${option.path===pathName&&"bg-primary text-white"}`}>
                            <option.icon></option.icon>
                            <h2>{option.label}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SideNav
