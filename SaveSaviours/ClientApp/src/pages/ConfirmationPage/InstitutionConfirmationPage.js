import React from 'react'
import { Grid } from '@material-ui/core'
import Confirmation from 'components/Confirmation/Confirmation'
import * as messages from 'messages/de.json'


const InstitutionConfirmationPage = () => (
  <Grid container>
    <Grid item>
      <Confirmation
        headertextTitle={messages['confirmationpage.institutions.headertextTitle']}
        headertextBody={messages['confirmationpage.institutions.headertextBody']}
      />
    </Grid>
  </Grid>
)

export default InstitutionConfirmationPage
