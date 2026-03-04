"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const links = [
    { name: "home", path: "#home" },
    { name: "services", path: "#services" },
    { name: "resume", path: "#resume" },
    { name: "work", path: "#work" },
    { name: "contact", path: "#contact" },
]

// Precise scroll: measures actual header height at call time, lands the section exactly below it
const scrollToSection = (path) => {
    if (path === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
    }
    const target = document.querySelector(path)
    if (!target) return
    const header = document.querySelector('header')
    const headerH = header ? header.offsetHeight : 80
    // getBoundingClientRect gives position relative to current viewport
    const rect = target.getBoundingClientRect()
    const currentScrollY = window.scrollY
    const targetScrollY = currentScrollY + rect.top - headerH
    window.scrollTo({ top: Math.max(0, targetScrollY), behavior: 'smooth' })
}

const Nav = () => {
    const [activeLink, setActiveLink] = useState("#home")
    const [hoveredLink, setHoveredLink] = useState(null)

    useEffect(() => {
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

    const handleClick = (e, path) => {
        e.preventDefault()
        setActiveLink(path)
        scrollToSection(path)
    }

    return (
        <nav className="flex gap-1">
            {links.map((link, index) => {
                const isActive = activeLink === link.path
                const isHovered = hoveredLink === link.path
                return (
                    <a
                        key={index}
                        href={link.path}
                        onClick={(e) => handleClick(e, link.path)}
                        onMouseEnter={() => setHoveredLink(link.path)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="relative px-4 py-2 capitalize font-body font-medium text-sm rounded-lg transition-colors duration-200 cursor-pointer"
                        style={{
                            color: isActive ? "#00c8ff" : isHovered ? "#ffffff" : "rgba(255,255,255,0.6)",
                        }}
                    >
                        {/* Hover / active background pill */}
                        {(isActive || isHovered) && (
                            <motion.span
                                layoutId="nav-bg"
                                className="absolute inset-0 rounded-lg"
                                style={{
                                    background: isActive
                                        ? "rgba(0, 200, 255, 0.1)"
                                        : "rgba(255, 255, 255, 0.05)",
                                    border: isActive ? "1px solid rgba(0, 200, 255, 0.2)" : "1px solid rgba(255,255,255,0.06)"
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            />
                        )}
                        <span className="relative z-10">{link.name}</span>
                        {/* Active dot indicator */}
                        {isActive && (
                            <motion.span
                                layoutId="nav-dot"
                                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            />
                        )}
                    </a>
                )
            })}
        </nav>
    )
}

export default Nav