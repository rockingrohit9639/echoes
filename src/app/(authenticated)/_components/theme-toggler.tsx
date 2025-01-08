'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Switch } from '~/components/ui/switch'
import { cn } from '~/lib/utils'
import { type BasicProps } from '~/types/basic'

type ThemeTogglerProps = BasicProps

export default function ThemeToggler({ className, style }: ThemeTogglerProps) {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <div
      className={cn('flex w-full items-center justify-between gap-2 border-b border-dashed py-4', className)}
      style={style}
    >
      <SunIcon className="text-muted-foreground" />

      <Switch
        data-checked={resolvedTheme === 'dark' ? 'true' : 'false'}
        checked={resolvedTheme === 'dark'}
        onCheckedChange={(checked) => {
          if (checked) {
            setTheme('dark')
          } else {
            setTheme('light')
          }
        }}
      />

      <MoonIcon className="text-muted-foreground" />
    </div>
  )
}
