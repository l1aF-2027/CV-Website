"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const projects = [
  { number: "01", title: "Multimodal Sarcasm Detection", type: "AI RESEARCH · COMPUTER VISION", description: "A multimodal pipeline for Vietnamese social media using OCR, ViT, and Jina embeddings.", href: "https://github.com/l1aF-2027/UIT-Data-Science-Challenge-2024", color: "yellow" },
  { number: "02", title: "Social Trend Vietnam", type: "DATA SYSTEMS · FULL STACK", description: "An open-source platform that collects, analyzes, and visualizes social trends in Vietnam.", href: "https://github.com/l1aF-2027/Social-Trend-VietNam", color: "black" },
  { number: "03", title: "UIT Admissions Chatbot", type: "NLP · PRODUCT BUILD", description: "A friendly FAQ assistant combining intent models with a focused Next.js interface.", href: "https://uit-admissions-chatbot.vercel.app/", color: "yellow" },
]

export default function Work() {
  return (
    <section id="work" className="work-station">
      <div className="station-heading"><span className="station-number">stop 01</span><h2>Selected<br /><em>Work.</em></h2><p>three systems · AI · data · human interfaces</p><Link href="https://github.com/l1aF-2027" target="_blank">view all on github ↗</Link></div>
      <div className="project-list">
        {projects.map((project, index) => (
          <motion.div key={project.number} className={`project-ticket ${project.color}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }}>
            <span className="project-number">{project.number}</span>
            <div className="project-main"><h3>{project.title}</h3><p>{project.type}</p></div>
            <p className="project-description">{project.description}</p>
            <Link href={project.href} target="_blank" className="project-link">view project →</Link>
          </motion.div>
        ))}
      </div>
      <div className="next-stop">next stop ↓ <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>contact</button></div>
    </section>
  )
}
