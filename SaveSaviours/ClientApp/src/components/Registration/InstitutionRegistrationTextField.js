import React from 'react'
import { TextField } from '@material-ui/core'
import styles from 'styles/styles'
import * as messages from 'messages/de.json'

const RegistrationTextField = ({
  contactName,
  setContactName,
  institutionName,
  setInstitutionName,
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
        placeholder={messages['registrationpage.institution.institutionName']}
        label={messages['registrationpage.institution.institutionName']}
        onChange={(event) => setInstitutionName(event.target.value)}
        value={institutionName}
        required
        error={error.institutionName}
      />
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        placeholder={messages['registrationpage.institution.contactName']}
        label={messages['registrationpage.institution.contactName']}
        onChange={(event) => setContactName(event.target.value)}
        value={contactName}
        required
        error={error.contactName}
      />
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        placeholder={messages['registrationpage.institution.email']}
        label={messages['registrationpage.institution.email']}
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        required
        error={error.email}
      />
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        placeholder={messages['registrationpage.institution.phone']}
        label={messages['registrationpage.institution.phone']}
        onChange={(event) => setPhone(event.target.value)}
        value={phone}
        required
        error={error.phone}
      />
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        placeholder={messages['registrationpage.institution.zip']}
        label={messages['registrationpage.institution.zip']}
        onChange={(event) => setZip(event.target.value)}
        value={zip}
        required
        error={error.zip}
      />
    </>
  )
}

export default RegistrationTextField
