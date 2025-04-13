import React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog'

function CustomLoading() {
    return (
        <AlertDialog open>
            <AlertDialogContent>
                <AlertDialogTitle className='hidden'></AlertDialogTitle>
                <div className='flex flex-col items-center justify-center my-10'>
                    <Image src={"/progress.gif"} width={100} height={100} alt='loading gif'></Image>
                    <h2>Generating your video... Don't refresh</h2>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CustomLoading
