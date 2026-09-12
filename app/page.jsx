"use client"
import { useEffect, useState, Suspense } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import Preloader from "@/components/Preloader"
import Home from "@/components/Home"

// Dynamically import heavy components below the fold
const Services = dynamic(() => import("@/components/Services"), { ssr: true })
const Resume = dynamic(() => import("@/components/Resume"), { ssr: true })
const Work = dynamic(() => import("@/components/Work"), { ssr: false })
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true })


export default function Page() {
  const [showPreloader, setShowPreloader] = useState(false)
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
      <main className="relative z-0 w-full text-[var(--ink)]">
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
