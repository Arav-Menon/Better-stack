"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import CustomInput from "../ui/inputForAuth";
import Loading from "../loading";
import CustomLink from "../ui/link";
import { GithubIcon, GoogleIcon } from "../svg";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-2xl font-bold text-white">
                BetterUptime
              </span>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-gray-400">
            Sign in to your account to continue monitoring
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email address
              </label>
              <CustomInput
                type="email"
                autoComplete="email"
                variant="default"
                required
                onChange={(e: any) => setEmail(e.target.value)}
                className="default"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <CustomInput
                type="password"
                autoComplete="current-password"
                required
                onChange={(e: any) => setPassword(e.target.value)}
                variant="default"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded bg-gray-900"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-300"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <CustomLink href="#" variant="primary">
                Forgot your password?
              </CustomLink>
            </div>
          </div>

          <Button className="w-full" disabled={isLoading}>
            {isLoading ? <Loading /> : "Sign in"}
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-950 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <Button>
              <GoogleIcon />
              <span className="ml-2">Google</span>
            </Button>
            <Button type="button">
              <GithubIcon />
              <span className="ml-2">GitHub</span>
            </Button>
          </div>
        </form>

        {/* Sign up link */}
        <div className="text-center">
          <p className="text-gray-400">
            {"Don't have an account? "}
            <CustomLink href="/signup" variant="primary">
              Sign up for free
            </CustomLink>
          </p>
        </div>
      </div>
    </div>
  );
}
