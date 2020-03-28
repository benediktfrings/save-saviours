import React from "react";
import { Grid } from "@material-ui/core";
import Signin from "./../../components/Signin/Signin";
import * as messages from "./../../messages/de.json";

const SigninPage = () => {
  return (
    <Grid container={true} justify="center">
      <Grid item={true}>
        <Signin messageRegistrationButton={messages["signinpage.button"]} />
      </Grid>
    </Grid>
  );
};

export default SigninPage;
