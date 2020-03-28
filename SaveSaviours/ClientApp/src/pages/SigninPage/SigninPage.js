import React from 'react'
import { Grid } from '@material-ui/core'
import Signin from 'components/Signin/Signin'
import * as messages from 'messages/de.json'

const SigninPage = () => (
  <Grid container justify="center">
    <Grid item>
      <Signin messageRegistrationButton={messages['signinpage.button']} />
    </Grid>
  </Grid>
)

export default SigninPage
