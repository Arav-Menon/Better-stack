"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import CustomLink from "../ui/link";
import Loading from "../loading";
import CustomInput from "../ui/inputForAuth";
import { GithubIcon, GoogleIcon } from "../svg";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center px-4 py-12">
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
          <h2 className="text-3xl font-bold text-white mb-2">
            Create your account
          </h2>
          <p className="text-gray-400">
            Start monitoring your services in minutes
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  First name
                </label>
                <CustomInput
                  type="text"
                  required
                  onChange={handleChange}
                  variant="default"
                  placeholder="John"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Last name
                </label>
                <CustomInput
                  type="text"
                  required
                  variant="default"
                  onChange={handleChange}
                  placeholder="Doe"
                />
              </div>
            </div>

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
                required
                variant="default"
                onChange={handleChange}
                placeholder="john@company.com"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Company name
              </label>
              <CustomInput
                type="text"
                autoComplete="company"
                variant="default"
                onChange={handleChange}
                placeholder="Your Company Inc."
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
                autoComplete="new-password"
                required
                onChange={handleChange}
                variant="default"
                placeholder="Create a strong password"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Confirm password
              </label>
              <CustomInput
                type="password"
                autoComplete="new-password"
                required
                onChange={handleChange}
                variant="primary"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label
              htmlFor="agreeToTerms"
              className="ml-2 block text-sm text-gray-300"
            >
              I agree to the{" "}
              <CustomLink variant="primary" href="#">
                Terms of Service
              </CustomLink>{" "}
              and{" "}
              <CustomLink variant="primary" href="#">
                Privacy Policy
              </CustomLink>
            </label>
          </div>

          <Button
            className="w-full"
            disabled={isLoading || !formData.agreeToTerms}
          >
            {isLoading ? <Loading /> : "Create account"}
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-950 text-gray-400">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <Button>
              <GoogleIcon />
              <span className="ml-2">Google</span>
            </Button>
            <Button>
              <GithubIcon />
              <span className="ml-2">GitHub</span>
            </Button>
          </div>
        </form>

        {/* Sign in link */}
        <div className="text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <CustomLink href="/signin" variant="primary">
              Sign in
            </CustomLink>
          </p>
        </div>
      </div>
    </div>
  );
}
