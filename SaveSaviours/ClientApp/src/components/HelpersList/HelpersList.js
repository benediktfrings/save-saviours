import React, { useState } from 'react'
import { Paper, Typography, Checkbox } from '@material-ui/core'
import * as messages from 'messages/de.json'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import styles from 'styles/styles'

const HelpersList = () => {
  const classes = styles()
  const [vetted, setVetted] = useState()
  // get list of helpers with zip codes close to the institution from backend
  const helpers = [
    {
      name: 'Peter Lustig',
      landline: '',
      mobile: '017722222222',
      email: 'peter@lustig.com',
      zip: '55555',
    },
  ]
  return (
    <Paper square elevation={2} className={classes.landingPaper}>
      <Typography variant="h1" className={classes.landingHeader}>
        {messages['helperslistpage.header']}
      </Typography>
      <Table>
        <TableHead dense>
          <TableBody>
            {helpers.map((helpers) => (
              <div key={helpers.email}>
                <TableCell>{helpers.name}</TableCell>
                <TableCell>{helpers.email}</TableCell>
                <TableCell>{helpers.landline}</TableCell>
                <TableCell>{helpers.mobile}</TableCell>
                <TableCell>{helpers.zip}</TableCell>
              </div>
            ))}
          </TableBody>
        </TableHead>
      </Table>
    </Paper>
  )
}

export default HelpersList
