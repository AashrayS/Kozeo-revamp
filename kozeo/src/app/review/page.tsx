"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";

interface GigInfo {
  Title: string;
  host: string;
  gigId: string;
  collaborator: string;
}

export default function ReviewPage() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [gigInfo, setGigInfo] = useState<GigInfo | null>(null);

  useEffect(() => {
    // In a real app, you'd get this from URL params or context
    // For now, we'll use mock data
    setGigInfo({
      Title: "Real-time Collaboration Platform",
      host: "@uxwizard",
      gigId: "3",
      collaborator: "@developer123",
    });
  }, []);

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
  };

  const handleStarHover = (starValue: number) => {
    setHoverRating(starValue);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !review.trim()) {
      alert("Please provide both a rating and review");
      return;
    }

    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/gigs");
      }, 3000);
    }, 1500);
  };

  if (submitted) {
    return (
      <>
        <Header logoText="Kozeo" />
        <div className="min-h-screen relative z-10 flex flex-row bg-[radial-gradient(circle_at_center,_rgba(17,17,17,0.8),_rgba(0,0,0,0.6))] text-white">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-0 sm:p-8 flex flex-col items-center sm:justify-center">
              <div className="w-full h-screen sm:h-auto max-w-2xl bg-transparent rounded-none sm:rounded-2xl border-0 sm:border border-neutral-800 shadow-none sm:shadow-xl p-4 sm:p-8 md:p-12 flex flex-col gap-6 sm:gap-8 drop-shadow-none sm:drop-shadow-glow backdrop-blur-none sm:backdrop-blur-md justify-center items-center text-center">
                <div className="text-6xl mb-4">✅</div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                  Review Submitted!
                </h1>
                <p className="text-gray-300 text-lg mb-4">
                  Thank you for your feedback. You'll be redirected to the gigs
                  page shortly.
                </p>
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div
                    className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </main>
          </div>
          {/* Glows */}
          <div className="fixed top-56 right-4 w-2 h-0 rounded-full opacity-90 bg-purple-500 shadow-[0_0_250px_100px_rgba(168,85,247,0.35)] pointer-events-none z-0" />
          <div className="fixed bottom-4 left-4 w-2 h-0 rounded-full opacity-90 bg-cyan-400 shadow-[0_0_250px_100px_rgba(34,211,238,0.35)] pointer-events-none z-0" />
        </div>
      </>
    );
  }

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
                Review Your Collaboration
              </h1>

              {/* Gig Info */}
              {gigInfo && (
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 sm:p-6">
                  <h2 className="text-lg font-semibold text-white mb-3">
                    Gig Details
                  </h2>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-400">Project: </span>
                      <span className="text-white">{gigInfo.Title}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Working with: </span>
                      <span className="text-cyan-400">
                        {gigInfo.collaborator}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Host: </span>
                      <span className="text-cyan-400">{gigInfo.host}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Rating Section */}
              <div className="space-y-3">
                <label className="block text-white font-medium text-base sm:text-lg">
                  Rate Your Experience
                </label>
                <div className="flex gap-2 justify-center sm:justify-start">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={handleStarLeave}
                      className="text-3xl transition-colors duration-200 focus:outline-none"
                    >
                      <FaStar
                        className={`${
                          star <= (hoverRating || rating)
                            ? "text-yellow-400"
                            : "text-gray-600"
                        } hover:text-yellow-300`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-gray-400 text-center sm:text-left">
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Good"}
                    {rating === 4 && "Very Good"}
                    {rating === 5 && "Excellent"}
                  </p>
                )}
              </div>

              {/* Review Text Area */}
              <div className="space-y-3">
                <label className="block text-white font-medium text-base sm:text-lg">
                  Share Your Experience
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Tell others about your collaboration experience..."
                  rows={6}
                  className="w-full px-4 sm:px-5 py-3 rounded-xl bg-neutral-900/70 border border-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-700 text-base sm:text-lg resize-none"
                  required
                />
                <p className="text-xs text-gray-500">
                  {review.length}/500 characters
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || !rating || !review.trim()}
                className="w-full py-3 rounded-xl bg-neutral-900/80 text-white font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-base sm:text-lg shadow-none border border-neutral-800 mt-2"
              >
                {submitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting Review...
                  </div>
                ) : (
                  "Submit Review"
                )}
              </button>

              {/* Skip Option */}
              {/* <button
                type="button"
                onClick={() => router.push("/gigs")}
                className="w-full py-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                Skip for now
              </button> */}
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
