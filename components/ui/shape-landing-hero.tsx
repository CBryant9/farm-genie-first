"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, Circle, Triangle, Square } from "lucide-react";
import React from "react";

export function DemoHeroGeometric() {
  return (
    <section
      className={cn(
        "relative flex flex-col items-center justify-center min-h-[60vh] py-20 overflow-hidden",
        "bg-gradient-to-br from-green-100 via-green-50 to-green-200"
      )}
    >
      {/* Animated geometric shapes */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute left-10 top-10"
      >
        <Circle size={48} className="text-green-300 opacity-60 animate-spin-slow" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute right-16 top-24"
      >
        <Triangle size={40} className="text-green-200 opacity-70 animate-bounce" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        className="absolute left-1/4 bottom-10"
      >
        <Square size={36} className="text-green-300 opacity-50 animate-pulse" />
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute right-1/3 bottom-20"
      >
        <Sparkles size={44} className="text-green-400 opacity-60 animate-pulse" />
      </motion.div>
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-green-500 via-green-400 to-green-600 bg-clip-text text-transparent mb-4">
          Welcome to Farm Genie
        </h1>
        <p className="text-lg md:text-xl text-green-800/80 max-w-xl mb-8">
          Effortless farm management, insights, and growth. <br />
          Modern tools for the next generation of agriculture.
        </p>
        <a
          href="#features"
          className="inline-block px-8 py-3 rounded-full bg-green-500 text-white font-semibold shadow-lg hover:bg-green-600 transition"
        >
          Learn More
        </a>
      </div>
    </section>
  );
} 