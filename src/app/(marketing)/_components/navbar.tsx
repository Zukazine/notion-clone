'use client'

import { cn } from "@/lib/utils"
import { useScrollTop } from "../../../../hooks/use-scroll-top"
import { Logo } from "./logo"
import { ModeToggle } from "./mode-togle"

export const Navbar = () => {
  const scrolled = useScrollTop()

  return(
    <div className={cn(
      "z-50 bg-background fixed top-0 flex items-center w-full p-6 dark:bg-[#1f1f1f]",
      scrolled && 'border-b shadow-sm'
    )}>
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        <ModeToggle />
      </div>
    </div>
  )
}