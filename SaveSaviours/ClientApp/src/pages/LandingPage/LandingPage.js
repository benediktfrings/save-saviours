import React from 'react'
import { Grid } from '@material-ui/core';
import styles from './../../styles/styles';
import Welcome from "./../../components/Welcome/Welcome";
import ActionButton from "./../../components/ActionButton/ActionButton";
import Supporters from "./../../components/Supporters/Supporters";

const LandingPage = () => {
  const classes = styles()
  return (
  <Grid container={true}>
    <Grid item={true}>
      <Welcome/>
        <Grid item={true} className={classes.landingButtonGrid}>
          <ActionButton/>
        </Grid>
        <Supporters/>
    </Grid>
  </Grid>
)}

export default LandingPage
