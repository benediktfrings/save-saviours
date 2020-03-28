import React from "react";
import styles from "./../../styles/styles";
import { Grid } from "@material-ui/core";

const FAQPage = () => {
  const classes = styles();

  return (
    <Grid container={true}>
      <div className={classes.offset} />
      <Grid item={true}>FAQs</Grid>
    </Grid>
  );
};

export default FAQPage;
