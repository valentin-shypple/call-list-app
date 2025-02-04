import React, { useState, useEffect } from "react";
import { Howl, Howler } from "howler";
import Box from "@mui/material/Box";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import GetAppIcon from "@mui/icons-material/GetApp";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";

interface IProps {
  recordId: string;
  partnerId: string;
}

function secondsToMinutes(time: number) {
  return Math.floor(time / 60) + ":" + Math.floor(time % 60);
}

const AudioPlayer = ({ recordId, partnerId }: IProps) => {
  const [play, setPlay] = useState(true);
  const [progress, setProgress] = useState(50);
  const [buffer, setBuffer] = useState(100);
  const [record, setRecord] = useState<any>(null);

  const getRecord = async () => {
    setRecord(null);
    Howler.unload();
    let sound = new Howl({
      src: `https://api.skilla.ru/mango/getRecord?record=${recordId}&partnership_id=${partnerId}`,
      format: ["mp3"],
      xhr: {
        method: "POST",
        headers: {
          Authorization: "Bearer testtoken",
        },
        withCredentials: true,
      },
    });

    sound.once("load", () => {
      setPlay(false);
      sound.play();
      setRecord(sound);
    });

    sound.once("loaderror", () => {
      Howler.unload();
    });
  };

  const playRecord = () => {
    record.play();
    setPlay(false);
  };

  const pauseRecord = () => {
    record.pause();
    setPlay(true);
  };

  const stopRecord = () => {
    setRecord(null);
    Howler.unload();
    setPlay(true);
  };

  return (
    <Box className="audio-player">
      <Box className="duration">
        {record ? secondsToMinutes(record?.duration()) : ""}
      </Box>
      <Box className="icon-wrapper">
        {play ? (
          <PlayArrowIcon
            className="play"
            onClick={record ? playRecord : getRecord}
          />
        ) : (
          <PauseIcon className="pause" onClick={pauseRecord} />
        )}
      </Box>
      <Box sx={{ width: "164px" }}>
        <LinearProgress
          variant="buffer"
          value={progress}
          valueBuffer={buffer}
        />
      </Box>
      <GetAppIcon className="action" />
      <CloseIcon className="action" onClick={stopRecord} />
    </Box>
  );
};

export default AudioPlayer;
