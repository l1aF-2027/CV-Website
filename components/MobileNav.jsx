"use client"
import { useState } from "react"
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

            {/* Fullscreen overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 flex flex-col items-center justify-center"
                        style={{
                            background: "rgba(10, 10, 20, 0.97)",
                            backdropFilter: "blur(30px)",
                        }}
                        initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 24px)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 40px) 24px)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 24px)" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <nav className="flex flex-col items-center gap-2 w-full px-8">
                            {links.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.path}
                                    onClick={(e) => handleClick(e, link.path)}
                                    className="w-full max-w-xs text-center py-4 text-3xl font-heading font-bold capitalize rounded-2xl transition-all duration-200"
                                    style={{
                                        color: activeLink === link.path ? "#00c8ff" : "rgba(255,255,255,0.7)",
                                        background: activeLink === link.path ? "rgba(0, 200, 255, 0.08)" : "transparent",
                                    }}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: index * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ scale: 1.04, color: "#ffffff" }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </nav>

                        {/* Decorative glow */}
                        <div
                            className="absolute bottom-8 text-xs text-white/20 font-mono"
                            style={{ letter: "0.2em" }}
                        >
                            huyhoang.dev
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default MobileNav