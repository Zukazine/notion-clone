'use client'

import { ChevronLeft, MenuIcon, PlusCircle, Search, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ElementRef, useEffect, useRef, useState } from "react";
import UserItem from "./user-item";
import { useMediaQuery } from "usehooks-ts";
import Item from "./item";
import { useUser } from "@clerk/nextjs";
import { toast } from 'react-toastify'

const Navigation = () => { 
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 786px)")
  const { user } = useUser()

  const isResizingRef = useRef(false)
  const sidebarRef = useRef<ElementRef<"aside">>(null)
  const navbarRef = useRef<ElementRef<"div">>(null)
  const [isResetting, setIsResetting] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(isMobile)
  const [loading, setLoading] = useState(false)

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (isMobile) {
      collapse()
    } else {
      resetWidth();
    }
  }, [isMobile])

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile])

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault()
    event.stopPropagation()

    isResizingRef.current = true
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = e.clientX

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.setProperty('left', `${newWidth}px`)
      navbarRef.current.style.setProperty('width', `calc(100% - ${newWidth}px)`)
    }
  }
  
  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false)
      setIsResetting(true)

      sidebarRef.current.style.width = isMobile ? "100%" : "240px"
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      )
      navbarRef.current.style.setProperty(
        "left",
        isMobile ? "100%" : "240px"
      )
      setTimeout(() => setIsResetting(false), 300)
    }
  }

  const collapse = () => {
    if(sidebarRef.current && navbarRef.current){
      setIsCollapsed(true);
      setIsResetting(true)

      sidebarRef.current.style.width = '0'
      navbarRef.current.style.setProperty('width', "100%")
      navbarRef.current.style.setProperty('left', '0')
      setTimeout(() => setIsResetting(false), 300)
    }
  }

  useEffect(() => {
  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/get-document');
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  
  fetchDocuments();

  }, []);

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
    <div className="">
      <aside 
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]", 
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div 
          onClick={collapse}
          role="button" 
          className={cn(
            "h-6 w-6 text-muted-foreground roudned-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-5 right-2 opacity-0 group-hover/sidebar:opacity-100 transition", 
            isMobile && "opacity-100"
          )}
        >
          <ChevronLeft className="h-6 w-6"/>
        </div>
        <div>
          <UserItem/>
          <Item 
            label="Search"
            icon={Search}
            isSearch
            onClick={() => {}}
          />
          <Item 
            label="Settings"
            icon={Settings}
            onClick={() => {}}
          />
          <Item 
            onClick={createDocument}
            label='New page'
            icon={PlusCircle}
          />
        </div>
        <div className="mt-4">
          <p>
            Documents
          </p>
          <ul>
            {documents.map((doc: { id: string, title: string }) => (
              <li key={doc.id}>{doc.title}</li>
            ))}
          </ul>
        </div>
        <div 
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div ref={navbarRef} className={cn(
        "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
        isResetting && "transition-all ease-in-out duration-300",
        isMobile && "left-0 w-full"
      )}>
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && <MenuIcon onClick={resetWidth} role='button' className="w-6 text-muted-foreground"/>}
        </nav>
      </div>
    </div>
  );
}
 
export default Navigation;