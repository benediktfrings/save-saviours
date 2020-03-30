import React from 'react'
import { Grid } from '@material-ui/core'
import Confirmation from 'components/Confirmation/Confirmation'
import FriendsInvite from 'components/FriendsInvite/FriendsInvite'
import * as messages from 'messages/de.json'

const ConfirmationPage = () => (
  <Grid container>
    <Grid item>
      <Confirmation
        headertextTitle={messages['confirmationpage.headertextTitle']}
        headertextBody={messages['confirmationpage.headertextBody']}

      />
      <FriendsInvite />
    </Grid>
  </Grid>
)

export default ConfirmationPage
