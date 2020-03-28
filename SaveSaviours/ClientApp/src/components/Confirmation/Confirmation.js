import React from "react";
import { Paper, Typography } from "@material-ui/core";
import styles from "../../styles/styles";
import * as messages from "./../../messages/de.json";

const Confirmation = () => {
  const classes = styles();
  return (
    <Paper square={true} elevation={2} className={classes.landingPaper}>
      <Typography
        variant="h2"
        component="h1"
        className={classes.registrationHeader}
      >
        {messages["confirmationpage.headertextTitle"]}
      </Typography>
      <Typography className={classes.registrationHeader}>
        {messages["confirmationpage.headertextBody"]}
      </Typography>
    </Paper>
  );
};

export default Confirmation;
