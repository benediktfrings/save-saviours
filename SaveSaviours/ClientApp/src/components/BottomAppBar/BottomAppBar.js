import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Link, Grid } from '@material-ui/core'
import * as messages from 'messages/de.json'

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
    opacity: 1,
  },
  link: {
    paddingLeft: 15,
    paddingRight: 15,
    '@media (max-width: 600px)': {
      fontSize: '0.8rem',
    },
  },
}))
export default function BottomAppBar() {
  const classes = useStyles()
  const [color, setColor] = useState('transparent')
  const [scrollStyle, setScrollStyle] = useState(`${classes.appBar}`)
  return (
    <AppBar
      position="static"
      color={color}
      elevation={0}
      className={scrollStyle}
    >
      <Toolbar>
        <Grid container justify="center">
          {messages['bottomappbar.links'].map((link) => (
            <Grid key={link.name} item>
              <Link className={classes.link} href={link.route}>
                {link.label}
              </Link>
            </Grid>
          ))}
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
