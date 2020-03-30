import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import styles from 'styles/styles'

const Confirmation = ({ headertextTitle, headertextBody }) => {
  const classes = styles()
  return (
    <Paper square elevation={2} className={classes.landingPaper}>
      <Typography
        variant="h2"
        component="h1"
        className={classes.registrationHeader}
      >
        {headertextTitle}
      </Typography>
      <Typography className={classes.registrationHeader}>
        {headertextBody}
      </Typography>
    </Paper>
  )
}

export default Confirmation
