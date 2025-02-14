"use client";

import { BsArrowDownRight } from "react-icons/bs"
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    num: '01',
    title: 'AI Engineer',
    description: 'Developing and implementing AI models and machine learning systems to solve complex problems',
    href: '/contact'
  },
  {
    num: '02',
    title: 'Data Scientist',
    description: 'Analyzing complex data sets to drive insights and strategic business decisions',
    href: '/contact'
  },
  {
    num: '03',
    title: 'Data Analyst',
    description: 'Interpreting data, creating reports, and identifying patterns to improve business operations',
    href: '/contact'
  },
  {
    num: '04',
    title: 'Backend Developer',
    description: 'Building and maintaining server-side applications and database architectures',
    href: '/contact'
  },
]

const Services = () => {
  
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.1, ease: "easeIn" }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]">
          {services.map((service, index) => {
            return (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, duration: 0.1, delay: index * 0.2 }}
                className="flex-1 flex flex-col justify-center gap-6 group"
              >
                <div className="w-full flex justify-between items-center">
                  <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-150">{service.num}</div>
                  <Link href={`${service.href}?service=${service.title}`} className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-150 flex justify-center items-center group-hover:-rotate-45">
                    <BsArrowDownRight className="text-primary text-3xl" />
                  </Link>
                </div>
                {/* title */}
                <h2 className="text-[42px] font-bold leading-none text-white transition-all duration-150">{service.title}</h2>
                {/* description */}
                <p className="text-white/60">{service.description}</p>
                {/* border */}
                <div className="border-b border-white/20 w-full"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;