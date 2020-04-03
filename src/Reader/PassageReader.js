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
import FacebookIcon from "@material-ui/icons/Facebook";
import ArrowRight from "@material-ui/icons/ArrowRight";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
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
  const [showNavBtns, setShowNavBtns] = useState(true);
  const inputLabel = React.useRef(null);

  const [windowHeight, setWindowHeight] = useState();

  const { length } = navData;
  let chapterArrIterable = Array.apply(null, Array(length));
  chapterArrIterable = chapterArrIterable.map((_, i) => i);
  let timer;

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    window.addEventListener("scroll", scrollToggleNav, false);
    window.addEventListener(
      "touchmove",
      e => {
        e.preventDefault();
      },
      false
    );
    timer = setTimeout(() => {
      setShowNavBtns(false);
      clearTimeout(timer);
    }, 3000);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", scrollToggleNav, false);
      window.removeEventListener(
        "touchmove",
        e => {
          e.preventDefault();
        },
        false
      );
    };
  }, []);

  useEffect(() => {
    if (showNavBtns && !timer) {
      timer = setTimeout(() => {
        setShowNavBtns(false);
        clearTimeout(timer);
      }, 3000);
    }
  }, [showNavBtns]);

  const scrollToggleNav = e => {
    setShowNavBtns(true);
  };

  useEffect(() => {
    const verseNumber = selectedVerse;
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
  }, [selectedVerse, verseHighlighted]);

  const handleVerseChange = e => {
    e.preventDefault();
    setSelectedVerse(e.target.value);
    const url = `/passages/passage?book=${
      navData.currBookIndex
    }&chapterIndex=${selectedChapter - 1}&verseIndex=${e.target.value - 1}`;
    window.history.replaceState(url, "Page Title", url);
    // Router.replace(url, url, { shallow: true });
  };
  const handleChapterChange = e => {
    setSelectedChapter(e.target.value);
    const url = `/passages/passage?book=${
      navData.currBookIndex
    }&chapterIndex=${e.target.value - 1}&verseIndex=${selectedVerse - 1}`;
    Router.push(url, url, { shallow: true });
  };

  const handleClickVerse = (verse, verseNum, id) => {
    if (verseNum !== verseHighlighted) {
      setVerseHighlighted(verseNum);
      setSelectedVerse(verseNum);
      const url = `/passages/passage?book=${
        navData.currBookIndex
      }&chapterIndex=${selectedChapter - 1}&verseIndex=${verseNum - 1}`;
      // Router.replace(url, url, { shallow: true });
      window.history.replaceState(url, "Page Title", url);
    } else setVerseHighlighted(null);
  };

  const NavLink = ({ op }) => (
    <Link href={Navigator(navData, op)}>
      <IconButton
        size="small"
        style={{
          color: "#fff",
          height: "4rem",
          marginLeft: op === "prev" && -6
        }}
      >
        {op === "next" ? <ArrowRight /> : <ArrowLeft />}
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
            fontSize: 22
          }}
          key={i}
        >
          {[...splitVerse[i]].reverse().join("")}
        </span>
      );
    }
    return (
      <Typography variant="body1" id={id} style={{ fontSize: 18 }}>
        <span style={{ fontWeight: "bold", marginRight: 3 }}>
          <sup>{verseNum}</sup>
        </span>
        <span
          onClick={() => handleClickVerse(verse, verseNum, id)}
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
    <div>
      <AppBar
        position="sticky"
        style={{ marginBottom: 18, backgroundColor: "rgb(34, 104, 148)" }}
      >
        <Toolbar disableGutters>
          <Grid container justify="space-between" alignItems="center">
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
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="subtitle1" className={classes.title}>
                  {title}
                </Typography>
              </Grid>
              <Grid item>
                <FormControl variant="filled" style={{ width: 72 }}>
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
                <FormControl variant="filled" style={{ width: 72 }}>
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
      {showNavBtns && (
        <Grid
          container
          justify="space-between"
          style={{ position: "fixed", bottom: "50%" }}
        >
          <Grid
            item
            style={{
              width: 26,
              backgroundColor: "rgba(0,0,0,0.25)",
              borderTopRightRadius: 75,
              borderBottomRightRadius: 75,
              border: "2px solid rgba(0,0,0,0)"
            }}
          >
            <NavLink op="prev" />
          </Grid>
          <Grid
            item
            style={{
              width: 26,
              backgroundColor: "rgba(0,0,0,0.25)",
              borderTopLeftRadius: 75,
              borderBottomLeftRadius: 75,
              border: "2px solid rgba(0,0,0,0)"
            }}
          >
            <NavLink op="next" />
          </Grid>
        </Grid>
      )}
      <Container fixed style={{ height: windowHeight }}>
        <Paper
          style={{ margin: "12px 0 12px", padding: "1rem 12px 4rem 12px" }}
        >
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
      {windowHeight && (
        <AppBar
          position="fixed"
          color="primary"
          style={{
            top: "auto",
            bottom: 0,
            backgroundColor: "rgb(34, 104, 148)"
          }}
        >
          {/* if current chapter index plus 1 less than book length (num of
          chapters) then current book else go to next book via currBookIndex++ */}
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <NavLink op="prev" />
            </Grid>
            <Grid
              item
              container
              xs={8}
              sm={3}
              justify="center"
              data-href={window.location.href}
              data-layout="button"
              data-size="large"
            >
              <IconButton
                target="_blank"
                aria-label="share verse to facebook"
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&src=sdkpreparse`}
                className="fb-xfbml-parse-ignore"
                style={{ fontSize: 16, color: "#fff" }}
              >
                <FacebookIcon
                  style={{ color: "#fff", marginRight: 4 }}
                  fontSize="small"
                />
                Share Verse To Facebook
              </IconButton>
            </Grid>
            <Grid item>
              <NavLink op="next" />
            </Grid>
          </Grid>
        </AppBar>
      )}
    </div>
  );
}

export default PassageReader;
