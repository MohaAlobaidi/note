import React, { useEffect } from 'react'

const Alert = ({mes,type,removeAlert,list}) => {
  useEffect(()=>{
    let setTime = setTimeout(()=>{
      removeAlert()
    },3000);
    return ()=>{
      clearTimeout(setTime)
    }

  },[list])
  return <h2 className={`alert alert-${type}`}>
    {mes}
  </h2>
}

export default Alert
