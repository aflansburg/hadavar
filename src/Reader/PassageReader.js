import React from "react";
import Link from "next/link";
import {
  Container,
  IconButton,
  Button,
  Grid,
  Paper,
  Toolbar,
  Typography,
  Divider,
  AppBar
} from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";
import TorahScroll from "../../src/svg/scroll";
import Navigator from "./Navigator";

const useStyles = makeStyles({
  root: {},
  title: {
    marginLeft: 8
  }
});

// passage will always only be one chapter
function PassageReader({ title, passage, navData }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar
        position="static"
        style={{ marginBottom: 18, backgroundColor: "rgb(34, 104, 148)" }}
      >
        <Toolbar>
          <Link href="/dashboard">
            <IconButton>
              <TorahScroll />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            {`${title} Chapter ${passage.chapter_num}`}
          </Typography>
          {/* if current chapter index plus 1 less than book length (num of
          chapters) then current book else go to next book via currBookIndex++ */}
          <Button style={{ paddingLeft: "5vw", color: "#fff" }}>
            <Link href={Navigator(navData, "prev")}>
              <Typography variant="subtitle1" style={{ float: "right" }}>
                {"< Prev"}
              </Typography>
            </Link>
          </Button>
          <Button style={{ paddingLeft: "5vw", color: "#fff" }}>
            <Link href={Navigator(navData, "next")}>
              <Typography variant="subtitle1" style={{ float: "right" }}>
                {"Next > "}
              </Typography>
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Paper style={{ margin: "12px 0 12px", padding: 12 }}>
          <Typography variant="body1">
            {passage.verses.map((verse, index) => {
              return (
                <React.Fragment key={index}>
                  <sup>{index + 1} </sup>
                  {verse}{" "}
                </React.Fragment>
              );
            })}
          </Typography>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default PassageReader;
