import React, {useState} from 'react'
import {withStyles} from '@material-ui/core'
import clsx from 'clsx'

import {Drawer, Navbar} from './components'
import Routes from './routes'

const drawerWidth = 240

const App = ({classes}) => {
  const [open, setOpen] = useState(true)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <div>
      <div>
        <Navbar open={open} toggleDrawer={toggleDrawer} />
        <Drawer open={open} toggleDrawer={toggleDrawer} />
      </div>
      <div className={clsx(open && classes.mainContentShift)}>
        <Routes />
      </div>
    </div>
  )
}

const useStyles = theme => ({
  mainContentShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
})

export default withStyles(useStyles)(App)
