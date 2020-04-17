import React, { useState } from 'react'
import { TextField, Button, Typography } from '@material-ui/core'
import styles from 'styles/styles'
import * as messages from 'messages/de.json'
import { isValidEmail } from 'services'
import Post from 'api/post'
import Get from 'api/get'

const Signin = ({ messageRegistrationButton }) => {
  const classes = styles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [networkError, setNetworkError] = useState(false)
  const [networkErrorMessage, setNetworkErrorMessage] = useState()

  const isValidForm = () => {
    setError({ ...error, email: false, password: false })
    if (!isValidEmail(email)) {
      setError({ ...error, email: true })
      return false
    }
    return true
  }
  const handleRegistration = (event) => {
    event.preventDefault()
    const formData = {
      username: email,
      password,
    }

    if (isValidForm(formData)) {
      Post('/user/authenticate', formData)
        .then((response) => {
          if (response.ok) {
            return response.text()
          } if (!response.ok) {
            response.json()
              .then(({ msg }) => {
                setNetworkError(true)
                if (msg === 'auth.error.user-or-pass-mismatch') {
                  setNetworkErrorMessage(messages['signinpage.signinErrorMessage'])
                }
              })
          } throw new Error('something went wrong durring signin from backend')
        })
        .then((payload) => {
          window.localStorage.setItem('access-token', payload)
          Get('/user/info')
            .then((info) => {
              if (info.roles.administrator) window.location = '/vetting'
              if (info.roles.volunteer) window.location = '/helperprofile'
              if (info.roles.institution) window.location = '/helperslist'
            })
        })
        .catch((e) => new Error(e))
    }
  }


  return (
    <form onSubmit={(event) => handleRegistration(event)}>
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        placeholder={messages['signinpage.name']}
        label={messages['signinpage.name']}
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        required
        error={error.email}
      />
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        placeholder={messages['signinpage.password']}
        label={messages['signinpage.password']}
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        required
        type="password"
      />
      {networkError
      && <Typography className={classes.signinErrorTypography}>{networkErrorMessage}</Typography>}
      <Button
        variant="outlined"
        type="submit"
        className={classes.registrationButton}
        onSubmit={(event) => handleRegistration(event)}
      >
        {messageRegistrationButton}
      </Button>
    </form>
  )
}

export default Signin
