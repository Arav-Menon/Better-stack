"use client";

import { useState, useEffect } from "react";
import {
  Edit,
  Save,
  X,
  User,
  Mail,
  Phone,
  Building,
  AwardIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import axios from "axios";
import { API_URL } from "@/utils/api";

interface UserProfile {
  fullName: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export function ProfileInformation() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>();
  const [editedProfile, setEditedProfile] = useState<UserProfile>({
    fullName: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/user/profile`, {
        headers: {
          Authorization: token ? token : "",
        },
      });

      if (response.status == 200 && response.data) {
        setEditedProfile(response.data);
        setProfile(response.data);
      }
    };
    getProfile();
  }, []);

  useEffect(() => {
    const updateProfile = async () => {
      if (!isEditing) {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/user/profile`, {
          headers: {
            Authorization: token ? token : "",
          },
        });

        if (response.status == 200 && response.data) {
          setEditedProfile(response.data);
          setProfile(response.data);
        }
      }
    };
    updateProfile();
  })

  const handleEdit = () => {
    setEditedProfile(profile!);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (
      editedProfile.password &&
      editedProfile.password !== editedProfile.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile!);
    setIsEditing(false);
  };

  return (
    <Card className="bg-[#0c0c0c] border-border">
      <CardHeader>
        <CardTitle className="text-[#fff] flex items-center justify-between">
          Personal Information
          {!isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="border-border"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-primary text-primary-foreground"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="border-border"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="flex items-center text-[#fff]">
              <User className="w-4 h-4 mr-2" />
              Full Name
            </label>
            {isEditing ? (
              <input
                id="fullName"
                value={editedProfile.fullName}
                onChange={(e) =>
                  setEditedProfile({
                    ...editedProfile,
                    fullName: e.target.value,
                  })
                }
                className="bg-input border-border"
              />
            ) : (
              <p className="text-[#fff] py-2">{profile?.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="flex items-center text-[#fff]">
              <Mail className="w-4 h-4 mr-2" />
              Email Address
            </label>
            {isEditing ? (
              <input
                id="email"
                type="email"
                value={editedProfile.email}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, email: e.target.value })
                }
                className="bg-input border-border"
              />
            ) : (
              <p className="text-[#fff] py-2">{profile?.email}</p>
            )}
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <label
              htmlFor="companyName"
              className="flex items-center text-[#fff]"
            >
              <Building className="w-4 h-4 mr-2" />
              Company Name
            </label>
            {isEditing ? (
              <input
                id="companyName"
                value={editedProfile.companyName}
                onChange={(e) =>
                  setEditedProfile({
                    ...editedProfile,
                    companyName: e.target.value,
                  })
                }
                className="bg-input border-border"
              />
            ) : (
              <p className="text-[#fff] py-2">{profile?.companyName}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label
              htmlFor="phoneNumber"
              className="flex items-center text-[#fff]"
            >
              <Phone className="w-4 h-4 mr-2" />
              Phone Number
            </label>
            {isEditing ? (
              <input
                id="phoneNumber"
                value={editedProfile.phoneNumber}
                onChange={(e) =>
                  setEditedProfile({
                    ...editedProfile,
                    phoneNumber: e.target.value,
                  })
                }
                className="bg-input border-border"
              />
            ) : (
              <p className="text-[#fff] py-2">{profile?.phoneNumber}</p>
            )}
          </div>
        </div>

        {/* Password Section - Only shown when editing */}
        {isEditing && (
          <div className="border-t border-border pt-6">
            <h4 className="text-sm font-medium text-[#fff] mb-4">
              Change Password
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="password">New Password</label>
                <input
                  id="password"
                  type="password"
                  value={editedProfile.password}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      password: e.target.value,
                    })
                  }
                  placeholder="Leave blank to keep current password"
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={editedProfile.confirmPassword}
                  onChange={(e: any) =>
                    setEditedProfile({
                      ...editedProfile,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm new password"
                  className="bg-input border-border"
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
