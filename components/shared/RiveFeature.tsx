'use client'

import { useEffect, useRef, useState } from 'react'
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas'

// State machine names as confirmed by the Rive runtime inspector
export type RiveStateMachine = 'AIBlocking' | 'AccPartner' | 'SocialMedia' | 'Streaks'

interface RiveFeatureProps {
    stateMachine: RiveStateMachine
    ariaLabel?: string
    className?: string
    alignment?: Alignment
    // When true: plays the full state machine (intro one-shot + loop) from scratch
    // repeatedly — cycling: intro → loop for a bit → restart → intro → loop...
    repeatIntroLoop?: boolean
}

export function RiveFeature({ stateMachine, ariaLabel, className, alignment, repeatIntroLoop }: RiveFeatureProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const cycleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // Only trigger after element enters the viewport
    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.15 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const { rive, RiveComponent } = useRive({
        src: '/product/websitefeatures.riv',
        stateMachines: stateMachine,
        autoplay: false,
        layout: new Layout({
            fit: Fit.Contain,
            alignment: alignment ?? Alignment.Center,
        }),
    })

    // Standard mode: set isLooping=true input and play once
    useEffect(() => {
        if (!isVisible || !rive || repeatIntroLoop) return
        try {
            const inputs = rive.stateMachineInputs(stateMachine)
            if (inputs) {
                const loopInput = inputs.find((i) => i.name === 'isLooping')
                if (loopInput) loopInput.value = true
            }
        } catch (_) {}
        rive.play(stateMachine)
    }, [isVisible, rive, stateMachine, repeatIntroLoop])

    // RepeatIntroLoop mode: cycle intro+loop by resetting the state machine periodically
    useEffect(() => {
        if (!isVisible || !rive || !repeatIntroLoop) return

        // Total duration of one full cycle in ms:
        // intro (~2.5s - 3s) + loop running time (9s) = ~12s before restart
        const CYCLE_MS = 12000
        let cancelled = false

        function startCycle() {
            if (cancelled || !rive) return

            // Stop the state machine fully (resets internal state to beginning)
            rive.stop(stateMachine)

            // Let the runtime settle for one frame, then replay from scratch
            requestAnimationFrame(() => {
                if (cancelled || !rive) return
                rive.play(stateMachine)

                // Schedule the next restart
                cycleTimerRef.current = setTimeout(() => {
                    if (!cancelled) startCycle()
                }, CYCLE_MS)
            })
        }

        startCycle()

        return () => {
            cancelled = true
            if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current)
        }
    }, [isVisible, rive, stateMachine, repeatIntroLoop])

    return (
        <div
            ref={containerRef}
            className={className}
            aria-label={ariaLabel ?? stateMachine}
            role="img"
        >
            <RiveComponent />
        </div>
    )
}
