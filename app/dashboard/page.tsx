"use client";

import { Settings, Bell, FileText, Upload, Database, Users, TrendingUp, Calendar, BarChart3, Leaf, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const bentoItems = [
  {
    title: "Settings",
    description: "Manage your account and preferences",
    icon: <Settings className="w-8 h-8" />,
    href: "/dashboard/settings",
    bgImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop&crop=center",
    color: "from-blue-500/20 to-blue-600/20",
    hoverColor: "from-blue-500/40 to-blue-600/40"
  },
  {
    title: "Reminders",
    description: "View and manage your alerts",
    icon: <Bell className="w-8 h-8" />,
    href: "/dashboard/reminders",
    bgImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop&crop=center",
    color: "from-orange-500/20 to-orange-600/20",
    hoverColor: "from-orange-500/40 to-orange-600/40"
  },
  {
    title: "Farm Logs",
    description: "Track your daily activities",
    icon: <FileText className="w-8 h-8" />,
    href: "/dashboard/farm-logs",
    bgImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop&crop=center",
    color: "from-green-500/20 to-green-600/20",
    hoverColor: "from-green-500/40 to-green-600/40"
  },
  {
    title: "Upload Document",
    description: "Add new files and records",
    icon: <Upload className="w-8 h-8" />,
    href: "/dashboard/upload",
    bgImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop&crop=center",
    color: "from-purple-500/20 to-purple-600/20",
    hoverColor: "from-purple-500/40 to-purple-600/40"
  },
  {
    title: "Your Records",
    description: "Access your data and history",
    icon: <Database className="w-8 h-8" />,
    href: "/dashboard/records",
    bgImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop&crop=center",
    color: "from-indigo-500/20 to-indigo-600/20",
    hoverColor: "from-indigo-500/40 to-indigo-600/40"
  },
  {
    title: "Updates & Community",
    description: "Stay connected with other farmers",
    icon: <Users className="w-8 h-8" />,
    href: "/dashboard/community",
    bgImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop&crop=center",
    color: "from-teal-500/20 to-teal-600/20",
    hoverColor: "from-teal-500/40 to-teal-600/40"
  },
  {
    title: "Analytics",
    description: "View your farm performance",
    icon: <BarChart3 className="w-8 h-8" />,
    href: "/dashboard/analytics",
    bgImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop&crop=center",
    color: "from-emerald-500/20 to-emerald-600/20",
    hoverColor: "from-emerald-500/40 to-emerald-600/40"
  },
  {
    title: "Calendar",
    description: "Plan your farming schedule",
    icon: <Calendar className="w-8 h-8" />,
    href: "/dashboard/calendar",
    bgImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop&crop=center",
    color: "from-rose-500/20 to-rose-600/20",
    hoverColor: "from-rose-500/40 to-rose-600/40"
  }
];

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-green-700 mb-2">Welcome back, Farmer!</h1>
              <p className="text-green-800/80 text-base sm:text-lg">What would you like to work on today?</p>
            </div>
            
            {/* Set up your genie button */}
            <Link href="/dashboard/setup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg transition-all duration-200"
              >
                <Sparkles className="w-4 h-4" />
                <span>Set up your genie</span>
                {/* Notification badge */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {bentoItems.map((item, index) => (
            <Link href={item.href} key={item.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -4,
                  transition: { duration: 0.2 }
                }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer h-48 sm:h-56"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.bgImage})` }}
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} group-hover:${item.hoverColor} transition-all duration-500`} />
                
                {/* Content */}
                <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-white mb-3 sm:mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{item.title}</h3>
                    <p className="text-white/90 text-xs sm:text-sm">{item.description}</p>
                  </div>
                  
                  {/* Hover indicator */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center text-white/80 text-xs sm:text-sm">
                      <span>Open</span>
                      <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="ml-2"
                      >
                        →
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/90 rounded-2xl p-4 sm:p-6 shadow-lg border border-green-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-green-700">12</p>
                <p className="text-green-600 text-xs sm:text-sm">Active Projects</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white/90 rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-blue-700">87%</p>
                <p className="text-blue-600 text-xs sm:text-sm">Efficiency Rate</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-white/90 rounded-2xl p-4 sm:p-6 shadow-lg border border-orange-200 sm:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-orange-700">5</p>
                <p className="text-orange-600 text-xs sm:text-sm">Pending Tasks</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 