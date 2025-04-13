import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function PlayerDialog({ videoData, setVideoData }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoDurationInFrames, setVideoDurationInFrames] = useState();
  const router=useRouter()
  useEffect(() => {
    getVideoLengthInFrames();
  }, []);
  function getVideoLengthInFrames() {
    const { captionWords } = videoData;
    const duration = Math.ceil(captionWords[captionWords.length - 1].end / 1000) * 30;
    setVideoDurationInFrames(duration);
    setOpenDialog(true);
  }
  return (
    <Dialog open={openDialog}>
      <DialogContent className="flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Your video is ready
          </DialogTitle>
        </DialogHeader>
        <Player
          component={RemotionVideo}
          durationInFrames={videoDurationInFrames}
          compositionWidth={300}
          compositionHeight={Number((screen.height * 0.5).toFixed(0))}
          fps={30}
          inputProps={{ ...videoData }}
          controls={true}
        />
        <div className="mx-auto w-[60%]">
          <Button className='w-full' onClick={() => {router.replace("/dashboard");setOpenDialog(false);setVideoData(null)}}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;
