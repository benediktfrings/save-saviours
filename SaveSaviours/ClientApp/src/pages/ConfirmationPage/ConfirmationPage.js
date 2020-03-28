import React from 'react'
import { Grid } from '@material-ui/core'
import Confirmation from 'components/Confirmation/Confirmation'
import FriendsInvite from 'components/FriendsInvite/FriendsInvite'

const ConfirmationPage = () => (
  <Grid container>
    <Grid item>
      <Confirmation />
      <FriendsInvite />
    </Grid>
  </Grid>
)

export default ConfirmationPage
