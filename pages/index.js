import React from "react";
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import makeStyles from "@material-ui/styles/makeStyles";
import { Torah, Glossary } from "../src/Dashboard/Cards";
import TorahScroll from "../src/svg/scroll";

const useStyles = makeStyles({
  root: {
    margin: 12
  },
  title: {
    marginLeft: 8
  }
});

export default function Index() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar
        position="static"
        style={{ marginBottom: 18, backgroundColor: "rgb(34, 104, 148)" }}
      >
        <Toolbar>
          <IconButton>
            <TorahScroll />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            HaDavar
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <Grid container spacing={2} justify="space-evenly">
          <Torah />
          <Glossary />
        </Grid>
      </div>
    </React.Fragment>
  );
}
