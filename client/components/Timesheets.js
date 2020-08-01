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

import Title from './Title'

function preventDefault(event) {
  event.preventDefault()
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}))

const Timesheets = props => {
  const classes = useStyles()

  console.log('TIMESHEETS', props.timesheets)

  const getHours = (date2, date1) => {
    console.log('DATE1', date1, 'date2', date2)
    let diff = (Date.parse(date2) - Date.parse(date1)) / 1000
    diff /= 60 * 60
    return Math.abs(Math.round(diff))
  }

  return (
    <Fragment>
      <Title>Recent Timesheets</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell align="right">Total Hours</TableCell>
          </TableRow>
        </TableHead>
        {Object.keys(props.timesheets).length && (
          <TableBody>
            {props.timesheets.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.startTime}</TableCell>
                <TableCell>{row.endTime}</TableCell>
                <TableCell align="right">
                  {getHours(row.endTime, row.startTime)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
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
