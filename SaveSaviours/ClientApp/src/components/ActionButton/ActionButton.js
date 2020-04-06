import React from 'react'
import { Button } from '@material-ui/core'
import styles from 'styles/styles'
import * as messages from 'messages/de.json'

const ActionButton = () => {
  const classes = styles()
  const onClick = () => {
    window.location = '/institutions'
  }
  return (
    <Button
      variant="outlined"
      className={classes.landingButton}
      onClick={() => onClick()}
    >
      {messages['landingpage.callToAction']}
    </Button>
  )
}

export default ActionButton
