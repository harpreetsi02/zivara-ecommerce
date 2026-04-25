"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { otpAPI } from "@/utils/api";
import { useRouter } from "next/navigation";
import { lemonMilk } from "@/app/fonts";

export default function LoginPage() {
  const { login, register } = useAuth();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1); // 1=form, 2=otp
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (key, val) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  // Step 1 — Send OTP
  const handleSendOtp = async () => {
    if (!form.phone) { setError("Please enter phone number"); return; }
    setError("");
    setLoading(true);
    try {
      await otpAPI.sendOtp(form.phone);
      setStep(2);
      setOtpSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — Verify OTP then Register
  const handleVerifyAndRegister = async () => {
    if (!otp || otp.length !== 6) { setError("Enter 6 digit OTP"); return; }
    setError("");
    setLoading(true);
    try {
      // Pehle OTP verify karo
      await otpAPI.verifyOtp(form.phone, otp);
      // Phir register karo
      await register(form.name, form.email, form.password, form.phone);
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Login
  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 min-h-screen bg-white flex flex-col">

      {/* Header */}
      <div className="text-center py-8 border-b border-gray-100">
        <h1 className={`${lemonMilk.className} text-2xl`}>
          <span className="text-4xl">Z</span>ivara
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          {isLogin ? "Welcome back!" : step === 1 ? "Create your account" : "Verify your number"}
        </p>
      </div>

      <div className="px-6 py-8 flex-1">

        {/* Toggle — sirf login/register pe */}
        {step === 1 && (
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
            <button
              onClick={() => { setIsLogin(true); setError(""); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isLogin ? "bg-white text-black shadow-sm" : "text-gray-400"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(""); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                !isLogin ? "bg-white text-black shadow-sm" : "text-gray-400"
              }`}
            >
              Register
            </button>
          </div>
        )}

        {/* LOGIN FORM */}
        {isLogin && (
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-400 mb-1.5">Email</p>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-300"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1.5">Password</p>
              <input
                type="password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-300"
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <p className="text-xs text-red-500">{error}</p>
              </div>
            )}
            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full py-3.5 rounded-2xl text-sm font-semibold text-white mt-2 ${
                loading ? "bg-gray-300" : "bg-black"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        )}

        {/* REGISTER — STEP 1 */}
        {!isLogin && step === 1 && (
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-400 mb-1.5">Full Name</p>
              <input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-300"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1.5">Email</p>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-300"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1.5">Password</p>
              <input
                type="password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Min 8 characters"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-300"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1.5">Mobile Number</p>
              <div className="flex gap-2">
                <div className="bg-gray-100 border border-gray-200 rounded-xl px-3 flex items-center">
                  <span className="text-sm text-gray-600">🇮🇳 +91</span>
                </div>
                <input
                  type="tel"
                  value={form.phone.replace("+91", "")}
                  onChange={(e) => handleChange("phone", `+91${e.target.value}`)}
                  placeholder="10 digit number"
                  maxLength={10}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-300"
                />
              </div>
            </div>
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <p className="text-xs text-red-500">{error}</p>
              </div>
            )}
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className={`w-full py-3.5 rounded-2xl text-sm font-semibold text-white mt-2 ${
                loading ? "bg-gray-300" : "bg-black"
              }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        )}

        {/* REGISTER — STEP 2 OTP */}
        {!isLogin && step === 2 && (
          <div className="space-y-4">

            {/* Info */}
            <div className="bg-green-50 border border-green-100 rounded-2xl px-4 py-4 text-center">
              <i className="ri-message-line text-green-500 text-2xl mb-2 block"></i>
              <p className="text-sm font-medium text-green-700">OTP Sent!</p>
              <p className="text-xs text-green-500 mt-1">
                We sent a 6-digit code to {form.phone}
              </p>
            </div>

            {/* OTP Input */}
            <div>
              <p className="text-xs text-gray-400 mb-1.5">Enter OTP</p>
              <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                placeholder="6 digit OTP"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-300 text-center tracking-widest font-semibold"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <p className="text-xs text-red-500">{error}</p>
              </div>
            )}

            <button
              onClick={handleVerifyAndRegister}
              disabled={loading}
              className={`w-full py-3.5 rounded-2xl text-sm font-semibold text-white ${
                loading ? "bg-gray-300" : "bg-black"
              }`}
            >
              {loading ? "Verifying..." : "Verify & Create Account"}
            </button>

            {/* Resend */}
            <button
              onClick={handleSendOtp}
              className="w-full py-2 text-xs text-gray-400 underline"
            >
              Resend OTP
            </button>

            {/* Back */}
            <button
              onClick={() => { setStep(1); setOtp(""); setError(""); }}
              className="w-full py-2 text-xs text-gray-400"
            >
              ← Change number
            </button>

          </div>
        )}

      </div>
    </div>
  );
}