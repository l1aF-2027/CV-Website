"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CustomImage from "@/components/CustomImage"; // Import the custom image component

const customToastStyle = {
  background: '#27272c',
  color: '#fff',
};

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(+84) 903 517 448",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "ha.huy.hoang.tkl@gmail.com",
  },
];

const Contact = () => {
  const searchParams = useSearchParams();
  const service = searchParams.get("service");

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    company: "",
    service: service || "",
    message: "",
  });

  useEffect(() => {
    if (service) {
      setFormData((prevData) => ({ ...prevData, service }));
    }
  }, [service]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, service: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation check
    if (!formData.firstname || !formData.lastname || !formData.email || !formData.phone || !formData.company || !formData.service || !formData.message) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    emailjs.send(
      "service_rukeg9l",
      "template_6u83hze",
      formData,
      "nJDk_ZYPg0iWh3Br5"
    ).then((response) => {
      console.log("SUCCESS!", response.status, response.text);
      toast.success("Your message has been sent successfully!");
    }).catch((err) => {
      console.error("FAILED...", err);
      toast.error("Failed to send your message. Please try again.");
    });
  };

  return (
    <motion.section initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0, duration: 0.2, ease: "easeIn" } }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          {/* form */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, duration: 0.1, delay: 0.1 }}
            className="xl:h-[54%] order-2 xl:order-none"
          >
            <form className="xl:h-[600px] flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl" onSubmit={handleSubmit}>
              <h3 className="text-4xl text-accent">
                Let's work together
              </h3>
              <p className="text-white/60"></p>
              {/* input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} />
                <Input name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} />
                <Input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
                <Input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                <Input name="company" placeholder="Company" value={formData.company} onChange={handleChange} />
                {/* select */}
                <Select name="service" value={formData.service} onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-full rounded-xl">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="AI Engineer">AI Engineer</SelectItem>
                      <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                      <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                      <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* text area */}
              <Textarea className="h-[200px]" name="message" placeholder="Type your message here" value={formData.message} onChange={handleChange} />
              {/* button send */}
              <Button type="submit" size="md" className="max-w-40">Send Message</Button>
            </form>
          </motion.div>
          {/* info */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, duration: 0.1, delay: 0.2 }}
            className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mx-0"
          >
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => {
                return <li key={index} className="flex items-center gap-6">
                  <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-xl flex items-center justify-center">
                    <div className="text-[28px]">{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-accent">{item.title}</div>
                    <div>{item.description}</div>
                  </div>
                </li>
              })}
            </ul>
          </motion.div>
        </div>
      </div>
      <ToastContainer toastStyle={customToastStyle} />
    </motion.section>
  );
};

const ContactPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Contact />
  </Suspense>
);

export default ContactPage;