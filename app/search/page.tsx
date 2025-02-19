'use client'

import { NavBar } from '@/components/NavBar'
import { MainPanel } from '@/components/top-page/MainPanel'
import { TabsPanel } from '@/components/search/TabsPanel'
import { Footer } from '@/components/Footer'

export default function SearchPage() {
  return (
    <>
      <NavBar />
      <MainPanel>
        <TabsPanel />
      </MainPanel>
      <Footer />
    </>
  )
}
