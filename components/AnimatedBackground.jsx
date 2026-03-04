"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
    const canvasRef = useRef(null)
    const neatInstanceRef = useRef(null)

    useEffect(() => {
        // Dynamically import Neat to avoid SSR issues
        const initNeat = async () => {
            const { NeatGradient } = await import("@firecms/neat")

            if (canvasRef.current && !neatInstanceRef.current) {
                const config = {
                    colors: [
                        {
                            color: "#0A1428",
                            enabled: true,
                        },
                        {
                            color: "#004466",
                            enabled: true,
                        },
                        {
                            color: "#1a2200",
                            enabled: true,
                        },
                        {
                            color: "#020210",
                            enabled: true,
                        },
                        {
                            color: "#002E44",
                            enabled: true,
                        },
                    ],
                    speed: 3,
                    horizontalPressure: 4,
                    verticalPressure: 5,
                    waveFrequencyX: 2,
                    waveFrequencyY: 3,
                    waveAmplitude: 8,
                    shadows: 1,
                    highlights: 3,
                    colorBrightness: 1.1,
                    colorSaturation: 7,
                    wireframe: false,
                    colorBlending: 8,
                    backgroundColor: "#001122",
                    backgroundAlpha: 1,
                    grainScale: 2,
                    grainSparsity: 0,
                    grainIntensity: 0.15,
                    grainSpeed: 1,
                    resolution: 1,
                    yOffset: 0,
                }

                neatInstanceRef.current = new NeatGradient({
                    ref: canvasRef.current,
                    ...config,
                })
            }
        }

        initNeat()

        // Cleanup function
        return () => {
            if (neatInstanceRef.current) {
                neatInstanceRef.current.destroy()
                neatInstanceRef.current = null
            }
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                pointerEvents: "none",
            }}
        />
    )
}
