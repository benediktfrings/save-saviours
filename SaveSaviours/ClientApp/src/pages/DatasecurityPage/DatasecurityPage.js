import React from "react";
import styles from "./../../styles/styles";
import { Grid } from "@material-ui/core";

const DatasecurityPage = () => {
  const classes = styles();

  return (
    <Grid container={true}>
      <div className={classes.offset} />
      <Grid item={true}>Datenschutz</Grid>
    </Grid>
  );
};

export default DatasecurityPage;
