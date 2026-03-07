"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Nav from "./Nav"
import MobileNav from "./MobileNav"
import { motion } from "framer-motion"

const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleHireClick = (e) => {
    e.preventDefault()
    const target = document.querySelector("#contact")
    if (!target) return
    const header = document.querySelector('header')
    const headerH = header ? header.offsetHeight : 80
    const rect = target.getBoundingClientRect()
    window.scrollTo({ top: Math.max(0, window.scrollY + rect.top - headerH), behavior: 'smooth' })
  }

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto flex justify-between items-center py-4 xl:py-5">

        {/* ── Logo pill ── */}
        <Link href="/">
          <motion.div
            className="px-5 py-3 rounded-2xl cursor-pointer transition-all duration-300"
            style={{
              background: scrolled ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: scrolled
                ? "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)"
                : "0 2px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            whileHover={{
              scale: 1.02,
              borderColor: "rgba(255, 255, 255,0.25)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.35), 0 0 0 1px rgba(255, 255, 255,0.1), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <h1 className="text-xl xl:text-2xl font-heading font-bold tracking-tight leading-none">
              <span className="text-white">Huy</span>
              <span className="gradient-text ml-1.5">Hoang</span>
              <span
                className="text-accent"
                style={{ textShadow: "0 0 12px rgba(255, 255, 255, 0.8)" }}
              >.</span>
            </h1>
          </motion.div>
        </Link>

        {/* ── Desktop nav pill ── */}
        <div
          className="hidden xl:flex items-center gap-1"
          style={{
            background: scrolled ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "1rem",
            padding: "6px 6px 6px 8px",
            boxShadow: scrolled
              ? "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)"
              : "0 2px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.06)",
            transition: "all 0.4s ease",
          }}
        >
          <Nav />

          {/* divider */}
          <div className="w-px h-5 mx-2" style={{ background: "rgba(255,255,255,0.1)" }} />

          {/* Hire me button — its own pill inside the nav pill */}
          <motion.button
            onClick={handleHireClick}
            className="px-5 py-2.5 rounded-xl font-heading font-semibold text-xs text-black relative overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, #ffffff, #e2e8f0)",
              flexShrink: 0,
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 255, 255,0.4)" }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <span className="relative z-10">Hire me</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #e2e8f0, #ffffff)" }}
            />
          </motion.button>
        </div>

        {/* ── Mobile nav pill ── */}
        <div
          className="xl:hidden"
          style={{
            background: scrolled ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "0.875rem",
            padding: "6px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.06)",
            transition: "all 0.4s ease",
          }}
        >
          <MobileNav />
        </div>

      </div>
    </motion.header>
  )
}

export default Header
