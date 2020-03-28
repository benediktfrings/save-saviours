import React from "react";
import { Paper, Typography, List, ListItem } from "@material-ui/core";
import styles from "./../../styles/styles";
import * as messages from "./../../messages/de.json";

const Welcome = () => {
  const classes = styles();

  return (
    <Paper square={true} elevation={2} className={classes.landingPaper}>
      <Typography variant="h1" className={classes.landingHeader}>
        {messages["landingpage.explainerHeader"]}
      </Typography>
      <Typography className={classes.landingText}>
        {messages["landingpage.explainerBody"]}
      </Typography>
      <Typography variant="h3" component="h2" className={classes.landingHeader}>
        {messages["landingpage.helptextTitle"]}
      </Typography>
      <Typography className={classes.landingText}>
        {messages["landingpage.helptextBody1"]}
      </Typography>
      <Typography className={classes.landingText}>
        {messages["landingpage.helptextBody2"]}
      </Typography>
      <List dense={true}>
        {messages["landingpage.helptextTasks"].map(task => {
          return (
            <ListItem key={task} className={classes.landingText}>
              {task}
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default Welcome;
