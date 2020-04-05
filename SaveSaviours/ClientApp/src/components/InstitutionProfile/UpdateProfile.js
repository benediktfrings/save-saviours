import React, { useState } from 'react'
import {
  TextField, Typography, FormControlLabel, FormGroup, Checkbox,
} from '@material-ui/core'
import styles from 'styles/styles'
import * as messages from 'messages/de.json'
import InputAdornment from '@material-ui/core/InputAdornment'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

const UpdateProfile = ({
  name,
  setName,
  contactName,
  setContactName,
  phone,
  setPhone,
  zip,
  setZip,
  error,
  vetted,
}) => {
  const classes = styles()
  const [transparentPassword, setTransparentPassword] = useState('password')
  const handleClick = () => {
    transparentPassword === 'password' ? setTransparentPassword('text') : setTransparentPassword('password')
  }

  return (
    <>
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        autoComplete="new-password"
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
      <Typography />
    </>
  )
}

export default UpdateProfile
