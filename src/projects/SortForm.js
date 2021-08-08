import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    width: theme.spacing(20)
  }
}));

const SortForm = ({ sort, sortVariable, setSortVariable }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const handleChange = async (event) => {
    setSortVariable(sortVariable => event.target.value);
    await sort(sortVariable);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="sortVariable">Sort projects by</InputLabel>
      <Select
        labelId="sort variable"
        id="sortVariableSelect"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={sortVariable}
        onChange={handleChange}
        className={classes.select}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem 
          value={"newest"}
          onChange={handleChange}
        >
          Newest 
        </MenuItem>
        <MenuItem 
          value={"most likes"}
          onChange={handleChange}
        >
          Most Likes
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default SortForm; 