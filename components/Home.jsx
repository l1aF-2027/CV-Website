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

    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1280);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="min-h-screen relative flex flex-col xl:justify-end overflow-x-hidden">
            {/* ── Ambient glow blobs ── */}
            <div
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none z-0 hidden xl:block"
                style={{
                    background: "radial-gradient(circle, rgba(255, 255, 255,0.05) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />
            <div
                className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none z-0 hidden xl:block"
                style={{
                    background: "radial-gradient(circle, rgba(251, 191, 36,0.03) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />

            {/* ── Center Super-Text BACKGROUND (Giant Name) - REMOVED (moved to foreground) ── */}

            {/* ── Center Image Layer (Person) - Removed animation to fix LCP issue ── */}
            <div className="relative xl:absolute xl:inset-0 z-10 flex items-start justify-center pointer-events-none pt-20 sm:pt-24 xl:pt-28 flex-shrink-0">
                <div className="relative w-full max-w-[500px] sm:max-w-[700px] xl:max-w-[1000px] h-[45vh] sm:h-[55vh] xl:h-[75vh]">
                    {/* Desktop Image */}
                    <div className="hidden sm:block relative w-full h-full">
                        <Image
                            src="/assets/image.webp"
                            alt="Ha Huy Hoang"
                            fill
                            className="object-contain object-bottom xl:drop-shadow-2xl"
                            priority={true}
                            fetchPriority="high"
                            decoding="sync"
                            sizes="(max-width: 1280px) 700px, 1000px"
                        />
                    </div>
                    {/* Mobile Image (Generated specifically for < 640px viewports to save payload) */}
                    <div className="block sm:hidden relative w-full h-full">
                        <Image
                            src="/assets/image-mobile.webp"
                            alt="Ha Huy Hoang"
                            fill
                            className="object-contain object-bottom"
                            priority={true}
                            fetchPriority="high"
                            decoding="sync"
                            sizes="100vw"
                        />
                    </div>
                </div>
            </div>

            {/* ── Front Layer Text ("Hello, I'm Ha Huy Hoang") ── */}
            <div className="relative xl:absolute xl:bottom-[14vh] left-0 w-full z-20 flex flex-col items-center justify-start pointer-events-none -mt-24 sm:-mt-32 xl:mt-0">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
                    className="flex flex-col items-center gap-1 sm:gap-2"
                >
                    <span
                        className="block text-xl sm:text-3xl xl:text-4xl font-semibold tracking-wide text-white"
                        style={{ textShadow: "0 6px 20px rgba(0,0,0,0.9), 0 2px 5px rgba(0,0,0,0.8)" }}
                    >
                        Hello, I'm
                    </span>
                    <h1 className="font-heading font-black text-accent flex flex-col items-center text-center mx-auto" style={{ textShadow: "0 10px 40px rgba(0,0,0,0.9), 0 4px 10px rgba(0,0,0,0.8)" }}>
                        <span style={{ fontSize: "clamp(3.5rem, 8vw, 7.5rem)", lineHeight: "0.9", letterSpacing: "-0.02em" }}>Ha Huy Hoang</span>
                    </h1>
                </motion.div>
            </div>

            {/* ── Foreground Interactive Cards (Xòe bài) ── */}
            <div className="container relative z-0 mx-auto px-4 sm:px-12 xl:px-24 2xl:px-40 mt-8 sm:mt-10 xl:mt-[10vh] xl:-translate-y-[180px] flex flex-col xl:flex-row items-center justify-between gap-6 xl:gap-0 pb-4 xl:pb-0">

                {/* Left Card: Info & CTA */}
                <motion.div
                    className="w-full xl:w-[360px] p-5 sm:p-6 rounded-[2rem] origin-bottom-right flex-shrink-0"
                    style={{
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
                        backdropFilter: "blur(32px)",
                        WebkitBackdropFilter: "blur(32px)",
                        border: "1px solid rgba(255, 255, 255, 0.18)",
                        boxShadow: "0 30px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                    }}
                    initial={{ opacity: 0, x: isDesktop ? 150 : 0, y: isDesktop ? 100 : 50, rotate: isDesktop ? 30 : 0, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, y: 0, rotate: isDesktop ? -14 : 0, scale: 1 }}
                    whileHover={{ rotate: isDesktop ? -8 : 0, scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 font-body text-[11px] sm:text-xs text-white/80" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Available for work
                    </div>

                    <div className="font-heading font-semibold text-lg sm:text-xl text-accent mb-2">
                        ~/ {role}
                    </div>

                    <p className="font-body text-white/60 text-xs sm:text-sm leading-relaxed mb-6">
                        I'm an aspiring AI Engineer with a strong passion in ML model optimization and deployment,
                        seeking to drive impactful solutions at the intersection of research and production.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                        <a href="/assets/HaHuyHoang_CV.pdf" download className="flex-1">
                            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-heading font-semibold text-xs text-black bg-white hover:bg-gray-200 transition-colors">
                                Download CV <FiDownload className="w-4 h-4" />
                            </button>
                        </a>
                        <a
                            href="#work"
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-heading font-semibold text-xs text-white/90 transition-colors hover:bg-white/10"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                        >
                            Projects
                        </a>
                    </div>

                    <div className="flex items-center gap-2.5">
                        {socials.map((s, i) => (
                            <Link key={i} href={s.path} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-colors hover:scale-110" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                                    {s.icon}
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Right Card: Stats & Badges */}
                <motion.div
                    className="w-full xl:w-[360px] p-5 sm:p-6 rounded-3xl origin-bottom-left flex-shrink-0"
                    style={{
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
                        backdropFilter: "blur(32px)",
                        WebkitBackdropFilter: "blur(32px)",
                        border: "1px solid rgba(255, 255, 255, 0.18)",
                        boxShadow: "0 30px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                    }}
                    initial={{ opacity: 0, x: isDesktop ? -150 : 0, y: isDesktop ? 100 : 50, rotate: isDesktop ? -30 : 0, scale: 0.9 }}
                    animate={{ opacity: 1, x: isDesktop ? 30 : 0, y: 0, rotate: isDesktop ? 14 : 0, scale: 1 }}
                    whileHover={{ x: isDesktop ? 20 : 0, rotate: isDesktop ? 8 : 0, scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.8 }}
                >
                    <div className="flex flex-col gap-3 mb-6">
                        <div className="flex items-center gap-4 p-3.5 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-white">
                                <GraduationCap className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-heading font-semibold text-white/90 text-[13px] sm:text-[14px]">Valedictorian</div>
                                <div className="font-body text-[11px] sm:text-xs text-white/50 mt-0.5">GPA: 4.0</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-3.5 rounded-2xl" style={{ background: "rgba(251, 191, 36, 0.1)", border: "1px solid rgba(251, 191, 36, 0.2)" }}>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-400/20 text-accent">
                                <Trophy className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-heading font-semibold text-accent text-[13px] sm:text-[14px]">2nd Place Winner</div>
                                <div className="font-body text-[11px] sm:text-xs text-amber-400/60 mt-0.5">UIT DS Challenge</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { num: "1+", label: "Years Exp." },
                            { num: "3+", label: "Projects" },
                            { num: "2", label: "Companies" },
                            { num: "7.0", label: "IELTS" },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl text-center" style={{ background: "rgba(0,0,0,0.3)" }}>
                                <div className="text-xl sm:text-2xl font-heading font-bold text-accent mb-1 drop-shadow-md">{stat.num}</div>
                                <div className="font-body text-[9px] sm:text-[10px] text-white/60 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>

            {/* Tech Stack Marquee Footer */}
            <div className="w-full relative z-20 overflow-hidden h-14 flex items-center mt-2 bg-transparent border-t border-white/10">
                <div className="flex gap-6 animate-marquee whitespace-nowrap w-max">
                    {[...techStack, ...techStack].map((tech, i) => (
                        <span
                            key={`${tech}-${i}`}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-body text-xs text-white/50 hover:text-white/80 transition-colors"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                        >
                            <span className="w-1 h-1 rounded-full bg-accent opacity-60" />
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;