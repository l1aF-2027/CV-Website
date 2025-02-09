"use client";
import React from "react";
import { FaPython, FaHtml5, FaCss3, FaJs } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiMysql, SiPytorch, SiTensorflow } from "react-icons/si";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

// about data
const about = {
  title: "About Me",
  description: "I'm Huy Hoang, an undergraduate passionate about AI and Data Science. \n My focus areas include AI model development, backend architecture, data analysis, and machine learning.I enjoy reading novels, playing FPS games, exploring new technologies, and staying updated with AI trends.\n I'm seeking opportunities in AI Engineering and Data Science.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Ha Huy Hoang"
    },
    {
      fieldName: "Gender",
      fieldValue: "Male"
    },
    {
      fieldName: "Phone",
      fieldValue: "(+84) 903 517 448"
    },
    {
      fieldName: "Experience",
      fieldValue: "1 Year"
    },
    {
      fieldName: "Nationality",
      fieldValue: "Vietnamese"
    },
    {
      fieldName: "Email",
      fieldValue: "ha.huy.hoang.tk@gmail.com"
    },
    {
      fieldName: "Freelance",
      fieldValue: "Available"
    },
    {
      fieldName: "Languages",
      fieldValue: "English, Vietnamese"
    },
  ]
}

// education data
const education = {
  icon: "/assets/resume/badge.svg",
  title: "Education",
  description: "I am among the first cohort of the AI major at VNU-HCM  University of Information Technology , striving for academic excellence.",
  items: [
    {
      institution: "VNU-HCM UIT",
      degree: "Bachelor in AI",
      duration: "2022 - 2025"
    },
    {
      institution: "CS-UIT AI CLUB",
      degree: "AI Learning Member",
      duration: "2022 - 2023"
    },
    {
      institution: "TEK4.VN",
      degree: "Build Interface with HTML & CSS",
      duration: "9/2024"
    },
    {
      institution: "Youtube freeCodeCamp.org",
      degree: "Back End Developer Learning Path",
      duration: "2/2025"
    },
  ]
}

// skills data
const skills = {
  title: "Skills",
  description: "I have expertise and hands-on experience with Python AI frameworks such as TensorFlow and PyTorch. Additionally, I possess a solid foundation in MySQL, HTML, CSS, and JavaScript, enabling me to support the deployment and demonstration of AI models.",
  skillList: [
    {
      icon: <FaPython />,
      name: "Python",
    },
    {
      icon: <SiTensorflow />,
      name: "Tensorflow",
    },
    {
      icon: <SiPytorch />,
      name: "Pytorch",
    },
    {
      icon: <SiMysql />,
      name: "MySQL",
    },
    {
      icon: <FaHtml5 />,
      name: "HTML",
    },
    {
      icon: <FaCss3 />,
      name: "CSS",
    },
    {
      icon: <SiNextdotjs />,
      name: "Next.js",
    },
    {
      icon: <SiTailwindcss />,
      name: "Tailwind CSS",
    },
  ]
}

// Hàm để thay thế \n bằng <br />
const formatDescription = (description) => {
  return description.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
};

const Resume = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2, ease: "easeIn" } }} className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <Tabs defaultValue="education" className="flex flex-col xl:flex-row gap-[60px]">
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About Me</TabsTrigger>
          </TabsList>

          {/* content */}
          <div className="min-h-[70vh] w-full">
            {/* education */}
            <TabsContent value="education" className="w-full">
              <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} transition={{ type: "spring", stiffness: 200, damping: 10, duration: 0.1 }}>
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold text-accent">{education.title}</h3>
                  <p className="max-w-[800px] text-white/60 mx-auto xl:mx-0">{education.description}</p>
                  <ScrollArea className="h-[400px]">
                    <ul className="grid grid-cols-1 xl:grid-cols-2 gap-[30px]">
                      {education.items.map((item, index) => {
                        return <li key={index} className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.degree}</h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.institution}</p>
                          </div>
                        </li>
                      })}
                    </ul>
                  </ScrollArea>
                </div>
              </motion.div>
            </TabsContent>
            {/* skills */}
            <TabsContent value="skills" className="w-full">
              <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} transition={{ type: "spring", stiffness: 200, damping: 10, duration: 0.1 }}>
                <div className="flex flex-col gap-[30px]">
                  <div className="flex flex-col gap-[30px] text-center xl:text-left">
                    <h3 className="text-4xl font-bold text-accent">{skills.title}</h3>
                    <p className="max-w-[800px] text-white/60 mx-auto xl:mx-0 ">{skills.description}</p>
                  </div>
                  <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:gap-[30px] ">
                    {skills.skillList.map((skill, index) => {
                      return <li key={index}>
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex items-center justify-center group">
                              <div className="text-6xl group-hover:text-accent transition-all duration-100">{skill.icon}</div>
                            </TooltipTrigger>

                            <TooltipContent>
                              <p>{skill.name}</p>
                            </TooltipContent>
                          </Tooltip>

                        </TooltipProvider>
                      </li>
                    })
                    }
                  </ul>
                </div>
              </motion.div>
            </TabsContent>
            {/* about me */}
            <TabsContent value="about" className="w-full text-center xl:text-left">
              <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} transition={{ type: "spring", stiffness: 200, damping: 10, duration: 0.1 }}>
                <div className="flex flex-col gap-[30px]">
                  <h3 className="text-4xl font-bold text-accent">{about.title}</h3>
                  <p className="max-w-[800px] text-white/60 mx-auto xl:mx-0">{formatDescription(about.description)}</p>
                  <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-4 max-w-[800px] mx-auto xl:mx-0">
                    {about.info.map((item, index) => {
                      return <li key={index} className="flex items-center justify-center xl:justify-start gap-1">
                        <span className="text-accent">{item.fieldName}:</span>
                        <span className="text-xl whitespace-nowrap">{item.fieldValue}</span>
                      </li>
                    })}
                  </ul>
                </div>
              </motion.div>
            </TabsContent>
          </div>
        </Tabs>
      </div >
    </motion.div >
  )
}

export default Resume;