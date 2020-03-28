import React from 'react'
import { Grid } from '@material-ui/core'
import styles from 'styles/styles'

const CockpitPage = () => {
  const classes = styles()

  return (
    <Grid container>
      <div className={classes.offset} />
      <Grid item>Cockpit</Grid>
    </Grid>
  )
}

export default CockpitPage
