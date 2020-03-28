import React from "react";
import { Button } from "@material-ui/core";
import styles from "../../styles/styles";

const RegistrationButton = ({
  handleRegistration,
  messageRegistrationButton
}) => {
  const classes = styles();
  return (
    <Button
      variant="outlined"
      type="submit"
      className={classes.registrationButton}
      onSubmit={event => handleRegistration(event)}
    >
      {messageRegistrationButton}
    </Button>
  );
};

export default RegistrationButton;
