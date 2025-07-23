"use client";
import { motion } from "framer-motion";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import CustomImage from "@/components/CustomImage";

const projects = [
  {
    num: '01',
    title: 'Multimodal Sacarsm Detection on Vietnamese Social Media Texts',
    description: 'I won Second Place at UIT Data Science Challenge 2024 (Nov 2024) with above subject, using PaddleOCR, VietOCR, ViT, and Jina Embedding in my pipeline.',
    stack: [{ name: "Python" }, { name: "TensorFlow" }, { name: "Streamlit" }],
    image: '/assets/work/thumb1.png',
    githubLink: 'https://github.com/l1aF-2027/UIT-Data-Science-Challenge-2024',
    link: 'https://multimodal-sacarsm-detection-on-vietnamese-social-media-texts.streamlit.app/'
  },
  {
    num: '02',
    title: 'Vietnameses Traffic Sign Classification through Images',
    description: 'This is my project for Introduction to Computer Vision, utilizing Color Histogram and HOG features, combined with SVM and KNN classifiers to solve the problem.',
    stack: [{ name: "Python" }, { name: "Streamlit" }],
    image: '/assets/work/thumb2.png',
    githubLink: 'https://github.com/l1aF-2027/Traffic-Sign-Classification-through-Images',
    link: 'https://traffic-sign-classification-through-images.streamlit.app/'
  },
  {
    num: '03',
    title: 'UIT Admissions Chatbot',
    description: 'Built a web-based chatbot using NLP to answer UIT admissions FAQs, combining rule-based and intent-based models.',
    stack: [{ name: "Python" }, { name: "FastAPI" }, { name: "Next.js" }, { name: "TailwindCSS" }, { name: "Transformers" }],
    image: '/assets/work/thumb3.png',
    githubLink: 'https://github.com/l1aF-2027/Website-QuanLyViecDangKiMonHocVaThuHocPhi',
    link: 'https://uit-admissions-chatbot.vercel.app/'
  },
];

const Work = () => {
  const [project, setProject] = useState(projects[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex]);
    setCurrentIndex(currentIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0, duration: 0.2, ease: "easeIn" } }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          className="xl:h-[560px] mb-12"
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index} className="w-full">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 10, duration: 0.2, delay: 0.1 * index } }}
                className="flex flex-col xl:flex-row xl:gap-[30px]"
              >
                <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
                  <div className="flex flex-col gap-[30px] h-[50%]">
                    <div className="text-8xl leading-none font-extrabold text-transparent text-outline text-outline-hover">
                      {project.num}
                    </div>
                    <h2 className="text-[30px] font-bold leading-none text-white group-hover:text-accent transition-all duration-100 capitalize">
                      {project.title}
                    </h2>
                    <p className="text-white/60">{project.description}</p>
                    <ul className="flex gap-4">
                      {project.stack.map((item, index) => (
                        <li key={index} className="text-xl text-accent">
                          {item.name}
                          {index !== project.stack.length - 1 && ','}
                        </li>
                      ))}
                    </ul>
                    <div className="border border-white/20"></div>
                    <div className="pl-5 flex item-center gap-4">
                      <Link href={project.link}>
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group hover:rotate-45">
                              <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Web deploy</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Link>
                      <Link href={project.githubLink}>
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                              <BsGithub className="text-white text-3xl group-hover:text-accent" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Github repository</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-full xl:w-[50%]">
                  <div className="h-[460px] relative group flex justify-center items-center">
                    <div>
                      <CustomImage src={project.image} fill className="object-cover rounded-3xl" alt="" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
          <div className="flex gap-2 absolute right-0 bottom-[calc(70%_-_22px)] xl:bottom-[calc(10%_-_22px)] xl: bottom-0 z-20 w-full justify-between xl:w-max xl: justify none">
            <button
              className={`bg-transparent text-[22px] w-[35px] h-[35px] flex justify-center items-center transition-all rounded-full ${currentIndex === 0 ? 'text-gray-500' : 'text-accent hover:bg-accent hover:text-primary'}`}
              onClick={() => currentIndex > 0 && swiperRef.current.slidePrev()}
            >
              <PiCaretLeftBold />
            </button>
            <button
              className={`bg-transparent text-[22px] w-[35px] h-[35px] flex justify-center items-center transition-all rounded-full ${currentIndex === projects.length - 1 ? 'text-gray-500' : 'text-accent hover:bg-accent hover:text-primary'}`}
              onClick={() => currentIndex < projects.length - 1 && swiperRef.current.slideNext()}
            >
              <PiCaretRightBold />
            </button>
          </div>
        </Swiper>
      </div>
    </motion.div>
  );
};

export default Work;