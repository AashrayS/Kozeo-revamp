"use client";

import { useState } from "react";
import { theme } from "../../theme";
import { useRef, useEffect } from "react";
import { useNavigationLoader } from "../../components/common/useNavigationLoader";
import {
  loginUser,
  registerUser,
  verifyEmail,
  verifyOtp,
} from "../../../utilities/kozeoApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/userSlice";
import { useTheme } from "../../contexts/ThemeContext";
import { PageLoader } from "../../components/common/PageLoader";
import Image from "next/image";
import kozeoLogo from "/src/assets/kozeoLogo.png";

type SignupData = {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  confirmPassword: string;
  country_Code: string;
  role: string;
};

export default function LoginSignupPage() {
  const [showLogin, setShowLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { navigateWithLoader } = useNavigationLoader();
  const dispatch = useDispatch();
  const { theme: currentAppTheme } = useTheme();

  const isDark = currentAppTheme === "dark";
  const currentTheme = isDark ? theme.dark : theme.light;

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Signup state
  const [signupStep, setSignupStep] = useState(1);
  const [signupData, setSignupData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirmPassword: "",
    country_Code: "US",
    role: "freelancer",
  });
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Refs for autofocus
  const otpRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // Countdown for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  useEffect(() => {
    if (signupStep === 2 && otpRef.current) otpRef.current.focus();
    if (signupStep === 3 && nameRef.current) nameRef.current.focus();
    console.log("Signup step changed to:", signupStep);
  }, [signupStep]);

  return (
    <>
      {isLoading && (
        <PageLoader
          duration={2000}
          onComplete={() => setIsLoading(false)}
          useSlideAnimation={false}
        />
      )}

      <div
        className="flex w-full h-screen overflow-hidden md:flex-row transition-opacity duration-1000 relative bg-black"
        style={{
          fontFamily: currentTheme.fonts.base,
        }}
      >
        {/* Space Background - Same as Landing Page */}
        {/* Glow Effects */}
        <div className="fixed top-1/4 right-8 w-2 h-0 rounded-full opacity-90 bg-purple-500 shadow-[0_0_250px_100px_rgba(168,85,247,0.35)] pointer-events-none z-0" />
        <div className="fixed bottom-1/4 left-8 w-2 h-0 rounded-full opacity-90 bg-cyan-400 shadow-[0_0_250px_100px_rgba(34,211,238,0.35)] pointer-events-none z-0" />
        <div className="fixed top-2/3 right-1/3 w-2 h-0 rounded-full opacity-70 bg-emerald-400 shadow-[0_0_200px_80px_rgba(52,211,153,0.25)] pointer-events-none z-0" />

        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Static visible stars for immediate feedback */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-80 animate-pulse"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-60 left-1/3 w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"></div>

          {/* Twinkling Stars */}
          <div className="absolute inset-0">
            {/* Large Stars */}
            <div className="absolute top-20 left-20 w-1 h-1 bg-white rounded-full animate-pulse opacity-80"></div>
            <div
              className="absolute top-40 right-32 w-1 h-1 bg-white rounded-full animate-pulse opacity-60"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute top-60 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse opacity-70"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse opacity-90"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="absolute bottom-60 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse opacity-75"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse opacity-85"
              style={{ animationDelay: "2.5s" }}
            ></div>

            {/* Medium Stars */}
            <div
              className="absolute top-32 right-40 w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-60"
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className="absolute top-52 left-16 w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-50"
              style={{ animationDelay: "0.8s" }}
            ></div>
            <div
              className="absolute bottom-32 left-1/2 w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-70"
              style={{ animationDelay: "1.3s" }}
            ></div>
            <div
              className="absolute bottom-20 right-1/3 w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-55"
              style={{ animationDelay: "1.8s" }}
            ></div>
            <div
              className="absolute top-1/2 left-8 w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-65"
              style={{ animationDelay: "2.3s" }}
            ></div>

            {/* Small Stars */}
            <div
              className="absolute top-24 left-1/2 w-px h-px bg-white opacity-40 animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="absolute top-48 right-16 w-px h-px bg-white opacity-30 animate-pulse"
              style={{ animationDelay: "0.7s" }}
            ></div>
            <div
              className="absolute bottom-48 left-40 w-px h-px bg-white opacity-45 animate-pulse"
              style={{ animationDelay: "1.2s" }}
            ></div>
            <div
              className="absolute bottom-24 right-1/2 w-px h-px bg-white opacity-35 animate-pulse"
              style={{ animationDelay: "1.7s" }}
            ></div>
            <div
              className="absolute top-2/3 right-8 w-px h-px bg-white opacity-40 animate-pulse"
              style={{ animationDelay: "2.2s" }}
            ></div>
          </div>

          {/* Moving Stars */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 50 }, (_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  opacity: Math.random() * 0.5 + 0.3,
                  animation: `moveStars ${
                    15 + Math.random() * 25
                  }s linear infinite`,
                  animationDelay: `${Math.random() * 20}s`,
                }}
              />
            ))}
          </div>

          {/* Animated Lines */}
          <div className="absolute inset-0">
            {/* Horizontal Lines */}
            {/* <div
              className="absolute top-1/4 left-1/4 w-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30 max-w-md"
              style={{
                animation: "slideRight 4s infinite linear",
                animationDelay: "0s",
              }}
            ></div>
            <div
              className="absolute top-3/4 right-1/4 w-0 h-px bg-gradient-to-l from-transparent via-white to-transparent opacity-25 max-w-md"
              style={{
                animation: "slideLeft 5s infinite linear",
                animationDelay: "2s",
              }}
            ></div> */}
          </div>
        </div>

        <div className="md:w-full w-full flex flex-col items-center justify-items-start md:justify-center p-6 md:p-10 text-center relative z-10 text-white">
          {/* <p className="mb-4 md:mb-6 text-sm md:text-base" style={{}}>
            Get your hands dirty with real life projects
          </p> */}
          <div className="w-full sm:w-[90%] md:w-1/4 h-full relative flex flex-col items-center justify-center px-6 py-10 overflow-hidden bg-transparent  rounded-2xl ">
            {/* Kozeo Logo positioned directly above the form */}
            <div className="flex items-center mb-16">
              {/* Inline SVG logo for best theme compatibility */}
              <svg
                className="h-8 md:h-12 w-auto"
                viewBox="0 0 625 147"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ maxWidth: 200 }}
              >
                <path
                  d="M104.8 145H83.6L33 76.8L18.4 89.6V145H0.400001V2.19999H18.4V72.6C22.4 68.0667 26.4667 63.5333 30.6 59C34.7333 54.4667 38.8667 49.9333 43 45.4L81.6 2.19999H102.6L46 64.4L104.8 145ZM244.922 73.4C244.922 84.4667 243.522 94.5333 240.722 103.6C237.922 112.533 233.722 120.267 228.122 126.8C222.655 133.333 215.789 138.333 207.522 141.8C199.389 145.267 189.922 147 179.122 147C167.922 147 158.189 145.267 149.922 141.8C141.655 138.2 134.789 133.2 129.322 126.8C123.855 120.267 119.789 112.467 117.122 103.4C114.455 94.3333 113.122 84.2667 113.122 73.2C113.122 58.5333 115.522 45.7333 120.322 34.8C125.122 23.8667 132.389 15.3333 142.122 9.2C151.989 3.06666 164.389 -4.76837e-06 179.322 -4.76837e-06C193.589 -4.76837e-06 205.589 3.06666 215.322 9.2C225.055 15.2 232.389 23.7333 237.322 34.8C242.389 45.7333 244.922 58.6 244.922 73.4ZM132.122 73.4C132.122 85.4 133.789 95.7333 137.122 104.4C140.455 113.067 145.589 119.733 152.522 124.4C159.589 129.067 168.455 131.4 179.122 131.4C189.922 131.4 198.722 129.067 205.522 124.4C212.455 119.733 217.589 113.067 220.922 104.4C224.255 95.7333 225.922 85.4 225.922 73.4C225.922 55.4 222.189 41.3333 214.722 31.2C207.255 20.9333 195.455 15.8 179.322 15.8C168.522 15.8 159.589 18.1333 152.522 22.8C145.589 27.3333 140.455 33.9333 137.122 42.6C133.789 51.1333 132.122 61.4 132.122 73.4ZM361.819 145H262.819V131.4L338.019 18.2H265.219V2.19999H359.819V15.8L284.619 129H361.819V145ZM468.872 145H389.072V2.19999H468.872V18H407.072V62.6H465.272V78.2H407.072V129.2H468.872V145ZM624.805 73.4C624.805 84.4667 623.405 94.5333 620.605 103.6C617.805 112.533 613.605 120.267 608.005 126.8C602.538 133.333 595.671 138.333 587.405 141.8C579.271 145.267 569.805 147 559.005 147C547.805 147 538.071 145.267 529.805 141.8C521.538 138.2 514.671 133.2 509.205 126.8C503.738 120.267 499.671 112.467 497.005 103.4C494.338 94.3333 493.005 84.2667 493.005 73.2C493.005 58.5333 495.405 45.7333 500.205 34.8C505.005 23.8667 512.271 15.3333 522.005 9.2C531.871 3.06666 544.271 -4.76837e-06 559.205 -4.76837e-06C573.471 -4.76837e-06 585.471 3.06666 595.205 9.2C604.938 15.2 612.271 23.7333 617.205 34.8C622.271 45.7333 624.805 58.6 624.805 73.4ZM512.005 73.4C512.005 85.4 513.671 95.7333 517.005 104.4C520.338 113.067 525.471 119.733 532.405 124.4C539.471 129.067 548.338 131.4 559.005 131.4C569.805 131.4 578.605 129.067 585.405 124.4C592.338 119.733 597.471 113.067 600.805 104.4C604.138 95.7333 605.805 85.4 605.805 73.4C605.805 55.4 602.071 41.3333 594.605 31.2C587.138 20.9333 575.338 15.8 559.205 15.8C548.405 15.8 539.471 18.1333 532.405 22.8C525.471 27.3333 520.338 33.9333 517.005 42.6C513.671 51.1333 512.005 61.4 512.005 73.4Z"
                  fill="#fff"
                />
              </svg>
              <Image
                src={kozeoLogo}
                alt="Kozeo Logo"
                width={36}
                height={36}
                className="h-24 w-24 md:h-24 md:w-24 flex-shrink-0 object-contain ml-2"
              />
            </div>

            <div className="flex mb-6">
              <button
                onClick={() => setShowLogin(true)}
                className={`px-4 md:px-6 py-2 rounded-l-full font-medium transition text-sm md:text-base ${
                  showLogin ? "text-white" : "bg-gray-200 text-black"
                }`}
                style={showLogin ? { backgroundColor: "#10B981" } : {}}
              >
                Login
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className={`px-4 md:px-6 py-2 rounded-r-full font-medium transition text-sm md:text-base ${
                  !showLogin ? "text-white" : "bg-gray-200 text-black"
                }`}
                style={!showLogin ? { backgroundColor: "#10B981" } : {}}
              >
                Sign Up
              </button>
            </div>

            {/* Sliding Form Container */}
            <div className="relative w-full overflow-x-hidden sm:h-auto">
              <div
                className="w-full h-full flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(${showLogin ? "0%" : "-50%"})`,
                  width: "200%",
                }}
              >
                {/* Login Form */}
                <form className="w-full space-y-4 px-2 md:px-4">
                  <div>
                    <label
                      htmlFor="login-email"
                      className="block w-full text-left mb-1 text-sm font-medium text-white"
                    >
                      Email
                    </label>
                    <input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full p-3 rounded-md border transform focus:outline-none focus:ring-0 transition-all duration-300 focus:-translate-y-1 focus:shadow-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="login-password"
                      className="block w-full text-left mb-1 text-sm font-medium text-white"
                    >
                      Password
                    </label>
                    <input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full p-3 rounded-md border transform focus:outline-none focus:ring-0 transition-all duration-300 focus:-translate-y-1 focus:shadow-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-300"
                    />
                  </div>

                  {loginError && (
                    <p className="text-red-500 text-sm mb-4">{loginError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    onClick={async (e) => {
                      e.preventDefault();
                      setLoginError("");

                      if (!loginEmail || !loginPassword) {
                        setLoginError("Please fill in all fields");
                        return;
                      }

                      setIsLoggingIn(true);

                      try {
                        const response = await loginUser({
                          email: loginEmail,
                          password: loginPassword,
                        });

                        dispatch(
                          setUser({
                            user: {
                              ...(response as any).user,
                              email: loginEmail,
                            },
                            token: (response as any).token,
                          })
                        );

                        navigateWithLoader("/Atrium");
                      } catch (error: any) {
                        setLoginError(
                          error?.message || "Login failed. Please try again."
                        );
                      } finally {
                        setIsLoggingIn(false);
                      }
                    }}
                    className="w-full py-3 rounded-md text-white"
                    style={{ background: currentTheme.colors.primary }}
                  >
                    {isLoggingIn ? "Logging in..." : "Login"}
                  </button>
                </form>

                {/* Sign Up Form */}
                <form
                  className="w-full space-y-4 px-2 md:px-4"
                  onSubmit={(e) => e.preventDefault()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                >
                  {signupStep === 1 && (
                    <>
                      <div>
                        <label className="block w-full text-left mb-1 text-sm font-medium text-white">
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={signupData.email}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              email: e.target.value,
                            })
                          }
                          className="w-full p-3 rounded-md border transform focus:outline-none focus:ring-0 transition-all duration-300 focus:-translate-y-1 focus:shadow-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-300"
                        />
                      </div>
                      {emailError && (
                        <p className="text-red-500 text-sm">{emailError}</p>
                      )}
                      <button
                        type="button"
                        disabled={isSendingOtp}
                        className="w-full py-3 rounded-md text-white flex items-center justify-center"
                        style={{ background: currentTheme.colors.primary }}
                        onClick={async () => {
                          const valid = /\S+@\S+\.\S+/.test(signupData.email);
                          if (!valid) {
                            setEmailError("Please enter a valid email.");
                            return;
                          }
                          setEmailError("");
                          setIsSendingOtp(true);
                          try {
                            const res = await verifyEmail(signupData.email);
                            const result = Array.isArray(res) ? res[0] : res;
                            if (result && result.success) {
                              setSignupStep(2);
                              setResendCooldown(30);
                            } else {
                              setEmailError(
                                result?.message || "Failed to send OTP."
                              );
                            }
                          } catch (err) {
                            const errorMessage =
                              typeof err === "object" &&
                              err !== null &&
                              "message" in err
                                ? (err as any).message
                                : "Failed to send OTP.";
                            setEmailError(errorMessage);
                          } finally {
                            setIsSendingOtp(false);
                          }
                        }}
                      >
                        {isSendingOtp ? "Processing..." : "Continue"}
                      </button>
                    </>
                  )}

                  {signupStep === 2 && (
                    <>
                      <div>
                        <label
                          className="block w-full text-left mb-1 text-sm font-medium"
                          style={{ color: currentTheme.colors.text }}
                        >
                          Enter OTP
                        </label>
                        <p className="text-xs text-gray-500 mb-2">
                          For testing, use OTP: 123123
                        </p>
                        <input
                          ref={otpRef}
                          type="text"
                          placeholder="Enter OTP (Test: 123123)"
                          value={otp}
                          onChange={(e) => {
                            setOtp(e.target.value);
                            setOtpError("");
                          }}
                          className="w-full p-3 rounded-md border transform focus:outline-none focus:ring-0 transition-all duration-300 focus:-translate-y-1 focus:shadow-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-300"
                        />
                      </div>
                      {otpError && (
                        <p className="text-red-500 text-sm">{otpError}</p>
                      )}
                      <button
                        type="button"
                        className="w-full py-3 rounded-md text-white"
                        style={{ background: currentTheme.colors.primary }}
                        onClick={async () => {
                          setOtpError("");
                          if (!otp) {
                            setOtpError(
                              "Please enter the OTP sent to your email."
                            );
                            return;
                          }
                          try {
                            const res = await verifyOtp(signupData.email, otp);
                            if (res.success) {
                              setSignupStep(3);
                              setOtpError("");
                            } else {
                              setOtpError(res.message || "Invalid OTP.");
                            }
                          } catch (err) {
                            setOtpError(
                              typeof err === "object" &&
                                err !== null &&
                                "message" in err
                                ? (err as any).message
                                : "OTP verification failed."
                            );
                          }
                        }}
                      >
                        Verify OTP
                      </button>

                      <div className="mt-2 text-center">
                        <button
                          type="button"
                          className="underline text-blue-400"
                          disabled={isSendingOtp || resendCooldown > 0}
                          onClick={async () => {
                            setIsSendingOtp(true);
                            try {
                              const res = await verifyEmail(signupData.email);
                              const result = Array.isArray(res) ? res[0] : res;
                              if (result && result.success) {
                                setResendCooldown(30);
                              } else {
                                setOtpError(
                                  result?.message || "Failed to resend OTP."
                                );
                              }
                            } catch (err) {
                              setOtpError(
                                typeof err === "object" &&
                                  err !== null &&
                                  "message" in err
                                  ? (err as any).message
                                  : "Failed to resend OTP."
                              );
                            } finally {
                              setIsSendingOtp(false);
                            }
                          }}
                        >
                          Resend OTP
                        </button>
                        {resendCooldown > 0 && (
                          <span className="ml-2 text-gray-400">
                            Wait {resendCooldown}s
                          </span>
                        )}
                      </div>
                    </>
                  )}

                  {signupStep === 3 && (
                    <>
                      <div>
                        <label className="block w-full text-left mb-1 text-sm font-medium text-white">
                          First Name
                        </label>
                        <input
                          ref={nameRef}
                          type="text"
                          placeholder="John"
                          value={signupData.first_name}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              first_name: e.target.value,
                            })
                          }
                          className="w-full p-3 rounded-md border transform focus:outline-none focus:ring-0 transition-all duration-300 focus:-translate-y-1 focus:shadow-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-300"
                        />
                      </div>

                      <div>
                        <label className="block w-full text-left mb-1 text-sm font-medium text-white">
                          Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Doe"
                          value={signupData.last_name}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              last_name: e.target.value,
                            })
                          }
                          className="w-full p-3 rounded-md border transform focus:outline-none focus:ring-0 transition-all duration-300 focus:-translate-y-1 focus:shadow-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-300"
                        />
                      </div>

                      <div>
                        <label className="block w-full text-left mb-1 text-sm font-medium text-white">
                          Username
                        </label>
                        <input
                          type="text"
                          placeholder="johndoe"
                          value={signupData.username}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              username: e.target.value,
                            })
                          }
                          className="w-full p-3 rounded-md border transform focus:outline-none focus:ring-0 transition-all duration-300 focus:-translate-y-1 focus:shadow-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-300"
                        />
                      </div>

                      <div>
                        <label className="block w-full text-left mb-1 text-sm font-medium text-white">
                          Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter your password"
                          value={signupData.password}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              password: e.target.value,
                            })
                          }
                          className="w-full p-3 rounded-md border transform focus:outline-none focus:ring-0 transition-all duration-300 focus:-translate-y-1 focus:shadow-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-300"
                        />
                      </div>

                      <div>
                        <label className="block w-full text-left mb-1 text-sm font-medium text-white">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          placeholder="Confirm your password"
                          value={signupData.confirmPassword}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="w-full p-3 rounded-md border transform focus:outline-none focus:ring-0 transition-all duration-300 focus:-translate-y-1 focus:shadow-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-300"
                        />
                      </div>

                      {signupError && (
                        <p className="text-red-500 text-sm">{signupError}</p>
                      )}

                      <button
                        type="submit"
                        disabled={isSigningUp}
                        onClick={async (e) => {
                          e.preventDefault();
                          setSignupError("");

                          if (
                            !signupData.first_name ||
                            !signupData.last_name ||
                            !signupData.username ||
                            !signupData.password
                          ) {
                            setSignupError("Please fill in all fields");
                            return;
                          }

                          if (
                            signupData.password !== signupData.confirmPassword
                          ) {
                            setSignupError("Passwords do not match");
                            return;
                          }

                          if (signupData.password.length < 6) {
                            setSignupError(
                              "Password must be at least 6 characters"
                            );
                            return;
                          }

                          setIsSigningUp(true);

                          try {
                            const response = await registerUser({
                              first_name: signupData.first_name,
                              last_name: signupData.last_name,
                              email: signupData.email,
                              username: signupData.username,
                              password: signupData.password,
                              country_Code: signupData.country_Code,
                              role: signupData.role,
                            });

                            dispatch(
                              setUser({
                                user: {
                                  ...(response as any).user,
                                  email: signupData.email,
                                  first_name: signupData.first_name,
                                  last_name: signupData.last_name,
                                  username: signupData.username,
                                },
                                token: (response as any).token,
                              })
                            );

                            navigateWithLoader("/profile/setupprofile");
                          } catch (error: any) {
                            setSignupError(
                              error?.message ||
                                "Registration failed. Please try again."
                            );
                          } finally {
                            setIsSigningUp(false);
                          }
                        }}
                        className="w-full py-3 rounded-md text-white"
                        style={{ background: currentTheme.colors.primary }}
                      >
                        {isSigningUp
                          ? "Creating Account..."
                          : "Complete Sign Up"}
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
