import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ModeToggle } from '@/components/mode-toggle'
import { SearchBox } from './search/SearchBox'

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="w-full h-14 flex items-center">
        <div className="px-2">
          <Link
            href="/"
            className="scroll-m-20 text-4xl font-extrabold tracking-tight flex items-center justify-start gap-2 text-ndex"
          >
            <Image
              src="/ndex-logo.svg"
              alt="NDEx Logo"
              width={70}
              height={50}
            />
            <span className="hidden sm:inline">NDEx</span>
          </Link>
        </div>
        <div className="flex-1 max-w-3xl px-4">
          <SearchBox />
        </div>
        <div className="ml-auto flex items-center gap-2 md:gap-4 pr-4">
          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>
          <ModeToggle />
          <Button size="sm">Login</Button>
        </div>
      </div>
    </header>
  )
}
