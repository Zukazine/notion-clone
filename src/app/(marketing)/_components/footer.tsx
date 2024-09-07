import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { Ghost } from "lucide-react";

const Footer = () => {
  return ( 
    <div className="absolute flex flex-1 items-center w-full p-6 bg-transparent z-50 bottom-0">
      <Logo/>
      <div className="md:ml-auto w-full jutify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size='sm'>
          Privacy Policy
        </Button>
        <Button variant="ghost" size='sm'>
          Terms & Conditions
        </Button>
      </div>
    </div>
  ) ;
}
 
export default Footer;