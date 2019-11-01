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

const useStyles = makeStyles({
  root: {},
  title: {
    marginLeft: 8
  }
});

// passage will always only be one chapter
function PassageReader({ title, passage, navData }) {
  const classes = useStyles();
  console.log(navData);
  const { currBookIndex, currChapterIndex, length } = navData;

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
            <Link
              href={`/torah/passage?book=${
                currChapterIndex + 1 < length
                  ? currBookIndex
                  : currBookIndex + 1
              }&chapter=${
                currChapterIndex + 1 < length ? currChapterIndex + 1 : 0
              }`}
            >
              <Typography variant="subtitle" style={{ float: "right" }}>
                Next >
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
                <React.Fragment>
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
