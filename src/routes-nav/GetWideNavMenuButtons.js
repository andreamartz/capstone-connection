import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";


const GetWideNavMenuButtons = ({ navData, classes }) => {
  const { currentUser } = useContext(UserContext);
  console.log("NAVDATA from GetWideNavMenuButtons: ", navData);
  return (
    <div>
      {navData.map(obj => (
        <Button key={obj.label} className={classes.navLink}>
          <NavLink to={obj.href} className={classes.navLink}>
            {obj.label}
          </NavLink>
        </Button>
      ))}
    </div>
  );
}


export default GetWideNavMenuButtons;