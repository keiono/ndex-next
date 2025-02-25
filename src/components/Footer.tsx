'use client'
import React from 'react'

export function Footer() {
  return (
    <footer className="w-full border-t mt-4 py-4 bg-gray-100 dark:bg-gray-800">
      <div className="text-center text-sm">
        © {new Date().getFullYear()} NDEx. All rights reserved.
      </div>
    </footer>
  )
}
