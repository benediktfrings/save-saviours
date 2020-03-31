import React from 'react'
import { Grid } from '@material-ui/core'
import styles from 'styles/styles'
import Welcome from 'components/Welcome/Welcome'
import ActionButton from 'components/ActionButton/ActionButton'
import Supporters from 'components/Supporters/Supporters'
import Get from 'api/get'

const LandingPage = () => {
  const classes = styles()
  Get('/user/info')
  return (
    <Grid container>
      <Grid item>
        <Welcome />
        <Grid item className={classes.landingButtonGrid}>
          <ActionButton />
        </Grid>
        <Supporters />
      </Grid>
    </Grid>
  )
}

export default LandingPage
