"use client";

import { useEffect, useRef, useState } from "react";
import { lemonMilk } from "@/app/fonts";
import gsap from "gsap";

export default function IntroAnimation({ onComplete }) {
  const overlayRef = useRef(null);
  const logoWrapRef = useRef(null);
  const lipsRef = useRef(null);
  const textRef = useRef(null);
  const stampRingRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Sab kuch shuru mein hidden
    gsap.set([lipsRef.current, textRef.current, stampRingRef.current], {
      opacity: 0,
      scale: 0,
    });

    gsap.set(overlayRef.current, { opacity: 1 });

    // Step 1 — Stamp effect — lips aur text ek saath thud ke saath
    tl.to([lipsRef.current, textRef.current], {
      opacity: 1,
      scale: 1,
      duration: 0.15,
      ease: "power4.out",
    })

    // Step 3 — Thoda bounce
    .to(logoWrapRef.current, {
      scale: .5,
      duration: 0.1,
      ease: "power1.out",
    })
    .to(logoWrapRef.current, {
      scale: 1,
      duration: 0.08,
    })

    // Step 4 — Ruko thoda
    .to({}, { duration: 0.8 })

    // Step 5 — Navbar logo ki position pe fly karo
    .to(logoWrapRef.current, {
      duration: 0.7,
      scale: 0.5,
      y: () => {
        // Navbar logo ki position calculate karo
        const navLogo = document.getElementById("navbar-logo");
        if (navLogo) {
          const rect = navLogo.getBoundingClientRect();
          const wrapRect = logoWrapRef.current.getBoundingClientRect();
          return rect.top - wrapRect.top + (rect.height / 2) - (wrapRect.height / 2);
        }
        return -window.innerHeight / 2 + 40;
      },
      x: () => {
        const navLogo = document.getElementById("navbar-logo");
        if (navLogo) {
          const rect = navLogo.getBoundingClientRect();
          const wrapRect = logoWrapRef.current.getBoundingClientRect();
          return rect.left - wrapRect.left + (rect.width / 2) - (wrapRect.width / 2);
        }
        return 0;
      },
      ease: "power3.inOut",
    })

    // Step 6 — Overlay fade out
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        if (onComplete) onComplete();
      },
    }, "-=0.2");

  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-9999 bg-white flex items-center justify-center"
    >
      <div ref={logoWrapRef} className="relative flex items-center justify-center">

        {/* Logo content */}
        <div className="relative inline-flex items-center justify-center">

          {/* Lips */}
          <img
            ref={lipsRef} 
            src="/images/lips.png"
            className="w-36 rotate-20 translate-x-8"
            alt="logo"
          />

          {/* Text */}
          <h1
            ref={textRef}
            className={`${lemonMilk.className} absolute inset-0 flex items-center justify-center text-4xl tracking-widest uppercase text-black`}
          >
            <span className="text-7xl">z</span>ivara
          </h1>

        </div>
      </div>
    </div>
  );
}