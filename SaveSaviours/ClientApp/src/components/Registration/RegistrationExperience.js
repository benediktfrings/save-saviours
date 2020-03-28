import React from 'react'
import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  Typography,
  Grid,
} from '@material-ui/core'
import styles from 'styles/styles'
import * as messages from 'messages/de.json'

const RegistrationExperience = ({ checked, setChecked, messageSubtitle }) => {
  const classes = styles()
  const handleCheckbox = (event) => {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    })
  }
  return (
    <FormGroup>
      <Typography
        variant="subtitle2"
        component="h2"
        className={classes.registrationTaskText}
      >
        {messageSubtitle}
      </Typography>
      <Grid container>
        {messages['registrationpage.select'].map((select) => (
          <Grid
            key={select.name}
            xs={12}
            md={6}
            item
            className={classes.registrationExperience}
          >
            <FormControlLabel
              key={select.name}
              control={(
                <Checkbox
                  checked={checked[select.name]}
                  onChange={(event) => handleCheckbox(event)}
                  name={select.name}
                />
                )}
              label={select.text}
            />
          </Grid>
        ))}
      </Grid>
    </FormGroup>
  )
}

export default RegistrationExperience
