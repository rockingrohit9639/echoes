import { cn } from '~/lib/utils'
import { type BasicProps } from '~/types/basic'
import Sidebar from './sidebar'
import Link from 'next/link'
import Image from 'next/image'
import MobileSidebar from './mobile-sidebar'

type AppShellProps = React.PropsWithChildren<BasicProps>

export default function AppShell({ className, style, children }: AppShellProps) {
  return (
    <div className={cn('flex h-screen w-full overflow-hidden', className)} style={style}>
      <div className="fixed inset-y-0 hidden w-64 border-r border-dashed border-border bg-background transition-all lg:block">
        <Sidebar />
      </div>
      <main className="flex w-full flex-1 flex-col overflow-auto lg:pl-64">
        <header className="flex items-center justify-between border-b border-dashed px-6 py-2 lg:hidden">
          <Link href="/" className="block">
            <Image
              src="/logo.png"
              alt="logo"
              width={40}
              height={40}
              className="w-8 object-contain grayscale hover:grayscale-0"
            />
          </Link>

          <MobileSidebar />
        </header>

        {children}
      </main>
    </div>
  )
}
