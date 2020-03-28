import React from "react";
import { TextField } from "@material-ui/core";
import styles from "../../styles/styles";
import * as messages from "./../../messages/de.json";

const RegistrationTextField = ({
  contactName,
  setContactName,
  institutionName,
  setInstitutionName,
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
  const classes = styles();
  return (
    <>
    <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        placeholder={messages["registrationpage.institution.institutionName"]}
        label={messages["registrationpage.institution.institutionName"]}
        onChange={event => setInstitutionName(event.target.value)}
        value={institutionName}
        required={true}
        error={error.institutionName}
      />
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        placeholder={messages["registrationpage.institution.contactName"]}
        label={messages["registrationpage.institution.contactName"]}
        onChange={event => setContactName(event.target.value)}
        value={contactName}
        required={true}
        error={error.contactName}
      />
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        placeholder={messages["registrationpage.institution.email"]}
        label={messages["registrationpage.institution.email"]}
        onChange={event => setEmail(event.target.value)}
        value={email}
        required={true}
        error={error.email}
      />
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        placeholder={messages["registrationpage.institution.mobile"]}
        label={messages["registrationpage.institution.mobile"]}
        onChange={event => setMobile(event.target.value)}
        value={mobile}
        error={error.mobile}
      />
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        placeholder={messages["registrationpage.institution.landline"]}
        label={messages["registrationpage.institution.landline"]}
        onChange={event => setLandline(event.target.value)}
        value={landline}
        error={error.landline}
      />
      <TextField
        className={classes.registrationTextfield}
        variant="outlined"
        placeholder={messages["registrationpage.institution.zip"]}
        label={messages["registrationpage.institution.zip"]}
        onChange={event => setZip(event.target.value)}
        value={zip}
        required={true}
        error={error.zip}
      />
    </>
  );
};

export default RegistrationTextField;
