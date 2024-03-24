'use client'
 
import { useFormStatus } from 'react-dom'
 
export default function SubmitButton({children}: {children: string}) {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending}>
      {pending ? children + 'ing...' : children} 
    </button>
  )
}