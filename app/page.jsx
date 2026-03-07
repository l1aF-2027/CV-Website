"use client"
import { useEffect, Suspense } from "react"
import dynamic from "next/dynamic"
import Home from "@/components/Home"

// Dynamically import heavy components below the fold
const Services = dynamic(() => import("@/components/Services"), { ssr: true })
const Resume = dynamic(() => import("@/components/Resume"), { ssr: true })
const Work = dynamic(() => import("@/components/Work"), { ssr: true })
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true })

// KeyboardBackground uses canvas and window, so we absolutely must disable SSR
const KeyboardBackground = dynamic(() => import("@/components/KeyboardBackground"), { ssr: false })

export default function Page() {
  useEffect(() => {
    document.documentElement.classList.add('no-scroll-behavior')
    window.scrollTo(0, 0)
    setTimeout(() => {
      document.documentElement.classList.remove('no-scroll-behavior')
    }, 100)
  }, [])

  return (
    <main className="text-white relative w-full">
      <KeyboardBackground />
      {/* min-h-screen on each section ensures clicking nav always shows a full clean viewport */}
      <section id="home" className="min-h-screen">
        <Home />
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
  )
}
