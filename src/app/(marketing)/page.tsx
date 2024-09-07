import { Button } from "@/components/ui/button";
import { Heading } from "./_components/heading";
import Heroes from "./_components/heroes";
import Footer from "./_components/footer";

const MarketingPage = () => {
  return ( 
    <div className="relative min-h-full flex flex-col">
      <div className="flex flex-col md:justify-center text-center gap-y-8 flex-1 px-6 pb-10 items-center justify-start">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
   );
}
 
export default MarketingPage;
