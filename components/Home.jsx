"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const stations = ["home", "work", "about", "play"]

export default function Home() {
  const [active, setActive] = useState("home")
  const [stamped, setStamped] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const current = stations.slice().reverse().find((id) => {
        const el = document.getElementById(id)
        return el && window.scrollY >= el.offsetTop - 180
      })
      if (current) setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const jumpTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <div className="yu-shell">
      <aside className="yu-profile">
        <div className="yu-avatar"><Image src="/assets/image.webp" alt="Ha Huy Hoang" fill sizes="80px" /></div>
        <p className="yu-name">HA HUY<br />HOANG</p>
        <p className="yu-bio">AI engineer and builder exploring useful, playful systems.</p>
        <p className="yu-detail">UIT · COMPUTER SCIENCE<br />VIETNAM · 2026</p>
        <div className="yu-mini-rocket" aria-hidden="true">↗</div>
        <a href="mailto:hello@example.com" className="yu-contact">SAY HELLO ↗</a>
      </aside>
      <div className="yu-main">
        <nav className="yu-stations" aria-label="Sections">
          {stations.map((station) => <button key={station} className={active === station ? "active" : ""} onClick={() => jumpTo(station)}>{station}<i /></button>)}
        </nav>
        <section id="home" className="yu-home">
          <div className="yu-intro"><span>MISSION 01 / HOME</span><h1>Building things<br /><em>with curiosity.</em></h1><p>Welcome to my little launchpad. Scroll around, inspect the projects, and take a seat at the keyboard.</p></div>
          <div className="yu-collage">
            <button className={`yu-pass ${stamped ? "stamped" : ""}`} onClick={() => setStamped(!stamped)}><small>CREW PASS · HHO-01</small><strong>{stamped ? "CLEARED" : "READY"}</strong><span>{stamped ? "STAMPED FOR LAUNCH" : "CLICK TO STAMP"}</span><b>↗</b></button>
            <div className="yu-scene yu-scene-rocket"><span className="scene-grid" /><div className="rocket">▲</div><p>ROCKET LAB<br />LIFT-OFF SYSTEMS</p></div>
            <div className="yu-scene yu-scene-keyboard"><div className="keys">{Array.from({ length: 28 }).map((_, i) => <i key={i} />)}</div><p>ASSEMBLE · TYPE · SHIP</p></div>
          </div>
          <button className="yu-next" onClick={() => jumpTo("work")}>SCROLL TO WORK <span>↓</span></button>
        </section>
        <section id="about" className="yu-about"><span>MISSION 02 / ABOUT</span><h2>Human ideas,<br /><em>machine precision.</em></h2><p>I like making software that feels considered: clear interfaces, reliable data, and a little room for delight.</p></section>
        <section id="play" className="yu-play"><span>MISSION 03 / PLAY</span><h2>Currently<br /><em>on the keyboard.</em></h2><div className="code-strip">const curiosity = await buildSomethingUseful();</div></section>
      </div>
    </div>
  )
}

export { stations }
