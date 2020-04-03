import React from 'react'
import {
  Paper, Typography,
} from '@material-ui/core'
import * as messages from 'messages/de.json'
import styles from 'styles/styles'

const HelperHeader = () => {
  const classes = styles()

  return (
    <Paper square elevation={2} className={classes.helperListPaper}>
      <Typography variant="h1" className={classes.landingHeader}>
        {messages['helperProfile.header']}
      </Typography>
    </Paper>
  )
}

export default HelperHeader
