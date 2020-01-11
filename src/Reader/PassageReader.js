import React, { useEffect, useState } from "react";
import Link from "next/link";
import Router, { RouterContext } from "next/router";
import {
  Container,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Paper,
  Toolbar,
  Typography,
  AppBar,
  BottomNavigation,
  BottomNavigationAction
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import makeStyles from "@material-ui/styles/makeStyles";
import SvgIcon from "@material-ui/core/SvgIcon";
import TorahScroll from "../svg/scroll";
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
  const smUpMatches = useMediaQuery("(min-width:600px)");

  const [verseHighlighted, setVerseHighlighted] = useState();
  const [selectedVerse, setSelectedVerse] = useState(
    navData.currVerseIndex + 1 || 0
  );
  const [selectedChapter, setSelectedChapter] = useState(
    navData.currChapterIndex + 1
  );
  const inputLabel = React.useRef(null);

  const { length } = navData;
  let chapterArrIterable = Array.apply(null, Array(length));
  chapterArrIterable = chapterArrIterable.map((_, i) => i);

  useEffect(() => {
    const verseNumber =
      navData.currVerseIndex !== null ? navData.currVerseIndex + 1 : false;
    const verseLength = passage.verses.length;
    if (verseNumber && verseNumber <= verseLength) {
      const selVerseElem = document.getElementById(`verse-${verseNumber}`);
      const scrollOptions = {
        inline: "center",
        block: "center",
        behavior: "smooth"
      };
      selVerseElem.scrollIntoView(scrollOptions);

      setTimeout(() => {
        setVerseHighlighted(verseNumber);
      }, 250);
    }
  }, []);

  const handleVerseChange = e => {
    setSelectedVerse(e.target.value);
    const url = `/torah/passage?book=${
      navData.currBookIndex
    }&chapterIndex=${selectedChapter - 1}&verseIndex=${e.target.value - 1}`;
    Router.push(url, url, { shallow: true });
  };
  const handleChapterChange = e => {
    setSelectedChapter(e.target.value);
    const url = `/torah/passage?book=${navData.currBookIndex}&chapterIndex=${e
      .target.value - 1}&verseIndex=${selectedVerse - 1}`;
    Router.push(url, url, { shallow: true });
  };

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
  const BoldedVerse = ({ verse, verseNum, id }) => {
    let splitVerse = verse;
    splitVerse = splitVerse.split(/(\u{05d4}\u{05d5}\u{05d4}\u{05d9})/u);

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
      <Typography variant="body1" id={id}>
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
        position="sticky"
        style={{ marginBottom: 18, backgroundColor: "rgb(34, 104, 148)" }}
      >
        <Toolbar>
          <Grid container justify="flex-start" alignItems="center">
            <Grid item xs={1}>
              <Link href="/">
                <IconButton>
                  <TorahScroll />
                </IconButton>
              </Link>
            </Grid>
            <Grid
              item
              container
              xs={11}
              spacing={1}
              justify={"center"}
              alignItems="center"
            >
              <Grid item>
                <Typography variant="subtitle1" className={classes.title}>
                  {title}
                </Typography>
              </Grid>
              <Grid item>
                <FormControl variant="filled" style={{ width: 80 }}>
                  <InputLabel
                    ref={inputLabel}
                    id="demo-simple-select-outlined-label"
                    style={{ color: "#fff" }}
                  >
                    Chapter
                  </InputLabel>
                  <Select
                    value={selectedChapter}
                    onChange={handleChapterChange}
                    style={{ color: "#fff" }}
                  >
                    {chapterArrIterable.map((v, vi) => {
                      return (
                        <MenuItem value={v + 1} key={`menu-item-${vi}`}>
                          {v + 1}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Typography variant="h5">:</Typography>
              </Grid>
              <Grid item>
                <FormControl variant="filled" style={{ width: 80 }}>
                  <InputLabel
                    ref={inputLabel}
                    id="demo-simple-select-outlined-label"
                    style={{ color: "#fff" }}
                  >
                    Verse
                  </InputLabel>
                  <Select
                    value={selectedVerse}
                    onChange={handleVerseChange}
                    style={{ color: "#fff" }}
                  >
                    {passage.verses.map((v, i) => {
                      return (
                        <MenuItem key={i} value={i + 1}>
                          {i + 1}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container>
        <Paper style={{ margin: "12px 0 12px", padding: 12 }}>
          {passage.verses.map((verse, index) => {
            return (
              <BoldedVerse
                id={`verse-${index + 1}`}
                key={index}
                verse={verse}
                verseNum={index + 1}
              />
            );
          })}
        </Paper>
      </Container>
      <AppBar
        position="sticky"
        color="primary"
        style={{ top: "auto", bottom: 0, backgroundColor: "rgb(34, 104, 148)" }}
      >
        {/* if current chapter index plus 1 less than book length (num of
          chapters) then current book else go to next book via currBookIndex++ */}
        <Grid container justify="space-between">
          <Grid item>
            <NavLink op="prev" />
          </Grid>
          <Grid item>
            <NavLink op="next" />
          </Grid>
        </Grid>
      </AppBar>
    </React.Fragment>
  );
}

export default PassageReader;
