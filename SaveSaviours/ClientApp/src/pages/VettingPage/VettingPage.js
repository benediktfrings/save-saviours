import React, { useState, useEffect } from 'react'
import Vetting from 'components/Vetting/Vetting'
import {
  Grid,
} from '@material-ui/core'

import * as messages from 'messages/de.json'
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
        .catch((e) => new Error(e))
    } else window.location = '/signin'
  }, [])

  const [vetted, setVetted] = useState({})

  const [unvettetInstitutions, setUnvettetInstitutions] = useState()
  // get list of indeterminate institution registrations from backend
  const fetchVetting = () => Get('/vetting')
    .then((payload) => setUnvettetInstitutions(payload))
    .catch((e) => new Error(e))


  useEffect(() => {
    const clearVetted = () => {
      setVetted(() => {
        let institutionEmail = {}
        if (unvettetInstitutions) {
          unvettetInstitutions.forEach((institution) => {
            institutionEmail = { ...institutionEmail, [institution.email]: { verified: false, indeterminate: true } }
          })
          return institutionEmail
        }
        return institutionEmail
      })
    }
    clearVetted()
  }, [unvettetInstitutions])

  useEffect(() => {
    fetchVetting()
  }, [])

  const handleButtonClick = (event) => {
    event.preventDefault()
    const rejected = []
    const rejectedPayload = []
    const accepted = []
    const acceptedPayload = []
    if (vetted !== false) {
      Object.entries(vetted).forEach(([email, { verified, indeterminate }]) => {
        if (indeterminate === false && verified === false) {
          rejected.push(email)
        }
        if (indeterminate === false && verified === true) {
          accepted.push(email)
        }
      })
      rejected.forEach((email) => {
        unvettetInstitutions.forEach((value) => (value.email === email ? rejectedPayload.push(value.id) : null))
      })
      accepted.forEach((email) => {
        unvettetInstitutions.map((value) => (value.email === email ? acceptedPayload.push(value.id) : null))
      })
      if (rejected || accepted) {
        if (rejected) {
          return Promise.all(rejectedPayload.map((id) => Post('/vetting/reject', id)))
            .then(() => {
              if (accepted) {
                Promise.all(acceptedPayload.map((id) => Post('/vetting/verify', id)))
                  .then(() => fetchVetting())
                  .catch((e) => new Error(e))
              }
            })
        }
        if (accepted) {
          return Promise.all(acceptedPayload.map((id) => Post('/vetting/verify', id)))
            .then(() => fetchVetting())
            .catch((e) => new Error(e))
        }
      }
    }
    return null
  }
  return (
    <Grid container justify="center">
      {auth
        ? (
          <>
            <Grid xs={12} item>
              {unvettetInstitutions && vetted
                && (
                <Vetting
                  vetted={vetted}
                  setVetted={setVetted}
                  unvettetInstitutions={unvettetInstitutions}
                />
                )}
            </Grid>
            <Grid>
              <RegistrationButton
                messageRegistrationButton={messages['vettingpage.vettingButton']}
                handleRegistration={handleButtonClick}
              />
            </Grid>
          </>
        )
        : <div />}
    </Grid>

  )
}

export default VettingPage
