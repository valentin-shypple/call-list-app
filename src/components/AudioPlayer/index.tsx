import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Howl, Howler } from "howler";
import Box from "@mui/material/Box";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import GetAppIcon from "@mui/icons-material/GetApp";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "@mui/material/Slider";
import { useStore } from "../../root-store-context";
import { twoDigitsFormat } from "../../helpers";

interface IProps {
  recordId: string;
  partnerId: string;
  currentRecordId: number;
}

const AudioPlayer = observer(
  ({ recordId, partnerId, currentRecordId }: IProps) => {
    const { filtersStore } = useStore();
    const [showPlayButton, setShowPlayButton] = useState(true);
    const [currentRecordSelected, setCurrentRecordSelected] =
      useState<boolean>(true);
    const [howlInstance, setHowlInstance] = useState<Howl | null>(null);
    const [playbackProgress, setPlaybackProgress] = useState({
      minutes: 0,
      seconds: 0,
    });
    const [seekPosition, setSeekPosition] = useState<number>(0);

    useEffect(() => {
      setCurrentRecordSelected(currentRecordId === filtersStore.currentRecord);

      if (currentRecordId !== filtersStore.currentRecord) {
        setShowPlayButton(true);
      }
    }, [filtersStore.currentRecord, currentRecordId]);

    useEffect(() => {
      const interval = setInterval(() => {
        if (howlInstance) {
          const currentSeek: number = howlInstance.seek();
          setSeekPosition(currentSeek);
          setPlaybackProgress({
            minutes: Math.floor(currentSeek / 60),
            seconds: Math.floor(currentSeek % 60),
          });
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [howlInstance]);

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

      if (sound.state() === "loaded") {
        Howler.stop();
        sound.play();
        setShowPlayButton(false);
        setHowlInstance(sound);
      }

      sound.once("load", () => {
        Howler.stop();
        sound.play();
        setShowPlayButton(false);
        setHowlInstance(sound);
      });

      sound.once("loaderror", () => {
        Howler.stop();
      });

      sound.once("end", () => {
        setHowlInstance(null);
        setShowPlayButton(true);
        setPlaybackProgress({
          minutes: 0,
          seconds: 0,
        });
        Howler.stop();
      });
    };

    const playRecord = () => {
      howlInstance?.play();
      setShowPlayButton(false);
    };

    const pauseRecord = () => {
      howlInstance?.pause();
      setShowPlayButton(true);
    };

    const stopRecord = () => {
      setHowlInstance(null);
      Howler.stop();
      setShowPlayButton(true);
      setPlaybackProgress({
        minutes: 0,
        seconds: 0,
      });
    };

    const handleChangeSeek = (
      event: React.SyntheticEvent | Event,
      newValue: number | number[]
    ) => {
      if (howlInstance) {
        howlInstance.seek((howlInstance.duration() / 100) * Number(newValue));
      }
    };

    return (
      <Box className="audio-player">
        <Box className="duration">
          {twoDigitsFormat(playbackProgress.minutes)}:
          {twoDigitsFormat(playbackProgress.seconds)}
        </Box>
        <Box className="icon-wrapper">
          {showPlayButton ? (
            <PlayArrowIcon
              className="play"
              onClick={currentRecordSelected ? playRecord : getRecord}
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
            value={
              seekPosition && howlInstance
                ? (100 * seekPosition) / howlInstance.duration()
                : 0
            }
            aria-label="Small"
            onChangeCommitted={handleChangeSeek}
            disabled={!currentRecordSelected}
          />
        </Box>
        <GetAppIcon className="action" />
        <CloseIcon className="action" onClick={stopRecord} />
      </Box>
    );
  }
);

export default AudioPlayer;
