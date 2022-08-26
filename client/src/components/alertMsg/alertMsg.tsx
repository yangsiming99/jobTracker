import React, {useState} from 'react';
import { Alert } from 'react-bootstrap';

interface AlertProps {
  type: string,
  message: string,
  setAlert: Function,
}

const AlertMsg = ({type, message, setAlert}: AlertProps) => {

  return (
    <Alert onClose={()=>setAlert({type: "", message: ""})} variant={type} dismissible>
      <p>{message}</p>
    </Alert>
  )
}

export default AlertMsg;
