'use client'

import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas'

interface PremiumMascotProps {
    className?: string
}

export function PremiumMascot({ className }: PremiumMascotProps) {
    // There are 'Timeline 5', 'Timeline 4', 'Timeline 3', 'Timeline 2' available
    // Playing the animations directly bypasses the need for the state machine to be configured correctly.
    const { RiveComponent } = useRive({
        src: '/websitepremium.riv',
        animations: ['Timeline 5', 'Timeline 4', 'Timeline 3', 'Timeline 2'],
        autoplay: true,
        layout: new Layout({
            fit: Fit.Contain,
            alignment: Alignment.BottomCenter,
        }),
    })

    return (
        <div
            className={`relative ${className}`}
            aria-label="BlockP Premium Mascot"
            role="img"
        >
            <div 
                className="w-full h-full"
                style={{
                    transform: 'scale(1.85)',
                    transformOrigin: 'bottom center',
                }}
            >
                <RiveComponent className="w-full h-full" />
            </div>
        </div>
    )
}
