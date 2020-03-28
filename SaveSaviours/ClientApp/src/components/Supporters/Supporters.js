import React from "react";
import { Grid, Typography } from "@material-ui/core";
import styles from "styles/styles";
import * as messages from "messages/de.json";
import supporterImage from "assets/roteskreuz.png";

const Supporters = () => {
  const classes = styles();
  return (
    <>
      <Typography variant="h6" component="h3" className={classes.landingHeader}>
        {messages["landingpage.support"]}
      </Typography>
      <Grid container={true}>
        <Grid item={true}>
          <img
            src={supporterImage}
            alt="logo"
            className={classes.landingSupporterImage}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Supporters;
