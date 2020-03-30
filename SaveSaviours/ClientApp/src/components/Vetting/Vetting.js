import React from 'react'
import {
  Paper, Typography, Checkbox,
} from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import * as messages from 'messages/de.json'
import styles from 'styles/styles'


const Vetting = ({ vetted, setVetted, unvettetInstitutions }) => {
  const classes = styles()
  const handleCheckbox = (event) => {
    setVetted({
      ...vetted,
      [event.target.name]: { verified: !vetted[event.target.name].verified, indeterminate: false },
    })
  }
  return (
    <Paper square elevation={2} className={classes.landingPaper}>
      <Typography variant="h1" className={classes.landingHeader}>
        {messages['vettingpage.header']}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{messages['registrationpage.institution.institutionName']}</TableCell>
              <TableCell>{messages['registrationpage.institution.contactName']}</TableCell>
              <TableCell>{messages['registrationpage.institution.email']}</TableCell>
              <TableCell>{messages['registrationpage.institution.phone']}</TableCell>
              <TableCell>{messages['registrationpage.institution.zip']}</TableCell>
              <TableCell>{messages['vettingpage.institution.timestamp']}</TableCell>
              <TableCell>{messages['vettingpage.institution.vetted']}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {unvettetInstitutions.map((institution) => (
              vetted[institution.email]
                && (
                <TableRow key={institution.email}>
                  <TableCell>{institution.institutionName}</TableCell>
                  <TableCell>{institution.contactName}</TableCell>
                  <TableCell>{institution.email}</TableCell>
                  <TableCell>{institution.phone}</TableCell>
                  <TableCell>{institution.zip}</TableCell>
                  <TableCell>{institution.timestamp}</TableCell>
                  <TableCell className={classes.landingText}>
                    <Checkbox
                      checked={vetted[institution.email].verified}
                      indeterminate={vetted[institution.email].indeterminate}
                      onChange={(event) => handleCheckbox(event)}
                      name={institution.email}
                    />
                  </TableCell>
                </TableRow>
                )
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default Vetting
