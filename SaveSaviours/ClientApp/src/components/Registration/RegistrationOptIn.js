import React from 'react'
import { FormControlLabel, FormGroup, Checkbox } from '@material-ui/core'
import styles from 'styles/styles'
import * as messages from 'messages/de.json'

const RegistrationOptIn = ({ datasecurity, setDatasecurity }) => {
  const classes = styles()

  const handleCheckbox = (event) => {
    setDatasecurity(event.target.checked)
  }
  return (
    <FormGroup>
      {messages['registrationpage.datasecurity'].map((select) => (
        <FormControlLabel
          key={select.name}
          label={select.text}
          control={(
            <Checkbox
              required
              checked={datasecurity}
              onChange={(event) => handleCheckbox(event)}
              name={select.name}
            />
            )}
        />
      ))}
    </FormGroup>
  )
}

export default RegistrationOptIn
