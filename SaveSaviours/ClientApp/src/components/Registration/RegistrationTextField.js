import React, { useState } from 'react'
import { TextField, Typography } from '@material-ui/core'
import styles from 'styles/styles'
import * as messages from 'messages/de.json'
import InputAdornment from '@material-ui/core/InputAdornment'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

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
  password,
  setPassword,
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
        type="number"
        error={error.phone}
      />
      {error.phone
      && (
      <Typography className={classes.errorTypography}>
        {messages['error.phone']}
      </Typography>
      )}
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        placeholder={messages['registrationpage.helper.zip']}
        label={messages['registrationpage.helper.zip']}
        onChange={(event) => setZip(event.target.value)}
        value={zip}
        required
        type="number"
        error={error.zip}
      />
      {error.zip
      && (
      <Typography className={classes.errorTypography}>
        {messages['error.zip']}
      </Typography>
      )}
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
      {error.email
      && (
      <Typography className={classes.errorTypography}>
        {messages['error.email']}
      </Typography>
      )}
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        type={transparentPassword}
        autoComplete="new-password"
        placeholder={messages['registrationpage.helper.password']}
        label={messages['registrationpage.helper.password']}
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        required
        error={error.password}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              {transparentPassword === 'password'
                && <VisibilityOffIcon onClick={() => handleClick()} className={classes.registrationAccountCircle} />}
              {transparentPassword === 'text'
                && <VisibilityIcon VisibilityIcon onClick={() => handleClick()} className={classes.registrationAccountCircle} />}
            </InputAdornment>
          ),
        }}
      />
      {error.password
      && (
      <Typography className={classes.errorTypography}>
        {messages['error.password']}
      </Typography>
      )}
    </>
  )
}

export default RegistrationTextField
