  "use client";

  import type React from "react";

  import { useState } from "react";
  import Link from "next/link";
  import { usePathname } from "next/navigation";
  import {
    LayoutDashboard,
    Globe,
    Activity,
    BarChart3,
    Bell,
    User,
    Settings,
    Shield,
    Menu,
    X,
    LogOut,
  } from "lucide-react";
  import { Button } from "./ui/button";

  interface NavItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }

  const navItems: NavItem[] = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Websites", href: "/dashboard/add-website", icon: Globe },
    { name: "Monitoring", href: "/dashboard/monitor", icon: Activity },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    {
      name: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
    },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) => {
      if (href === "/dashboard") {
        return pathname === "/dashboard";
      }
      return pathname.startsWith(href);
    };

    return (
      <>
        {/* Mobile menu button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
            className="border-gray-700 bg-gray-900/90 backdrop-blur-sm"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Sidebar */}
        <div
          className={`
            fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
            lg:translate-x-0 lg:static h-screen lg:inset-0
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex flex-col h-screen bg-[#171616] border-r border-gray-800">
            {/* Logo */}
            <div className="flex items-center px-6 py-4 border-b border-gray-800">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#fff] rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">BetterUptime</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                      ${active ? "bg-[#fff] text-black" : "text-gray-300 hover:bg-white/4 hover:text-white"}
                    `}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="flex-1">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Sign Out */}
            <div className="px-4 py-4 border-t border-gray-800">
              <Button
                variant="ghost"
                className="w-full border-gray-700 text-gray-300 hover:bg-white/5 hover:text-gray-300 justify-start"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </>
    );
  }
