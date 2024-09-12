'use client'

import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"

const PopUp = () => {
  const { isSignedIn, user } = useUser()

  useEffect(() => {


    const saveUser = async () => {
      if (isSignedIn && user) {
        try {
          const response = await fetch('/api/save-users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user })
          })

          const data = await response.json()
          console.log(data)
        } catch (error) {

          console.error(error)
        }
      }
    }

    saveUser()

  })

  return (
    <></>
  );
}

export default PopUp;