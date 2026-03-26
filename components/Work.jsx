"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { BsArrowUpRight, BsGithub, BsFolder } from "react-icons/bs";
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
  },
];

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
};

const ProjectCard = ({ project, index, isHoveredParent }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="w-full h-full group relative pointer-events-auto flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.02, zIndex: 100 }}
    >
      {/* File Tab / Badge sticking out top (All Yellow) */}
      <motion.div 
        className="absolute -top-[36px] h-[36px] w-[56px] xl:w-[64px] bg-[#0a0f1c]/90 backdrop-blur-md border border-[#fbbf24]/50 border-b-0 rounded-t-lg flex items-center justify-center z-20 shadow-[0_-5px_10px_rgba(0,0,0,0.2)] transition-colors duration-300"
        style={{ 
          // PROJECTS tab takes up 120px. Remaining space max 480px on desktop.
          // Spacing index dynamically based on screen width would need JS or media queries.
          // We can use standard math: left- [dist]. Since card is wide, space them out.
          // On mobile, card is 320px wide (max left ~260px). 130 + index * 64 works for mobile.
          // On desktop, card is 600px wide. We can spread them further, but keeping tight is fine too.
          // Using a percentage allows flex scaling:
          left: `calc(130px + ${index * 15}%)`,
          background: isHoveredParent || hovered ? `#fbbf2415` : undefined,
          borderColor: isHoveredParent || hovered ? '#fbbf24' : undefined 
        }}
      >
        <span className="font-mono font-bold text-sm tracking-widest text-[#fbbf24] transition-colors" style={{ color: isHoveredParent || hovered ? '#fbbf24' : undefined }}>
          {project.num}
        </span>
      </motion.div>

      {/* Main Card Body - Horizontal Layout */}
      <div 
        className="w-full h-full rounded-b-2xl rounded-tr-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row bg-[#0f172a] border border-[#fbbf24]/30 relative transition-all duration-300"
        style={{ borderColor: isHoveredParent || hovered ? '#fbbf24' : undefined }}
      >
        {/* Image Side */}
        <div className="relative w-full md:w-5/12 h-[200px] md:h-full shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-[#fbbf24]/20">
          <CustomImage
            src={project.image}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            alt={project.title}
          />
          {/* Overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{ background: `linear-gradient(to bottom, transparent 20%, #fbbf2415 100%)`, opacity: hovered ? 1 : 0.5 }}
          />

          {/* Action buttons */}
          <AnimatePresence>
            {(hovered || isHoveredParent) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                className="absolute top-4 right-4 flex flex-col gap-2 z-10"
              >
                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-[#fbbf24] hover:bg-[#fbbf24]/20 transition-colors shadow-lg pointer-events-auto"
                    style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)", border: "1px solid rgba(251,191,36,0.5)" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <BsArrowUpRight size={16} />
                  </motion.div>
                </Link>
                <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-[#fbbf24] hover:bg-[#fbbf24]/20 transition-colors shadow-lg pointer-events-auto"
                    style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)", border: "1px solid rgba(251,191,36,0.5)" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <BsGithub size={16} />
                  </motion.div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-7/12 p-5 xl:p-8 bg-[#0f172a] h-full flex flex-col">
          <h3 className="font-heading font-bold text-white text-lg xl:text-2xl leading-snug mb-3 group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <p className="font-body text-white/60 text-sm xl:text-base leading-relaxed mb-6 flex-grow line-clamp-3 md:line-clamp-none">
            {project.description}
          </p>

          {/* Stack */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.stack.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-md font-mono text-xs shadow-sm bg-[#fbbf24]/10 border border-[#fbbf24]/30 text-[#fbbf24]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#fbbf24]"
        />
      </div>
    </motion.div>
  );
};

const Work = () => {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, amount: 0.5 });
  
  const [isSpread, setIsSpread] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const isMobile = useMediaQuery("(max-width: 768px)"); // strict mobile for layout swapping

  useEffect(() => {
    setMounted(true);
  }, []);

  const gap = 32;
  const desktopWidth = 600;
  const desktopHeight = 360;
  const mobileWidth = 320;
  const mobileHeight = 480;

  const currentWidth = isMobile ? mobileWidth : desktopWidth;
  const currentHeight = isMobile ? mobileHeight : desktopHeight;

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const getStackedProps = (index) => {
    return {
      x: "0%",
      y: 0, 
      scale: 1,
      rotate: 0,
      zIndex: index, 
    };
  };

  const getSpreadProps = (index, total, isMobile) => {
    if (isMobile) {
      // spread vertically downwards on strict mobile
      return {
        x: "0%",
        y: index * (mobileHeight + gap) + 60, 
        scale: 1,
        rotate: 0,
        zIndex: 10 + index, 
      };
    } else {
      // For wide desktop cards, spread them with overlap like a hand of cards
      const center = (total - 1) / 2;
      const dist = index - center;
      return {
        x: `${dist * 45}%`, // x-offset overlapping (~270px)
        y: Math.abs(dist) * 20 - 40, // rise up and arch out
        scale: 1,
        rotate: dist * 4, // slight rotation
        zIndex: 10 + index,
      };
    }
  };

  const dynamicHeight = isSpread && mounted
    ? isMobile 
      ? (projects.length * mobileHeight) + ((projects.length - 1) * gap) + 100
      : desktopHeight + 100 // desktop spread is horizontal, just pad vertical
    : isMobile ? mobileHeight + 60 : desktopHeight + 60; 

  return (
    <section className="min-h-[100vh] flex flex-col justify-center py-20 xl:py-28 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 z-10 relative">
        <div ref={headRef} className="text-center mb-16 xl:mb-24">
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
        </div>

        {/* Interactive Glass Folder Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={headInView ? "visible" : "hidden"}
          className="relative w-full flex justify-center items-start mt-10 transition-all duration-700 ease-in-out"
          style={{ minHeight: dynamicHeight }}
        >
          {/* Main absolute wrapper serving as the Horizontal Folder bounds */}
          <div 
            className="relative cursor-pointer transition-all duration-300"
            style={{ 
              width: mounted ? currentWidth : desktopWidth, 
              height: mounted ? currentHeight : desktopHeight 
            }}
            onClick={() => setIsSpread(!isSpread)}
            onMouseEnter={() => mounted && !isMobile && setIsSpread(true)}
            onMouseLeave={() => mounted && !isMobile && setIsSpread(false)}
          >
            {/* Folder Back Glass */}
            <div className="absolute inset-0 bg-[#0a0f1c]/30 backdrop-blur-lg border border-[#fbbf24]/30 rounded-xl rounded-tl-none shadow-2xl pointer-events-none" style={{ zIndex: -1 }}>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#fbbf24]/10 to-transparent rounded-b-xl" />
            </div>
            
            {/* Folder Tab (PROJECTS) */}
            <div className="absolute top-0 left-0 w-[120px] h-[36px] bg-[#0a0f1c]/40 border-t border-l border-r border-[#fbbf24]/30 rounded-t-xl transform -translate-y-full pointer-events-none flex items-center justify-center backdrop-blur-lg">
              <span className="text-[#fbbf24] text-[11px] font-mono tracking-widest font-bold">PROJECTS</span>
            </div>

            {mounted && projects.map((project, index) => {
              const currentProps = isSpread 
                ? getSpreadProps(index, projects.length, isMobile)
                : getStackedProps(index);

              const isHovered = hoveredIndex === index;
              const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

              if (isHovered) {
                currentProps.zIndex = 50; // Boost z-index of the wrapper so it overlaps sibling cards
              }

              return (
                <motion.div
                  key={index}
                  initial={getStackedProps(index)} // entry from stacked
                  animate={{
                    ...currentProps,
                    filter: isOtherHovered ? "blur(6px)" : "blur(0px)",
                    opacity: isOtherHovered ? 0.4 : 1,
                  }}
                  transition={{ 
                    duration: 0.6, 
                    type: "spring", 
                    stiffness: 70, 
                    damping: 14,
                    mass: 0.8
                  }}
                  className="absolute top-0 left-0 w-full h-full"
                  onHoverStart={() => isSpread && setHoveredIndex(index)}
                  onHoverEnd={() => isSpread && setHoveredIndex(null)}
                >
                  <ProjectCard project={project} index={index} isHoveredParent={isSpread} />
                </motion.div>
              );
            })}

            {/* Folder Front Glass Overlay */}
            <motion.div 
              initial={{ opacity: 1 }}
              animate={mounted ? { 
                opacity: isSpread ? 0 : 1,
                scale: isSpread ? 0.98 : 1
              } : {}}
              transition={{ duration: 0.3 }}
              style={{ zIndex: 5, pointerEvents: "none" }} // Cover cards
              className="absolute inset-0 bg-[#0a0f1c]/70 backdrop-blur-md border border-[#fbbf24]/40 rounded-xl rounded-tl-none shadow-[inset_0_2px_20px_rgba(251,191,36,0.05)] flex flex-col items-center justify-center overflow-hidden"
            >
              <BsFolder size={64} className="mb-4 text-[#fbbf24]/60 drop-shadow-lg" />
              <span className="font-mono text-[10px] sm:text-[12px] tracking-widest text-[#fbbf24]/80 uppercase border border-[#fbbf24]/40 px-6 py-2 rounded-full bg-[#fbbf24]/10 shadow-[0_0_15px_rgba(251,191,36,0.15)] flex items-center gap-2">
                CLICK / HOVER TO SPREAD
              </span>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Work;