import React from 'react'
import { TextField, Button } from '@material-ui/core'
import styles from 'styles/styles'
import * as messages from 'messages/de.json'
import { isValidEmail } from 'services'
import Post from 'api/post'

const Signin = ({ messageRegistrationButton }) => {
  const classes = styles()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')

  const isValidForm = () => {
    setError({ ...error, name: false, password: false })
    if (!isValidEmail(email)) {
      setError({ ...error, name: true })
      return false
    }
    return true
  }
  const handleRegistration = (event) => {
    event.preventDefault()
    const payload = {
      username: email,
      password,
    }

    if (isValidForm(payload)) {
      Post('/user/authenticate', payload)
        .then((response) => {
          if (response.ok) {
            return response.text()
          } throw new Error('something went wrong durring signin from backend')
        })
        .then((response) => {
          window.localStorage.setItem('access-token', response)
          window.location = '/'
        })
        .catch((e) => console.log(e))
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
