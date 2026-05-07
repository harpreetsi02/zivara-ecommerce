// "use client";

// import { useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { otpAPI } from "@/utils/api";
// import { useRouter } from "next/navigation";
// import { lemonMilk } from "@/app/fonts";

// export default function LoginPage() {
//   const { login, register } = useAuth();
//   const router = useRouter();

//   const [isLogin, setIsLogin] = useState(true);
//   const [step, setStep] = useState(1); // 1=form, 2=otp
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [otp, setOtp] = useState("");

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (key, val) =>
//     setForm((prev) => ({ ...prev, [key]: val }));

//   // Step 1 — Send OTP
//   const handleSendOtp = async () => {
//     if (!form.name || !form.email || !form.password) {
//       setError("Please fill all fields"); return;
//     }
//     if (form.password.length < 8) {
//       setError("Password must be at least 8 characters"); return;
//     }
//     setError("");
//     setLoading(true);
//     try {
//       await otpAPI.sendOtp(form.email);
//       setStep(2);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 2 — Verify OTP then Register
//   const handleVerifyAndRegister = async () => {
//     if (!otp || otp.length !== 6) {
//       setError("Enter 6 digit OTP"); return;
//     }
//     setError("");
//     setLoading(true);
//     try {
//       await otpAPI.verifyOtp(form.email, otp);
//       await register(form.name, form.email, form.password);
//       router.push("/");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Login
//   const handleLogin = async () => {
//     if (!form.email || !form.password) {
//       setError("Please fill all fields"); return;
//     }
//     setError("");
//     setLoading(true);
//     try {
//       await login(form.email, form.password);
//       router.push("/");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mt-16 min-h-screen bg-white flex flex-col">

//       {/* Header */}
//       <div className="text-center py-8 border-b border-gray-100">
//         <h1 className={`${lemonMilk.className} text-xl flex items-center justify-center text-black`}>
//           <span className="text-4xl">Z</span>ivara
//         </h1>
//         <p className="text-xs text-gray-400 mt-1">
//           {isLogin ? "Welcome back!" : step === 1 ? "Create your account" : "Verify your email"}
//         </p>
//       </div>

//       <div className="px-6 py-8 flex-1">

//         {/* Toggle */}
//         {(isLogin || step === 1) && (
//           <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
//             <button
//               onClick={() => { setIsLogin(true); setError(""); setStep(1); }}
//               className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
//                 isLogin ? "bg-white text-black shadow-sm" : "text-gray-400"
//               }`}
//             >
//               Login
//             </button>
//             <button
//               onClick={() => { setIsLogin(false); setError(""); setStep(1); }}
//               className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
//                 !isLogin ? "bg-white text-black shadow-sm" : "text-gray-400"
//               }`}
//             >
//               Register
//             </button>
//           </div>
//         )}

//         {/* LOGIN */}
//         {isLogin && (
//           <div className="space-y-4">
//             <div>
//               <p className="text-xs text-gray-400 mb-1.5">Email</p>
//               <input
//                 type="email"
//                 value={form.email}
//                 onChange={(e) => handleChange("email", e.target.value)}
//                 placeholder="Enter your email"
//                 className="w-full border placeholder:text-gray-400 text-gray-500 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-300"
//               />
//             </div>
//             <div>
//               <p className="text-xs text-gray-400 mb-1.5">Password</p>
//               <input
//                 type="password"
//                 value={form.password}
//                 onChange={(e) => handleChange("password", e.target.value)}
//                 placeholder="Enter your password"
//                 className="w-full border placeholder:text-gray-400 text-gray-500 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-300"
//                 onKeyDown={(e) => e.key === "Enter" && handleLogin()}
//               />
//             </div>
//             {error && (
//               <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
//                 <p className="text-xs text-red-500">{error}</p>
//               </div>
//             )}
//             <button
//               onClick={handleLogin}
//               disabled={loading}
//               className={`w-full py-3.5 rounded-2xl text-sm font-semibold text-white mt-2 ${
//                 loading ? "bg-gray-300" : "bg-black"
//               }`}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </div>
//         )}

//         {/* REGISTER STEP 1 */}
//         {!isLogin && step === 1 && (
//           <div className="space-y-4">
//             <div>
//               <p className="text-xs text-gray-400 mb-1.5">Full Name</p>
//               <input
//                 value={form.name}
//                 onChange={(e) => handleChange("name", e.target.value)}
//                 placeholder="Enter your name"
//                 className="w-full border placeholder:text-gray-400 text-gray-500 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-300"
//               />
//             </div>
//             <div>
//               <p className="text-xs text-gray-400 mb-1.5">Email</p>
//               <input
//                 type="email"
//                 value={form.email}
//                 onChange={(e) => handleChange("email", e.target.value)}
//                 placeholder="Enter your email"
//                 className="w-full border placeholder:text-gray-400 text-gray-500 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-300"
//               />
//             </div>
//             <div>
//               <p className="text-xs text-gray-400 mb-1.5">Password</p>
//               <input
//                 type="password"
//                 value={form.password}
//                 onChange={(e) => handleChange("password", e.target.value)}
//                 placeholder="Min 8 characters"
//                 className="w-full border placeholder:text-gray-400 text-gray-500 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-300"
//               />
//             </div>
//             {error && (
//               <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
//                 <p className="text-xs text-red-500">{error}</p>
//               </div>
//             )}
//             <button
//               onClick={handleSendOtp}
//               disabled={loading}
//               className={`w-full py-3.5 rounded-2xl text-sm font-semibold text-white mt-2 ${
//                 loading ? "bg-gray-300" : "bg-black"
//               }`}
//             >
//               {loading ? "Sending OTP..." : "Send OTP to Email"}
//             </button>
//           </div>
//         )}

//         {/* REGISTER STEP 2 — OTP */}
//         {!isLogin && step === 2 && (
//           <div className="space-y-4">

//             <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-4 text-center">
//               <i className="ri-mail-send-line text-blue-500 text-2xl mb-2 block"></i>
//               <p className="text-sm font-medium text-blue-700">Check your email!</p>
//               <p className="text-xs text-blue-400 mt-1">
//                 OTP sent to <span className="font-semibold">{form.email}</span>
//               </p>
//             </div>

//             <div>
//               <p className="text-xs text-gray-400 mb-1.5">Enter 6-digit OTP</p>
//               <input
//                 type="number"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value.slice(0, 6))}
//                 placeholder="• • • • • •"
//                 className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center tracking-widest text-xl font-semibold outline-none focus:border-pink-300"
//               />
//             </div>

//             {error && (
//               <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
//                 <p className="text-xs text-red-500">{error}</p>
//               </div>
//             )}

//             <button
//               onClick={handleVerifyAndRegister}
//               disabled={loading}
//               className={`w-full py-3.5 rounded-2xl text-sm font-semibold text-white ${
//                 loading ? "bg-gray-300" : "bg-black"
//               }`}
//             >
//               {loading ? "Verifying..." : "Verify & Create Account"}
//             </button>

//             <button
//               onClick={handleSendOtp}
//               disabled={loading}
//               className="w-full py-2 text-xs text-gray-400 underline"
//             >
//               Resend OTP
//             </button>

//             <button
//               onClick={() => { setStep(1); setOtp(""); setError(""); }}
//               className="w-full py-2 text-xs text-gray-500"
//             >
//               ← Change email
//             </button>

//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { otpAPI } from "@/utils/api";
import { useRouter } from "next/navigation";
import { lemonMilk } from "@/app/fonts";

export default function LoginPage() {
  const { login, register } = useAuth();

  const router = useRouter();

  const [isLogin, setIsLogin] =
    useState(true);

  const [step, setStep] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (key, val) =>
    setForm((prev) => ({
      ...prev,
      [key]: val,
    }));

  // SEND OTP
  const handleSendOtp = async () => {

    if (
      !form.name ||
      !form.email ||
      !form.password
    ) {
      setError("Please fill all fields");
      return;
    }

    if (form.password.length < 8) {
      setError(
        "Password must be at least 8 characters"
      );
      return;
    }

    setError("");

    setLoading(true);

    try {

      await otpAPI.sendOtp(form.email);

      setStep(2);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  };

  // VERIFY OTP
  const handleVerifyAndRegister =
    async () => {

      if (!otp || otp.length !== 6) {

        setError("Enter 6 digit OTP");

        return;
      }

      setError("");

      setLoading(true);

      try {

        await otpAPI.verifyOtp(
          form.email,
          otp
        );

        await register(
          form.name,
          form.email,
          form.password
        );

        router.push("/");

      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);

      }
    };

  // LOGIN
  const handleLogin = async () => {

    if (!form.email || !form.password) {

      setError("Please fill all fields");

      return;
    }

    setError("");

    setLoading(true);

    try {

      await login(
        form.email,
        form.password
      );

      router.push("/");

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  };

  return (
    <section className="min-h-screen bg-white overflow-hidden">

      {/* LEFT / TOP SECTION */}
      <div className="grid md:grid-cols-2 min-h-screen">

        {/* VISUAL SIDE */}
        <div
          className="
            relative
            hidden
            md:flex
            bg-black
            text-white
            overflow-hidden
            flex-col
            justify-between
            p-12
          "
        >

          {/* Glow */}
          <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-pink-500/10 rounded-full blur-3xl"></div>

          {/* LOGO */}
          <div className="relative z-10">

            <h1
              className={`${lemonMilk.className} text-5xl flex items-center`}
            >
              <span className="text-8xl">
                Z
              </span>
              ivara
            </h1>

            <p className="text-white/50 uppercase tracking-[0.3em] text-xs mt-6">
              Fashion For Your Vibe
            </p>

          </div>

          {/* CENTER */}
          <div className="relative z-10">

            <h2 className="text-6xl font-light leading-tight">
              Discover
              <br />
              luxury fashion
              <br />
              made for you.
            </h2>

            <p className="text-white/60 text-base leading-8 mt-10 max-w-lg">
              Join the Zivara experience with
              exclusive collections, effortless
              shopping, and premium style.
            </p>

          </div>

          {/* FOOTER */}
          <div className="relative z-10 flex items-center gap-10 text-white/40 text-sm uppercase tracking-[0.2em]">

            <p>Premium Fashion</p>

            <p>Fast Delivery</p>

            <p>Secure Payments</p>

          </div>

        </div>

        {/* FORM SIDE */}
        <div
          className="
            flex
            flex-col
            justify-center
            px-6
            md:px-16
            py-24
          "
        >

          {/* MOBILE LOGO */}
          <div className="md:hidden text-center mb-12">

            <h1
              className={`${lemonMilk.className} text-2xl flex items-center justify-center text-black`}
            >
              <span className="text-5xl">
                Z
              </span>
              ivara
            </h1>

            <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mt-4">
              Premium Fashion Store
            </p>

          </div>

          {/* TOGGLE */}
          {(isLogin || step === 1) && (

            <div
              className="
                bg-[#f8f8f8]
                rounded-full
                p-2
                flex
                mb-10
              "
            >

              <button
                onClick={() => {

                  setIsLogin(true);

                  setError("");

                  setStep(1);
                }}
                className={`
                  flex-1
                  py-4
                  rounded-full
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  transition-all
                  duration-300
                  ${
                    isLogin
                      ? "bg-black text-white"
                      : "text-gray-400"
                  }
                `}
              >
                Login
              </button>

              <button
                onClick={() => {

                  setIsLogin(false);

                  setError("");

                  setStep(1);
                }}
                className={`
                  flex-1
                  py-4
                  rounded-full
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  transition-all
                  duration-300
                  ${
                    !isLogin
                      ? "bg-black text-white"
                      : "text-gray-400"
                  }
                `}
              >
                Register
              </button>

            </div>

          )}

          {/* TITLE */}
          <div className="mb-10">

            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">

              {isLogin
                ? "Welcome Back"
                : step === 1
                ? "Create Account"
                : "Verify Email"}

            </p>

            <h2 className="text-4xl md:text-6xl font-light text-black mt-5 leading-tight">

              {isLogin
                ? "Login to continue."
                : step === 1
                ? "Join the fashion world."
                : "Enter your OTP."}

            </h2>

          </div>

          {/* LOGIN */}
          {isLogin && (

            <div className="space-y-5">

              {/* EMAIL */}
              <div>

                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">
                  Email Address
                </p>

                <div
                  className="
                    bg-[#f8f8f8]
                    border
                    border-gray-200
                    rounded-full
                    px-5
                    py-4
                    flex
                    items-center
                    gap-3
                    focus-within:border-black
                    transition-all
                  "
                >

                  <i className="ri-mail-line text-gray-400 text-lg"></i>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      handleChange(
                        "email",
                        e.target.value
                      )
                    }
                    placeholder="Enter your email"
                    className="
                      flex-1
                      bg-transparent
                      outline-none
                      text-black
                      placeholder:text-gray-400
                    "
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div>

                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">
                  Password
                </p>

                <div
                  className="
                    bg-[#f8f8f8]
                    border
                    border-gray-200
                    rounded-full
                    px-5
                    py-4
                    flex
                    items-center
                    gap-3
                    focus-within:border-black
                    transition-all
                  "
                >

                  <i className="ri-lock-line text-gray-400 text-lg"></i>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={form.password}
                    onChange={(e) =>
                      handleChange(
                        "password",
                        e.target.value
                      )
                    }
                    placeholder="Enter your password"
                    className="
                      flex-1
                      bg-transparent
                      outline-none
                      text-black
                      placeholder:text-gray-400
                    "
                  />

                  <button
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >

                    <i
                      className={`${
                        showPassword
                          ? "ri-eye-off-line"
                          : "ri-eye-line"
                      } text-gray-400 text-lg`}
                    ></i>

                  </button>

                </div>

              </div>

              {/* ERROR */}
              {error && (

                <div className="bg-red-50 border border-red-100 rounded-[1.5rem] px-5 py-4">

                  <p className="text-red-500 text-sm">
                    {error}
                  </p>

                </div>

              )}

              {/* BUTTON */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className={`
                  w-full
                  py-5
                  rounded-full
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-white
                  transition-all
                  duration-300
                  ${
                    loading
                      ? "bg-gray-300"
                      : "bg-black hover:bg-neutral-800"
                  }
                `}
              >

                {loading
                  ? "Logging In..."
                  : "Login"}

              </button>

            </div>

          )}

          {/* REGISTER STEP 1 */}
          {!isLogin && step === 1 && (

            <div className="space-y-5">

              {[
                {
                  key: "name",
                  icon: "ri-user-line",
                  label: "Full Name",
                },

                {
                  key: "email",
                  icon: "ri-mail-line",
                  label: "Email Address",
                },

                {
                  key: "password",
                  icon: "ri-lock-line",
                  label: "Password",
                },
              ].map((field) => (

                <div key={field.key}>

                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">
                    {field.label}
                  </p>

                  <div
                    className="
                      bg-[#f8f8f8]
                      border
                      border-gray-200
                      rounded-full
                      px-5
                      py-4
                      flex
                      items-center
                      gap-3
                      focus-within:border-black
                      transition-all
                    "
                  >

                    <i
                      className={`${field.icon} text-gray-400 text-lg`}
                    ></i>

                    <input
                      type={
                        field.key ===
                          "password" &&
                        !showPassword
                          ? "password"
                          : "text"
                      }
                      value={form[field.key]}
                      onChange={(e) =>
                        handleChange(
                          field.key,
                          e.target.value
                        )
                      }
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      className="
                        flex-1
                        bg-transparent
                        outline-none
                        text-black
                        placeholder:text-gray-400
                      "
                    />

                    {field.key ===
                      "password" && (

                      <button
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                      >

                        <i
                          className={`${
                            showPassword
                              ? "ri-eye-off-line"
                              : "ri-eye-line"
                          } text-gray-400 text-lg`}
                        ></i>

                      </button>

                    )}

                  </div>

                </div>

              ))}

              {/* ERROR */}
              {error && (

                <div className="bg-red-50 border border-red-100 rounded-[1.5rem] px-5 py-4">

                  <p className="text-red-500 text-sm">
                    {error}
                  </p>

                </div>

              )}

              {/* BUTTON */}
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className={`
                  w-full
                  py-5
                  rounded-full
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-white
                  transition-all
                  duration-300
                  ${
                    loading
                      ? "bg-gray-300"
                      : "bg-black hover:bg-neutral-800"
                  }
                `}
              >

                {loading
                  ? "Sending OTP..."
                  : "Send OTP"}

              </button>

            </div>

          )}

          {/* OTP */}
          {!isLogin && step === 2 && (

            <div className="space-y-6">

              {/* CARD */}
              <div className="bg-[#f8f8f8] rounded-[2rem] p-8 text-center">

                <div
                  className="
                    w-20
                    h-20
                    rounded-full
                    bg-black
                    text-white
                    flex items-center justify-center
                    mx-auto
                  "
                >

                  <i className="ri-mail-send-line text-4xl"></i>

                </div>

                <h2 className="text-3xl font-light text-black mt-8">
                  Verify Your Email
                </h2>

                <p className="text-gray-400 text-sm leading-7 mt-4">
                  OTP sent to
                  <br />
                  <span className="text-black">
                    {form.email}
                  </span>
                </p>

              </div>

              {/* OTP */}
              <div>

                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">
                  Enter OTP
                </p>

                <input
                  type="number"
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value.slice(0, 6)
                    )
                  }
                  placeholder="• • • • • •"
                  className="
                    w-full
                    bg-[#f8f8f8]
                    border
                    border-gray-200
                    rounded-[1.5rem]
                    py-6
                    text-center
                    text-3xl
                    tracking-[1rem]
                    outline-none
                    focus:border-black
                  "
                />

              </div>

              {/* ERROR */}
              {error && (

                <div className="bg-red-50 border border-red-100 rounded-[1.5rem] px-5 py-4">

                  <p className="text-red-500 text-sm">
                    {error}
                  </p>

                </div>

              )}

              {/* BUTTON */}
              <button
                onClick={
                  handleVerifyAndRegister
                }
                disabled={loading}
                className={`
                  w-full
                  py-5
                  rounded-full
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-white
                  transition-all
                  duration-300
                  ${
                    loading
                      ? "bg-gray-300"
                      : "bg-black hover:bg-neutral-800"
                  }
                `}
              >

                {loading
                  ? "Verifying..."
                  : "Verify & Create Account"}

              </button>

              {/* ACTIONS */}
              <div className="flex items-center justify-between gap-4">

                <button
                  onClick={handleSendOtp}
                  className="text-sm text-gray-400 underline"
                >
                  Resend OTP
                </button>

                <button
                  onClick={() => {

                    setStep(1);

                    setOtp("");

                    setError("");
                  }}
                  className="text-sm text-black"
                >
                  Change Email
                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </section>
  );
}