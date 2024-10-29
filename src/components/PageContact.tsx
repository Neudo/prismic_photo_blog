"use client";
import React from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { RichText } from "@/components/RichText";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

function PageContact({ data, settings }: any) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <motion.div
        className="w-full lg:min-h-screen lg:w-1/2"
        initial={{ opacity: 0, translateX: "-100%" }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PrismicNextImage
          className="object-cover lg:h-full lg:w-full"
          field={data.image}
        />
      </motion.div>
      <div className="w-full p-6 lg:w-1/2 lg:px-[100px] lg:pt-[130px]">
        <motion.div
          initial={{ opacity: 0, translateY: "50px" }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <RichText field={data.contact_text} />
        </motion.div>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0, translateY: "50px" }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.3, delay: 0.55 }}
        ></motion.div>

        <ContactForm />

        {/*Socials links*/}
        <motion.div
          className="mt-10 flex gap-4"
          initial={{ opacity: 0, translateY: "50px" }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          {settings.data.facebook && (
            <PrismicNextLink field={settings.data.facebook}>
              <FaFacebook className="text-3xl text-[#3b5998] duration-300 ease-out hover:scale-105 " />
            </PrismicNextLink>
          )}
          {settings.data.tiktok && (
            <PrismicNextLink field={settings.data.tiktok}>
              <FaTiktok className="text-3xl duration-300 ease-out hover:scale-105 " />
            </PrismicNextLink>
          )}
          {settings.data.instagram && (
            <PrismicNextLink field={settings.data.instagram}>
              <FaInstagram className="text-3xl text-[#E1306C] duration-300 ease-out hover:scale-105 " />
            </PrismicNextLink>
          )}
          {settings.data.youtube && (
            <PrismicNextLink field={settings.data.youtube}>
              <FaYoutube className="text-3xl text-[#FF0000] duration-300 ease-out hover:scale-105 " />
            </PrismicNextLink>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default PageContact;
