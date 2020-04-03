import React from 'react'
import {
  Paper, Typography, TextField, MenuItem, Grid, Box,
} from '@material-ui/core'
import * as messages from 'messages/de.json'
import styles from 'styles/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

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
                  <Typography variant="h6" component="h2" display="inline">
                    {messages['helperslistpage.contactData']}
                  </Typography>
                  <Box>
                    <Typography className={classes.helperListCardHeader} display="inline">
                      {messages['registrationpage.helper.name']}
                    </Typography>
                    {' '}
                    <Typography style={tagVolunteer.blur} display="inline">{tagVolunteer.name}</Typography>
                  </Box>
                  <Box>
                    <Typography className={classes.helperListCardHeader} display="inline">
                      {messages['registrationpage.helper.email']}
                    </Typography>
                    <Typography style={tagVolunteer.blur} display="inline">{tagVolunteer.email}</Typography>
                  </Box>
                  <Box>
                    <Typography className={classes.helperListCardHeader} display="inline">
                      {messages['registrationpage.helper.phone']}
                    </Typography>
                    <Typography style={tagVolunteer.blur} display="inline">{tagVolunteer.primaryPhoneNumber}</Typography>
                  </Box>
                  <Typography variant="h6" component="h2" className={classes.helperListCardDistance}>
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
