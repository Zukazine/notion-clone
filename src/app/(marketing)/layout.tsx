import { Navbar } from "./_components/navbar";

const MarketingLanguage = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return ( 
    <div className="h-full dark:bg-[#1f1f1f]">
      <main className="h-full pt-40">
        {children}
      </main>
    </div>
  );
}
 
export default MarketingLanguage;