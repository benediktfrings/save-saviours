import React from 'react'
import { Grid } from '@material-ui/core'
import styles from 'styles/styles'
import Welcome from 'components/Welcome/Welcome'
import ActionButton from 'components/ActionButton/ActionButton'
import Supporters from 'components/Supporters/Supporters'
import Get from 'api/get'

const LandingPage = () => {
  const classes = styles()
  // Get('/user/info')
  //   .then((response) => {
  //     if (response.ok) {
  //       return response.json()
  //     } throw new Error('something went wrong durring registration from backend')
  //   })
  //   .then((response) => JSON.parse(response))
  //   .then((response) => console.log(response))
  //   .catch((e) => console.log(e))

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
