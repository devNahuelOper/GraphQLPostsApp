import React from "react";
import { lightBlue, teal, blueGrey, indigo } from "@material-ui/core/colors";

const Colors = {
  lightBlueAccent: lightBlue[600],
  tealAccent: teal[300],
  blueGreyAccent: blueGrey[400],
  indigoAccent: indigo[400],
  customShade: (color, number) => {
    switch(color) {
      case "lightBlue":
        return lightBlue[number];
      case "blueGrey":
        return blueGrey[number];
      case "teal":
        return teal[number];
      case "indigo":
        return indigo[number];
      default:
        return Colors.blueGreyAccent;
    }
  }
}

export default Colors;