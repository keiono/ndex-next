'use client'
import React from 'react'

interface MainPanelProps {
  children: React.ReactNode
}

export function MainPanel({ children }: MainPanelProps) {
  return <main className="w-full p-2">{children}</main>
}
