'use client';

import { CheckIcon, ChevronRightIcon, VideoIcon } from "lucide-react";
import TiltedImage from "../components/TiltImage";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const specialFeatures = [
    "AI-powered generation",
    "No credit card required",
    "Fast & secure workflow",
  ];

  return (
    <div className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-32">
      {/* Glow */}
      <div className="absolute top-30 -z-10 left-1/4 size-72 bg-pink-600 blur-[300px]" />

      {/* Badge */}
      <motion.div
        className="group flex items-center gap-2 rounded-full p-1 pr-3 mt-44 text-pink-100 bg-pink-200/15"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70 }}
      >
        <span className="bg-pink900 text-white text-xs px-3.5 py-1 rounded-full">
          NEW
        </span>
        <p className="flex items-center gap-1">
          <span className="text-pink-500" >Introducing TechSphere AI</span>
          <ChevronRightIcon
            size={16}
            className="group-hover:translate-x-0.5 transition duration-300"
          />
        </p>
      </motion.div>

      {/* Heading */}
      <motion.h1
        className="text-5xl/17 md:text-6xl/21 font-medium max-w-3xl text-center"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 240, damping: 70 }}
      >
        Build smarter with{" "}
        <span className="move-gradient px-3 rounded-xl text-nowrap text-white-400">
          TechSphere AI
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-base text-center text-slate-200 max-w-xl mt-6"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70 }}
      >
        Generate ideas, content, and solutions using powerful AI tools —
        simple, fast, and built for modern creators.
      </motion.p>

      {/* CTA */}
      <motion.div
        className="flex items-center gap-4 mt-8"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 320, damping: 70 }}
      >
        <Link
          to="/generate"
          className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-7 h-11 flex items-center"
        >
          Start Generating
        </Link>

        <button className="flex items-center gap-2 border border-pink-900 hover:bg-pink-950/50 transition rounded-full px-6 h-11">
          <VideoIcon strokeWidth={1} />
          <span>Watch demo</span>
        </button>
      </motion.div>

      {/* Features */}
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-14 mt-12">
        {specialFeatures.map((feature, index) => (
          <motion.p
            className="flex items-center gap-2"
            key={index}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.3 }}
          >
            <CheckIcon className="size-5 text-pink-600" />
            <span className="text-slate-400">{feature}</span>
          </motion.p>
        ))}
      </div>

      {/* Image */}
      <TiltedImage />
    </div>
  );
}
