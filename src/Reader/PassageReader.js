import React, { useState } from "react";
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
import SvgIcon from "@material-ui/core/SvgIcon";
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
  const [verseHighlighted, setVerseHighlighted] = useState();

  const NavLink = ({ op }) => (
    <Link href={Navigator(navData, op)}>
      <IconButton style={{ color: "#fff" }}>
        <SvgIcon>
          {op === "next" ? (
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          ) : (
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          )}
        </SvgIcon>
      </IconButton>
    </Link>
  );

  // this bolds and increases font size on the name of Elohim
  const BoldedVerse = ({ verse, verseNum }) => {
    let splitVerse = verse.split(/(\u{05d4}\u{05d5}\u{05d4}\u{05d9})/u);
    for (var i = 1; i < splitVerse.length; i += 2) {
      splitVerse[i] = (
        <span
          style={{
            fontWeight: "bold",
            fontSize: 20
          }}
          key={i}
        >
          {[...splitVerse[i]].reverse().join("")}
        </span>
      );
    }
    return (
      <Typography variant="body1">
        <span style={{ fontWeight: "bold", marginRight: 3 }}>
          <sup>{verseNum}</sup>
        </span>
        <span
          onClick={() => {
            if (verseNum !== verseHighlighted) setVerseHighlighted(verseNum);
            else setVerseHighlighted(null);
          }}
          style={{
            backgroundColor:
              verseNum === verseHighlighted ? "rgba(154,255,154,0.58)" : "none"
          }}
        >
          {splitVerse}
        </span>
      </Typography>
    );
  };

  return (
    <React.Fragment>
      <AppBar
        position="static"
        style={{ marginBottom: 18, backgroundColor: "rgb(34, 104, 148)" }}
      >
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Link href="/">
                <IconButton>
                  <TorahScroll />
                </IconButton>
              </Link>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" className={classes.title}>
                {`${title} Chapter ${passage.chapter_num}`}
              </Typography>
            </Grid>
            {/* if current chapter index plus 1 less than book length (num of
          chapters) then current book else go to next book via currBookIndex++ */}
            <Grid item>
              <NavLink op="prev" />
              <NavLink op="next" />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container>
        <Paper style={{ margin: "12px 0 12px", padding: 12 }}>
          {passage.verses.map((verse, index) => {
            return (
              <BoldedVerse key={index} verse={verse} verseNum={index + 1} />
            );
          })}
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default PassageReader;
