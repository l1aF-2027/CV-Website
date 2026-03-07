"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BsArrowUpRight } from "react-icons/bs";

const services = [
    {
        num: "01",
        title: "AI Engineer",
        description: "Developing and implementing AI models and machine learning systems to solve complex real-world problems.",
        tags: ["PyTorch", "TensorFlow", "CUDA", "Edge AI"],
        href: "#contact",
    },
    {
        num: "02",
        title: "Data Scientist",
        description: "Analyzing complex datasets to drive insights and strategic decisions, with a focus on ML pipelines.",
        tags: ["Python", "Pandas", "Visualization", "Statistics"],
        href: "#contact",
    },
    {
        num: "03",
        title: "Data Analyst",
        description: "Interpreting data, creating compelling reports, and identifying patterns to improve business outcomes.",
        tags: ["SQL", "MySQL", "Kafka", "Dashboards"],
        href: "#contact",
    },
    {
        num: "04",
        title: "Backend Developer",
        description: "Building robust server-side applications and APIs with scalable architecture for AI-powered systems.",
        tags: ["FastAPI", "n8n", "REST API", "Docker"],
        href: "#contact",
    },
];

const ServiceCard = ({ service, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const handleClick = () => {
        window.dispatchEvent(new CustomEvent("selectService", { detail: { service: service.title } }));
        const el = document.querySelector("#contact");
        if (el) {
            setTimeout(() => window.scrollTo({ top: Math.max(0, el.offsetTop - 120), behavior: "smooth" }), 0);
        }
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleClick}
            className="group relative cursor-pointer rounded-2xl p-8 transition-all duration-500"
            style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(10px)",
            }}
            whileHover={{
                y: -6,
                background: "rgba(255, 255, 255, 0.04)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                boxShadow: "0 20px 60px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
        >
            {/* Number + arrow row */}
            <div className="flex items-start justify-between mb-6">
                <span
                    className="font-heading font-extrabold text-6xl leading-none select-none transition-colors duration-300"
                    style={{
                        WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                        color: "transparent",
                    }}
                >
                    {service.num}
                </span>
                <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                    whileHover={{ rotate: 45, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                    <BsArrowUpRight className="text-white/60 group-hover:text-accent transition-colors text-lg" />
                </motion.div>
            </div>

            {/* Title */}
            <h2 className="font-heading font-bold text-2xl xl:text-3xl text-white mb-3 transition-colors duration-300 group-hover:text-accent">
                {service.title}
            </h2>

            {/* Description */}
            <p className="font-body text-white/50 text-sm leading-relaxed mb-5">
                {service.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, i) => (
                    <span
                        key={i}
                        className="px-2.5 py-1 rounded-md font-mono text-xs text-white/40 transition-colors duration-300 group-hover:text-accent/70"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Bottom gradient line */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(90deg, transparent, #ffffff, #e2e8f0, transparent)" }}
            />
        </motion.div>
    );
};

const Services = () => {
    const headRef = useRef(null);
    const headInView = useInView(headRef, { once: true, amount: 0.5 });

    return (
        <section className="min-h-[80vh] flex flex-col justify-center py-20 xl:py-28">
            <div className="container mx-auto">
                {/* Section header */}
                <div ref={headRef} className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 15 }}
                        animate={headInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-block font-mono text-accent text-sm font-medium tracking-widest uppercase mb-4"
                    >
                        What I Do
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={headInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-heading font-bold text-white mb-4"
                        style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                    >
                        Services & <span className="gradient-text">Expertise</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={headInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="font-body text-white/40 max-w-xl mx-auto text-sm leading-relaxed"
                    >
                        Combining deep AI knowledge with practical engineering to build production-ready solutions.
                    </motion.p>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-6">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;