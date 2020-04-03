import React from 'react'
import { Grid } from '@material-ui/core'
import styles from 'styles/styles'
import ReactMarkdown from 'react-markdown'
import Example from 'assets/Example'

const DatasecurityPage = () => {
  const classes = styles()
  // const input = '# This is a header\n\nAnd this is a paragraph'
  const input = Example
  return (
    <Grid container>
      <div className={classes.offset} />
      <Grid item>
        <ReactMarkdown source={input} />
      </Grid>
    </Grid>
  )
}

export default DatasecurityPage
