'use client'

import { NavBar } from '@/components/NavBar'

import { MainPanel } from '@/components/top-page/MainPanel'
import { Footer } from '@/components/Footer'
import { InfoCard } from '../components/top-page/InfoCard'

export default function Home() {
  return (
    <>
      <NavBar />
      <MainPanel>
        <InfoCard />
      </MainPanel>
      <Footer />
    </>
  )
}
