import React from 'react'
import { TextField, Button } from '@material-ui/core'
import styles from 'styles/styles'
import * as messages from 'messages/de.json'
import { isValidEmail } from 'services'

const Signin = ({ messageRegistrationButton }) => {
  const classes = styles()
  const [name, setName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const isValidForm = ({ name, password }) => {
    setError({ ...error, name: false, password: false })
    if (!isValidEmail(name)) {
      setError({ ...error, name: true })
      return false
    }
    return true
  }
  const handleRegistration = (event) => {
    event.preventDefault()
    const payload = {
      name,
      password,
    }
    if (isValidForm(payload)) {
      // send validated payload to backend
      return (window.location = '/helperslist')
    }
  }
  return (
    <form onSubmit={(event) => handleRegistration(event)}>
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        placeholder={messages['registrationpage.helper.name']}
        label={messages['registrationpage.helper.name']}
        onChange={(event) => setName(event.target.value)}
        value={name}
        required
      />
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        placeholder={messages['registrationpage.helper.email']}
        label={messages['registrationpage.helper.email']}
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        required
        type="password"
      />
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
