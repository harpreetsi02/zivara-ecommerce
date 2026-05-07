// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { userAPI } from "@/utils/api";
// import { useAuth } from "@/context/AuthContext";
// import { lemonMilk } from "@/app/fonts";

// export default function ChangePasswordPage() {
//   const router = useRouter();
//   const { user } = useAuth();
//   const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
//   const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
//   const [done, setDone] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async () => {
//     if (!form.current || !form.newPass || !form.confirm) {
//       setError("Please fill all fields"); return;
//     }
//     if (form.newPass.length < 8) {
//       setError("Password must be at least 8 characters"); return;
//     }
//     if (form.newPass !== form.confirm) {
//       setError("Passwords do not match"); return;
//     }

//     setLoading(true);
//     setError("");
//     try {
//       await userAPI.changePassword({
//         currentPassword: form.current,
//         newPassword: form.newPass,
//       });
//       setDone(true);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) { router.push("/login"); return null; }

//   if (done) return (
//     <div className="mt-16 min-h-screen bg-white flex flex-col items-center justify-center px-8 text-center">
//       <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
//         <i className="ri-lock-unlock-line text-green-500 text-4xl"></i>
//       </div>
//       <h2 className="text-lg font-semibold">Password Updated!</h2>
//       <p className="text-sm text-gray-400 mt-2">Your password has been changed successfully.</p>
//       <button
//         onClick={() => router.push("/settings")}
//         className="mt-6 w-full py-3.5 bg-black text-white rounded-2xl text-sm font-semibold"
//       >
//         Back to Settings
//       </button>
//     </div>
//   );

//   return (
//     <div className="mt-16 min-h-screen bg-white">

//       <div className="px-4 py-5 border-b border-gray-100">
//         <div className="flex items-center gap-3">
//           <i className="ri-arrow-left-line text-gray-800 text-xl cursor-pointer" onClick={() => router.back()}></i>
//           <div>
//             <h1 className={`${lemonMilk.className} text-base text-black font-semibold`}>Change Password</h1>
//             <p className="text-xs text-gray-400">Keep your account secure</p>
//           </div>
//         </div>
//       </div>

//       <div className="px-4 py-6 space-y-4">
//         {[
//           { key: "current", label: "Current Password" },
//           { key: "newPass", label: "New Password" },
//           { key: "confirm", label: "Confirm New Password" },
//         ].map(({ key, label }) => (
//           <div key={key}>
//             <p className="text-xs text-gray-500 mb-1.5">{label}</p>
//             <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-2">
//               <input
//                 type={show[key] ? "text" : "password"}
//                 value={form[key]}
//                 onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
//                 placeholder={`Enter ${label.toLowerCase()}`}
//                 className="flex-1 text-sm outline-none bg-transparent text-gray-600 placeholder:text-gray-400"
//               />
//               <i
//                 className={`${show[key] ? "ri-eye-off-line" : "ri-eye-line"} text-gray-400 cursor-pointer`}
//                 onClick={() => setShow((p) => ({ ...p, [key]: !p[key] }))}
//               ></i>
//             </div>
//           </div>
//         ))}

//         {/* Strength checker */}
//         <div className="bg-gray-50 rounded-xl px-4 py-3 space-y-1">
//           {[
//             { label: "At least 8 characters", ok: form.newPass.length >= 8 },
//             { label: "Contains a number", ok: /\d/.test(form.newPass) },
//             { label: "Contains uppercase letter", ok: /[A-Z]/.test(form.newPass) },
//           ].map((rule) => (
//             <div key={rule.label} className="flex items-center gap-2">
//               <i className={`${rule.ok ? "ri-checkbox-circle-fill text-green-500" : "ri-checkbox-blank-circle-line text-gray-300"} text-sm`}></i>
//               <p className={`text-xs ${rule.ok ? "text-green-600" : "text-gray-400"}`}>
//                 {rule.label}
//               </p>
//             </div>
//           ))}
//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
//             <p className="text-xs text-red-500">{error}</p>
//           </div>
//         )}

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className={`w-full py-3.5 rounded-2xl text-sm font-semibold text-white mt-2 ${
//             loading ? "bg-gray-300" : "bg-black"
//           }`}
//         >
//           {loading ? "Updating..." : "Update Password"}
//         </button>

//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { userAPI } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { lemonMilk } from "@/app/fonts";

export default function ChangePasswordPage() {
  const router = useRouter();

  const { user } = useAuth();

  const [form, setForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [show, setShow] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });

  const [done, setDone] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async () => {

    if (
      !form.current ||
      !form.newPass ||
      !form.confirm
    ) {
      setError("Please fill all fields");
      return;
    }

    if (form.newPass.length < 8) {
      setError(
        "Password must be at least 8 characters"
      );
      return;
    }

    if (
      form.newPass !== form.confirm
    ) {
      setError(
        "Passwords do not match"
      );
      return;
    }

    setLoading(true);

    setError("");

    try {

      await userAPI.changePassword({
        currentPassword: form.current,
        newPassword: form.newPass,
      });

      setDone(true);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  };

  // AUTH
  if (!user) {
    router.push("/login");
    return null;
  }

  // SUCCESS
  if (done)
    return (
      <section className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center overflow-hidden">

        {/* Success Icon */}
        <div
          className="
            w-32
            h-32
            rounded-full
            bg-green-500/10
            flex items-center justify-center
          "
        >

          <i className="ri-lock-unlock-line text-green-500 text-6xl"></i>

        </div>

        {/* Content */}
        <h2 className="text-4xl md:text-6xl font-light text-black mt-10">
          Password Updated
        </h2>

        <p className="text-gray-400 text-sm md:text-base mt-5 max-w-md leading-7">
          Your account password has been
          successfully changed and secured.
        </p>

        {/* Button */}
        <button
          onClick={() =>
            router.push("/settings")
          }
          className="
            mt-10
            px-10
            py-5
            rounded-full
            bg-black
            text-white
            text-sm
            uppercase
            tracking-[0.2em]
            hover:bg-neutral-800
            transition-all
            duration-300
          "
        >
          Back To Settings
        </button>

      </section>
    );

  return (
    <section className="min-h-screen bg-white pt-24 pb-20 overflow-hidden">

      {/* HEADING */}
      <div className="text-center mb-12 px-4">

        <div className="flex items-center justify-center gap-4">

          <button
            onClick={() => router.back()}
            className="
              w-11 h-11
              rounded-full
              border border-gray-200
              flex items-center justify-center
              text-black
              hover:bg-black
              hover:text-white
              transition-all
              duration-300
            "
          >
            <i className="ri-arrow-left-line text-lg"></i>
          </button>

          <h1
            className={`${lemonMilk.className} flex items-center text-black tracking-wide`}
          >
            <span className="text-5xl md:text-7xl leading-none">
              C
            </span>

            <span className="text-xl md:text-4xl">
              hange Password
            </span>
          </h1>

        </div>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          Keep Your Account Secure
        </p>

      </div>

      {/* MAIN CARD */}
      <div className="px-4 md:px-6">

        <div className="bg-[#f8f8f8] rounded-[2rem] overflow-hidden">

          {/* TOP */}
          <div className="relative px-6 md:px-10 py-10 border-b border-gray-200">

            <div className="flex flex-col items-center text-center">

              {/* ICON */}
              <div
                className="
                  w-28
                  h-28
                  rounded-full
                  bg-black
                  text-white
                  flex items-center justify-center
                "
              >

                <i className="ri-lock-password-line text-5xl"></i>

              </div>

              {/* TEXT */}
              <h2 className="text-3xl md:text-5xl font-light text-black mt-8">
                Security Settings
              </h2>

              <p className="text-gray-400 text-sm uppercase tracking-[0.25em] mt-4">
                Update Your Password
              </p>

            </div>

          </div>

          {/* FORM */}
          <div className="p-6 md:p-10 space-y-6">

            {[
              {
                key: "current",
                label: "Current Password",
              },

              {
                key: "newPass",
                label: "New Password",
              },

              {
                key: "confirm",
                label:
                  "Confirm New Password",
              },
            ].map(({ key, label }) => (

              <div key={key}>

                <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">
                  {label}
                </p>

                <div
                  className="
                    flex
                    items-center
                    gap-4
                    bg-white
                    border
                    border-gray-200
                    rounded-full
                    px-5
                    py-4
                    transition-all
                    focus-within:border-black
                  "
                >

                  <input
                    type={
                      show[key]
                        ? "text"
                        : "password"
                    }
                    value={form[key]}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        [key]:
                          e.target.value,
                      }))
                    }
                    placeholder={`Enter ${label.toLowerCase()}`}
                    className="
                      flex-1
                      bg-transparent
                      text-black
                      placeholder:text-gray-400
                      outline-none
                    "
                  />

                  <button
                    onClick={() =>
                      setShow((p) => ({
                        ...p,
                        [key]:
                          !p[key],
                      }))
                    }
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-[#f8f8f8]
                      flex items-center justify-center
                      shrink-0
                    "
                  >

                    <i
                      className={`${
                        show[key]
                          ? "ri-eye-off-line"
                          : "ri-eye-line"
                      } text-lg text-gray-500`}
                    ></i>

                  </button>

                </div>

              </div>

            ))}

            {/* PASSWORD STRENGTH */}
            <div className="bg-white rounded-[2rem] p-5 md:p-6 border border-gray-200">

              <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-5">
                Password Strength
              </p>

              <div className="space-y-4">

                {[
                  {
                    label:
                      "At least 8 characters",
                    ok:
                      form.newPass.length >=
                      8,
                  },

                  {
                    label:
                      "Contains a number",
                    ok: /\d/.test(
                      form.newPass
                    ),
                  },

                  {
                    label:
                      "Contains uppercase letter",
                    ok: /[A-Z]/.test(
                      form.newPass
                    ),
                  },
                ].map((rule) => (

                  <div
                    key={rule.label}
                    className="flex items-center gap-3"
                  >

                    <div
                      className={`
                        w-7
                        h-7
                        rounded-full
                        flex
                        items-center
                        justify-center
                        ${
                          rule.ok
                            ? "bg-green-500/10"
                            : "bg-gray-100"
                        }
                      `}
                    >

                      <i
                        className={`${
                          rule.ok
                            ? "ri-check-line text-green-500"
                            : "ri-close-line text-gray-300"
                        }`}
                      ></i>

                    </div>

                    <p
                      className={`text-sm ${
                        rule.ok
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {rule.label}
                    </p>

                  </div>

                ))}

              </div>

            </div>

            {/* ERROR */}
            {error && (

              <div className="bg-red-500/10 border border-red-500/20 rounded-[1.5rem] px-5 py-4">

                <p className="text-sm text-red-500">
                  {error}
                </p>

              </div>

            )}

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`
                w-full
                py-5
                rounded-full
                text-sm
                uppercase
                tracking-[0.2em]
                transition-all
                duration-300
                ${
                  loading
                    ? "bg-gray-300 text-white"
                    : "bg-black text-white hover:bg-neutral-800"
                }
              `}
            >
              {loading
                ? "Updating..."
                : "Update Password"}
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}