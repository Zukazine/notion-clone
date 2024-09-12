'use client'

import { Button } from "@/components/ui/button"
import { useUser, SignIn, SignInButton } from "@clerk/nextjs"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const Heading = () => {
  const { isSignedIn } = useUser()
  
  return(
    <div className="max-w-3xl flex flex-col space-y-4">
      <h1 className="text-3xl sm:text-3xl md:text-5xl font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome to <span className="underline">Notion</span>
      </h1>
      <h3 className="text-base sm:text-lg md:text-xl font-medium">
        Notion is the connected workspace where <br/> better, faster work happens.
      </h3>
      {isSignedIn ? (
        <Link href='/documents'>
          <Button>
            Enter Notion
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      ):(
        <SignInButton mode="modal">
          <Button>
            Enter Notion
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )} 
    </div>
  )
}