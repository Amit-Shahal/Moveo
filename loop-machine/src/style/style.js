import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  playAllBtn: {
    background: "linear-gradient(45deg, #C5D553 10%, #5AD553 90%)", //green
    boxShadow: "0 3px 5px 2px rgba(90, 213, 83, .3)",
    width: "95%",
    height: "95vh",
    textAlign: "left",
  },
  stopAllBtn: {
    background: "linear-gradient(45deg, #FF6000 10%, #FF1840 90%)", //red
    boxShadow: "0 3px 5px 2px rgba(255, 24, 64, .3)",
    width: "95%",
    height: "95vh",
    textAlign: "right",
  },
  looperGrid: {
    position: "fixed",
    width: "80%",
    top: "5%",
    left: "10%",
    border: "solid",
    borderColor: "#FFFFFF",
    borderWidth: "3px",
  },
  LooperButton: {
    background: (props) => props.color,
    width: "100%",
    height: "26.6666vh",
  },
});

export { useStyles };
