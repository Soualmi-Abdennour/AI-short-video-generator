"use client"
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"


function SelectTopic({onUserSelect}) {
    const options=['Custom Prompt','Random AI Story','Scary Story','Historical Facts','Bed Time Story','Motivational','Fun Facts']
    const [selectedOption,setSelectedOption]=useState()
    return (
        <div>
            <h2 className='font-bold text-primary text-xl'>Content</h2>
            <p className='text-gray-500'>What is the topic of your video?</p>
            <Select onValueChange={(value)=>{
                    value!=="Custom Prompt"&&onUserSelect("Topic",value)
                    setSelectedOption(value)
                    }}>
                <SelectTrigger className="w-full mt-2 text-lg p-6">
                    <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option,index)=>(
                        <SelectItem key={index} value={option}>{option}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {
                selectedOption==="Custom Prompt"&&
                <Textarea className="mt-2" onChange={(e)=>onUserSelect("Topic",e.target.value)} placeholder='write prompt on which you want to generate video'></Textarea>
            }
        </div>
    )
}

export default SelectTopic
