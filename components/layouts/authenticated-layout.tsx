"use client";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Home, BarChart3, Settings, Users, Calendar, FileText, LogOut, Bell, Upload, Database } from "lucide-react";
import Link from "next/link";

const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home className="w-5 h-5 text-green-600" />,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="w-5 h-5 text-green-600" />,
  },
  {
    label: "Reminders",
    href: "/dashboard/reminders",
    icon: <Bell className="w-5 h-5 text-green-600" />,
  },
  {
    label: "Farm Logs",
    href: "/dashboard/farm-logs",
    icon: <FileText className="w-5 h-5 text-green-600" />,
  },
  {
    label: "Upload Document",
    href: "/dashboard/upload",
    icon: <Upload className="w-5 h-5 text-green-600" />,
  },
  {
    label: "Your Records",
    href: "/dashboard/records",
    icon: <Database className="w-5 h-5 text-green-600" />,
  },
  {
    label: "Updates & Community",
    href: "/dashboard/community",
    icon: <Users className="w-5 h-5 text-green-600" />,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart3 className="w-5 h-5 text-green-600" />,
  },
  {
    label: "Calendar",
    href: "/dashboard/calendar",
    icon: <Calendar className="w-5 h-5 text-green-600" />,
  },
];

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AuthenticatedLayout({ 
  children, 
  title = "Farm Genie" 
}: AuthenticatedLayoutProps) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200">
      <Sidebar>
        <SidebarBody className="bg-white/90 backdrop-blur-sm border-r border-green-200">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FG</span>
            </div>
            <span className="font-bold text-green-700">{title}</span>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {sidebarLinks.map((link) => (
              <SidebarLink
                key={link.href}
                link={link}
                className="hover:bg-green-50 rounded-lg px-3 py-2 transition-colors"
              />
            ))}
          </nav>
          
          {/* Logout Link */}
          <div className="mt-auto pt-4 border-t border-green-200">
            <Link
              href="/"
              className="flex items-center gap-2 py-2 px-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Logout</span>
            </Link>
          </div>
        </SidebarBody>
      </Sidebar>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
} 