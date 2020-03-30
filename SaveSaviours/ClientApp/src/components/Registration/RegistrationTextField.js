import React from 'react'
import { TextField } from '@material-ui/core'
import styles from 'styles/styles'
import * as messages from 'messages/de.json'

const RegistrationTextField = ({
  name,
  setName,
  email,
  setEmail,
  error,
  phone,
  setPhone,
  zip,
  setZip,
}) => {
  const classes = styles()
  return (
    <>
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        placeholder={messages['registrationpage.helper.name']}
        label={messages['registrationpage.helper.name']}
        onChange={(event) => setName(event.target.value)}
        value={name}
        required
        error={error.name}
      />
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        placeholder={messages['registrationpage.helper.email']}
        label={messages['registrationpage.helper.email']}
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        required
        error={error.email}
      />
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        placeholder={messages['registrationpage.helper.phone']}
        label={messages['registrationpage.helper.phone']}
        onChange={(event) => setPhone(event.target.value)}
        value={phone}
        required
        error={error.phone}
      />
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        placeholder={messages['registrationpage.helper.zip']}
        label={messages['registrationpage.helper.zip']}
        onChange={(event) => setZip(event.target.value)}
        value={zip}
        required
        error={error.zip}
      />
    </>
  )
}

export default RegistrationTextField
