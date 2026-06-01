'use client'

import React from 'react'
import {
    useRive,
    Layout,
    Fit,
    Alignment,
    useViewModel,
    useViewModelInstance,
    useViewModelInstanceTrigger
} from '@rive-app/react-canvas'

interface HeroMascotProps {
    className?: string
}

export function HeroMascot({ className }: HeroMascotProps) {
    const { rive, RiveComponent } = useRive({
        src: '/landing/landing_page_.riv',
        stateMachines: 'landingpage',
        autoplay: true,
        layout: new Layout({
            fit: Fit.Contain,
            alignment: Alignment.BottomCenter,
        }),
    })

    const viewModel = useViewModel(rive, { name: 'ViewModel1' })
    const viewModelInstance = useViewModelInstance(viewModel, { rive })
    const { trigger: triggerNext } = useViewModelInstanceTrigger('next', viewModelInstance)

    const handleClick = () => {
        if (triggerNext) {
            triggerNext()
        }
    }

    return (
        <div
            className={`relative cursor-pointer select-none ${className}`}
            onClick={handleClick}
            aria-label="BlockP Hero Mascot (Interactive)"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleClick()
                }
            }}
        >
            <div
                className="w-full h-full"
                style={{
                    transform: 'scale(1.4)',
                    transformOrigin: 'bottom center',
                }}
            >
                <RiveComponent className="w-full h-full" />
            </div>
        </div>
    )
}
