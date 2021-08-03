import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  listItemText: {
    marginRight: theme.spacing(2),
    fontWeight: 700,
    marginLeft: theme.spacing(4.75)
  }
}));

const DrawerLoggedOut = ( { navData }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const classes = useStyles();

  const getMenuButtons = () => {
    console.log("NAVDATA: ", navData);
    return navData.map(({ label, href }) => {
      return (
        <ListItem key={label} button component={NavLink} to={href} color="inherit">
          <ListItemText className={classes.listItemText}
          >
            {label}
          </ListItemText>
        </ListItem>
      )
    });
  }
 
  return (
    <>
      <Drawer
        anchor='right'
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <List>
          {getMenuButtons()}

          {/* <ListItem divider button>
            <ListItemText>
              Drawer Logged Out
            </ListItemText>
          </ListItem>
          <ListItem divider button>
            <ListItemText>
              Courses2
            </ListItemText>
          </ListItem> */}
        </List>

      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuRoundedIcon color="secondary"/>
      </IconButton>
    </>
  )
}

export default DrawerLoggedOut;