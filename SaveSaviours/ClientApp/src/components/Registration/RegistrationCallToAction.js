import React from "react";
import { Paper, Typography } from "@material-ui/core";
import styles from "../../styles/styles";

const RegistrationCallToAction = ({messageAction}) => {
  const classes = styles();
  return (
    <Paper square={true} elevation={2} className={classes.registrationPaper}>
      <Typography
        variant="h2"
        component="h1"
        className={classes.registrationHeader}
      >
        {messageAction}
      </Typography>
    </Paper>
  );
};

export default RegistrationCallToAction;
