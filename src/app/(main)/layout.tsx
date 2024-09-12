'use client'

import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Navigation from "./_components/navigation";

const MainLayout = ({children}: {children: React.ReactNode}) => {
  const { user, isLoaded } = useUser()
  
  if (isLoaded) {
    <div className="h-full flex items-center justify-center">
      <Spinner size='lg'/>
    </div>
  }

  if (!user) {
    redirect('/')
  }
  
  return (
    <div className="h-screen flex dark:bg-[#1f1f1f]">
      <Navigation />
      <main className="h-full flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
export default MainLayout;