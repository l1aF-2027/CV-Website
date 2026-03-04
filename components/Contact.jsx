"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const info = [
    { icon: <FaPhoneAlt />, title: "Phone", value: "(+84) 903 517 448" },
    { icon: <FaEnvelope />, title: "Email", value: "ha.huy.hoang.tkl@gmail.com" },
];

const socials = [
    { icon: <FaGithub />, href: "https://github.com/l1aF-2027", label: "GitHub" },
    { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/hoang-huy-6b77a12a8/", label: "LinkedIn" },
];

const inputClass = `w-full bg-transparent px-4 py-3.5 rounded-xl font-body text-sm text-white placeholder:text-white/25 outline-none transition-all duration-300
  border border-white/10 focus:border-accent/60 focus:shadow-[0_0_0_3px_rgba(0,200,255,0.08)]`;

const SERVICE_OPTIONS = ["AI Engineer", "Data Scientist", "Data Analyst", "Backend Developer"];

const ServiceDropdown = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // Close on outside click
    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} className="relative w-full">
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full px-4 py-3.5 rounded-xl font-body text-sm text-left flex items-center justify-between transition-all duration-300"
                style={{
                    background: "rgba(255,255,255,0.03)",
                    border: open ? "1px solid rgba(0,200,255,0.4)" : "1px solid rgba(255,255,255,0.1)",
                    color: value ? "white" : "rgba(255,255,255,0.25)",
                    boxShadow: open ? "0 0 0 3px rgba(0,200,255,0.08)" : "none",
                }}
            >
                <span>{value || "Select a Service"}</span>
                <motion.svg
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round"
                >
                    <polyline points="6 9 12 15 18 9" />
                </motion.svg>
            </button>

            {/* Dropdown list */}
            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -8, scaleY: 0.9 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -8, scaleY: 0.9 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: "absolute",
                            top: "calc(100% + 6px)",
                            left: 0,
                            right: 0,
                            zIndex: 50,
                            background: "rgba(15, 15, 35, 0.95)",
                            border: "1px solid rgba(0,200,255,0.2)",
                            borderRadius: "0.875rem",
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,200,255,0.05)",
                            overflow: "hidden",
                            transformOrigin: "top",
                        }}
                    >
                        {SERVICE_OPTIONS.map((opt, i) => (
                            <motion.li
                                key={opt}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.04, duration: 0.2 }}
                                onClick={() => { onChange(opt); setOpen(false); }}
                                className="px-4 py-3 font-body text-sm cursor-pointer flex items-center gap-3 transition-all duration-150"
                                style={{
                                    color: value === opt ? "#00c8ff" : "rgba(255,255,255,0.65)",
                                    background: value === opt ? "rgba(0,200,255,0.07)" : "transparent",
                                }}
                                whileHover={{ background: "rgba(0,200,255,0.06)", color: "#ffffff", x: 4 }}
                            >
                                {value === opt && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" style={{ boxShadow: "0 0 6px rgba(0,200,255,0.8)" }} />
                                )}
                                {value !== opt && <span className="w-1.5 h-1.5 flex-shrink-0" />}
                                {opt}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

const Contact = () => {
    const searchParams = useSearchParams();
    const service = searchParams.get("service");
    const headRef = useRef(null);
    const headInView = useInView(headRef, { once: true, amount: 0.5 });
    const formRef = useRef(null);
    const formInView = useInView(formRef, { once: true, amount: 0.1 });

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        company: "",
        service: service || "",
        message: "",
    });

    const [sending, setSending] = useState(false);

    useEffect(() => {
        if (service) setFormData(d => ({ ...d, service }));
    }, [service]);

    useEffect(() => {
        const handleServiceSelect = (e) => {
            setFormData(d => ({ ...d, service: e.detail.service }));
        };
        window.addEventListener("selectService", handleServiceSelect);
        return () => window.removeEventListener("selectService", handleServiceSelect);
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.firstname || !formData.lastname || !formData.email || !formData.phone || !formData.company || !formData.service || !formData.message) {
            toast.error("Please fill in all fields before submitting.");
            return;
        }
        setSending(true);
        try {
            await emailjs.send("service_bjys1c1", "template_6u83hze", formData, "nJDk_ZYPg0iWh3Br5");
            toast.success("Message sent! I'll get back to you soon 🚀");
            setFormData({ firstname: "", lastname: "", email: "", phone: "", company: "", service: "", message: "" });
        } catch (err) {
            toast.error("Failed to send. Please try again or email me directly.");
        }
        setSending(false);
    };

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
                        Get In Touch
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={headInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-heading font-bold text-white"
                        style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                    >
                        Let's Work <span className="gradient-text">Together</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 xl:gap-12 items-start">
                    {/* Left: contact info */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={formInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        ref={formRef}
                        className="xl:col-span-2 space-y-6"
                    >
                        <p className="font-body text-white/45 leading-relaxed text-sm">
                            I'm open to new opportunities, collaborations, or just a chat about AI and technology.
                            Feel free to reach out — I'll do my best to respond promptly!
                        </p>

                        <div className="space-y-4">
                            {info.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                                    className="flex items-center gap-4 p-4 rounded-2xl"
                                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-accent text-xl flex-shrink-0"
                                        style={{ background: "rgba(0,200,255,0.1)", border: "1px solid rgba(0,200,255,0.2)" }}
                                    >
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="font-body text-white/35 text-xs uppercase tracking-wider mb-0.5">{item.title}</div>
                                        <div className="font-body text-white/80 text-sm font-medium">{item.value}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social links */}
                        <div className="flex gap-3 pt-2">
                            {socials.map((s, i) => (
                                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                                    <motion.div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-accent transition-colors duration-200"
                                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                                        whileHover={{ scale: 1.1, borderColor: "rgba(0,200,255,0.3)", boxShadow: "0 0 15px rgba(0,200,255,0.2)" }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {s.icon}
                                    </motion.div>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={formInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="xl:col-span-3"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="p-8 rounded-3xl space-y-5"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                backdropFilter: "blur(20px)",
                            }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} className={inputClass} />
                                <input name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} className={inputClass} />
                                <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={inputClass} />
                                <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className={inputClass} />
                                <input name="company" placeholder="Company / Organization" value={formData.company} onChange={handleChange} className={inputClass} />
                                <ServiceDropdown
                                    value={formData.service}
                                    onChange={(val) => setFormData({ ...formData, service: val })}
                                />
                            </div>

                            <textarea
                                name="message"
                                placeholder="Your message..."
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                className={`${inputClass} resize-none`}
                            />

                            <motion.button
                                type="submit"
                                disabled={sending}
                                className="w-full py-4 rounded-xl font-heading font-semibold text-sm text-black relative overflow-hidden"
                                style={{ background: sending ? "rgba(0,200,255,0.5)" : "linear-gradient(135deg, #00c8ff, #f5a623)" }}
                                whileHover={!sending ? { scale: 1.01, boxShadow: "0 10px 40px rgba(0,200,255,0.3)" } : {}}
                                whileTap={!sending ? { scale: 0.99 } : {}}
                            >
                                {sending ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                        Sending...
                                    </span>
                                ) : "Send Message →"}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>

            <ToastContainer
                position="bottom-right"
                toastStyle={{ background: "#12121e", color: "#ffffff", border: "1px solid rgba(0,200,255,0.2)" }}
            />
        </section>
    );
};

export default Contact;