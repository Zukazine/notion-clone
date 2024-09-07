import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="grid h-screen w-full bg-white place-items-center">
        <Link 
          href='/counter'
          className="flex items-center justify-center border-2 border-black rounded-3xl p-12 cursor-pointer hover:bg-black hover:text-white">
          <p className="font-mono text-lg">
            Aku mau ngitung Paaa !!
          </p>
        </Link>
      </div>
      <p className="text-black text-xs absolute bottom-0 right-0 pb-4 pr-4">
        v0.7
      </p>
    </>
  );
}
