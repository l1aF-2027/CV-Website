"use client"
import { useEffect, useState, Suspense } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import Preloader from "@/components/Preloader"
import Home from "@/components/Home"

// Dynamically import heavy components below the fold
const Services = dynamic(() => import("@/components/Services"), { ssr: true })
const Resume = dynamic(() => import("@/components/Resume"), { ssr: true })
const Work = dynamic(() => import("@/components/Work"), { ssr: true })
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true })

// KeyboardBackground uses canvas and window, so we absolutely must disable SSR
const KeyboardBackground = dynamic(() => import("@/components/KeyboardBackground"), { ssr: false })

export default function Page() {
  const [showPreloader, setShowPreloader] = useState(true)
  const [isRevealing, setIsRevealing] = useState(false)

  useEffect(() => {
    // Force scroll to top on mount
    document.documentElement.classList.add('no-scroll-behavior')
    window.scrollTo(0, 0)
    
    if (showPreloader) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
      setTimeout(() => {
        document.documentElement.classList.remove('no-scroll-behavior')
      }, 100)
    }
  }, [showPreloader])

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && (
          <Preloader 
            key="preloader" 
            onExitStart={() => setIsRevealing(true)}
            onComplete={() => setShowPreloader(false)} 
          />
        )}
      </AnimatePresence>
      
      {/* 
        The site is always rendered (layered behind). 
        Animation trigger 'isRevealing' initiates the internal staggered reveals.
      */}
      <main className="text-white relative w-full z-0">
        <KeyboardBackground />
        <section id="home" className="min-h-screen">
          <Home isReady={isRevealing} />
        </section>
        <section id="services" className="min-h-screen">
          <Services />
        </section>
        <section id="resume" className="min-h-screen">
          <Resume />
        </section>
        <section id="work" className="min-h-screen">
          <Work />
        </section>
        <section id="contact">
          <Suspense fallback={<div />}>
            <Contact />
          </Suspense>
        </section>
      </main>
    </>
  )
}
