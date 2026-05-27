"use client";

import React, { useEffect, useRef, useState } from "react";

export function PremiumScrollWrapper({ 
    children, 
    className = "" 
}: { 
    children: React.ReactNode, 
    className?: string 
}) {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            {
                threshold: 0.3, // Trigger when 30% of the element is visible
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <section
            ref={ref}
            className={`relative w-full ${className}`} // Removed z-20 to allow natural overlapping by subsequent sections
        >
            <div 
                className="absolute top-0 left-0 w-full pointer-events-none transition-opacity duration-1000 ease-in-out"
                style={{
                    height: "calc(100% + 1000px)", // Overhangs 1000px into the next section for a massive bottom spread!
                    // 0px to 400px: Slow fade over the Platform Banner
                    // 400px to calc(100% - 600px): Solid blue covering Premium CTA and the Mascot overhang
                    // calc(100% - 600px) to 100%: 600px massive, ultra-soft fade into the next section
                    background: "linear-gradient(180deg, rgba(98,146,255,0) 0px, rgba(98,146,255,1) 400px, rgba(53,114,255,1) calc(100% - 600px), rgba(53,114,255,0) 100%)",
                    opacity: inView ? 1 : 0,
                    zIndex: 0
                }}
            />
            <div className="relative w-full h-full z-10">
                {children}
            </div>
        </section>
    );
}
