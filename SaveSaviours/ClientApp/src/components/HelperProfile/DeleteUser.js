import React, { useState } from 'react'
import { Button, Typography, Box } from '@material-ui/core'
import styles from 'styles/styles'
import Post from 'api/post'
import * as messages from 'messages/de.json'


const DeleteUser = () => {
  const classes = styles()
  const [deleteClicked, setDeleteClicked] = useState(false)
  const deleteButtonClick = () => setDeleteClicked(!deleteClicked)
  const deleteConfirmationClick = () => {
    Post('/user/remove-profile')
      .then(() => {
        window.localStorage.clear()
        window.location = '/'
      })
      .catch((e) => new Error(e))
  }
  return (
    <>
      <Typography
        variant="subtitle2"
        component="h2"
        align="center"
        className={classes.helperDeleteSubtitle}
      >
        {messages['helperProfile.deleteSubtitle']}
      </Typography>
      <Box align="left" className={classes.helperProfileTextBox}>
        <Typography
          align="left"
          variant="body1"
        >
          {messages['helperProfile.deleteExplainer']}
        </Typography>
      </Box>
      <Box align="left" className={classes.helperProfileTextBox}>
        <Typography
          align="left"
          variant="body1"
        >
          {messages['helperProfile.deleteAlternative']}
        </Typography>
      </Box>

      <Box align="center">
        <Button
          variant="outlined"
          className={classes.helperDeleteButton}
          onClick={() => deleteButtonClick()}
        >
          {messages['helperProfile.deleteButton']}
        </Button>
      </Box>

      {deleteClicked
        && (
        <>
          <Box align="center">
            <Typography
              align="center"
              variant="body1"
            >
              {messages['helperProfile.deleteConfirmationText']}
            </Typography>
          </Box>

          <Box align="center">
            <Button
              variant="outlined"
              className={classes.helperDeleteButton}
              onClick={() => deleteConfirmationClick()}
            >
              {messages['helperProfile.deleteConfirmationButton']}
            </Button>
          </Box>
        </>

        )}
    </>

  )
}

export default DeleteUser
