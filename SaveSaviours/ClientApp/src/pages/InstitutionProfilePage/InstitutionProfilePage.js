import React, { useState, useEffect } from 'react'
import Get from 'api/get'
import {
  Grid, Box,
} from '@material-ui/core'
import * as messages from 'messages/de.json'
import styles from 'styles/styles'
import Header from 'components/InstitutionProfile/Header'
import DeleteUser from 'components/InstitutionProfile/DeleteUser'
import UpdateProfile from 'components/InstitutionProfile/UpdateProfile'
import Post from 'api/post'
import {
  isValidEmail, isValidPhoneNumber, isValidZip,
} from 'services'

import UpdateButton from 'components/Registration/RegistrationButton'


const InstitutionProfilePage = () => {
  const classes = styles()

  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [contactName, setContactName] = useState('')
  const [phone, setPhone] = useState('')
  const [zip, setZip] = useState('')
  const [vetted, setVetted] = useState(false)
  const [deleteProfile, setDeleteProfile] = useState(false)

  useEffect(() => {
    if (window.localStorage.getItem('access-token')) {
      Get('/user/info')
        .then((response) => {
          if (response.roles.institution) {
            setAuth(true)
            setUser(response)
            setEmail(response.email)
            setName(response.roles.institution.name)
            setContactName(response.roles.institution.contactName)
            setPhone(response.roles.institution.primaryPhoneNumber)
            setZip(response.roles.institution.zipCode)
            setVetted(response.roles.institution.vetted)
          } else window.location = '/signin'
        })
        .catch((e) => new Error(e))
    } else window.location = '/signin'
  }, [])

  const [error, setError] = useState({
    name: false,
    phone: false,
    zip: false,
    password: false,
  })
  const isValidForm = () => {
    setError({
      ...error, phone: false, zip: false,
    })
    if (!isValidPhoneNumber(phone)) {
      setError({ ...phone, phone: true })
      return false
    }
    if (!isValidZip(zip)) {
      setError({ ...error, zip: true })
      return false
    }
    return true
  }

  const handleUpdate = (event) => {
    event.preventDefault()
    const payload = {
      email,
      name,
      contactName,
      zipCode: zip,
      primaryPhoneNumber: phone,
      secondaryPhoneNumber: '',
      vetted,
    }
    if (isValidForm(payload)) {
      Post('/volunteer/update', payload)
        .then((response) => {
          if (response.ok) {
            window.location = '/helperprofile'
          } throw new Error('something went wrong durring registration from backend')
        })
        .catch((e) => new Error(e))
    }
    if (deleteProfile) {
      Post('/user/remove-profile')
    }
  }
  return (
    <Grid container justify="center" className={classes.helperListContainer}>
      {auth && (
      <Grid item xs={12}>
        <Header />
        <Box className={classes.helperProfileFormBox}>
          <form onSubmit={(event) => handleUpdate(event)}>
            <UpdateProfile
              name={name}
              setName={setName}
              contactName={contactName}
              setContactName={setContactName}
              phone={phone}
              setPhone={setPhone}
              zip={zip}
              setZip={setZip}
              error={error}
              vetted={vetted}
            />
            <Box align="center">
              <UpdateButton
                handleRegistration={handleUpdate}
                messageRegistrationButton={messages['helperProfile.updateButton']}
              />
            </Box>

          </form>
        </Box>
        <Box alignContent="left">
          <DeleteUser />
        </Box>

      </Grid>
      )}
    </Grid>

  )
}

export default InstitutionProfilePage
