import React from "react";
import Link from "next/link";
import { Button, Grid, Paper, Typography, Divider } from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles({
  card: {
    margin: 4
  }
});

export function Torah() {
  const classes = useStyles();

  const TorahBooks = [
    { name: "B'reshit (Genesis)", slug: "breshit" },
    { name: "Shemot (Exodus)", slug: "shemot" },
    { name: "Vayikra (Leviticus)", slug: "vayikra" },
    { name: "BaMidbar (Numbers)", slug: "bamidbar" },
    { name: "D'varim (Deuteronomy)", slug: "dvarim" }
  ];

  const handleBookClick = slug => {};

  return (
    <Grid item xs={12} sm={4} md={3} component={Paper} className={classes.card}>
      <Typography variant="h5">Torah</Typography>
      <Divider style={{ marginBottom: 8 }} />
      <Grid item container spacing={2}>
        {TorahBooks.map((book, index) => {
          return (
            <Grid item xs={12} key={`Torah-Book-${book.name}-${index}`}>
              <Button>
                <Link href={`/torah/passage?book=${index}`}>
                  <Typography variant="subtitle1">{book.name}</Typography>
                </Link>
              </Button>
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
      <Typography variant="h5">Tools</Typography>
      <Divider style={{ marginBottom: 8 }} />
      <Grid item container spacing={2}>
        <Grid item xs={12}>
          <Button>
            <Typography variant="subtitle1">Glossary of Terms</Typography>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button>
            <Typography variant="subtitle1">Parashot</Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
