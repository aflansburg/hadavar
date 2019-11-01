import React from "react";
import { Container, Grid, Paper, Typography, Divider } from "@material-ui/core";

// passage will always only be one chapter
function PassageReader({ title, passage }) {
  return (
    <Container>
      <Paper style={{ margin: "12px 0 12px", padding: 12 }}>
        <Typography variant="h5">{title}</Typography>
        <Divider />
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
  );
}

export default PassageReader;
