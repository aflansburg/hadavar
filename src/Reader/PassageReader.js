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
