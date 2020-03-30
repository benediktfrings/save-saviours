

import React, { useState, useEffect } from 'react'

const Auth = () => {
    const [auth, setAuth] = useState(false)
    useEffect(()=>{
      setAuth(window.localStorage.getItem('access-token')!== null ? true : false)
    }, [])
  return auth
}
export default Auth