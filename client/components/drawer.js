import React from 'react'
import {connect} from 'react-redux'
import clsx from 'clsx'
import {withStyles} from '@material-ui/core/styles'
import {Divider, Drawer as MUIDrawer, IconButton, List} from '@material-ui/core'
import {ChevronLeft} from '@material-ui/icons'

import {mainListItems, secondaryListItems} from '.'
import {logout} from '../store'

const drawerWidth = 240

const Drawer = props => {
  const {classes, open, toggleDrawer} = props

  return (
    <div>
      <MUIDrawer
        variant="permanent"
        className={classes.drawer}
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List className={classes.list}>{mainListItems}</List>
        <Divider />
        <List className={classes.list}>{secondaryListItems}</List>
      </MUIDrawer>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

/**
 * STYLE
 */
const useStyles = theme => ({
  root: {
    display: 'flex'
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    display: 'none',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  list: {
    fontFamily: 'Spartan',
    '& li, span': {
      fontFamily: 'Spartan'
    }
  }
})

export default connect(mapState, mapDispatch)(withStyles(useStyles)(Drawer))
