"use client"
import { useEffect } from "react"
import Home from "@/components/Home"
import Services from "@/components/Services"
import Resume from "@/components/Resume"
import Work from "@/components/Work"
import Contact from "@/components/Contact"

export default function Page() {
  // Đảm bảo luôn scroll to top khi component mount
  useEffect(() => {
    // Tạm thời tắt smooth scroll behavior
    document.documentElement.classList.add('no-scroll-behavior')

    // Scroll to top ngay lập tức
    window.scrollTo(0, 0)

    // Bật lại smooth scroll sau một chút
    setTimeout(() => {
      document.documentElement.classList.remove('no-scroll-behavior')
    }, 100)
  }, [])

  return (
    <main className="min-h-screen bg-primary text-white">
      {/* Home Section */}
      <section id="home" className="scroll-mt-24 xl:scroll-mt-32">
        <Home />
      </section>

      {/* Services Section */}
      <section id="services" className="scroll-mt-24 xl:scroll-mt-32">
        <Services />
      </section>

      {/* Resume Section */}
      <section id="resume" className="scroll-mt-24 xl:scroll-mt-32">
        <Resume />
      </section>

      {/* Work Section */}
      <section id="work" className="scroll-mt-24 xl:scroll-mt-32">
        <Work />
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-24 xl:scroll-mt-32">
        <Contact />
      </section>
    </main>
  )
}