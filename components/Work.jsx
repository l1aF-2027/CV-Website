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

const ProjectCard = ({ project, index, isSpread, hoveredIndex, onHover, totalCards }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const isHovered = hoveredIndex === index;

  // Calculate spread positions (fan-out effect)
  const spreadRadius = 280;
  const angleStep = 360 / totalCards;
  const angle = (angleStep * index - 90) * (Math.PI / 180);
  const spreadX = isSpread ? Math.cos(angle) * spreadRadius : 0;
  const spreadY = isSpread ? Math.sin(angle) * spreadRadius : 0;

  // Domino offset (stacked appearance)
  const dominoOffsetX = isSpread ? 0 : index * 12;
  const dominoOffsetY = isSpread ? 0 : index * 8;
  const dominoRotate = isSpread ? 0 : index * 2;

  // Z-index based on hover state
  const zIndex = isHovered ? 1000 : totalCards - index;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="absolute rounded-2xl overflow-hidden cursor-pointer"
      style={{
        width: "380px",
        height: "auto",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      animate={{
        x: isSpread ? spreadX : dominoOffsetX,
        y: isSpread ? spreadY : dominoOffsetY,
        rotate: dominoRotate,
        zIndex: zIndex,
        scale: isHovered ? 1.08 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onTouchStart={() => onHover(index)}
      onTouchEnd={() => onHover(null)}
    >
      {/* Image */}
      <div className="relative h-[200px] xl:h-[240px] overflow-hidden">
        <CustomImage
          src={project.image}
          fill
          className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
          alt={project.title}
        />
        {/* Overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 20%, ${project.color}15 100%)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        />

        {/* Number badge */}
        <motion.div
          className="absolute top-4 left-4 font-heading font-extrabold text-5xl leading-none select-none"
          style={{ WebkitTextStroke: `2px #fbbf24`, color: "transparent" }}
          animate={{ scale: isHovered ? 1.1 : 1 }}
        >
          {project.num}
        </motion.div>

        {/* Action buttons - slide in on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="absolute top-4 right-4 flex gap-2"
            >
              <Link href={project.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <motion.div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white hover:text-accent transition-colors"
                  style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <BsArrowUpRight size={14} />
                </motion.div>
              </Link>
              <Link href={project.githubLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
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
        <h3 className="font-heading font-bold text-white text-lg leading-snug mb-2 hover:text-white transition-colors duration-300">
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
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, #fbbf24, transparent)` }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const Work = () => {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, amount: 0.5 });
  const [isSpread, setIsSpread] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);

  const handleContainerClick = () => {
    setIsSpread(!isSpread);
    setHoveredIndex(null);
  };

  return (
    <section className="min-h-[100vh] flex flex-col justify-center py-20 xl:py-28">
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

          {/* Instruction text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-white/30 text-xs mt-4 tracking-wide uppercase"
          >
            {isSpread ? "Click to stack" : "Click to spread"} • Hover for details
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

        {/* Domino Projects Container */}
        <div className="flex justify-center items-center">
          <motion.div
            ref={containerRef}
            className="relative w-full max-w-lg h-[700px] cursor-pointer"
            onClick={handleContainerClick}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                isSpread={isSpread}
                hoveredIndex={hoveredIndex}
                onHover={setHoveredIndex}
                totalCards={projects.length}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Work;
