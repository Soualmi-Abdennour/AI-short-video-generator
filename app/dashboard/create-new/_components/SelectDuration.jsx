import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function SelectDuration({onUserSelect}) {
    return (
        <div className='mt-7'>
            <h2 className='font-bold text-primary text-xl'>Duration</h2>
            <p className='text-gray-500'>What is the Duration of your video?</p>
            <Select onValueChange={(value)=>onUserSelect("Duration",value)}>
                <SelectTrigger className="w-full mt-2 text-lg p-6">
                    <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                        <SelectItem value="30 Seconds">30 Seconds</SelectItem>
                        <SelectItem value="45 Seconds">45 Seconds</SelectItem>
                        <SelectItem value="60 Seconds">60 Seconds</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default SelectDuration
