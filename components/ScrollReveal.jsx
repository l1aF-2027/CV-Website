"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
}

const ScrollReveal = ({
    children,
    direction = "up",
    delay = 0,
    duration = 0.6,
    className = "",
    threshold = 0.15,
    once = true,
}) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once, amount: threshold })

    const initial = { opacity: 0, ...directionMap[direction] }
    const animate = isInView
        ? { opacity: 1, x: 0, y: 0 }
        : initial

    return (
        <motion.div
            ref={ref}
            initial={initial}
            animate={animate}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default ScrollReveal
