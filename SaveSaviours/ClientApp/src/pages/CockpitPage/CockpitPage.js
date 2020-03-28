import React from "react";
import styles from "./../../styles/styles";
import { Grid } from "@material-ui/core";

const CockpitPage = () => {
  const classes = styles();

  return (
    <Grid container={true}>
      <div className={classes.offset} />
      <Grid item={true}>Cockpit</Grid>
    </Grid>
  );
};

export default CockpitPage;
