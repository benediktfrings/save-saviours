import React from 'react'
import { Grid } from '@material-ui/core'
import styles from 'styles/styles'

const FAQPage = () => {
  const classes = styles()

  return (
    <Grid container>
      <div className={classes.offset} />
      <Grid item>FAQs</Grid>
    </Grid>
  )
}

export default FAQPage
