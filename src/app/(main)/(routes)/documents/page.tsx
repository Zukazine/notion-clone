'use client'

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import Navigation from "../../_components/navigation";

const Documents = () => {
  const { user } = useUser()

  return ( 
    <>
      <Navigation />
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <Image
          src='/man.png'
          fill
          className="object-contain dark:hidden"
          alt='heroes'
          unoptimized
        />
        <Image
          src='/man-dark.png'
          fill
          className="object-contain hidden dark:block"
          alt='heroes'
          unoptimized
        />
        <h2 className="text-lg font-medium">
          {`Welcome to ${user?.firstName}'s Notion`}
        </h2>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2"/>
          Create a note
        </Button>
      </div>
    </>
  );
}
 
export default Documents;