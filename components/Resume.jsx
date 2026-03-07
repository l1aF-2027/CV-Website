"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaPython, FaHtml5, FaCss3, FaJs } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiMysql, SiPytorch, SiTensorflow } from "react-icons/si";
import Image from "next/image";

// ── Data ──────────────────────────────────────────────────────────────────────

const about = {
    info: [
        { label: "Name", value: "Ha Huy Hoang" },
        { label: "Gender", value: "Male" },
        { label: "Phone", value: "(+84) 903 517 448" },
        { label: "Experience", value: "1 Year" },
        { label: "Nationality", value: "Vietnamese" },
        { label: "Email", value: "ha.huy.hoang.tk@gmail.com" },
        { label: "Freelance", value: "Available" },
        { label: "Languages", value: "English, Vietnamese" },
    ],
};

const experience = [
    {
        company: "FPT Software",
        position: "AI Engineer",
        duration: "10/2025 – Present",
        logo: "/assets/resume/experience/fpt.png",
        summary: [
            "Automated reverse source code workflows using n8n to improve efficiency.",
            "Contributed to data preprocessing tasks for the Document KT project.",
            "Developed API and RPA triggers for ITSM tickets utilizing Exchange Online and Microsoft Graph.",
        ],
    },
    {
        company: "XBStation",
        position: "AI Intern",
        duration: "08/2025 – 10/2025",
        logo: "/assets/resume/experience/xbstation.png",
        summary: [
            "Researched niche open-source technologies in Edge AI to expand domain expertise.",
            "Optimized deep learning models for real-time drone deployment under resource constraints.",
            "Deployed models on diverse edge hardware including OAK-D S2, Radax CM5, and Qualcomm carrier boards.",
        ],
    },
];

const education = [
    {
        institution: "VNU-HCM UIT",
        degree: "Bachelor in AI",
        duration: "2022 – 2025",
        extra: "GPA: 9.1 / 4.0",
        detail: "Major in Artificial Intelligence with focus on Reinforcement Learning and Deep Learning",
        image: "/assets/resume/education/uit.png",
    },
    {
        institution: "IELTS Academic",
        degree: "English Certification",
        duration: "7/2025 – 7/2027",
        extra: "Overall: 7.0",
        detail: "L: 7.0 · R: 7.5 · W: 6.5 · S: 6.5",
        image: "/assets/resume/education/ielts.jpg",
    },
    {
        institution: "CS-UIT AI CLUB",
        degree: "AI Learning Member",
        duration: "2022 – 2023",
        extra: "",
        detail: "Active member participating in AI workshops, NLP development, and Computer Vision projects.",
        image: "/assets/resume/education/aiclub.png",
    },
    {
        institution: "NVIDIA Workshop",
        degree: "AI for Anomaly Detection",
        duration: "4/2025",
        extra: "100% Complete",
        detail: "CUDA · RAPIDS · XGBoost · AutoEncoder · GAN",
        image: "/assets/resume/education/nvidia.png",
    },
];

const skillList = [
    { icon: <FaPython />, name: "Python", color: "#3776AB" },
    { icon: <SiTensorflow />, name: "TensorFlow", color: "#FF6F00" },
    { icon: <SiPytorch />, name: "PyTorch", color: "#EE4C2C" },
    { icon: <SiMysql />, name: "MySQL", color: "#4479A1" },
    { icon: <FaHtml5 />, name: "HTML5", color: "#E34F26" },
    { icon: <FaCss3 />, name: "CSS3", color: "#1572B6" },
    { icon: <SiNextdotjs />, name: "Next.js", color: "#FFFFFF" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS", color: "#ffffff" },
];

// ── Sub-components ──────────────────────────────────────────────────────────

const SectionLabel = ({ children }) => (
    <span className="font-mono text-accent text-xs tracking-widest uppercase">{children}</span>
);

// Experience Timeline
const ExperienceTab = () => {
    const [expanded, setExpanded] = useState(null);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <div ref={ref} className="space-y-6">
            {/* Animated vertical line */}
            <div className="relative pl-8">
                <motion.div
                    className="absolute left-3 top-0 w-[2px] bg-gradient-to-b from-accent via-amber-400 to-transparent"
                    initial={{ height: 0 }}
                    animate={inView ? { height: "100%" } : { height: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{ originY: 0 }}
                />

                <div className="space-y-6">
                    {experience.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -30 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.3 + i * 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="relative"
                        >
                            {/* Timeline dot */}
                            <motion.div
                                className="absolute -left-5 top-6 w-3 h-3 rounded-full border-2 border-accent"
                                style={{ background: "#0a0a14", boxShadow: "0 0 10px rgba(255, 255, 255,0.5)" }}
                                initial={{ scale: 0 }}
                                animate={inView ? { scale: 1 } : { scale: 0 }}
                                transition={{ delay: 0.4 + i * 0.2, type: "spring", stiffness: 300 }}
                            />

                            <motion.div
                                className="rounded-2xl overflow-hidden cursor-pointer group"
                                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                                whileHover={{ borderColor: "rgba(255, 255, 255,0.2)", background: "rgba(255, 255, 255,0.03)" }}
                                onClick={() => setExpanded(expanded === i ? null : i)}
                            >
                                <div className="p-5 flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3 mb-1">
                                            <span className="font-mono text-accent text-xs">{item.duration}</span>
                                            <span
                                                className="px-2 py-0.5 rounded text-xs font-mono"
                                                style={{ background: "rgba(255, 255, 255,0.1)", color: "#ffffff", border: "1px solid rgba(255, 255, 255,0.2)" }}
                                            >
                                                {i === 0 ? "Current" : "Past"}
                                            </span>
                                        </div>
                                        <h3 className="font-heading font-bold text-lg text-white mb-0.5">{item.position}</h3>
                                        <p className="font-body text-white/40 text-sm">{item.company}</p>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: expanded === i ? 45 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                                        style={{ background: "rgba(255,255,255,0.05)" }}
                                    >
                                        <span className="text-white/40 text-xl leading-none group-hover:text-accent">+</span>
                                    </motion.div>
                                </div>

                                <AnimatePresence initial={false}>
                                    {expanded === i && (
                                        <motion.div
                                            key="content"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 pb-5 pt-0 flex flex-col md:flex-row gap-5">
                                                {item.logo && (
                                                    <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden"
                                                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                                                    >
                                                        <Image src={item.logo} alt={item.company} width={64} height={64} className="object-contain p-2" />
                                                    </div>
                                                )}
                                                <ul className="space-y-2">
                                                    {item.summary.map((point, j) => (
                                                        <li key={j} className="flex items-start gap-2 font-body text-sm text-white/55">
                                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                                                            {point}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Image Lightbox Modal
const ImageLightbox = ({ src, alt, onClose }) => {
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [onClose])

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
                style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(16px)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="relative max-w-3xl w-full max-h-[85vh]"
                    initial={{ scale: 0.85, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.85, opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute -top-4 -right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                        style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>

                    {/* Image */}
                    <div
                        className="rounded-2xl overflow-hidden"
                        style={{ border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}
                    >
                        <Image
                            src={src}
                            alt={alt}
                            width={900}
                            height={600}
                            className="w-full h-auto object-contain max-h-[80vh]"
                            style={{ background: "rgba(255,255,255,0.03)" }}
                        />
                    </div>
                    <p className="text-center text-white/30 text-xs font-body mt-3">Click outside or press ESC to close</p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

// Education cards
const EducationTab = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.1 });
    const [activeCard, setActiveCard] = useState(null);
    const [lightboxImg, setLightboxImg] = useState(null);

    const handleImgClick = (e, src) => {
        e.stopPropagation(); // Don't toggle card expand
        setLightboxImg(src);
    };

    return (
        <>
            <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {education.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => setActiveCard(activeCard === i ? null : i)}
                        className="rounded-2xl overflow-hidden cursor-pointer group"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                        whileHover={{ borderColor: "rgba(255, 255, 255,0.2)", background: "rgba(255, 255, 255,0.03)", y: -3 }}
                    >
                        <div className="p-5">
                            <div className="flex items-start gap-4 mb-3">
                                {/* Thumbnail — click to zoom */}
                                {item.image && (
                                    <motion.div
                                        className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 group/img cursor-zoom-in"
                                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                                        onClick={(e) => handleImgClick(e, item.image)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.institution}
                                            fill
                                            className="object-contain p-1"
                                        />
                                        {/* Zoom overlay hint */}
                                        <div
                                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 rounded-xl"
                                            style={{ background: "rgba(255, 255, 255,0.25)" }}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                                <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                                            </svg>
                                        </div>
                                    </motion.div>
                                )}
                                <div>
                                    <div className="font-mono text-accent text-xs mb-0.5">{item.duration}</div>
                                    <h3 className="font-heading font-bold text-sm text-white leading-snug">{item.degree}</h3>
                                    <div className="font-body text-white/40 text-xs mt-0.5">{item.institution}</div>
                                </div>
                            </div>
                            {item.extra && (
                                <div
                                    className="inline-block px-2.5 py-1 rounded-lg font-mono text-xs text-accent mb-2"
                                    style={{ background: "rgba(255, 255, 255,0.1)", border: "1px solid rgba(255, 255, 255,0.2)" }}
                                >
                                    {item.extra}
                                </div>
                            )}
                            <AnimatePresence initial={false}>
                                {activeCard === i && (
                                    <motion.p
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="font-body text-white/45 text-xs leading-relaxed overflow-hidden"
                                    >
                                        {item.detail}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                            <div className="mt-3 text-xs font-body text-white/25 group-hover:text-accent/50 transition-colors">
                                {activeCard === i ? "Click to collapse ↑" : "Click for details ↓"} · <span className="text-accent/40">Click image to zoom</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox */}
            {lightboxImg && (
                <ImageLightbox
                    src={lightboxImg}
                    alt="Certificate"
                    onClose={() => setLightboxImg(null)}
                />
            )}
        </>
    );
};


// Skills grid
const SkillsTab = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skillList.map((skill, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex flex-col items-center justify-center gap-2 py-8 rounded-2xl transition-all duration-300 cursor-default"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                    whileHover={{
                        y: -5,
                        background: "rgba(255,255,255,0.06)",
                        borderColor: `${skill.color}33`,
                        boxShadow: `0 10px 40px ${skill.color}20`,
                    }}
                >
                    <motion.div
                        className="text-5xl transition-all duration-300"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                        whileHover={{ color: skill.color, scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {skill.icon}
                    </motion.div>
                    <span className="font-body text-white/40 text-xs group-hover:text-white/70 transition-colors duration-300">
                        {skill.name}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};

// About tab
const AboutTab = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <div ref={ref} className="space-y-6">
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="font-body text-white/55 leading-relaxed max-w-2xl"
            >
                I'm Huy Hoang, an undergraduate passionate about AI and Data Science.
                My focus areas include AI model development, backend architecture, data analysis, and machine learning.
                I enjoy reading novels, playing FPS games, exploring new technologies, and staying updated with AI trends.
                I'm seeking opportunities in AI Engineering and Data Science.
            </motion.p>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                {about.info.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                        <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: "linear-gradient(135deg, #ffffff, #e2e8f0)", boxShadow: "0 0 8px rgba(255, 255, 255,0.5)" }}
                        />
                        <span className="font-body text-accent text-sm font-medium min-w-[90px]">{item.label}:</span>
                        <span className="font-body text-white/70 text-sm">{item.value}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// ── Main Resume Component ─────────────────────────────────────────────────────

const tabs = [
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "about", label: "About Me" },
];

const Resume = () => {
    const [activeTab, setActiveTab] = useState("experience");
    const headRef = useRef(null);
    const headInView = useInView(headRef, { once: true, amount: 0.5 });

    return (
        <section className="min-h-[80vh] flex flex-col justify-center py-20 xl:py-28">
            <div className="container mx-auto">
                {/* Header */}
                <div ref={headRef} className="text-center mb-14">
                    <motion.span
                        initial={{ opacity: 0, y: 15 }}
                        animate={headInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-block font-mono text-accent text-sm font-medium tracking-widest uppercase mb-4"
                    >
                        My Journey
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={headInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-heading font-bold text-white"
                        style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                    >
                        Resume & <span className="gradient-text">Background</span>
                    </motion.h2>
                </div>

                {/* Tab bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={headInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-2 mb-10"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="relative px-5 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-300"
                            style={{
                                color: activeTab === tab.id ? "#ffffff" : "rgba(255,255,255,0.4)",
                                background: activeTab === tab.id ? "rgba(255, 255, 255,0.1)" : "rgba(255,255,255,0.03)",
                                border: activeTab === tab.id ? "1px solid rgba(255, 255, 255,0.3)" : "1px solid rgba(255,255,255,0.07)",
                                boxShadow: activeTab === tab.id ? "0 4px 20px rgba(255, 255, 255,0.15)" : "none",
                            }}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="tab-indicator"
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-accent"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </motion.div>

                {/* Tab content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {activeTab === "experience" && <ExperienceTab />}
                        {activeTab === "education" && <EducationTab />}
                        {activeTab === "skills" && <SkillsTab />}
                        {activeTab === "about" && <AboutTab />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Resume;