"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { FaGithub, FaLinkedinIn, FaFacebook, FaEnvelope } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

// Typewriter hook
function useTypewriter(words, speed = 80, pause = 2000) {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = words[wordIndex];
        let timeout;

        if (!deleting && charIndex < current.length) {
            timeout = setTimeout(() => setCharIndex(c => c + 1), speed);
        } else if (!deleting && charIndex === current.length) {
            timeout = setTimeout(() => setDeleting(true), pause);
        } else if (deleting && charIndex > 0) {
            timeout = setTimeout(() => setCharIndex(c => c - 1), speed / 2);
        } else if (deleting && charIndex === 0) {
            setDeleting(false);
            setWordIndex(w => (w + 1) % words.length);
        }

        setText(current.slice(0, charIndex));
        return () => clearTimeout(timeout);
    }, [charIndex, deleting, wordIndex, words, speed, pause]);

    return text;
}

const socials = [
    { icon: <FaEnvelope />, path: "mailto:ha.huy.hoang.tkl@gmail.com", label: "Email" },
    { icon: <FaGithub />, path: "https://github.com/l1aF-2027", label: "GitHub" },
    { icon: <FaLinkedinIn />, path: "https://www.linkedin.com/in/hoang-huy-6b77a12a8/", label: "LinkedIn" },
    { icon: <FaFacebook />, path: "https://www.facebook.com/profile.php?id=100008454588441", label: "Facebook" },
];

const techStack = [
    "Python", "PyTorch", "TensorFlow", "FastAPI", "Next.js", "MySQL",
    "CUDA", "Edge AI", "Kafka", "n8n", "Transformers", "Computer Vision",
    "Python", "PyTorch", "TensorFlow", "FastAPI", "Next.js", "MySQL",
    "CUDA", "Edge AI", "Kafka", "n8n", "Transformers", "Computer Vision",
];

// Stagger container variants
const containerVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const Home = () => {
    const role = useTypewriter(
        ["AI Engineer", "ML Practitioner", "Data Scientist", "Backend Developer"],
        80,
        2200
    );

    return (
        <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
            {/* Ambient glow blobs */}
            <div
                className="absolute top-1/3 left-10 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(0,200,255,0.07) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />
            <div
                className="absolute top-1/4 right-10 w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />

            <div className="container mx-auto py-12 xl:py-0">
                <div className="flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-20">

                    {/* ── Text column ──────────────────────────── */}
                    <motion.div
                        className="flex-1 text-center xl:text-left order-2 xl:order-1"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                    >
                        {/* Available badge */}
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 font-body text-sm text-white/70"
                            style={{
                                background: "rgba(0, 200, 255, 0.07)",
                                border: "1px solid rgba(0, 200, 255, 0.2)",
                            }}
                        >
                            <span
                                className="w-2 h-2 rounded-full bg-emerald-400"
                                style={{ boxShadow: "0 0 8px rgba(52, 211, 153, 0.8)", animation: "pulse-glow 2s ease-in-out infinite" }}
                            />
                            Available for new opportunities
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            variants={itemVariants}
                            className="font-heading font-bold leading-none mb-2"
                            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
                        >
                            <span className="text-white/90">Hello, I'm</span>
                            <br />
                            <span className="gradient-text">Ha Huy Hoang</span>
                        </motion.h1>

                        {/* Typewriter role */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center justify-center xl:justify-start gap-1 mt-3 mb-6"
                        >
                            <span className="font-heading font-semibold text-xl xl:text-2xl text-white/50">~/</span>
                            <span
                                className="font-heading font-semibold text-xl xl:text-2xl text-accent"
                                style={{ textShadow: "0 0 20px rgba(0, 200, 255, 0.5)" }}
                            >
                                {role}
                            </span>
                            <span
                                className="font-mono text-accent text-2xl animate-blink"
                                style={{ textShadow: "0 0 20px rgba(0, 200, 255, 0.5)" }}
                            >|</span>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className="font-body text-white/55 text-base leading-relaxed max-w-[520px] mx-auto xl:mx-0 mb-8"
                        >
                            I'm an aspiring AI Engineer with a strong passion in ML model optimization and deployment,
                            seeking to drive impactful solutions at the intersection of research and production systems.
                        </motion.p>

                        {/* CTA buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-4 mb-8"
                        >
                            <a href="/assets/HaHuyHoang_CV.pdf" download>
                                <motion.button
                                    className="flex items-center gap-2.5 px-7 py-3.5 rounded-full font-heading font-semibold text-sm text-black relative overflow-hidden group"
                                    style={{ background: "linear-gradient(135deg, #00c8ff, #7c3aed)" }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Download CV
                                        <FiDownload className="w-4 h-4" />
                                    </span>
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ background: "linear-gradient(135deg, #7c3aed, #00c8ff)" }}
                                    />
                                </motion.button>
                            </a>

                            <motion.a
                                href="#work"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-heading font-semibold text-sm text-white/80 transition-colors hover:text-white"
                                style={{
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                }}
                                whileHover={{ scale: 1.05, borderColor: "rgba(0,200,255,0.3)" }}
                                whileTap={{ scale: 0.97 }}
                            >
                                View Projects
                            </motion.a>
                        </motion.div>

                        {/* Social icons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center justify-center xl:justify-start gap-3"
                        >
                            {socials.map((s, i) => (
                                <Link key={i} href={s.path} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                                    <motion.div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 transition-colors hover:text-accent"
                                        style={{
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                        }}
                                        whileHover={{
                                            scale: 1.15,
                                            borderColor: "rgba(0,200,255,0.4)",
                                            boxShadow: "0 0 15px rgba(0,200,255,0.25)",
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                    >
                                        {s.icon}
                                    </motion.div>
                                </Link>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ── Avatar column ──────────────────────── */}
                    <motion.div
                        className="flex-shrink-0 order-1 xl:order-2"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    >
                        <div className="relative w-[280px] h-[280px] xl:w-[360px] xl:h-[360px]">
                            {/* Spinning gradient ring */}
                            <div
                                className="absolute inset-[-6px] rounded-full animate-spin-slow"
                                style={{
                                    background: "conic-gradient(from 0deg, #00c8ff, #7c3aed, #00c8ff)",
                                    padding: "3px",
                                }}
                            >
                                <div className="w-full h-full rounded-full bg-primary" />
                            </div>

                            {/* Glow behind avatar */}
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: "radial-gradient(circle, rgba(0,200,255,0.2) 0%, transparent 70%)",
                                    filter: "blur(20px)",
                                }}
                            />

                            {/* Avatar image */}
                            <div className="relative w-full h-full rounded-full overflow-hidden" style={{ zIndex: 2 }}>
                                <Image
                                    src="/assets/photo1.png"
                                    alt="Ha Huy Hoang"
                                    fill
                                    className="object-cover object-top"
                                    priority
                                />
                            </div>

                            {/* Floating stat badge — top right */}
                            <motion.div
                                className="absolute -top-2 -right-4 xl:-right-8 px-3 py-1.5 rounded-xl font-body text-xs font-semibold text-white"
                                style={{
                                    background: "rgba(124, 58, 237, 0.9)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(124,58,237,0.4)",
                                    boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
                                    zIndex: 3,
                                }}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.0, duration: 0.5 }}
                            >
                                🎓 Validictorian (GPA: 4.0)
                            </motion.div>

                            {/* Floating badge — bottom left */}
                            <motion.div
                                className="absolute -bottom-2 -left-4 xl:-left-8 px-3 py-1.5 rounded-xl font-body text-xs font-semibold text-white"
                                style={{
                                    background: "rgba(0, 140, 200, 0.9)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(0,200,255,0.4)",
                                    boxShadow: "0 4px 20px rgba(0,200,255,0.4)",
                                    zIndex: 3,
                                }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.2, duration: 0.5 }}
                            >
                                🏆 2nd Place UIT DS Challenge
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── Stats bar ────────────────────────────────── */}
            <motion.div
                className="container mx-auto mt-12 xl:mt-16 pb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <div
                    className="flex flex-wrap justify-center xl:justify-start gap-px rounded-2xl overflow-hidden"
                    style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                >
                    {[
                        { num: "1+", label: "Years of Experience" },
                        { num: "3+", label: "Projects Completed" },
                        { num: "2", label: "Companies Worked" },
                        { num: "7.0", label: "IELTS Score" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            className="flex-1 min-w-[130px] py-5 px-6 text-center xl:text-left"
                            style={{ background: "rgba(255,255,255,0.03)" }}
                            whileHover={{ background: "rgba(0, 200, 255, 0.05)" }}
                            transition={{ duration: 0.2 }}
                        >
                            <div
                                className="text-3xl xl:text-4xl font-heading font-bold text-accent mb-1"
                                style={{ textShadow: "0 0 20px rgba(0,200,255,0.4)" }}
                            >
                                {stat.num}
                            </div>
                            <div className="font-body text-xs text-white/40 leading-tight">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* ── Tech marquee ──────────────────────────── */}
            <div className="overflow-hidden py-6 mt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex gap-6 animate-marquee whitespace-nowrap w-max">
                    {techStack.map((tech, i) => (
                        <span
                            key={i}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-body text-xs text-white/40"
                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-60" />
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Home;