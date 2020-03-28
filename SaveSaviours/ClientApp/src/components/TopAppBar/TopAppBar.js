import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "@material-ui/core";
import logo from "assets/rettet-retter-logo.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  wrapperWrapper: {
    textAlign: "center",
    width: "100%",
    height: "100%"
  },
  wrapper: {
    textAlign: "center",
    width: "100%",
    maxWidth: 1350,
    display: "inline-block"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    verticalAlign: "center"
  },
  logo: {
    maxHeight: 100,
    opacity: 1,
    marginTop: 5,
    [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
      maxHeight: 80
    }
  },
  icon: {
    position: 'absolute',
    right: 20,
    [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
      right: -10,
    }
  },
  appBar: {
    backgroundColor: theme.palette.background.default,
    opacity: 1
  }
}));
export default function TopAppBar() {
  const classes = useStyles();
  const [image, setImage] = useState(logo);
  const [color, setColor] = useState("transparent");
  const [scrollStyle, setScrollStyle] = useState(`${classes.appBar}`);
  const [auth, setAuth] = useState(true);

  //get auth information and set route from icon dependingly

  const handleLogOut = () => {
    // eslint-disable-next-line no-alert
    alert("You will be logged out as soon as the backend is done");
  };
  return (
    <AppBar
      position="fixed"
      color={color}
      elevation={0}
      className={scrollStyle}
    >
      <Toolbar>
        <div className={classes.wrapperWrapper}>
          <div className={classes.wrapper}>
            {auth && (
              <span>
                <IconButton
                  className={classes.icon}
                  onClick={handleLogOut}
                  color="inherit"
                >
                  <AccountCircle fontSize="large" />
                </IconButton>
              </span>
            )}
            <Link href="/">
              <img src={image} alt="logo" className={classes.logo} />
            </Link>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
