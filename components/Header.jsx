"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Header() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 70)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return <motion.div className={`launchpad-scroll-status ${visible ? "is-visible" : ""}`} aria-hidden="true">SCROLLING THROUGH HUY&apos;S ORBIT · 2026</motion.div>
}
