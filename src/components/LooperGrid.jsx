import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import LooperButton from "./LooperButton";
//audio
import a1 from "../audio/a1.mp3";
import a2 from "../audio/a2.mp3";
import a3 from "../audio/a3.mp3";
import a4 from "../audio/a4.mp3";
import a5 from "../audio/a5.mp3";
import a6 from "../audio/a6.mp3";
import a7 from "../audio/a7.mp3";
import a8 from "../audio/a8.mp3";
import a9 from "../audio/a9.mp3";
// import sec5 from '../Assets/audio/5sec.mp3'
// import sec10 from '../Assets/audio/10sec.mp3'
//style

const files = [a1, a2, a3, a4, a5, a6, a7, a8, a9];
// const files = [sec10, sec5]; // u can have a better look at que functionality with this audio source.

export default function LooperGrid(props) {
  const { setallAudio } = props;
  const initmaxDuration = { duration: -1, src: "" };
  const [maxDuration, setMaxDuration] = useState(initmaxDuration); //ref to audio with max duration (between those how are now playing)
  const [audioArray, setAudioArray] = useState([]);

  useEffect(() => {
    checkForNewMaxDuration();
  }, [audioArray]);

  const createButtons = () => {
    const buttons = files.map((file, index) => {
      return (
        <Grid item key={index} xs={4}>
          <LooperButton
            audioUrl={file}
            maxDuration={maxDuration}
            addToArray={addToArray}
            removeFromArray={removeFromArray}
            addToAllAudio={addToAllAudio}
          />
        </Grid>
      );
    });
    return buttons;
  };
  const addToArray = (pressedBtn) => {
    setAudioArray([...audioArray, pressedBtn]);
  };
  const removeFromArray = (pressedBtn) => {
    const newAudioArray = audioArray.filter((audio) => {
      return audio.src !== pressedBtn.src;
    });
    setAudioArray([...newAudioArray]);
  };

  //run over array to check for max length
  const checkForNewMaxDuration = () => {
    if (audioArray.length === 0) {
      setMaxDuration(initmaxDuration); //push demo obj with duration :-1
      return;
    }
    let max = initmaxDuration;
    audioArray.forEach((audio) => {
      if (audio.duration > max.duration) {
        max = audio;
      }
    });
    setMaxDuration(max);
  };

  const addToAllAudio = (setIsPlaying) => {
    setallAudio((perv) => [...perv, setIsPlaying]);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      {createButtons()}
    </Grid>
  );
}
