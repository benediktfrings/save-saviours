import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Link } from '@material-ui/core'
import logo from 'assets/images/logo.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  wrapperWrapper: {
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  wrapper: {
    textAlign: 'center',
    width: '100%',
    maxWidth: 1350,
    display: 'inline-block',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    verticalAlign: 'center',
  },
  logo: {
    maxHeight: 100,
    opacity: 1,
    marginTop: 5,
    [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
      maxHeight: 65,
    },
  },
  icon: {
    position: 'absolute',
    right: 20,
    color: theme.palette.primary.dark,
    opacity: 0.9,
    [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
      right: 0,
      top: 10,
    },
  },
  appBar: {
    backgroundColor: theme.palette.background.default,
    opacity: 1,
  },
}))
export default function TopAppBar() {
  const classes = useStyles()
  const image = logo
  const color = 'transparent'
  const scrollStyle = `${classes.appBar}`

  const handleLogOut = () => {
    window.localStorage.clear()
    window.location = '/signin'
  }
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
            <span onClick={() => handleLogOut()}>
              <IconButton
                className={classes.icon}
                color="inherit"
              >
                <AccountCircle fontSize="large" />
              </IconButton>
            </span>

            <Link href="/">
              <img src={image} alt="logo" className={classes.logo} />
            </Link>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  )
}
