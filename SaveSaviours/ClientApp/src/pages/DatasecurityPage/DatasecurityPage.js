import React from 'react'
import { Grid } from '@material-ui/core'
import styles from 'styles/styles'

const DatasecurityPage = () => {
  const classes = styles()

  return (
    <Grid container>
      <div className={classes.offset} />
      <Grid item>Datenschutz</Grid>
    </Grid>
  )
}

export default DatasecurityPage
