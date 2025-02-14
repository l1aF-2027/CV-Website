"use client";
import { Suspense } from "react";
import Contact from "@/components/Contact";

const ContactPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Contact />
    </Suspense>
  );
};

export default ContactPage;