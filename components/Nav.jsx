"use client"
import { useState, useEffect } from "react"

const links = [
    {
        name: "home",
        path: "#home",
    },
    {
        name: "services",
        path: "#services",
    },
    {
        name: "resume",
        path: "#resume",
    },
    {
        name: "work",
        path: "#work",
    },
    {
        name: "contact",
        path: "#contact",
    },
]

const Nav = () => {
    const [activeLink, setActiveLink] = useState("#home");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveLink(`#${entry.target.id}`);
                    }
                });
            },
            {
                rootMargin: "-140px 0px -60% 0px",
                threshold: 0,
            }
        );

        const sections = links.map(link => document.querySelector(link.path));
        sections.forEach(section => {
            if (section) {
                observer.observe(section);
            }
        });

        return () => {
            sections.forEach(section => {
                if (section) {
                    observer.unobserve(section);
                }
            });
        };
    }, []);

    const handleClick = (e, path) => {
        e.preventDefault()
        const element = document.querySelector(path)
        if (element) {
            // Tính toán offset để tránh bị header che khuất
            // Header height khoảng 96px (py-8 = 32px * 2 + text height)
            const headerHeight = 120 // Thêm margin để chắc chắn
            const elementPosition = element.offsetTop - headerHeight

            window.scrollTo({
                top: Math.max(0, elementPosition), // Không để scroll âm
                behavior: "smooth"
            })
        }
    }

    return (
        <nav className="flex gap-8">
            {links.map((link, index) => {
                return (
                    <a
                        href={link.path}
                        key={index}
                        onClick={(e) => handleClick(e, link.path)}
                        className={`capitalize font-medium hover:text-accent transition-all cursor-pointer ${activeLink === link.path ? "text-accent border-b-2 border-accent" : ""
                            }`}
                    >
                        {link.name}
                    </a>
                )
            })}
        </nav>
    )
}

export default Nav