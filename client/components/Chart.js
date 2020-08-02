import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {useTheme} from '@material-ui/core/styles'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer
} from 'recharts'
import moment from 'moment'

import Title from './Title'
import {getHours} from '../utils'

const Chart = props => {
  const theme = useTheme()

  const data = props.timesheets.length
    ? props.timesheets.reduce((sorted, el) => {
        let index = 0
        el.date = moment(el.startTime).format('MMM DD')
        el.hours = getHours(el.startTime, el.endTime)
        while (
          index < props.timesheets.length &&
          el.startTime > props.timesheets[index].startTime
        )
          index++
        sorted.splice(index, 0, el)
        return sorted
      }, [])
    : []

  console.log('DATA', data)

  return (
    <Fragment>
      <Title>Hours This Week</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24
          }}
        >
          <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{textAnchor: 'middle', fill: theme.palette.text.primary}}
            >
              Hours
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="hours"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Fragment>
  )
}

const mapState = state => ({
  timesheets: state.timesheets
})

export default connect(mapState)(Chart)
