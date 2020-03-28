import React, { useState } from 'react'
import { Paper, Typography, Checkbox } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import * as messages from 'messages/de.json'
import styles from 'styles/styles'

const Vetting = () => {
  const classes = styles()
  const [vetted, setVetted] = useState()
  // get list of unvetted institution registrations from backend
  const unvettetInstitutions = [
    {
      contactName: 'Peter Lustig',
      institutionName: 'DRK',
      landline: '',
      mobile: '017722222222',
      email: 'peter@lustig.com',
      zip: '55555',
    },
  ]
  return (
    <Paper square elevation={2} className={classes.landingPaper}>
      <Typography variant="h1" className={classes.landingHeader}>
        {messages['vettingpage.header']}
      </Typography>
      <Table>
        <TableHead dense>
          <TableBody>
            {unvettetInstitutions.map((institution) => (
              <div key={institution.email}>
                <TableCell className={classes.landingText}>
                  <Checkbox />
                </TableCell>
                <TableCell>{institution.institutionName}</TableCell>
                <TableCell>{institution.contactName}</TableCell>
                <TableCell>{institution.email}</TableCell>
                <TableCell>{institution.landline}</TableCell>
                <TableCell>{institution.mobile}</TableCell>
                <TableCell>{institution.zip}</TableCell>
              </div>
            ))}
          </TableBody>
        </TableHead>
      </Table>
    </Paper>
  )
}

export default Vetting
