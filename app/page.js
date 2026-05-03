"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Categories from '@/components/home/Categories'
import HeroGrid from '@/components/home/HeroGrid'
import NewArrival from '@/components/home/NewArrival'
import PriceDrop from '@/components/home/PriceDrop'
import ShopNow from '@/components/home/ShopNow'
import SpringEdit from '@/components/home/SpringEdit'
import Trending from '@/components/home/Trending'
import 'remixicon/fonts/remixicon.css'

// SSR off — GSAP sirf browser mein kaam karta hai
const IntroAnimation = dynamic(() => import("@/components/IntroAnimation"), {
  ssr: false,
});

const Home = () => {
  
  const [showIntro, setShowIntro] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Sirf pehli baar dikhe — session mein ek baar
    const seen = sessionStorage.getItem("introSeen");
    if (!seen) {
      setShowIntro(true);
      setContentVisible(false);
    } else {
      setContentVisible(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("introSeen", "true");
    setShowIntro(false);
    setContentVisible(true);
  };

  return(
    <>
    {/* Intro animation */}
    {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

    {/* Main content */}
    <div
      className={`bg-amber-50 mt-15 h-full overflow-hidden relative z-20 transition-opacity duration-300 ${
        contentVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <HeroGrid/>
      <SpringEdit/> 
      <NewArrival/>
      <Categories/>
      <Trending/>
      <PriceDrop/>
      <ShopNow/>
    </div>
    </>
  )
}

export default Home