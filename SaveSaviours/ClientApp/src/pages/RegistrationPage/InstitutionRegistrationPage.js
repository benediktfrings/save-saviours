import React, { useState, useEffect } from 'react'
import { Grid, Divider } from '@material-ui/core'
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
    if (!isValidPassword(password)) {
      setError({ ...error, password: true })
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
          } throw new Error('something went wrong durring registration from backend')
        })
        .then((response) => {
          window.localStorage.setItem('access-token', response)
          window.location = '/institutionconfirmation'
        }).catch((e) => console.log(e))
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
