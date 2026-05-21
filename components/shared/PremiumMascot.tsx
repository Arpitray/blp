'use client'

import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas'

interface PremiumMascotProps {
    className?: string
}

export function PremiumMascot({ className }: PremiumMascotProps) {
    // Use the PremiumScreen state machine for the updated websitepremium.riv asset.
    const { RiveComponent } = useRive({
        src: '/websitepremium.riv',
        stateMachines: 'PremiumScreen',
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
