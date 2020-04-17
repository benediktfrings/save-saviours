import React, { useState } from 'react'
import { Grid, Divider, Typography } from '@material-ui/core'
import styles from 'styles/styles'
import {
  isValidEmail, isValidPhoneNumber, isValidZip, isValidPassword,
} from 'services'
import RegistrationCallToAction from 'components/Registration/RegistrationCallToAction'
import RegistrationOptIn from 'components/Registration/RegistrationOptIn'
import RegistrationButton from 'components/Registration/RegistrationButton'
import InstitutionRegistrationTextField from 'components/Registration/InstitutionRegistrationTextField'
import * as messages from 'messages/de.json'
import Post from 'api/post'


const InstitutionRegistrationPage = () => {
  const classes = styles()

  const [contactName, setContactName] = useState('')
  const [institutionName, setInstitutionName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [zip, setZip] = useState('')
  const [datasecurity, setDatasecurity] = useState(false)
  const [password, setPassword] = useState('')

  const [error, setError] = useState({
    email: false,
    phone: false,
    zip: false,
    password: false,
    form: false,
  })
  const [networkError, setNetworkError] = useState(false)
  const [networkErrorMessage, setNetworkErrorMessage] = useState()

  const isValidForm = () => {
    setError({
      phone: false, zip: false, password: false, email: false, form: false,
    })
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
      contactName,
      name: institutionName,
      primaryPhoneNumber: phone,
      secondaryPhoneNumber: '',
      email,
      zipCode: zip,
      password,
    }
    if (isValidForm(payload)) {
      Post('/institution/register', payload)
        .then((response) => {
          if (response.ok) {
            return response.text()
          } setNetworkError(true)
          response.json()
            .then((responseJson) => {
              if (Array.isArray(responseJson) && responseJson[0].code && responseJson[0].code === 'DuplicateUserName') {
                setNetworkErrorMessage(messages['registrationpage.error.duplicateEmail'])
              }
              if (responseJson.ZipCode && responseJson.ZipCode[0] === 'error.not-found') {
                setNetworkErrorMessage(messages['registrationpage.error.falseZip'])
              }
            })
            .catch((e) => console.log(new Error(e)))
          throw new Error('something went wrong durring signin from backend')
        })
        .then((response) => {
          window.localStorage.setItem('access-token', response)
          window.location = '/institutionconfirmation'
        })
        .catch((e) => console.log(new Error(e)))
    }
  }
  return (
    <Grid container>
      <Grid item className={classes.registrationGrid}>
        <RegistrationCallToAction
          messageAction={messages['registrationpage.institution.callToAction']}
        />
        <form onSubmit={(event) => handleRegistration(event)}>
          <InstitutionRegistrationTextField
            contactName={contactName}
            setContactName={setContactName}
            institutionName={institutionName}
            setInstitutionName={setInstitutionName}
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
          <Divider className={classes.registrationDivider} />
          <RegistrationOptIn datasecurity={datasecurity} setDatasecurity={setDatasecurity} />
          {error.form
            && (
            <Typography className={classes.errorTypography}>
              {messages['error.form']}
            </Typography>
            )}
          {networkError
            && <Typography className={classes.signinErrorTypography}>{networkErrorMessage}</Typography>}
          <RegistrationButton
            handleRegistration={handleRegistration}
            messageRegistrationButton={
              messages['registrationpage.institution.registrationButton']
            }
          />
        </form>
      </Grid>
    </Grid>
  )
}

export default InstitutionRegistrationPage
