"use client"
import Image from 'next/image'
import React, { useState } from 'react'

function SelectStyle({onUserSelect}) {
    const [selectedOption,setSelectedOption]=useState()
    const styleOptions=[
        {
            name:"Realistic",
            image:"/realistic.png"
        },
        {
            name:"Cartoon",
            image:"/cartoon.png"
        },
        {
            name:"Comic",
            image:"/comic.png"
        },
        {
            name:"Water Color",
            image:"/watercolor.png"
        },
        {
            name:"GTA",
            image:"/gta.png"
        }
    ]
    return (
        <div className='mt-7'>
            <h2 className='font-bold text-primary text-xl'>Style</h2>
            <p className='text-gray-500'>What is the Style of your video?</p>
            <div className='mt-3 grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6'>
                {styleOptions.map((option,index)=>(
                    <div key={index}  className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl
                        ${selectedOption===option.name&&"border-4 border-primary"}
                        `}
                        onClick={()=>{
                            onUserSelect("Style",option.name)
                            setSelectedOption(option.name)
                            }}>
                        <Image src={option.image} width={100} height={100} alt={option.name}
                            className='h-48 w-full object-cover rounded-lg'>
                        </Image>
                        <h2 className='absolute bottom-0 rounded-b-lg p-1 w-full text-white text-center bg-black'>{option.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectStyle
