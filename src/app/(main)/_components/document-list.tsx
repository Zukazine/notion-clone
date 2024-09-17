'use client'

import { cn } from "@/lib/utils";
import { Item } from "./item";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { FileIcon } from "lucide-react";

interface Document {
  id: string;
  title: string;
  content?: string;
  coverImage?: string;
  icon?: string;
  isArchived?: boolean;
  isPublished?: boolean;
  parentDocumentId?: string;
  userId: string;
  createdAt: Date;
  parent?: Document;
  children?: Document[];
}

interface DocumentListProps {
  parentDocumentId? : string
  level?: number
  data?: Document[]
}

export const DocumentList = ({
  parentDocumentId,
  level = 0,

}: DocumentListProps) => {
  const params = useParams()
  const router = useRouter()
  const [expanded, setExpanded] =  useState<Record<string, boolean>>({})

  const onExpand = (documentId: string) => {
    setExpanded(prevExpanded => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId]
    }))
  }

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId
  })

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documetnId}`)
  }
  
  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 &&(
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    )
  }

  return ( 
    <>
      <p
        style={{
          paddingLeft: level ? `${(level * 12) + 25}px` : undefined
        }}
        className={cn("hidden text-sm font-medium text-muted-foreground",
          expanded && 'last:block',
          level === 0 && 'hidden'
        )}
      >
        No pages inside
      </p>
      {Documents.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            onClick={(() => onRedirect(document._id))}
            label ={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            onExpand={() => onExpand(document._id)}
            expanded={expanded[document._id]}
          />
          {expanded[document._id] && (
            <DocumentList 
              parentDocumentId={document._id}
              level={level + 1}
            />
          )}
        </div>
      )}
    </>
  );
}