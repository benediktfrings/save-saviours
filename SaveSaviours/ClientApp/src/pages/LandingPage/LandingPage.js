import React from 'react'
import { Grid, Box, Divider } from '@material-ui/core'
import styles from 'styles/styles'
import Welcome from 'components/Welcome/Welcome'
import ActionButton from 'components/ActionButton/ActionButton'
import Supporters from 'components/Supporters/Supporters'
import Get from 'api/get'
import RegistrationPage from 'pages/RegistrationPage/RegistrationPage'

const LandingPage = () => {
  const classes = styles()

  return (
    <Grid container>
      <Grid item>
        <Welcome />
        <Box className={classes.landingButtonGrid}>
          <ActionButton />
        </Box>
        <Box className={classes.landingBox}>
        <RegistrationPage/>
        </Box>
        <Box className={classes.landingSupporterBox} >
        <Supporters />
        </Box>
      </Grid>
    </Grid>
  )
}

export default LandingPage
