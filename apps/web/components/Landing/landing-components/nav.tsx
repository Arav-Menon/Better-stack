"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md' ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-primary-foreground rounded-full animate-pulse-green"></div>
            </div>
            <span className="text-xl font-bold text-[#fff] ">UptimeWatch</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/features"
              className="text-muted-foreground hover:text-[#fff] transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-muted-foreground hover:text-[#fff] transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#docs"
              className="text-muted-foreground hover:text-[#fff] transition-colors"
            >
              Docs
            </Link>
            <Link
              href="#support"
              className="text-muted-foreground hover:text-[#fff] transition-colors"
            >
              Support
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href={"/signin"} >sign In</Link>
            <Button variant="default">Start Free Trial</Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"}`}
              ></span>
              <span
                className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span
                className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"}`}
              ></span>
            </div>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 animate-slide-up">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#docs"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Docs
              </Link>
              <Link
                href="#support"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Support
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" className="justify-start">
                  Sign In
                </Button>
                <Button className="justify-start">Start Free Trial</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
