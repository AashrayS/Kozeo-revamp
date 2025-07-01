"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { theme } from "../../../../theme";
import InputField from "../../../../components/common/InputField";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { FaCamera, FaUpload, FaTimes } from "react-icons/fa";

export default function EditProfilePage() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;
  const isDark = true;
  const currentTheme = isDark ? theme.dark : theme.light;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    first_name: "John",
    last_name: "Doe",
    phone: "",
    country_code: "",
    bio: "Welcome to my profile! I'm an active member of the Kozeo community.",
    resume: "",
    links: [{ website: "", url: "" }],
    password: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryCodes = [
    { code: "+91", name: "India" },
    { code: "+1", name: "USA" },
    { code: "+44", name: "UK" },
    { code: "+81", name: "Japan" },
    { code: "+61", name: "Australia" },
  ];

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file");
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password && form.password !== form.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Profile data to save:", { ...form, profileImage });
      alert("Profile updated successfully!");
      router.push(`/profile/${username}`);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header logoText="Kozeo" />
      <div className="fixed top-56 right-4 w-2 h-0 rounded-full opacity-90 bg-purple-500 shadow-[0_0_250px_100px_rgba(168,85,247,0.35)] pointer-events-none z-0" />
      <div className="fixed bottom-4 left-4 w-2 h-0 rounded-full opacity-90 bg-cyan-400 shadow-[0_0_250px_100px_rgba(34,211,238,0.35)] pointer-events-none z-0" />

      {/* Main Layout */}
      <div className="min-h-screen relative z-10 flex flex-row bg-[radial-gradient(circle_at_center,_rgba(17,17,17,0.8),_rgba(0,0,0,0.6))] text-white">
        <Sidebar />
        <div className="flex flex-1">
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="w-full max-w-3xl mx-auto">
              <form
                onSubmit={handleSubmit}
                className="space-y-8 rounded-lg shadow-lg p-8 border border-gray-700"
              >
                <h1 className="text-4xl font-bold text-white text-center mb-6">
                  Edit Profile
                </h1>

                {/* Profile Picture Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-300 border-b border-gray-600 pb-2">
                    Profile Picture
                  </h2>

                  <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-6">
                    {/* Avatar Display */}
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-4xl font-bold">
                            {username ? username.charAt(0).toUpperCase() : "U"}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-2 right-2 w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-full flex items-center justify-center transition-colors border-2 border-neutral-600"
                      >
                        <FaCamera className="text-white text-sm" />
                      </button>
                    </div>

                    {/* Upload Section */}
                    <div className="flex-1 w-full">
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                          isDragging
                            ? "border-cyan-400 bg-cyan-400/10"
                            : "border-neutral-600 hover:border-neutral-500"
                        }`}
                      >
                        <FaUpload className="mx-auto text-gray-400 text-2xl mb-3" />
                        <p className="text-gray-300 mb-2">
                          Drag and drop your image here
                        </p>
                        <p className="text-gray-500 text-sm mb-4">or</p>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors text-sm font-medium"
                        >
                          Browse Files
                        </button>
                      </div>

                      {profileImage && (
                        <div className="flex gap-3 mt-4">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors text-sm font-medium"
                          >
                            Change Photo
                          </button>
                          <button
                            type="button"
                            onClick={() => setProfileImage(null)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
                          >
                            <FaTimes className="text-xs" />
                            Remove Photo
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>

                {/* Personal Details */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-300 border-b border-gray-600 pb-2">
                    Personal Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      placeholder="First Name"
                      value={form.first_name}
                      onChange={(e) =>
                        setForm({ ...form, first_name: e.target.value })
                      }
                      style={baseInputStyle(currentTheme)}
                    />
                    <InputField
                      placeholder="Last Name"
                      value={form.last_name}
                      onChange={(e) =>
                        setForm({ ...form, last_name: e.target.value })
                      }
                      style={baseInputStyle(currentTheme)}
                    />
                  </div>

                  <div>
                    <textarea
                      placeholder="Bio"
                      value={form.bio}
                      onChange={(e) =>
                        setForm({ ...form, bio: e.target.value })
                      }
                      rows={4}
                      className="w-full p-3 rounded-md border resize-none"
                      style={baseInputStyle(currentTheme)}
                    />
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-300 border-b border-gray-600 pb-2">
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      style={baseInputStyle(currentTheme)}
                    />
                    <select
                      value={form.country_code}
                      onChange={(e) =>
                        setForm({ ...form, country_code: e.target.value })
                      }
                      className="p-3 rounded-md border"
                      style={baseInputStyle(currentTheme)}
                    >
                      <option value="">Select Country Code</option>
                      {countryCodes.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.name} ({item.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Security */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-300 border-b border-gray-600 pb-2">
                    Security
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      type="password"
                      placeholder="New Password (leave empty to keep current)"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      style={baseInputStyle(currentTheme)}
                    />
                    <InputField
                      type="password"
                      placeholder="Confirm New Password"
                      value={form.confirmPassword}
                      onChange={(e) =>
                        setForm({ ...form, confirmPassword: e.target.value })
                      }
                      style={baseInputStyle(currentTheme)}
                    />
                  </div>
                </div>

                {/* Professional Details */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-300 border-b border-gray-600 pb-2">
                    Professional Details
                  </h2>

                  <InputField
                    type="url"
                    placeholder="Resume Link"
                    value={form.resume}
                    onChange={(e) =>
                      setForm({ ...form, resume: e.target.value })
                    }
                    style={baseInputStyle(currentTheme)}
                  />

                  <div className="space-y-3">
                    <label className="text-white block">Relevant Links</label>
                    {form.links.map((link, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <InputField
                          placeholder="Website"
                          value={link.website}
                          onChange={(e) => {
                            const updated = [...form.links];
                            updated[idx].website = e.target.value;
                            setForm({ ...form, links: updated });
                          }}
                          className="w-[40%]"
                          style={baseInputStyle(currentTheme)}
                        />
                        <InputField
                          type="url"
                          placeholder="URL"
                          value={link.url}
                          onChange={(e) => {
                            const updated = [...form.links];
                            updated[idx].url = e.target.value;
                            setForm({ ...form, links: updated });
                          }}
                          className="w-[50%]"
                          style={baseInputStyle(currentTheme)}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...form.links];
                            updated.splice(idx, 1);
                            setForm({ ...form, links: updated });
                          }}
                          className="text-red-400 font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="w-full py-2 text-white rounded-md"
                      style={{ background: currentTheme.colors.primary }}
                      onClick={() =>
                        setForm({
                          ...form,
                          links: [...form.links, { website: "", url: "" }],
                        })
                      }
                    >
                      + Add Link
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-end">
                  <button
                    type="button"
                    onClick={() => router.push(`/profile/${username}`)}
                    className="px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 text-lg font-semibold rounded-md transition-all duration-200 shadow-md border hover:shadow-lg"
                    style={{
                      background: isSubmitting ? "#666" : "#1f1f1f",
                      color: "#f5f5f5",
                      border: "1px solid #333",
                      opacity: isSubmitting ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.background = "#f5f5f5";
                        e.currentTarget.style.color = "#000";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.background = "#1f1f1f";
                        e.currentTarget.style.color = "#f5f5f5";
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

// Helper style generator
function baseInputStyle(currentTheme: any) {
  return {
    background: currentTheme.colors.input,
    borderColor: currentTheme.colors.border,
    color: currentTheme.colors.text,
  };
}
