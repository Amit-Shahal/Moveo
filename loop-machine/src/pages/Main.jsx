import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import LooperGrid from "../components/LooperGrid";
//style
import { useStyles } from "../style/style";

export default function Main() {
  const [allAudio, setallAudio] = useState([]);

  const isPlayingOption = ["off", "on", "queue"];
  const playAll = () => {
    allAudio.forEach((setIsPlaying) => {
      setIsPlaying(isPlayingOption[1]); //all on
    });
  };
  const stopAll = () => {
    allAudio.forEach((setIsPlaying) => {
      setIsPlaying(isPlayingOption[0]); //all off
    });
  };

  const classes = useStyles();
  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid container item justifyContent="flex-end" xs={6}>
          <button onClick={playAll} className={classes.playAllBtn}>
            PLAY
          </button>
        </Grid>

        <Grid container item justifyContent="flex-start" xs={6}>
          <button onClick={stopAll} className={classes.stopAllBtn}>
            STOP
          </button>
        </Grid>
      </Grid>
      <div className={classes.looperGrid}>
        <LooperGrid setallAudio={setallAudio} />
      </div>
    </>
  );
}
