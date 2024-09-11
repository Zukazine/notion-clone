'use client'

import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { useScrollTop } from "../../../../hooks/use-scroll-top"
import { Logo } from "./logo"
import { ModeToggle } from "./mode-togle"
import Link from "next/link"

// Clerk
import { SignInButton, useUser, UserButton } from "@clerk/nextjs"

// Lucide ShadCN
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import useUserCatch from "../../../../hooks/use-user-catch"

export const Navbar = () => {
  const scrolled = useScrollTop()
  const { isSignedIn, isLoaded, user } = useUser()

  useEffect(() => {
    const saveUser = async () => {
      if (isSignedIn && user) {
        try {
          const response = await fetch('/api/save-users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user })
          });

          const data = await response.json();
          console.log('Response from server:', data);
        } catch (error) {
          console.error('Failed to save user to database:', error);
        }
      }
    }

    saveUser()

  }, [isSignedIn, user]);


  return(
    <div className={cn(
      "z-50 bg-background fixed top-0 flex items-center w-full p-6 dark:bg-[#1f1f1f]",
      scrolled && 'border-b shadow-sm'
    )}>
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {!isLoaded ? (
          <Spinner />
        ) : isSignedIn ? (
          <>
            <Link href='/../documents'>
              <Button variant='ghost' size='sm' className="font-semibold">Enter Notion</Button>
            </Link>
            <UserButton />
          </>
        ) : (
          <div className="text-sm font-semibold flex gap-5">
            <SignInButton mode='modal'/>
            <Button size='sm'>Get Notion free</Button>
          </div>
        )}
        <div className="ml-2">
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}