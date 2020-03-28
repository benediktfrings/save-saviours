import React from "react";
import { Grid, Divider } from "@material-ui/core";
import styles from "../../styles/styles";
import { isValidEmail, isValidPhoneNumber, isValidZip } from "../../services";
import RegistrationCallToAction from "../../components/Registration/RegistrationCallToAction";
import RegistrationExperience from "../../components/Registration/RegistrationExperience";
import RegistrationOptIn from "../../components/Registration/RegistrationOptIn";
import RegistrationButton from "../../components/Registration/RegistrationButton";
import InstitutionRegistrationTextField from "../../components/Registration/InstitutionRegistrationTextField";
import * as messages from "./../../messages/de.json";

const InstitutionRegistrationPage = () => {
  const classes = styles();
  let [contactName, setContactName] = React.useState("");
  let [institutionName, setInstitutionName] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [mobile, setMobile] = React.useState("");
  let [landline, setLandline] = React.useState("");
  let [zip, setZip] = React.useState("");
  let [checked, setChecked] = React.useState({
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
    logistics: false
  });
  let [error, setError] = React.useState({
    name: false,
    email: false,
    mobile: false,
    landline: false,
    zip: false
  });
  const isValidForm = ({ email, mobile, landline, zip }) => {
    setError({ ...error, mobile: false, landline: false, zip: false });
    if (!isValidEmail(email)) {
      setError({ ...error, email: true });
      return false;
    }
    if (!isValidPhoneNumber(mobile) && !isValidPhoneNumber(landline)) {
      setError({ ...mobile, mobile: true, landline: true });
      return false;
    }
    if (!isValidZip(zip)) {
      setError({ ...error, zip: true });
      return false;
    }
    return true;
  };
  const handleRegistration = event => {
    event.preventDefault();
    const payload = {
      contactName,
      institutionName,
      landline,
      mobile,
      email,
      zip,
      experience: checked
    };
    if (isValidForm(payload)) {
      //send validated payload to backend
      return (window.location = "/confirmation");
    }
  };
  return (
    <Grid container={true}>
      <Grid item={true} className={classes.registrationGrid}>
        <RegistrationCallToAction
          messageAction={messages["registrationpage.institution.callToAction"]}
        />
        <form onSubmit={event => handleRegistration(event)}>
          <InstitutionRegistrationTextField
            contactName={contactName}
            setContactName={setContactName}
            institutionName={institutionName}
            setInstitutionName={setInstitutionName}
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
            messageSubtitle={messages["registrationpage.institution.subtitle"]}
          />
          <Divider className={classes.registrationDivider} />
          <RegistrationOptIn checked={checked} setChecked={setChecked} />
          <RegistrationButton
            handleRegistration={handleRegistration}
            messageRegistrationButton={
              messages["registrationpage.institution.registrationButton"]
            }
          />
        </form>
      </Grid>
    </Grid>
  );
};

export default InstitutionRegistrationPage;
