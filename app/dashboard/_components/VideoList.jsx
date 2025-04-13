import { Thumbnail } from "@remotion/player";
import React, { useState } from "react";
import RemotionVideo from "./RemotionVideo";
import PlayerDialog from "./PlayerDialog";


function VideoList({ videosList }) {
  const [videoData,setVideoData]=useState(null)
  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
      {videosList.map((videoData, index) => {
        const { captionWords } = videoData;
        const duration = Math.ceil(captionWords[captionWords.length - 1].end / 1000) * 30;
        return (
          <div key={index} className="cursor-pointer hover:scale-105 transition-all" onClick={()=>setVideoData(videoData)}>
            <Thumbnail
              style={{
                width:"100%",
                borderRadius:15
              }}
              component={RemotionVideo}
              durationInFrames={duration}
              frameToDisplay={30}
              compositionWidth={300}
              compositionHeight={400}
              fps={30}
              inputProps={{ ...videoData }}
              controls={true}
            />
          </div>
        );
      })}
      {videoData && <PlayerDialog videoData={videoData} setVideoData={setVideoData}/>}
    </div>
  );
}

export default VideoList;
