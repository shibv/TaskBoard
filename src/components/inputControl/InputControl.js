import React from "react";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    },
    label: {
      fontWeight: 700,
      fontSize: '1rem',
      color: '#313131',
    },
    input: {
      borderRadius: 5,
      border: '1px solid #dddddd',
      outline: 'none',
      padding: '10px 15px',
      color: '#000',
      '&:hover': {
        borderColor: '#ccc',
      },
      '&:focus': {
        borderColor: '#9900ff',
      },
    },
  }));


function InputControl(props) {
    const classes = useStyles(props);
  return (
    <div className={classes.container}>
      {props.label && <label className={classes.label}>{props.label}</label>}
      <input type="text" {...props} className={classes.input} />
    </div>
  );
}

export default InputControl;