import React from "react";
import Link from "next/link";
import { Button, Grid, Paper, Typography, Divider } from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";
import booksMeta from "../books.json";

const useStyles = makeStyles({
  card: {
    margin: 4
  }
});

export function Torah() {
  const classes = useStyles();

  const TorahBooks = booksMeta["Torah"];

  return (
    <Grid item xs={12} sm={4} md={3} component={Paper} className={classes.card}>
      <Typography variant="h5">HaTorah</Typography>
      <Divider style={{ marginBottom: 8 }} />
      <Grid item container spacing={2}>
        {TorahBooks.map((book, index) => {
          return (
            <Grid item xs={12} key={`Torah-Book-${book.name}-${index}`}>
              <Link href={`/passages/passage?book=${index}`}>
                <Button>
                  <Typography variant="subtitle1">{book.name}</Typography>
                </Button>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export function Neviim() {
  const classes = useStyles();

  const Neviim = booksMeta["Nevi'im"];

  return (
    <Grid item xs={12} sm={4} md={3} component={Paper} className={classes.card}>
      <Typography variant="h5">HaNevi'im</Typography>
      <Divider style={{ marginBottom: 8 }} />
      <Grid item container spacing={2}>
        {Neviim.map((book, index) => {
          // adding 5 to index to get to Prophets, probably not ideal - need to rethink
          const bookIndex = index + 5;
          return (
            <Grid item xs={12} key={`Neviim-Book-${book.name}-${bookIndex}`}>
              <Link href={`/passages/passage?book=${bookIndex}`}>
                <Button>
                  <Typography variant="subtitle1">{book.name}</Typography>
                </Button>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export function HaKetuvim() {
  const classes = useStyles();

  const HaKetuvim = booksMeta["HaKetuvim"];

  return (
    <Grid item xs={12} sm={4} md={3} component={Paper} className={classes.card}>
      <Typography variant="h5">HaKetuvim</Typography>
      <Divider style={{ marginBottom: 8 }} />
      <Grid item container spacing={2}>
        {HaKetuvim.map((book, index) => {
          // adding 5 to index to get to Writings, probably not ideal - need to rethink
          const bookIndex = index + 29;
          return (
            <Grid item xs={12} key={`HaKetuvim-Book-${book.name}-${bookIndex}`}>
              <Link href={`/passages/passage?book=${bookIndex}`}>
                <Button>
                  <Typography variant="subtitle1">{book.name}</Typography>
                </Button>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export function Glossary() {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={4} md={3} component={Paper} className={classes.card}>
      <Typography variant="h5">Tools {" <coming soon> "}</Typography>
      <Divider style={{ marginBottom: 8 }} />
      <Grid item container spacing={2}>
        <Grid item xs={12}>
          <Button>
            <Typography variant="subtitle1">
              Glossary of Terms {" <coming soon> "}
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button>
            <Typography variant="subtitle1">
              Parashot {" <coming soon> "}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
