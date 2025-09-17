"use client";

import { useState } from "react";
import { ProfileInformation } from "@/components/profile-information";
import { PaymentDetails } from "@/components/payment-details";
import { ProfilePictureUpload } from "@/components/profile-picture-upload";

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleImageChange = (file: File | null) => {
    setProfileImage(file);
    console.log("[v0] Profile image changed:", file?.name);
  };

  return (
    <div
      className="min-h-screen p-6 lg:p-8"
      style={{ backgroundColor: "#0c0c0c" }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
          <p className="text-gray-400">
            Manage your personal information, payment methods, and profile
            picture
          </p>
        </div>

        {/* Profile Picture Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ProfilePictureUpload
              currentImage="/professional-avatar.png"
              onImageChange={handleImageChange}
            />
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <ProfileInformation />
          </div>
        </div>

        {/* Payment Details */}
        <PaymentDetails />
        {/* Account Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0c0c0c] border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              Account Created
            </h3>
            <p className="text-2xl font-bold text-[#fff]">Jan 2024</p>
            <p className="text-sm text-gray-400">11 months ago</p>
          </div>
          <div className="bg-[#0c0c0c] border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              Websites Monitored
            </h3>
            <p className="text-2xl font-bold text-[#fff]">12</p>
            <p className="text-sm text-gray-400">Active monitoring</p>
          </div>
          <div className="bg-[#0c0c0c] border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              Current Plan
            </h3>
            <p className="text-2xl font-bold text-white">Pro</p>
            <p className="text-sm text-[#fff]">$29/month</p>
          </div>
        </div>
      </div>
    </div>
  );
}
