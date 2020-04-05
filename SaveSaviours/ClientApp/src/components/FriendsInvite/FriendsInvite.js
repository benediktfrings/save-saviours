import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import styles from 'styles/styles'
import * as messages from 'messages/de.json'
import twitterLogo from 'assets/images/twitter-logo.png'

const FriendsInvite = () => {
  const classes = styles()
  return (
    <Paper square elevation={2} className={classes.registrationPaper}>
      <Typography
        variant="h6"
        component="h2"
        className={classes.registrationHeader}
      >
        {messages['confirmationpage.actionButton']}
        {' '}
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fhilf-helfern.de%2F&amp;src=sdkpreparse"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.confirmationLink}
          >
            <div className={classes.confirmationFacebook}>
              <span>
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/zSKZHMh8mXU.png"
                  alt=""
                  width="12"
                  height="12"
                />
              </span>
              <span className={classes.confirmationReferralLabel}>
                {messages['confirmationpage.friendsFacebook']}
              </span>
            </div>
          </a>
        </Grid>
        <Grid item>
          <a
            href="https://twitter.com/intent/tweet?text=Auf%20https%3A%2F%2Fhilf-helfern.de%20kann%20jeder%20schnell%20seine%20Hilfe%20in%20der%20Corona%20Krise%20anbieten%20und%20medizinischen%20Institutionen%20in%20der%20N%C3%A4he%20helfen%20-%20wenn%20Du%20helfen%20kannst%2C%20mach%20mit%21%20%23corona%20%23hilfe%20%23retter%20%23helfer%20%23gesundheit%20%23ehrenamt%20%23gesundheitsministerium"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.confirmationLink}
          >
            <div className={classes.confirmationTwitter}>
              <span className={classes.confirmationReferralImage}>
                <img src={twitterLogo} alt="" width="12" height="12" />
              </span>
              <span className={classes.confirmationReferralLabel}>
                {messages['confirmationpage.friendsTwitter']}
              </span>
            </div>
          </a>
        </Grid>
      </Grid>
      <Typography className={classes.registrationHeader}>
        {messages['confirmationpage.friendstextBody']}
      </Typography>
    </Paper>
  )
}

export default FriendsInvite
