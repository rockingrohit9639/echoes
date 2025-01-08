'use client'

import { LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'

export default function SignoutButton() {
  return (
    <button
      className="flex w-full items-center gap-2 border-b border-dashed border-border pb-4 opacity-60 hover:opacity-100"
      onClick={async () => {
        await signOut()
      }}
    >
      <LogOutIcon className="size-4" />
      logout
    </button>
  )
}
