import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ModeToggle } from '@/components/mode-toggle'

export function NavBar() {
  return (
    <header className="border-b">
      <div className="container mx-1 px-1 h-14 flex items-center justify-start">
        <Link
          href="/"
          className="scroll-m-20 text-4xl font-extrabold tracking-tight flex items-center justify-start gap-4 text-ndex"
        >
          <Image src="/ndex-logo.svg" alt="NDEx Logo" width={76} height={76} />
          NDEx v3
        </Link>

        <nav className="hidden mx-5 md:flex items-start gap-4">
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

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button>Login</Button>
        </div>
      </div>
    </header>
  )
}
