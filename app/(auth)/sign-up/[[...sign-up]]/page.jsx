import { SignUp } from '@clerk/nextjs'
import Image from "next/image";


export default function Page() {
  return (
        <div className='grid grid-cols-1 md:grid-cols-2'>
          <div>
            <Image src='/login.png' alt='login image' width={500} height={500} className='w-full object-contain'></Image>
          </div>
          <div className='flex items-center justify-center h-screen'>
            <SignUp />
          </div>
        </div>
  )
}