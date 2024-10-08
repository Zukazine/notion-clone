import Image from "next/image";

const Heroes = () => {
  return ( 
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px] md:scale-x-[-1]">
          <Image
            src='./man.png'
            fill
            className="object-contain dark:hidden"
            alt='heroes'
            unoptimized
          />
          <Image
            src='./man-dark.png'
            fill
            className="object-contain hidden dark:block"
            alt='heroes'
            unoptimized
          />
        </div>
        <div className="relative h-[400px] w-[400px] hidden md:block">
          <Image 
            src='./man.png'
            fill
            className="object-contain dark:hidden"
            alt='heroes-dark'
          />
          <Image
            src='./man-dark.png'
            fill
            className="object-contain hidden dark:block"
            alt='heroes'
          />
        </div>
      </div>
    </div>
   );
}
 
export default Heroes;