import React, { useEffect } from 'react'

const Alert = ({ message, type, removeAlart,List }) => {
  useEffect(()=>{
    const timeOut= setTimeout(()=>{
      removeAlart()
    },3000)
    return ()=> clearTimeout(timeOut)
  },[List])
  return <p className={`alert alert-${type}`}>{message}</p>;
};

export default Alert
