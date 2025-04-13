"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/configs/db";
import { videos } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import PlayerDialog from "../_components/PlayerDialog";

function CreateNewVideo() {
  const [formData, setFormData] = useState({});
  const [Loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const { user } = useUser();
  function handleSelectionOptions(fieldName, fieldValue) {
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  }
  async function handleGenerationProcess() {
    setLoading(true);
    const videoScript = await generateVideoScript(); // this is an array of objects {contentText,imagePrompt}
    const audioUrl = await generateAudio(videoScript); // this is a url (string)
    const captionWords = await generateCaptions(audioUrl); // this is an array of words
    const imagesUrls = await generateImages(videoScript); // this is an array of Urls (strings)
    const result = await db.insert(videos).values({
      videoScript,
      audioUrl,
      captionWords,
      imagesUrls,
      createdBy: user.primaryEmailAddress.emailAddress,
    });
    setVideoData({ videoScript, audioUrl, captionWords, imagesUrls });
    setLoading(false);
  }
  async function generateVideoScript() {
    const searchPrompt = `write a script to generate a ${formData.Duration} video on topic : interesting ${formData.Topic} along with AI image prompt in ${formData.Style} format for each scene and give me result in JSON format with imagePrompt and ContentText as field. Don't write anything in the field excpect the generate data (no time or labels)`;
    const videoScript = await axios
      .post("/api/generate-video-script", {
        searchPrompt,
      })
      .then((response) => response.data.videoScript);
    return videoScript;
  }
  async function generateAudio(videoScript) {
    const text = videoScript.map((part) => part.ContentText).join(" ");
    const id = uuidv4();
    const audioUrl = axios
      .post("/api/generate-audio", {
        text,
        id,
      })
      .then((response) => response.data.audioUrl);
    return audioUrl;
  }
  async function generateCaptions(fileUrl) {
    const captionWords = axios
      .post("/api/generate-captions", {
        fileUrl,
      })
      .then((response) => response.data.captionWords);
    return captionWords;
  }
  async function generateImages(videoScript) {
    const imagesUrls = await Promise.all(
      videoScript.map(async (part) => {
        const id = uuidv4();
        return await axios
          .post("/api/generate-images", {
            prompt: part.imagePrompt,
            id,
          })
          .then((response) => response.data.imageUrl);
      })
    );
    return imagesUrls;
  }
  return (
    <div className="md:px-24">
      <h2 className="font-bold text-primary text-3xl text-center">
        Create New
      </h2>
      <div className="mt-10 shadow-md p-10">
        <SelectTopic onUserSelect={handleSelectionOptions}></SelectTopic>
        <SelectStyle onUserSelect={handleSelectionOptions}></SelectStyle>
        <SelectDuration onUserSelect={handleSelectionOptions}></SelectDuration>
        <Button onClick={handleGenerationProcess} className="mt-10 w-full">
          Create Short Video
        </Button>
      </div>
      {Loading && <CustomLoading></CustomLoading>}
      {videoData && (
        <PlayerDialog
          videoData={videoData}
          setVideoData={setVideoData}
        ></PlayerDialog>
      )}
    </div>
  );
}

export default CreateNewVideo;
