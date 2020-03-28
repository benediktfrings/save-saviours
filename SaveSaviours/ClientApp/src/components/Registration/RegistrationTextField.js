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
  mobile,
  setMobile,
  landline,
  setLandline,
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
        placeholder={messages['registrationpage.helper.mobile']}
        label={messages['registrationpage.helper.mobile']}
        onChange={(event) => setMobile(event.target.value)}
        value={mobile}
        error={error.mobile}
      />
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        placeholder={messages['registrationpage.helper.landline']}
        label={messages['registrationpage.helper.landline']}
        onChange={(event) => setLandline(event.target.value)}
        value={landline}
        error={error.landline}
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
