import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

function RemotionVideo({  imagesUrls, audioUrl, captionWords }) {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  function getCaptionWord() {
    const currentTime = (frame / 30) * 1000;
    const word = captionWords.find((word) => {
      return currentTime >= word.start && currentTime <= word.end;
    });
    return word?.text;
  }
  return (
    <AbsoluteFill className="bg-black">
      {imagesUrls.map((imageUrl, index) => {
        const startTime = Math.ceil((index * durationInFrames) / imagesUrls.length);
        const duration = Math.ceil(durationInFrames / imagesUrls.length);
        const scale = (index) =>
          interpolate(
            frame,
            [startTime,startTime + duration],
            index % 2 == 0 ? [1, 1.05] : [1.05, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );
        return (
          <Sequence key={index} from={startTime} durationInFrames={duration}>
            <Img src={imageUrl} style={{scale:scale(index)}}></Img>
          </Sequence>
        );
      })}
      <h1 className="absolute left-[50%] translate-x-[-50%] bg-black w-fit px-2 text-white text-2xl bottom-[20%]">
        {getCaptionWord()}
      </h1>
      <Audio src={audioUrl}></Audio>
    </AbsoluteFill>
  );
}

export default RemotionVideo;
