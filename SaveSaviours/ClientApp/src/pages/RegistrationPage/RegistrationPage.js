import React, { useState, useEffect } from 'react'
import { Grid, Divider, Box } from '@material-ui/core'
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

  // const [tags, setTags] = useState([
  //   messages['registrationpage.select'][0].text,
  //   messages['registrationpage.select'][1].text,
  //   messages['registrationpage.select'][2].text,
  //   messages['registrationpage.select'][3].text,
  //   messages['registrationpage.select'][4].text,
  //   messages['registrationpage.select'][5].text,
  //   messages['registrationpage.select'][6].text,
  //   messages['registrationpage.select'][7].text,
  //   messages['registrationpage.select'][8].text,
  //   messages['registrationpage.select'][9].text,
  //   messages['registrationpage.select'][10].text,
  // ])
  const [tags, setTags] = useState(messages['registrationpage.select'].map((item)=>item.text))
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
