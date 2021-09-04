import React, { useState, useRef, useEffect } from "react";
import { useStyles } from "../style/style";

export default function LooperButton(props) {
  const { audioUrl, maxDuration, addToArray, removeFromArray, addToAllAudio } =
    props;
  const isPlayingOption = ["off", "on", "que"];
  // state
  const [isPlaying, setIsPlaying] = useState(isPlayingOption[0]); // init as "off"
  const audioPlayer = useRef(); // reference audio component

  useEffect(() => {
    //provide parent accsses to setIsPlaying for play/stop all buttons
    addToAllAudio(setIsPlaying);
  }, []);

  //#region handle synced play

  //handle audio by state cahnge, after isPlaying state changened
  useEffect(() => {
    let timer;
    if (isPlaying === isPlayingOption[1]) {
      //on
      addToArray(audioPlayer.current);
      audioPlayer.current.play();
    } else if (isPlaying === isPlayingOption[0]) {
      //off
      removeFromArray(audioPlayer.current);
      audioPlayer.current.currentTime = 0;
      audioPlayer.current.pause();
    } else if (isPlaying === isPlayingOption[2]) {
      //que
      let delay = (maxDuration.duration - maxDuration.currentTime) * 1000;
      if (maxDuration.currentTime === 0) {
        //when currentTime equal 0 then start with out delay
        delay = 0;
      }
      timer = setTimeout(() => {
        addToArray(audioPlayer.current);
        audioPlayer.current.play();
        setIsPlaying(isPlayingOption[1]); //on
      }, delay);
    }
    //clean up
    //when timer has been started and btn pressed again then clear time out
    return () => clearTimeout(timer);
  }, [isPlaying]);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    //when off
    if (prevValue === isPlayingOption[0]) {
      if (maxDuration.duration === -1) {
        //when equal to -1 then its the first btn that was clicked(all btn state equal 'off')
        setIsPlaying(isPlayingOption[1]); //on
      } else {
        //when not the first btn that was clicked
        //start playing its loop on the next loop cycle
        setIsPlaying(isPlayingOption[2]); //que
      }
    }
    //when on or que
    else if (prevValue !== isPlayingOption[0]) {
      setIsPlaying(isPlayingOption[0]); //off
    }
  };
  const audioEnded = () => {
    setIsPlaying(isPlayingOption[2]); //que
    
  };
  //#endregion
  //
  //style
  const getColor = () => {
    let color;
    switch (isPlaying) {
      case isPlayingOption[0]: //off
        color = "linear-gradient(45deg, #FF6000 10%, #FF1840 90%)"; //red

        break;
      case isPlayingOption[1]: //on
        color = "linear-gradient(45deg, #C5D553 10%, #5AD553 90%)"; //green

        break;
      case isPlayingOption[2]: // que
        color = "linear-gradient(45deg, #FFFF7D 10%, #FFFF05 90%)"; //yellow
        break;
      default:
        break;
    }
    return { color: color };
  };

  const classes = useStyles(getColor());
  return (
    <>
      <audio
        id="myAudio"
        ref={audioPlayer}
        onEnded={audioEnded}
        src={audioUrl}
        preload="metadata"></audio>
      <button className={classes.LooperButton} onClick={togglePlayPause}>
        <>{isPlaying}</>
      </button>
    </>
  );
}
