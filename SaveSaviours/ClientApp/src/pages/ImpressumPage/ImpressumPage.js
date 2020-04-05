import React from 'react'
import { Grid } from '@material-ui/core'
import styles from 'styles/styles'
import ReactMarkdown from 'react-markdown'
import Impressum from 'assets/markdowns/Impressum'

const ImpressumPage = () => {
  const classes = styles()
  // const input = '# This is a header\n\nAnd this is a paragraph'
  const input = Impressum
  return (
    <Grid container wrap="nowrap">
      <div className={classes.offset} />
      <Grid item>
        <ReactMarkdown source={input} />
      </Grid>
    </Grid>
  )
}

export default ImpressumPage
