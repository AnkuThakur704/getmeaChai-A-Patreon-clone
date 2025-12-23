"use client"
import { SessionProvider } from "next-auth/react"
const SessionWrappper = ({children}) => {
  return (
   <SessionProvider>{children}</SessionProvider>
  )
}

export default SessionWrappper
