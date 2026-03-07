"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import CustomImage from "@/components/CustomImage";

const projects = [
  {
    num: "01",
    title: "Multimodal Sarcasm Detection on Vietnamese Social Media",
    description:
      "Won 2nd Place at UIT Data Science Challenge 2024 (Nov 2024). Used PaddleOCR, VietOCR, ViT, and Jina Embedding in a multimodal pipeline.",
    stack: ["Python", "TensorFlow", "Streamlit"],
    image: "/assets/work/thumb1.png",
    githubLink: "https://github.com/l1aF-2027/UIT-Data-Science-Challenge-2024",
    link: "https://multimodal-sacarsm-detection-on-vietnamese-social-media-texts.streamlit.app/",
    color: "#ffffff",
  },
  {
    num: "02",
    title: "Social Trend VietNam",
    description:
      "Open-source platform to collect, analyze, and visualize social media trends in Vietnam, with a dedicated ABSA model (aspect-based sentiment analysis) training repo.",
    stack: ["Python", "Kafka", "FastAPI", "Next.js", "TailwindCSS"],
    image: "/assets/work/thumb2.png",
    githubLink: "https://github.com/l1aF-2027/Social-Trend-VietNam",
    link: "https://github.com/l1aF-2027/Social-Trend-VietNam/",
    color: "#e2e8f0",
  },
  {
    num: "03",
    title: "UIT Admissions Chatbot",
    description:
      "Web-based chatbot using NLP to answer UIT admissions FAQs, combining rule-based and intent-based models in a clean Next.js frontend.",
    stack: ["Python", "FastAPI", "Next.js", "TailwindCSS", "Transformers"],
    image: "/assets/work/thumb3.png",
    githubLink: "https://github.com/l1aF-2027/Website-QuanLyViecDangKiMonHocVaThuHocPhi",
    link: "https://uit-admissions-chatbot.vercel.app/",
    color: "#ffffff",
  },
];

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden cursor-default"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{
        y: -8,
        borderColor: `${project.color}33`,
        boxShadow: `0 30px 80px ${project.color}15`,
      }}
    >
      {/* Image */}
      <div className="relative h-[200px] xl:h-[240px] overflow-hidden">
        <CustomImage
          src={project.image}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          alt={project.title}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ background: `linear-gradient(to bottom, transparent 20%, ${project.color}15 100%)`, opacity: hovered ? 1 : 0.5 }}
        />

        {/* Number badge */}
        <div
          className="absolute top-4 left-4 font-heading font-extrabold text-5xl leading-none select-none"
          style={{ WebkitTextStroke: `2px #fbbf24`, color: "transparent" }}
        >
          {project.num}
        </div>

        {/* Action buttons - slide in on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="absolute top-4 right-4 flex gap-2"
            >
              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                <motion.div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white hover:text-accent transition-colors"
                  style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <BsArrowUpRight size={14} />
                </motion.div>
              </Link>
              <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <motion.div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white hover:text-accent transition-colors"
                  style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <BsGithub size={14} />
                </motion.div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading font-bold text-white text-lg leading-snug mb-2 group-hover:text-white transition-colors duration-300">
          {project.title}
        </h3>
        <p className="font-body text-white/40 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md font-mono text-xs"
              style={{
                background: `${project.color}12`,
                border: `1px solid ${project.color}33`,
                color: project.color,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, #fbbf24, transparent)` }}
      />
    </motion.div>
  );
};

const Work = () => {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, amount: 0.5 });

  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-20 xl:py-28">
      <div className="container mx-auto">
        {/* Header */}
        <div ref={headRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block font-mono text-accent text-sm font-medium tracking-widest uppercase mb-4"
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-bold text-white mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Featured <span className="text-accent">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-white/40 max-w-xl mx-auto text-sm leading-relaxed"
          >
            A selection of projects that demonstrate my experience with AI, data engineering, and full-stack development.
          </motion.p>

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6"
          >
            <Link
              href="https://github.com/l1aF-2027"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.span
                className="inline-flex items-center gap-2 font-body text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
                whileHover={{ scale: 1.03 }}
              >
                <BsGithub size={16} />
                View all on GitHub
                <BsArrowUpRight size={12} />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;