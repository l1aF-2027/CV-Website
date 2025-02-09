"use client";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import { motion } from "framer-motion";
const Home = () => {
  return (
    <section className="h-full">
      <motion.div initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.1, ease: "easeIn" }
        }}>
        <div className="container mx-auto h-full">
          <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
            {/* text (for introduction) */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10, duration: 0.1, delay: 0.1 }}
              className="text-center xl:text-left order-2 xl:order-none"
            >
              <span className="text-xl">AI Engineer</span>
              <h1 className="h1 mb-6 text-center xl:text-left pl-0 ml-0">
                Hello I'm <br /> <span className="text-accent text-center xl:text-left pl-0 ml-0">Huy Hoang</span>
              </h1>
              <p className="max-w-[500px] mb-7 text-white/80">
                I am an aspiring AI Engineer with strong passion in ML model optimization and deployment seeking to drive impactful solutions.
              </p>

              {/* Button of socials */}
              <div className="flex flex-col xl:flex-row items-center gap-8">
                {/* download CV */}
                <a href="/assets/photo2.png" download>
                  <Button variant="outline" size="lg" className="uppercase flex items-center gap-2">
                    <span>Download CV</span>
                    <FiDownload className="w-4 h-4" />
                  </Button>
                </a>
                <div className="mb-8 xl:mb-0">
                  <Social containerStyles="flex gap-6" iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-100" />
                </div>
              </div>
            </motion.div>
            {/* photo */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10, duration: 0.1, delay: 0.2 }}
              className="order-1 xl:order-none mb-8 xl:mb-0"
            >
              <Photo />
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10, duration: 0.1, delay: 0.2 }}
          className="order-1 xl:order-none mb-8 xl:mb-0"
        >
          <Stats />
      </motion.div>
        </motion.div>
    </section>
  );
};

export default Home;