"use client";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { useEffect } from "react";

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

const MobileNav = () => {
    const pathname = usePathname();

    // Scroll to top on page load/reload
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleClick = (e, path) => {
        e.preventDefault()
        const element = document.querySelector(path)
        if (element) {
            // Header height cho mobile (py-8 = 64px)
            const headerHeight = 100
            const elementPosition = element.offsetTop - headerHeight

            window.scrollTo({
                top: Math.max(0, elementPosition),
                behavior: "smooth"
            })
        }
    }

    return (
        <Sheet>
            <SheetTrigger className="flex justify-center items-center">
                <CiMenuFries className="text-[32px] text-accent" />
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <div className="mt-32 mb-40 text-center text-2xl">
                    <Link href="/">
                        <h1 className="text-4xl font-semibold">Huy Hoang<span className="text-accent">.</span></h1>
                    </Link>
                </div>
                <nav className="flex flex-col items-center justify-center gap-8">
                    {links.map((link, index) => {
                        return (
                            <SheetClose asChild key={index}>
                                <a
                                    href={link.path}
                                    onClick={(e) => handleClick(e, link.path)}
                                    className={`${link.path === pathname && "text-accent border-b-2 border-accent"} text-xl capitalize hover:text-accent transition-all`}
                                >
                                    {link.name}
                                </a>
                            </SheetClose>
                        )
                    })}
                </nav>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav