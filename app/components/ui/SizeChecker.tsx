"use client";

import { useEffect, useState } from "react";

const SizeChecker = () => {
  const [screenSize, setScreenSize] = useState('');

  useEffect(() => {
    const handleResize = () => {
        const width = window.innerWidth;
        // Tailwind 브레이크포인트 기준
        if (width >= 1536) {
          setScreenSize("2xl");
        } else if (width >= 1280) {
          setScreenSize("xl");
        } else if (width >= 1024) {
          setScreenSize("lg");
        } else if (width >= 768) {
          setScreenSize("md");
        } else if (width >= 640) {
          setScreenSize("sm");
        } else {
          setScreenSize("xs"); // 또는 "base"
        }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if(process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="absolute right-0 bottom-0 bg-blue-500 text-white px-2">{screenSize}</div>
  );
};

export default SizeChecker;