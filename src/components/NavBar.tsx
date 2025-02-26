import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ModeToggle } from '@/components/mode-toggle'
import { SearchBox } from './search/SearchBox'

export function NavBar() {
  return (
    <header className="border-b">
      <div className="w-screen px-3 h-14 flex items-center">
        <Link
          href="/"
          className="scroll-m-20 text-3xl font-extrabold tracking-tight flex items-center justify-start gap-4 text-ndex"
        >
          <Image src="/ndex-logo.svg" alt="NDEx Logo" width={76} height={76} />
          NDEx v3
        </Link>
        <SearchBox />

        <div className="ml-auto flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/about" className="text-lg hover:text-primary">
              About
            </Link>
            <Link href="/docs" className="text-lg hover:text-primary">
              Docs
            </Link>
            <Link href="/contact" className="text-lg hover:text-primary">
              Contact
            </Link>
          </nav>
          <ModeToggle />
          <Button>Login</Button>
        </div>
      </div>
    </header>
  )
}
