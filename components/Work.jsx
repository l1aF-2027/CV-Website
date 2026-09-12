"use client"

const projects = [
  { number: "01", title: "Multimodal Sarcasm Detection", type: "AI RESEARCH · COMPUTER VISION", description: "OCR, ViT, and embeddings for Vietnamese social media.", href: "https://github.com/l1aF-2027/UIT-Data-Science-Challenge-2024", visual: "work-visual-yellow" },
  { number: "02", title: "Social Trend Vietnam", type: "DATA SYSTEMS · FULL STACK", description: "Collecting, analyzing, and visualizing social conversations.", href: "https://github.com/l1aF-2027/Social-Trend-VietNam", visual: "work-visual-white" },
  { number: "03", title: "UIT Admissions Chatbot", type: "NLP · PRODUCT BUILD", description: "A focused assistant for navigating university questions.", href: "https://uit-admissions-chatbot.vercel.app/", visual: "work-visual-yellow" },
]

export default function Work() {
  return <section id="work" className="yu-work"><div className="yu-work-head"><span>MISSION 04 / WORK</span><h2>Selected<br /><em>launches.</em></h2><p>Experiments, systems, and interfaces made to leave the hangar.</p><a href="https://github.com/l1aF-2027" target="_blank" rel="noreferrer">VIEW ALL GITHUB ↗</a></div><div className="yu-projects">{projects.map((project) => <article className="yu-project" key={project.number}><div className={`work-visual ${project.visual}`}><span>{project.number}</span><i>↗</i></div><div className="project-copy"><small>{project.type}</small><h3>{project.title}</h3><p>{project.description}</p><a href={project.href} target="_blank" rel="noreferrer">OPEN PROJECT ↗</a></div></article>)}</div><button className="yu-back" onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}>↑ BACK TO HOME</button></section>
}
