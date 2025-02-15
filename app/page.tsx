'use client'

import { NavBar } from '@/components/NavBar'

import { MainPanel } from '@/components/top-page/MainPanel'
import { SearchCard } from '@/components/top-page/SearchCard'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <NavBar />
      <MainPanel>
        <SearchCard />
      </MainPanel>
      <Footer />
    </>
  )
}
