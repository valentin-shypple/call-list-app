import React, { useState, useEffect } from "react";
import { Howl, Howler } from "howler";
import Box from "@mui/material/Box";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import GetAppIcon from "@mui/icons-material/GetApp";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "@mui/material/Slider";
import { useStore } from "../../root-store-context";

interface IProps {
  recordId: string;
  partnerId: string;
  currentRecordId: number;
}

const AudioPlayer = ({ recordId, partnerId, currentRecordId }: IProps) => {
  const { filtersStore } = useStore();
  const [play, setPlay] = useState(true);
  const [record, setRecord] = useState<any>(null);
  const [currTime, setCurrTime] = useState({
    min: 0,
    sec: 0,
  });
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (currentRecordId !== filtersStore.currentRecord) {
      stopRecord();
    }
  }, [filtersStore.currentRecord]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (record) {
        setSeconds(record.seek([]));
        const min = Math.floor(record.seek([]) / 60);
        const sec = Math.floor(record.seek([]) % 60);
        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [record]);

  const getRecord = async () => {
    filtersStore.setCurrentRecord(currentRecordId);
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

    sound.once("end", () => {
      setRecord(null);
      setPlay(true);
      setCurrTime({
        min: 0,
        sec: 0,
      });
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
    setCurrTime({
      min: 0,
      sec: 0,
    });
  };

  const handleChangeSeek = (event: Event, newValue: number | number[]) => {
    if (record) {
      record.seek((record.duration() / 100) * Number(newValue));
    }
  };

  return (
    <Box className="audio-player">
      <Box className="duration">
        {currTime.min}:{currTime.sec}
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
      <Box
        sx={{
          width: "164px",
          display: "flex",
          alignItems: "center",
          padding: "0px 10px",
        }}
      >
        <Slider
          size="small"
          defaultValue={0}
          value={seconds && record ? (100 * seconds) / record.duration() : 0}
          aria-label="Small"
          onChange={handleChangeSeek}
        />
      </Box>
      <GetAppIcon className="action" />
      <CloseIcon className="action" onClick={stopRecord} />
    </Box>
  );
};

export default AudioPlayer;
