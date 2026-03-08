"use client"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { RiMenu4Line, RiCloseLargeLine } from "react-icons/ri"

const links = [
    { name: "home", path: "#home" },
    { name: "services", path: "#services" },
    { name: "resume", path: "#resume" },
    { name: "work", path: "#work" },
    { name: "contact", path: "#contact" },
]

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [activeLink, setActiveLink] = useState("#home")
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveLink(`#${entry.target.id}`)
                    }
                })
            },
            { rootMargin: "-80px 0px -50% 0px", threshold: 0 }
        )
        const sections = links.map(link => document.querySelector(link.path))
        sections.forEach(s => s && observer.observe(s))
        return () => sections.forEach(s => s && observer.unobserve(s))
    }, [])

    const scrollToSection = (path) => {
        if (path === '#home') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }
        const target = document.querySelector(path)
        if (!target) return
        const header = document.querySelector('header')
        const headerH = header ? header.offsetHeight : 80
        const rect = target.getBoundingClientRect()
        const currentScrollY = window.scrollY
        const targetScrollY = currentScrollY + rect.top - headerH
        window.scrollTo({ top: Math.max(0, targetScrollY), behavior: 'smooth' })
    }

    const handleClick = (e, path) => {
        e.preventDefault()
        setIsOpen(false)
        setTimeout(() => {
            scrollToSection(path)
            setActiveLink(path)
        }, 300)
    }

    return (
        <>
            {/* Toggle button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle mobile menu"
                className="relative w-10 h-10 flex items-center justify-center rounded-xl text-white z-50"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.9 }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.span
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <RiCloseLargeLine size={20} />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <RiMenu4Line size={20} />
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Mobile Nav Overlay */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <div className="fixed inset-0 z-[60] flex items-start justify-end sm:p-6 p-4">
                            {/* Backdrop */}
                            <motion.div 
                                className="absolute inset-0"
                                style={{
                                    background: "rgba(0, 0, 0, 0.4)",
                                    backdropFilter: "blur(8px)",
                                    WebkitBackdropFilter: "blur(8px)",
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setIsOpen(false)}
                            />

                            {/* Menu Card */}
                            <motion.div
                                className="relative w-full max-w-[280px] rounded-[2rem] flex flex-col items-center p-6 shadow-2xl z-10"
                                style={{
                                    background: "rgba(10, 10, 20, 0.85)",
                                    backdropFilter: "blur(32px)",
                                    WebkitBackdropFilter: "blur(32px)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    transformOrigin: "top right"
                                }}
                                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {/* Close Button */}
                                <div className="w-full flex justify-end mb-4">
                                    <motion.button
                                        onClick={() => setIsOpen(false)}
                                        aria-label="Close mobile menu"
                                        className="w-10 h-10 flex items-center justify-center rounded-xl text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <RiCloseLargeLine size={20} />
                                    </motion.button>
                                </div>

                                <nav className="flex flex-col items-center gap-2 w-full">
                                    {links.map((link, index) => (
                                        <motion.a
                                            key={index}
                                            href={link.path}
                                            onClick={(e) => handleClick(e, link.path)}
                                            className="w-full text-center py-3 text-lg font-heading font-semibold capitalize rounded-2xl transition-all duration-200"
                                            style={{
                                                color: activeLink === link.path ? "#ffffff" : "rgba(255,255,255,0.7)",
                                                background: activeLink === link.path ? "rgba(255, 255, 255, 0.08)" : "transparent",
                                            }}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ delay: index * 0.05, duration: 0.3 }}
                                            whileHover={{ scale: 1.02, color: "#ffffff", background: "rgba(255,255,255,0.05)" }}
                                            whileTap={{ scale: 0.96 }}
                                        >
                                            {link.name}
                                        </motion.a>
                                    ))}
                                </nav>

                                {/* Decorative glow text */}
                                <div className="mt-8 text-[10px] text-white/20 font-mono uppercase tracking-widest">
                                    huyhoang.dev
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    )
}

export default MobileNav