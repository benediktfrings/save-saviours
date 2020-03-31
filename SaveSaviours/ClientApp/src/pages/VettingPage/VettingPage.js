import Vetting from 'components/Vetting/Vetting'
import React, { useState, useEffect } from 'react'
import {
  Grid,
} from '@material-ui/core'

import * as messages from 'messages/de.json'
import styles from 'styles/styles'
import RegistrationButton from 'components/Registration/RegistrationButton'
import Get from 'api/get'
import Post from 'api/post'

const VettingPage = () => {
//  const classes = styles()
  const [auth, setAuth] = useState(null)
  useEffect(() => {
    if (window.localStorage.getItem('access-token')) {
      Get('/user/info')
        .then((response) => {
          if (response.roles.administrator) setAuth(true)
          else window.location = '/signin'
        })
        .catch((e) => console.log(e))
    } else window.location = '/signin'
  }, [])

  const [vetted, setVetted] = useState({})

  const [unvettetInstitutions, setUnvettetInstitutions] = useState()
  // get list of indeterminate institution registrations from backend
  const fetchVetting = () => Get('/vetting')
    .then((payload) => setUnvettetInstitutions(payload))
    .catch((e) => console.log(e))


  const clearVetted = () => {
    setVetted(() => {
      let institutionEmail = {}
      if (unvettetInstitutions) {
        unvettetInstitutions.map((institution) => {
          institutionEmail = { ...institutionEmail, [institution.email]: { verified: false, indeterminate: true } }
        })
        return institutionEmail
      }
    })
  }
  useEffect(() => {
    clearVetted()
  }, [unvettetInstitutions])
  useEffect(() => {
    fetchVetting()
  }, [])

  const handleButtonClick = (event) => {
    event.preventDefault()
    // post 'vetted' object [{email<text> : verified<bool>}]  to the backend and get a new list with all indeterminate institutions
    let rejected = []
    let accepted = []
    if (vetted !== false) {
      Object.entries(vetted).map(([email, { verified, indeterminate }]) => {
        if (indeterminate === false && verified === false) {
          rejected.push(email)
        }
        if (indeterminate === false && verified === true) {
          accepted.push(email)
        }
      })
      accepted.map((email) => {
        accepted = unvettetInstitutions.map((value) => (value.email === email ? value.id : null))
      })
      rejected.map((email) => {
        rejected = unvettetInstitutions.map((value) => (value.email === email ? value.id : null))
      })
      if (rejected) rejected.map((id) => Post('/vetting/reject', id))
      if (accepted) accepted.map((id) => Post('/vetting/verify', id))
    }
  }
  return (
    <Grid container justify="center">
      {auth
        ? (
          <>
            <Grid item>
              {unvettetInstitutions
                && (
                <Vetting
                  vetted={vetted}
                  setVetted={setVetted}
                  unvettetInstitutions={unvettetInstitutions}
                />
                )}

            </Grid>
            <Grid>
              <RegistrationButton messageRegistrationButton={messages['vettingpage.vettingButton']} handleRegistration={handleButtonClick} />
            </Grid>
          </>
        )
        : <div />}
    </Grid>

  )
}

export default VettingPage
