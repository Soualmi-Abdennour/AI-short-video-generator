import { chatSession } from "@/configs/AiModel"
import {  NextResponse } from "next/server";

export async function POST(request) {
    try{
        const {searchPrompt}=await request.json()
        const videoScript = await chatSession.sendMessage(searchPrompt)
        if(!videoScript.response.text()) throw new Error("the AI model responsable for genereting the scripts does not respond , please try again later")                                
        return NextResponse.json({videoScript:JSON.parse(videoScript.response.text())})
    }catch(e){
        return NextResponse.json({"Error":e})
    }   
}

