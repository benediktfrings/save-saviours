import React, { useState, useEffect } from 'react'
import {
  Paper, Typography, TextField, MenuItem, Grid, Box,
} from '@material-ui/core'
import * as messages from 'messages/de.json'
import styles from 'styles/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import theme from 'styles/theme'

const HelpersList = ({
  tags, tagVolunteers, cardClickHandler, selectClickHandler, selectValue,
}) => {
  const classes = styles()
  // get list of volunteers with zip codes close to the institution from backend

  return (
    <Paper square elevation={2} className={classes.helperListPaper}>
      <Typography variant="h1" className={classes.landingHeader}>
        {messages['helperslistpage.header']}
      </Typography>
      <Box>
        <Typography variant="body1" className={classes.helperListExplainerText}>
          {messages['helperslistpage.explainer']}
        </Typography>
      </Box>
      <TextField
        className={classes.helperListSelect}
        select
        shrink={false}
        InputLabelProps={{ color: 'primary' }}
        value={selectValue}
        variant="outlined"
        label={messages['helperslistpage.experience']}
        onClick={(event) => selectClickHandler(event)}
      >
        {tags && tags.map((tag) => (
          <MenuItem key={tag.id} value={tag.label}>
            {tag.label}
          </MenuItem>
        ))}
      </TextField>
      <Grid container spacing={2} className={classes.helperListCardContainer} justify="center">
        {tagVolunteers && tagVolunteers.map((tagVolunteer) => (
          <Card key={tagVolunteer.id} onClick={() => cardClickHandler(tagVolunteer.id)} className={classes.helperListCard}>
            <CardContent>
              <Grid container justify="center" spacing={2} className={classes.helperListCardContainer}>
                <Grid item className={classes.helperListCardGrid} xs={12} md={6}>
                  <Typography variant="h6" component="h2">
                    {messages['helperslistpage.contactData']}
                  </Typography>
                  <Typography>
                    {messages['registrationpage.helper.name']}
                    {' '}
                    <span style={tagVolunteer.blur}>{tagVolunteer.name}</span>
                  </Typography>
                  <Typography>
                    {messages['registrationpage.helper.email']}
                    <span style={tagVolunteer.blur}>{tagVolunteer.email}</span>
                  </Typography>
                  <Typography>
                    {messages['registrationpage.helper.phone']}
                    <span style={tagVolunteer.blur}>{tagVolunteer.primaryPhoneNumber}</span>
                  </Typography>
                  <Typography variant="h6" component="h2">
                    {messages['helperslistpage.distance']}
                    <span className={classes.helperListCardItem}>
                      {parseInt(tagVolunteer.distance)}
                      {' '}
                      km
                    </span>
                  </Typography>
                </Grid>
                <Grid item className={classes.helperListCardGrid} xs={12} md={6}>
                  <Typography variant="h6" component="h2">
                    {messages['helperslistpage.experience']}
                  </Typography>
                  {tagVolunteer.tags.map((tagId) => tags.map(({ value, label }) => {
                    if (value === tagId) return <Typography key={value}>{label}</Typography>
                  }))}
                </Grid>

              </Grid>

            </CardContent>
            <CardActions />
          </Card>

        ))}
      </Grid>
    </Paper>
  )
}

export default HelpersList
