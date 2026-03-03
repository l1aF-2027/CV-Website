"use client"
import { useEffect, Suspense } from "react"
import Home from "@/components/Home"
import Services from "@/components/Services"
import Resume from "@/components/Resume"
import Work from "@/components/Work"
import Contact from "@/components/Contact"

export default function Page() {
  useEffect(() => {
    document.documentElement.classList.add('no-scroll-behavior')
    window.scrollTo(0, 0)
    setTimeout(() => {
      document.documentElement.classList.remove('no-scroll-behavior')
    }, 100)
  }, [])

  return (
    <main className="text-white">
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
      <section id="contact" className="min-h-screen">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Contact />
        </Suspense>
      </section>
    </main>
  )
}
