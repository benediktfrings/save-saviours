import Vetting from 'components/Vetting/Vetting'
import React, { useState, useEffect } from 'react'
import {
  Grid,
} from '@material-ui/core'

import * as messages from 'messages/de.json'
import styles from 'styles/styles'
import RegistrationButton from 'components/Registration/RegistrationButton'

const VettingPage = () => {
  const classes = styles()
  const [vetted, setVetted] = useState({})
  // get list of indeterminate institution registrations from backend
  let date = new Date('28 March 2020 14:48 UTC')
  date = date.toUTCString()
  const unvettetInstitutions = [
    {
      contactName: 'Peter Lustig',
      institutionName: 'DRK',
      landline: '',
      mobile: '017722222222',
      email: 'peter@drk.com',
      zip: '55555',
      timestamp: date,
    },
    {
      contactName: 'Norbert Müller',
      institutionName: 'Caritas',
      landline: '',
      mobile: '0173344333333',
      email: 'norbert@caritas.com',
      zip: '66666',
      timestamp: date,
    },
  ]
  const clearVetted = () => {
    setVetted(() => {
      let institutionEmail = {}
      unvettetInstitutions.map((institution) => {
        institutionEmail = { ...institutionEmail, [institution.email]: { verified: false, indeterminate: true } }
      })
      return institutionEmail
    })
  }
  useEffect(() => {
    clearVetted()
  }, [])

  const handleButtonClick = (event) => {
    event.preventDefault()
    // post 'vetted' object [{email<text> : verified<bool>}]  to the backend and get a new list with all indeterminate institutions
    const payload = []
    if (vetted !== false) {
      Object.entries(vetted).map(([email, { verified, indeterminate }]) => {
        if (indeterminate === false) {
          payload.push({ email, verified })
        }
      })
    }
    console.log(payload)
    return payload
  }
  return (
    <Grid container justify="center">
      <Grid item>
        <Vetting
          vetted={vetted}
          setVetted={setVetted}
          unvettetInstitutions={unvettetInstitutions}
        />
      </Grid>
      <Grid>
        <RegistrationButton messageRegistrationButton={messages['vettingpage.vettingButton']} handleRegistration={handleButtonClick} />
      </Grid>

    </Grid>

  )
}

export default VettingPage
