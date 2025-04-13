import { NextResponse } from 'next/server';
import { AssemblyAI } from 'assemblyai'



export async function POST(request) {
    try{
        const {fileUrl} = await request.json();
        const client = new AssemblyAI({apiKey:process.env.ASSEMBLYAI_API_KEY})
        const config = {audio_url: fileUrl}
        const transcript = await client.transcripts.transcribe(config)
        if(!transcript.words) throw new Error("the AI model resposable for audio transcribtion does not respond , please try later again.")        
        return NextResponse.json({captionWords:transcript.words})
	}catch(Error){
		return NextResponse.json({Error})
	}
}

