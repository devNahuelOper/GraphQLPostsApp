import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Colors from "../Colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: "#fff",
    fontSize: `${1.5}rem`,
    "&:hover": {
      color: "#726d6d"
    }
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

const Navigation = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: Colors.customShade("lightBlue", 300),
        main: Colors.lightBlueAccent,
        dark: Colors.customShade("lightBlue", 700),
      },
      // primary: {
      //   light: Colors.customShade("teal", 300),
      //   main: Colors.tealAccent,
      //   dark: Colors.customShade("teal", 700),
      // },
      secondary: {
        light: Colors.customShade("blueGrey", 300),
        main: Colors.blueGreyAccent,
        dark: Colors.customShade("blueGrey", 700),
      },
      // textPrimary: {
      //   light: Colors.customShade("teal", 300),
      //   main: Colors.tealAccent,
      //   dark: Colors.customShade("teal", 700),
      // },
    },
  });

  const classes = useStyles(theme);

  return (
    <nav className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar className={classes.toolBar}>
            <Link to="/">
              <Typography
                variant="h6"
                className={classes.title}
              >
                Posts
              </Typography>
            </Link>
            <Link to="/new">
              <Typography
                variant="h6"
                className={classes.title}
              >
                Create Post
              </Typography>
            </Link>
            <Link to="/register">
              <Typography
                variant="h6"
                className={classes.title}
              >
                Register
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    </nav>
  );
};

export default Navigation;
