"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { FaGithub, FaLinkedinIn, FaFacebook, FaEnvelope } from "react-icons/fa";
import { GraduationCap, Trophy } from "lucide-react";
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
                    background: "radial-gradient(circle, rgba(255, 255, 255,0.07) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />
            <div
                className="absolute top-1/4 right-10 w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(255, 255, 255,0.07) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />

            <div className="container mx-auto py-12 xl:py-0">
                <div className="flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-20">

                    {/* ── Text column ──────────────────────────── */}
                    <div className="flex-1 text-center xl:text-left order-2 xl:order-1">
                        {/* Available badge */}
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 font-body text-sm text-white/70 animate-fade-in-up"
                            style={{
                                background: "rgba(255, 255, 255, 0.07)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                animationDelay: "0.3s"
                            }}
                        >
                            <span
                                className="w-2 h-2 rounded-full bg-emerald-400"
                                style={{ boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)", animation: "pulse-glow 2s ease-in-out infinite" }}
                            />
                            Available for new opportunities
                        </div>

                        {/* Name */}
                        <h1
                            className="font-heading font-bold leading-none mb-2 animate-fade-in-up"
                            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", animationDelay: "0.42s" }}
                        >
                            <span className="text-white/90">Hello, I'm</span>
                            <br />
                            <span className="text-accent">Ha Huy Hoang</span>
                        </h1>

                        {/* Typewriter role */}
                        <div
                            className="flex items-center justify-center xl:justify-start gap-1 mt-3 mb-6 animate-fade-in-up"
                            style={{ animationDelay: "0.54s" }}
                        >
                            <span className="font-heading font-semibold text-xl xl:text-2xl text-white/50">~/</span>
                            <span
                                className="font-heading font-semibold text-xl xl:text-2xl text-accent"
                                style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.5)" }}
                            >
                                {role}
                            </span>
                            <span
                                className="font-mono text-accent text-2xl animate-blink"
                                style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.5)" }}
                            >|</span>
                        </div>

                        {/* Description */}
                        <p
                            className="font-body text-white/55 text-base leading-relaxed max-w-[520px] mx-auto xl:mx-0 mb-8 animate-fade-in-up"
                            style={{ animationDelay: "0.66s" }}
                        >
                            I'm an aspiring AI Engineer with a strong passion in ML model optimization and deployment,
                            seeking to drive impactful solutions at the intersection of research and production systems.
                        </p>

                        {/* CTA buttons */}
                        <div
                            className="flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-4 mb-8 animate-fade-in-up"
                            style={{ animationDelay: "0.78s" }}
                        >
                            <a href="/assets/HaHuyHoang_CV.pdf" download>
                                <motion.button
                                    aria-label="Download Curriculum Vitae"
                                    className="flex items-center gap-2.5 px-7 py-3.5 rounded-full font-heading font-semibold text-sm text-black relative overflow-hidden group"
                                    style={{ background: "linear-gradient(135deg, #ffffff, #e2e8f0)" }}
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
                                        style={{ background: "linear-gradient(135deg, #e2e8f0, #ffffff)" }}
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
                                whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255,0.3)" }}
                                whileTap={{ scale: 0.97 }}
                            >
                                View Projects
                            </motion.a>
                        </div>

                        {/* Social icons */}
                        <div
                            className="flex items-center justify-center xl:justify-start gap-3 animate-fade-in-up"
                            style={{ animationDelay: "0.9s" }}
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
                                            borderColor: "rgba(255, 255, 255,0.4)",
                                            boxShadow: "0 0 15px rgba(255, 255, 255,0.25)",
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                    >
                                        {s.icon}
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* ── Hero portrait — bold, large with accent circle ── */}
                    <div
                        className="flex-shrink-0 order-1 xl:order-2 relative"
                        style={{ animation: "slide-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both" }}
                    >
                        <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] xl:w-[480px] xl:h-[480px] mx-auto xl:mx-0">

                            {/* ── Decorative accent circle behind the person ── */}
                            <motion.div
                                className="absolute rounded-full z-[-1]"
                                style={{
                                    width: "95%",
                                    height: "0",
                                    paddingBottom: "95%",
                                    top: "14%",
                                    left: "48%",
                                    transform: "translateX(-50%)",
                                    background: "linear-gradient(135deg, rgba(255, 255, 255,0.2) 0%, rgba(255, 255, 255,0.25) 50%, rgba(255, 255, 255,0.15) 100%)",
                                    border: "1.5px solid rgba(255, 255, 255,0.2)",
                                    boxShadow: "0 0 60px rgba(255, 255, 255,0.15), 0 0 120px rgba(255, 255, 255,0.1), inset 0 0 60px rgba(255, 255, 255,0.05)",
                                }}
                                animate={{
                                    boxShadow: [
                                        "0 0 60px rgba(255, 255, 255,0.15), 0 0 120px rgba(255, 255, 255,0.1), inset 0 0 60px rgba(255, 255, 255,0.05)",
                                        "0 0 80px rgba(255, 255, 255,0.25), 0 0 140px rgba(255, 255, 255,0.15), inset 0 0 80px rgba(255, 255, 255,0.08)",
                                        "0 0 60px rgba(255, 255, 255,0.15), 0 0 120px rgba(255, 255, 255,0.1), inset 0 0 60px rgba(255, 255, 255,0.05)",
                                    ],
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />

                            {/* Secondary smaller circle — top right decorative */}
                            <div
                                className="absolute w-16 h-16 xl:w-24 xl:h-24 rounded-full hidden xl:block"
                                style={{
                                    top: "8%",
                                    right: "-6%",
                                    background: "linear-gradient(135deg, rgba(255, 255, 255,0.3), rgba(255, 255, 255,0.15))",
                                    border: "1px solid rgba(255, 255, 255,0.25)",
                                    boxShadow: "0 0 30px rgba(255, 255, 255,0.2)",
                                }}
                            />

                            {/* Small accent dot — bottom left */}
                            <div
                                className="absolute w-4 h-4 xl:w-6 xl:h-6 rounded-full hidden xl:block"
                                style={{
                                    bottom: "15%",
                                    left: "2%",
                                    background: "rgba(255, 255, 255,0.4)",
                                    boxShadow: "0 0 15px rgba(255, 255, 255,0.5)",
                                }}
                            />

                            {/* ── The person image — large and prominent ── */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
                                    WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
                                }}
                            >
                                <Image
                                    src="/assets/image.webp"
                                    alt="Ha Huy Hoang"
                                    fill
                                    className="object-cover object-top"
                                    style={{ zIndex: 2 }}
                                    priority={true}
                                    fetchPriority="high"
                                    decoding="sync"
                                    sizes="(max-width: 1280px) 360px, 480px"
                                />
                            </div>

                            {/* Floating stat badge — top right */}
                            <motion.div
                                className="absolute top-8 -right-2 sm:-right-8 xl:-right-5 px-3.5 py-2 rounded-xl font-body text-[10px] sm:text-xs font-semibold text-white"
                                style={{
                                    background: "rgba(255, 255, 255, 0.27)",
                                    backdropFilter: "blur(12px)",
                                    border: "1px solid rgba(255, 255, 255,0.5)",
                                    boxShadow: "0 4px 20px rgba(255, 255, 255, 0.24)",
                                    zIndex: 10,
                                }}
                                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 1.0, duration: 0.5 }}
                            >
                                <div className="flex items-center gap-2.5">
                                    <GraduationCap className="w-4 h-4 text-white" />
                                    <span className="text-white">Valedictorian (GPA: 4.0)</span>
                                </div>
                            </motion.div>

                            {/* Floating badge — bottom left */}
                            <motion.div
                                className="absolute bottom-[10%] sm:bottom-[15%] xl:bottom-[20%] -left-4 sm:-left-8 xl:-left-10 px-3.5 py-2 rounded-xl font-body text-[10px] sm:text-xs font-semibold text-primary"
                                style={{
                                    background: "rgba(251, 191, 36, 0.90)",
                                    backdropFilter: "blur(12px)",
                                    border: "1px solid rgba(251, 191, 36, 0.5)",
                                    boxShadow: "0 4px 20px rgba(251, 191, 36, 0.5)",
                                    zIndex: 10,
                                }}
                                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ delay: 1.2, duration: 0.5 }}
                            >
                                <div className="flex items-center gap-2.5">
                                    <Trophy className="w-4 h-4" />
                                    <span>2nd Place UIT DS Challenge</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Stats bar ────────────────────────────────── */}
            <div
                className="container mx-auto mt-12 xl:mt-16 pb-8 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
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
                            style={{ background: "rgba(0,0,0,0)" }}
                            whileHover={{ background: "rgba(0, 0, 0, 0)" }}
                            transition={{ duration: 0.2 }}
                        >
                            <div
                                className="text-3xl xl:text-4xl font-heading font-bold mb-1"
                                style={{ color: "#f1bd39ff", textShadow: "0 0 10px rgba(251, 191, 36, 0.5)" }}
                            >
                                {stat.num}
                            </div>
                            <div className="font-body text-xs text-white/100 leading-tight">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

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