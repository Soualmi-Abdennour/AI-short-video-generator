import { supabase } from '@/configs/SupabaseConfig';
import { NextResponse } from 'next/server';
const { getAudioBuffer } = require('simple-tts-mp3');


export async function POST(request) {
        try{
                const {text,id}= await request.json()
                const audioBuffer = await getAudioBuffer(text) 
                const { data, error }= await supabase.storage.from("AI-Short-Video-Generator").upload("Audio-files/audio-"+id+".mp3",audioBuffer,{contentType: 'audio/mp3'})
                const downloadUrl= supabase.storage.from("AI-Short-Video-Generator").getPublicUrl(`Audio-files/audio-${id}.mp3`)
                if(!downloadUrl.data.publicUrl) throw new Error("there is a problem when uploading the audio file to the database, please try later again.")
                return NextResponse.json({audioUrl:downloadUrl.data.publicUrl})    
	}catch(Error){
		return NextResponse.json({Error})
	}
}


