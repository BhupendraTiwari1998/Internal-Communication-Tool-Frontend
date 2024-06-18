import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = (props) => {
   const navigate = useNavigate()
   const { Component } = props
   useEffect(() => {
      let login = sessionStorage.getItem('login')
      if (!login) {
         navigate('/')
      }
   })
   return (
      <>
         <Component />
      </>
   )
}

export default ProtectedRoute