import React, { useState, useEffect } from 'react'
import HelpersList from 'components/HelpersList/HelpersList'
import Get from 'api/get'
import {
  Grid,
} from '@material-ui/core'
import * as messages from 'messages/de.json'
import styles from 'styles/styles'


const HelpersListPage = () => {
  const classes = styles()

  const [auth, setAuth] = useState(false)
  const [vetted, setVetted] = useState(false)
  const [tagVolunteers, setTagVolunteers] = useState(false)
  const [tags, setTags] = useState(false)
  const [selectValue, setSelectValue] = useState(messages['helperslistpage.experienceCallToAction'])

  const selectClickHandler = (event) => {
    setSelectValue(event.target.value)
  }
  const cardClickHandler = (volunteerId) => Get(`/institution/detail/${volunteerId}`)
    .then((response) => {
      const volunteers = tagVolunteers.map((volunteer) => (volunteer.id === volunteerId ? {
        ...volunteer, name: response.name, email: response.email, primaryPhoneNumber: response.primaryPhoneNumber, blur: { padding: 10 },
      } : volunteer))
      setTagVolunteers(volunteers)
    })
    .catch((e) => new Error(e))

  useEffect(() => {
    if (window.localStorage.getItem('access-token')) {
      Get('/user/info')
        .then((response) => {
          if (response.roles.institution || response.roles.administrator) setAuth(true)
          if (response.roles.institution.vetted) setVetted(true)
          else window.location = '/signin'
        })
        .catch((e) => new Error(e))
    } else window.location = '/signin'
  }, [])

  useEffect(() => {
    Get('/institution/tags')
      .then((response) => {
        const sorted = [...response].sort((a, b) => {
          const tagA = a.label
          const tagB = b.label
          let comparison = 0
          if (tagA > tagB) {
            comparison = 1
          } if (tagA < tagB) comparison = -1
          return comparison
        })
        setTags(sorted)
        return sorted
      })
      .catch((e) => new Error(e))
  }, [])

  useEffect(() => {
    let eventTagId
    if (tags) {
      tags.forEach((tag) => {
        if (tag.label === selectValue) eventTagId = tag.value
      })
    }
    Get(`/institution/volunteers/${eventTagId}`)
      .then((response) => {
        const volunteers = response.map((volunteer) => ({
          ...volunteer,
          name: messages['helperslistpage.blurName'],
          email: messages['helperslistpage.blurEmail'],
          primaryPhoneNumber: messages['helperslistpage.blurPhone'],
          blur: {
            WebkitFilter: 'blur(3.7px)',
            padding: 10,
          },
        }))
        return volunteers
      }).then((volunteers) => {
        setTagVolunteers(volunteers)
      })
      .catch((e) => new Error(e))
  }, [selectValue])

  return (
    <Grid container justify="center" className={classes.helperListContainer}>
      {auth
         && vetted && tags && (
           <Grid item>
             <HelpersList tagVolunteers={tagVolunteers} tags={tags} cardClickHandler={cardClickHandler} selectClickHandler={selectClickHandler} selectValue={selectValue} />
           </Grid>
      )}
      {auth
         && !vetted && (
         <Grid item className={classes.helperListPaper}>
           {messages['helperslistpage.notVetted']}
         </Grid>
      )}

    </Grid>

  )
}

export default HelpersListPage
