import React, {Component} from 'react'
import {connect} from 'react-redux'
import clsx from 'clsx'
import {withStyles} from '@material-ui/core/styles'
import {Container, CssBaseline, Grid, Paper} from '@material-ui/core'

import Chart from './Chart'
import {Timesheets} from '.'
import {fetchTimesheets} from '../store'

const useStyles = theme => ({
  root: {
    display: 'flex',
    '& *': {
      fontFamily: 'Spartan'
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  }
})

class Dashboard extends Component {
  componentDidMount() {
    console.log('MOUNTING TIMESHEETS', this.props.userId)
    this.props.getTimesheets(this.props.userId)
  }

  render() {
    const {classes} = this.props
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Timesheets */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Timesheets />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    )
  }
}

const mapState = state => ({
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  getTimesheets: userId => dispatch(fetchTimesheets(userId))
})

export default connect(mapState, mapDispatch)(withStyles(useStyles)(Dashboard))
