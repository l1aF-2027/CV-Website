"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

// We extract 1.13 seconds at 60fps, meaning ~68 frames.
const TOTAL_FRAMES = 68; 

export default function KeyboardBackground() {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Load images on mount
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      // Format: frame_0001.jpg
      const frameNumber = i.toString().padStart(4, "0");
      img.src = `/assets/keyboard-frames/frame_${frameNumber}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      
      loadedImages.push(img);
    }
    
    setImages(loadedImages);
  }, []);

  // Use framer-motion's useMotionValueEvent to listen to scroll changes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === 0 || imagesLoaded < TOTAL_FRAMES) return;
    
    // Map scroll progress (0-1) to frame index (0-59)
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(latest * TOTAL_FRAMES))
    );
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    const img = images[frameIndex];
    
    if (img && img.complete) {
      drawScaledImage(ctx, img, canvas.width, canvas.height);
    }
  });

  // Handle window resize and initial draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Draw the current frame after resize
      if (images.length > 0 && imagesLoaded === TOTAL_FRAMES) {
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(scrollYProgress.get() * TOTAL_FRAMES))
        );
        const ctx = canvas.getContext("2d");
        const img = images[frameIndex];
        
        if (img && img.complete) {
          drawScaledImage(ctx, img, canvas.width, canvas.height);
        }
      }
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Trigger initially
    
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [images, imagesLoaded, scrollYProgress]);

  // Helper function to draw image with object-fit: cover logic
  const drawScaledImage = (ctx, img, canvasWidth, canvasHeight) => {
    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    
    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full object-cover" 
      />
      {/* Overlay to dim the background slightly so text is readable */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]"></div>
    </div>
  );
}
