'use client'
 
import { useFormStatus } from 'react-dom'
 
export default function UploadFormWrapper({children}: {children: React.ReactNode}) {
  const { pending } = useFormStatus()
  
  return (
    <>
      {pending ? <p>Uploading...</p> : children } 
    </>
  )
}