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
    <main className="min-h-screen bg-primary text-white">
      <section id="home" className="scroll-mt-24 xl:scroll-mt-32">
        <Home />
      </section>
      <section id="services" className="scroll-mt-24 xl:scroll-mt-32">
        <Services />
      </section>
      <section id="resume" className="scroll-mt-24 xl:scroll-mt-32">
        <Resume />
      </section>
      <section id="work" className="scroll-mt-24 xl:scroll-mt-32">
        <Work />
      </section>
      <section id="contact" className="scroll-mt-24 xl:scroll-mt-32">
        <Suspense fallback={<div>Loading...</div>}>
          <Contact />
        </Suspense>
      </section>
    </main>
  )
}
  