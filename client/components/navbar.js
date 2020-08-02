import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {withStyles} from '@material-ui/core/styles'
import {AppBar, IconButton, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'

import {logout} from '../store'

const drawerWidth = 240

const Navbar = props => {
  const {classes, handleClick, open, toggleDrawer, isLoggedIn} = props

  return (
    <div>
      <nav>
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <Menu />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Time Tracker
            </Typography>
            {/* <IconButton color='inherit'>
            <Badge badgeContent={4} color='secondary'>
              <Notifications />
            </Badge>
          </IconButton> */}
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Link className={classes.link} to="/home">
                  Home
                </Link>
                <a href="#" className={classes.link} onClick={handleClick}>
                  Logout
                </a>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login" className={classes.link}>
                  Login
                </Link>
                <Link to="/signup" className={classes.link}>
                  Sign Up
                </Link>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </nav>
      <hr />
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

const mapDispatch = dispatch => ({
  handleClick: () => dispatch(logout())
})

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

/**
 * STYLE
 */
const useStyles = theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Spartan'
  },
  link: {
    color: 'white',
    fontFamily: 'Spartan'
  }
})

export default connect(mapState, mapDispatch)(withStyles(useStyles)(Navbar))
