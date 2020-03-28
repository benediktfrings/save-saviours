import React from 'react'
import { Grid, Divider } from '@material-ui/core'
import styles from 'styles/styles'
import { isValidEmail, isValidPhoneNumber, isValidZip } from 'services'
import RegistrationTextField from 'components/Registration/RegistrationTextField'
import RegistrationCallToAction from 'components/Registration/RegistrationCallToAction'
import RegistrationExperience from 'components/Registration/RegistrationExperience'
import RegistrationOptIn from 'components/Registration/RegistrationOptIn'
import RegistrationButton from 'components/Registration/RegistrationButton'
import * as messages from 'messages/de.json'

const RegistrationPage = () => {
  const classes = styles()
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [mobile, setMobile] = React.useState('')
  const [landline, setLandline] = React.useState('')
  const [zip, setZip] = React.useState('')
  const [checked, setChecked] = React.useState({
    none: false,
    laboratory: false,
    care: false,
    ambulance: false,
    coordination: false,
    car: false,
    office: false,
    projectmanagement: false,
    datasecurity: false,
    service: false,
    logistics: false,
  })
  const [error, setError] = React.useState({
    name: false,
    email: false,
    mobile: false,
    landline: false,
    zip: false,
  })
  const isValidForm = ({
    email, mobile, landline, zip,
  }) => {
    setError({
      ...error, mobile: false, landline: false, zip: false,
    })
    if (!isValidEmail(email)) {
      setError({ ...error, email: true })
      return false
    }
    if (!isValidPhoneNumber(mobile) && !isValidPhoneNumber(landline)) {
      setError({ ...mobile, mobile: true, landline: true })
      return false
    }
    if (!isValidZip(zip)) {
      setError({ ...error, zip: true })
      return false
    }
    return true
  }
  const handleRegistration = (event) => {
    event.preventDefault()
    const payload = {
      name,
      email,
      mobile,
      landline,
      zip,
      experience: checked,
    }
    if (isValidForm(payload)) {
      // send validated payload to backend
      return (window.location = '/confirmation')
    }
  }
  return (
    <Grid container>
      <Grid item className={classes.registrationGrid}>
        <RegistrationCallToAction messageAction={messages['registrationpage.callToAction']} />
        <form onSubmit={(event) => handleRegistration(event)}>
          <RegistrationTextField
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            mobile={mobile}
            setMobile={setMobile}
            landline={landline}
            setLandline={setLandline}
            zip={zip}
            setZip={setZip}
            error={error}
          />
          <RegistrationExperience
            checked={checked}
            setChecked={setChecked}
            messageSubtitle={messages['registrationpage.helper.subtitle']}
          />
          <Divider className={classes.registrationDivider} />
          <RegistrationOptIn checked={checked} setChecked={setChecked} />
          <RegistrationButton
            handleRegistration={handleRegistration}
            messageRegistrationButton={messages['registrationpage.helper.registrationButton']}
          />
        </form>
      </Grid>
    </Grid>
  )
}

export default RegistrationPage
