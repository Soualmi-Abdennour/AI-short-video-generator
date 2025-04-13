import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function EmptyVideoListPanel() {
    return (
        <div className='px-5 py-24 items-center gap-2 flex flex-col border-2 border-dashed mt-20'>
            <h2>You don't have any generated videos</h2>
            <Link href={"/dashboard/create-new"}>
                <Button>Create New Video</Button>
            </Link>
        </div>
    )
}

export default EmptyVideoListPanel
