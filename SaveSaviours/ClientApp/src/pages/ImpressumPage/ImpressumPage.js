import React from 'react'
import { Grid } from '@material-ui/core'
import styles from 'styles/styles'

const ImpressumPage = () => {
  const classes = styles()
  return (
    <Grid container>
      <div className={classes.offset} />
      <Grid item>Impressum</Grid>
    </Grid>
  )
}

export default ImpressumPage
