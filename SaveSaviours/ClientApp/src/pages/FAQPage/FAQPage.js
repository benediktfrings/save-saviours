import React from 'react'
import { Grid } from '@material-ui/core'
import styles from 'styles/styles'
import ReactMarkdown from 'react-markdown'
import Faq from 'assets/markdowns/Faq'

const FAQPage = () => {
  const classes = styles()
  // const input = '# This is a header\n\nAnd this is a paragraph'
  const input = Faq
  return (
    <Grid container wrap="nowrap">
      <div className={classes.offset} />
      <Grid item>
        <ReactMarkdown source={input} />
      </Grid>
    </Grid>
  )
}

export default FAQPage
