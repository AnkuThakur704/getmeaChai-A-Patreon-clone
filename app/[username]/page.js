import React from 'react'
import Paymentpage from '../components/Paymentpage'
import Posts from '../components/Posts'
const username = ({params}) => {
  return (

  
   
     <Paymentpage username={ params.username} />
   
  
  )
}

export default username               