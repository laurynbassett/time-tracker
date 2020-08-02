import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import moment from 'moment'

import Title from './Title'
import {getHours} from '../utils'

function preventDefault(event) {
  event.preventDefault()
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  },
  tableHeader: {
    '& th': {
      fontWeight: '500'
    }
  },
  tableBody: {
    '& td': {
      fontWeight: '300'
    }
  }
}))

const Timesheets = props => {
  const classes = useStyles()

  const formatDate = date => moment(date).format('ddd MMM DD')

  const formatTime = date => moment(date).format('LT')
  // new Date(date).toLocaleTimeString('en-US')

  return (
    <Fragment>
      <Title>This Week's Timesheets</Title>
      <Table size="small">
        <TableHead className={classes.tableHeader}>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Start Time</TableCell>
            <TableCell align="left">End Time</TableCell>
            <TableCell align="right">Total Hours</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {Object.keys(props.timesheets).length ? (
            props.timesheets
              .sort((a, b) => (a.startTime < b.startTime ? -1 : 1))
              .map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{formatDate(row.startTime)}</TableCell>
                  <TableCell>{formatTime(row.startTime)}</TableCell>
                  <TableCell>{formatTime(row.endTime)}</TableCell>
                  <TableCell align="right">
                    {getHours(row.endTime, row.startTime)}
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell>No data for this week</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more timesheets
        </Link>
      </div>
    </Fragment>
  )
}

const mapState = state => ({
  timesheets: state.timesheets
})

export default connect(mapState)(Timesheets)
