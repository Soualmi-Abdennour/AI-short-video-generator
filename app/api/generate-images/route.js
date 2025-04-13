import { supabase } from "@/configs/SupabaseConfig";
import axios from "axios";
import { NextResponse } from "next/server";





export async function POST(request) {
	try{
		const {prompt,id}=await request.json()
		const response = await axios.post(`https://api.cloudflare.com/client/v4/accounts/95b67994781dfa0ea22070f4e984e311/ai/run/@cf/bytedance/stable-diffusion-xl-lightning`,
			{ prompt },
			{ headers: { Authorization: process.env.CLOUDFLARE_IMAGE_GEN_KEY },responseType: "arraybuffer"	}
		);
		if(!response) throw new Error("the AI model responsable for the image generation does not respond, try again later")
		const imageBuffer=Buffer.from(response.data,"binary")
		const {data,error}=await supabase.storage.from("AI-Short-Video-Generator").upload(`Images-files/image-${id}.png`,imageBuffer,{contentType:"image/png"})
		const imageUrl= supabase.storage.from("AI-Short-Video-Generator").getPublicUrl(`Images-files/image-${id}.png`)
		if(!imageUrl.data.publicUrl) throw new Error("there is a problem when uploading the image to the database , please try again later")
		return NextResponse.json({imageUrl:imageUrl.data.publicUrl})
	}catch(Error){
		return NextResponse.json({Error})
	}
}


