import React, { useState, useEffect } from 'react'
import Get from 'api/get'
import {
  Grid, Box,
} from '@material-ui/core'
import * as messages from 'messages/de.json'
import styles from 'styles/styles'
import HelperHeader from 'components/HelperProfile/HelperHeader'
import DeleteUser from 'components/HelperProfile/DeleteUser'
import UpdateProfile from 'components/HelperProfile/UpdateProfile'
import UpdateExperience from 'components/HelperProfile/UpdateExperience'
import Post from 'api/post'
import {
  isValidEmail, isValidPhoneNumber, isValidZip,
} from 'services'

import UpdateButton from 'components/Registration/RegistrationButton'


const HelperProfilePage = () => {
  const classes = styles()

  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [zip, setZip] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [checked, setChecked] = useState(false)
  const [deleteProfile, setDeleteProfile] = useState(false)

  const [tags, setTags] = useState([
    messages['registrationpage.select'][0].text,
    messages['registrationpage.select'][1].text,
    messages['registrationpage.select'][2].text,
    messages['registrationpage.select'][3].text,
    messages['registrationpage.select'][4].text,
    messages['registrationpage.select'][5].text,
    messages['registrationpage.select'][6].text,
    messages['registrationpage.select'][7].text,
    messages['registrationpage.select'][8].text,
    messages['registrationpage.select'][9].text,
  ])

  useEffect(() => {
    if (window.localStorage.getItem('access-token')) {
      Get('/user/info')
        .then((response) => {
          if (response.roles.volunteer) {
            setAuth(true)
            setUser(response)
            setEmail(response.email)
            setName(response.roles.volunteer.name)
            setPhone(response.roles.volunteer.primaryPhoneNumber)
            setZip(response.roles.volunteer.zipCode)
            setIsActive(response.roles.volunteer.isActive)
            setChecked(response.roles.volunteer.experiences)
          } else window.location = '/signin'
        })
        .catch((e) => new Error(e))
    } else window.location = '/signin'
  }, [])

  useEffect(() => {
    console.log(checked)
  }, [checked])

  const [error, setError] = useState({
    name: false,
    email: false,
    phone: false,
    zip: false,
    password: false,
  })
  const isValidForm = () => {
    setError({
      ...error, phone: false, zip: false,
    })
    if (!isValidEmail(email)) {
      setError({ ...error, email: true })
      return false
    }
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
      zipCode: zip,
      primaryPhoneNumber: phone,
      secondaryPhoneNumber: '',
      bio: '',
      experiences: checked,
      isActive,
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
        <HelperHeader />
        <Box className={classes.helperProfileFormBox}>
          <form onSubmit={(event) => handleUpdate(event)}>
            <UpdateProfile
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              zip={zip}
              setZip={setZip}
              error={error}
              isActive={isActive}
              setIsActive={setIsActive}
            />
            <UpdateExperience
              setChecked={setChecked}
              checked={checked}
              tags={tags}
              messageSubtitle={messages['helperProfile.subtitle']}
            />
            <Box align="center">
              <UpdateButton
                handleRegistration={handleUpdate}
                messageRegistrationButton={messages['helperProfile.updateButton']}
              />
            </Box>

          </form>
        </Box>

        <Grid alignContent="left">
          <DeleteUser />
        </Grid>

      </Grid>
      )}
    </Grid>

  )
}

export default HelperProfilePage
