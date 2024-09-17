'use client'

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { 
  useState,
  useEffect 
} from "react";

const Documents = () => {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)

  const createDocument = async () => {
    if (!user) {
      toast.error("You must be logged in to create a note.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/create-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          title: "Untitled"
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Document created successfully!");
      } else {
        toast.error(`Error: ${data.error}`);
      }
    } catch (error) {
      toast.error("Failed to create document.");
    } finally {
      setLoading(false);
    }
  };

  return ( 
    <>
      <ToastContainer position="bottom-center" autoClose={800}/>
      <div className="h-full flex flex-col items-center justify-center space-y-4 border border-black">
        <Image
          src='/man.png'
          width={300}
          height={300}
          className="object-contain dark:hidden"
          alt='heroes'
          unoptimized
        />
        <Image
          src='/man-dark.png'
          width={300}
          height={300}
          className="object-contain hidden dark:block"
          alt='heroes'
          unoptimized
        />
        <h2 className="text-lg font-medium">
          {`Welcome to ${user?.firstName}'s Notion`}
        </h2>
        <Button onClick={createDocument} disabled={loading}>
          <PlusCircle className="h-4 w-4 mr-2 cursor-pointer"/>
          {loading ? 'Creating...' : 'Create a note'}
        </Button>
      </div>
    </>
  );
}
 
export default Documents;