import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
  subsets: ['latin'],
  weight: ["400", "600"]
})

export const Logo =()=> {
  return (
    <div className="hidden md:flex items-center gap-x-2 scale-75">
      <Image 
        src='/notion.png'
        width={40}
        height={40}
        alt="notion logo"
        className="dark:hidden"
      />
      <Image 
        src='/notion-dark.png'
        width={40}
        height={40}
        alt="notion logo"
        className="hidden dark:block"
      />
      <p className={cn('font-semibold', font.className)}>
        Notion
      </p>
    </div>
  )
}