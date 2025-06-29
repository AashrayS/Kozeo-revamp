"use client";
import React, { useState } from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { useRouter } from "next/navigation";

export default function CreateGigPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    Title: "",
    Looking_For: "",
    Description: "",
    Skills: "",
    currency: "USD",
    Amount: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [createdGig, setCreatedGig] = useState<any>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const gig = { ...form, host: "@uxwizard" };
      setCreatedGig(gig);
      localStorage.setItem("kozeo_gig_lobby", JSON.stringify(gig));
      router.push("/gigs/lobby");
    }, 1200);
  };

  return (
    <>
      <Header logoText="Kozeo" />
      <div className="min-h-screen relative z-10 flex flex-row bg-[radial-gradient(circle_at_center,_rgba(17,17,17,0.8),_rgba(0,0,0,0.6))] text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-0 sm:p-8 flex flex-col items-center sm:justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-full h-screen sm:h-auto max-w-2xl bg-transparent rounded-none sm:rounded-2xl border-0 sm:border border-neutral-800 shadow-none sm:shadow-xl p-4 sm:p-8 md:p-12 flex flex-col gap-6 sm:gap-8 drop-shadow-none sm:drop-shadow-glow backdrop-blur-none sm:backdrop-blur-md justify-start"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center tracking-tight">
                Create a New Gig
              </h1>
              <input
                name="Title"
                value={form.Title}
                onChange={handleChange}
                placeholder="Gig Title"
                className="w-full px-4 sm:px-5 py-3 rounded-xl bg-neutral-900/70 border border-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-700 text-base sm:text-lg"
                required
              />
              <input
                name="Looking_For"
                value={form.Looking_For}
                onChange={handleChange}
                placeholder="Looking For (e.g. React Developer)"
                className="w-full px-4 sm:px-5 py-3 rounded-xl bg-neutral-900/70 border border-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-700 text-base sm:text-lg"
                required
              />
              <textarea
                name="Description"
                value={form.Description}
                onChange={handleChange}
                placeholder="Description"
                rows={4}
                className="w-full px-4 sm:px-5 py-3 rounded-xl bg-neutral-900/70 border border-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-700 text-base sm:text-lg"
                required
              />
              <input
                name="Skills"
                value={form.Skills}
                onChange={handleChange}
                placeholder="Skills (comma separated)"
                className="w-full px-4 sm:px-5 py-3 rounded-xl bg-neutral-900/70 border border-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-700 text-base sm:text-lg"
                required
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  name="currency"
                  value={form.currency}
                  onChange={handleSelectChange}
                  className="px-4 sm:px-5 py-3 rounded-xl bg-neutral-900/70 border border-neutral-800 text-white focus:outline-none text-base sm:text-lg"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
                <input
                  name="Amount"
                  value={form.Amount}
                  onChange={handleChange}
                  placeholder="Amount"
                  type="number"
                  min="0"
                  className="flex-1 px-4 sm:px-5 py-3 rounded-xl bg-neutral-900/70 border border-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-700 text-base sm:text-lg"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-neutral-900/80 text-white font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-60 text-base sm:text-lg shadow-none border border-neutral-800 mt-2"
              >
                {submitting ? "Creating..." : "Create Gig"}
              </button>
            </form>
          </main>
        </div>
        {/* Glows */}
        <div className="fixed top-56 right-4 w-2 h-0 rounded-full opacity-90 bg-purple-500 shadow-[0_0_250px_100px_rgba(168,85,247,0.35)] pointer-events-none z-0" />
        <div className="fixed bottom-4 left-4 w-2 h-0 rounded-full opacity-90 bg-cyan-400 shadow-[0_0_250px_100px_rgba(34,211,238,0.35)] pointer-events-none z-0" />
      </div>
    </>
  );
}
