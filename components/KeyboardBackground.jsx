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

  // Load images progressively to save memory and main thread blocking
  useEffect(() => {
    // Check if we are on a mobile device to save bandwidth
    const isMobile = window.innerWidth <= 768;
    // On mobile, just load a few frames or a static image to save 10MB of payload
    const framesToLoad = isMobile ? 1 : TOTAL_FRAMES;

    const loadedImages = new Array(TOTAL_FRAMES).fill(null);
    let loadedCount = 0;

    const loadImage = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        const frameNumber = (index + 1).toString().padStart(4, "0");
        img.src = `/assets/keyboard-frames/frame_${frameNumber}.jpg`;

        img.onload = () => {
          loadedImages[index] = img;
          loadedCount++;
          setImagesLoaded(loadedCount);
          // Only update the state array entirely once we have the first frame or when batching
          // But to be safe and responsive, we can just feed a new reference 
          setImages([...loadedImages]);
          resolve();
        };
        img.onerror = () => resolve(); // continue even if error
      });
    };

    // 1. Immediately load the very first frame so the user sees something instantly
    loadImage(0).then(() => {
      if (framesToLoad <= 1) return; // Stop here for mobile

      // 2. Lazily load the rest of the frames using requestIdleCallback
      let currentIndex = 1;

      const loadNextBatch = () => {
        if (currentIndex >= framesToLoad) return;

        // Load 3 frames at a time to balance network requests and thread usage
        const batch = [];
        for (let i = 0; i < 3 && currentIndex < framesToLoad; i++) {
          batch.push(loadImage(currentIndex));
          currentIndex++;
        }

        Promise.all(batch).then(() => {
          if (currentIndex < framesToLoad) {
            if ('requestIdleCallback' in window) {
              window.requestIdleCallback(loadNextBatch);
            } else {
              setTimeout(loadNextBatch, 50);
            }
          }
        });
      };

      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadNextBatch);
      } else {
        setTimeout(loadNextBatch, 50);
      }
    });

  }, []);

  // Use framer-motion's useMotionValueEvent to listen to scroll changes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === 0 || imagesLoaded === 0) return;

    // Map scroll progress (0-1) to frame index (0-59)
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(latest * TOTAL_FRAMES))
    );

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const img = images[frameIndex] || images[0]; // fallback to first frame if not loaded

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
      if (images.length > 0 && imagesLoaded > 0) {
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(scrollYProgress.get() * TOTAL_FRAMES))
        );
        const ctx = canvas.getContext("2d");
        const img = images[frameIndex] || images[0]; // fallback to first frame

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
