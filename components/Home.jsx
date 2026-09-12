"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const stations = ["home", "work", "about", "play"]

export default function Home() {
  const [stamped, setStamped] = useState(false)

  const jumpTo = (id) => {
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="launchpad-home">
      <aside className="launchpad-sidebar" aria-label="Main navigation">
        <div className="launchpad-mark" aria-hidden="true"><span>▲</span></div>
        <nav className="launchpad-nav">
          {stations.map((station, index) => (
            <button key={station} onClick={() => jumpTo(station)} className="launchpad-nav-item">
              <span>{index + 1}.</span> {station}
            </button>
          ))}
        </nav>
        <span className="sidebar-caption">HHO / 2026</span>
      </aside>

      <section id="home" className="launchpad-hero">
        <div className="hero-copy">
          <p className="eyebrow">MISSION CONTROL · PERSONAL PORTFOLIO</p>
          <h1>Ha Huy<br /><em>Hoang.</em></h1>
          <p className="hero-quote">I build intelligent systems<br />people actually want to use.</p>
          <p className="hero-meta">AI Engineer · ML Practitioner · Backend Developer</p>
        </div>

        <div className="portrait-stage">
          <div className="portrait-label">CREW MEMBER / 01</div>
          <div className="portrait-frame">
            <Image src="/assets/image.webp" alt="Ha Huy Hoang" fill priority className="portrait-image" sizes="(max-width: 900px) 80vw, 42vw" />
          </div>
          <div className="orbit-line orbit-line-one" />
          <div className="orbit-line orbit-line-two" />
          <span className="coordinate coordinate-one">10°N 106°E</span>
          <span className="coordinate coordinate-two">READY / 2026-7</span>
        </div>

        <div className="boarding-ticket" onClick={() => setStamped(!stamped)} role="button" tabIndex={0} onKeyDown={(event) => event.key === "Enter" && setStamped(!stamped)}>
          <p className="ticket-instruction">{stamped ? "STAMPED · WELCOME ABOARD" : "HOVER TO SCAN · CLICK TO STAMP"}</p>
          <div className="ticket-grid">
            <div><small>FROM</small><strong>HOME</strong></div><b>→</b><div><small>TO</small><strong>WORK</strong></div>
            <div><small>MISSION</small><strong>ROUND TRIP</strong></div><div><small>CREW</small><strong>you!</strong></div>
            <div><small>DATE</small><strong>12SEP</strong></div><div><small>LAUNCH</small><strong>09:30</strong></div>
          </div>
          <div className="ticket-footer"><span>HHO-01 · launchpad portfolio</span><span className="ticket-code">{stamped ? "LAUNCHED" : "BOARDING"}</span></div>
        </div>

        <button className="scroll-cue" onClick={() => jumpTo("work")}>scroll to launch the work ↓</button>
      </section>

      <div id="about" className="sr-only"><Link href="/">About Ha Huy Hoang</Link></div>
    </div>
  )
}

export { stations }
