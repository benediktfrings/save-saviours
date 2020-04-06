import React, { useState, useEffect } from 'react'
import {
  Grid, Divider, Box, Typography,
} from '@material-ui/core'
import styles from 'styles/styles'
import {
  isValidEmail, isValidPhoneNumber, isValidZip, isValidPassword,
} from 'services'
import RegistrationTextField from 'components/Registration/RegistrationTextField'
import RegistrationCallToAction from 'components/Registration/RegistrationCallToAction'
import RegistrationExperience from 'components/Registration/RegistrationExperience'
import RegistrationOptIn from 'components/Registration/RegistrationOptIn'
import RegistrationButton from 'components/Registration/RegistrationButton'
import * as messages from 'messages/de.json'
import Post from 'api/post'

const RegistrationPage = () => {
  const classes = styles()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [zip, setZip] = useState('')
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState([])
  const [datasecurity, setDatasecurity] = useState(false)
  const [tags, setTags] = useState(messages['registrationpage.select'].map((item) => item.text))
  const [error, setError] = useState({
    email: false,
    phone: false,
    zip: false,
    password: false,
    form: false,
  })

  const isValidForm = () => {
    if (!isValidEmail(email)) {
      setError({
        phone: false, zip: false, password: false, email: true, form: true,
      })
      return false
    }
    if (!isValidPhoneNumber(phone)) {
      setError({
        phone: true, zip: false, password: false, email: false, form: true,
      })
      return false
    }
    if (!isValidZip(zip)) {
      setError({
        phone: false, zip: true, password: false, email: false, form: true,
      })
      return false
    }
    if (!isValidPassword(password)) {
      setError({
        phone: false, zip: false, password: true, email: false, form: true,
      })
      return false
    }
    return true
  }

  const handleRegistration = (event) => {
    event.preventDefault()
    const payload = {
      email,
      name,
      zipCode: zip,
      primaryPhoneNumber: phone,
      secondaryPhoneNumber: '',
      bio: '',
      experiences: checked,
      password,
    }
    if (isValidForm(payload)) {
      Post('/volunteer/register', payload)
        .then((response) => {
          if (response.ok) {
            return response.text()
          } throw new Error('something went wrong durring registration from backend')
        })
        .then((response) => {
          window.localStorage.setItem('access-token', response)
          window.location = '/confirmation'
        })
        .catch((e) => console.log(e))
    }
  }
  return (
    <Grid container>
      <Grid item className={classes.registrationGrid}>
        <RegistrationCallToAction messageAction={messages['registrationpage.callToAction']} />
        <Box className={classes.registrationFormBox}>
          <form onSubmit={(event) => handleRegistration(event)}>
            <RegistrationTextField
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              zip={zip}
              setZip={setZip}
              password={password}
              setPassword={setPassword}
              error={error}
            />
            <RegistrationExperience
              setChecked={setChecked}
              tags={tags}
              messageSubtitle={messages['registrationpage.helper.subtitle']}
            />
            <Divider className={classes.registrationDivider} />
            <RegistrationOptIn datasecurity={datasecurity} setDatasecurity={setDatasecurity} />
            {error.form
            && (
            <Typography className={classes.errorTypography}>
              {messages['error.form']}
            </Typography>
            )}
            <RegistrationButton
              handleRegistration={handleRegistration}
              messageRegistrationButton={messages['registrationpage.helper.registrationButton']}
            />
          </form>
        </Box>

      </Grid>
    </Grid>
  )
}

export default RegistrationPage
