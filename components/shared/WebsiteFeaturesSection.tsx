import React from 'react'
import { RiveFeature, RiveStateMachine } from '@/components/shared/RiveFeature'
import { Alignment } from '@rive-app/react-canvas'

interface Feature {
    stateMachine: RiveStateMachine
    title: React.ReactNode
    description: string
    imageRight: boolean
    ariaLabel: string
    alignment?: Alignment
    wrapperClass?: string
    sizeClass?: string
    titleSizeClass?: string
    descSizeClass?: string
    textShiftClass?: string
    animationFlexClass?: string
    textFlexClass?: string
    repeatIntroLoop?: boolean
}

// State machine names confirmed by live Rive runtime inspector
const FEATURES: Feature[] = [
    {
        stateMachine: 'AIBlocking',
        title: <>AI<br />Blocking</>,
        description:
            'Not just websites — our AI catches explicit images on YouTube, Instagram, Reddit, and more.',
        imageRight: true,
        ariaLabel: 'AI Blocking animation',
        wrapperClass: '',
        sizeClass: 'max-w-[680px] md:max-w-[920px] lg:max-w-[960px] xl:max-w-[1000px] scale-[1.18] lg:scale-[1.28] translate-x-[50px] md:translate-x-[110px]',
        titleSizeClass: 'text-[54px] md:text-[72px] lg:text-[90px] xl:text-[94px]',
        descSizeClass: 'text-[26px] md:text-[34px] lg:text-[36px]',
        textShiftClass: 'md:pr-12 lg:pr-20 xl:pr-28',
        repeatIntroLoop: true,
    },
    {
        stateMachine: 'AccPartner',
        title: <>Accountability<br />partner</>,
        description:
            'You made the choice to change, BlockP makes sure that decision sticks. Lock it in with a password, hand the key to someone you trust,',
        imageRight: false,
        ariaLabel: 'Accountability Partner animation',
        alignment: Alignment.CenterLeft,
        wrapperClass: '',
        sizeClass: 'max-w-[680px] md:max-w-[900px] lg:max-w-[950px] xl:max-w-[1000px] scale-[1.15] lg:scale-[1.25] -translate-x-[20px] md:-translate-x-[40px] lg:-translate-x-[50px]',
        titleSizeClass: 'text-[52px] md:text-[68px] lg:text-[86px]',
        descSizeClass: 'text-[24px] md:text-[32px] lg:text-[34px]',
    },
    {
        stateMachine: 'Streaks',
        title: <>Streaks<br />Feature</>,
        description:
            "Every day clean adds to your streak. It's a small thing, but seeing that number climb gives you something real to protect. Progress you can see is progress that sticks.",
        imageRight: true,
        ariaLabel: 'Streaks feature animation',
        wrapperClass: '',
        sizeClass: 'max-w-[640px] md:max-w-[850px] scale-[1.08] lg:scale-[1.15] translate-x-[30px] md:translate-x-[60px] lg:translate-x-[80px]',
        titleSizeClass: 'text-[54px] md:text-[72px] lg:text-[90px] xl:text-[94px]',
        descSizeClass: 'text-[26px] md:text-[34px] lg:text-[36px]',
        textShiftClass: 'md:pr-8 lg:pr-12 xl:pr-16',
        animationFlexClass: 'flex-1',
        textFlexClass: 'flex-1',
        repeatIntroLoop: true,
    },
]

export function WebsiteFeaturesSection({ data }: { data?: { features?: { stateMachine?: string; title?: string; description?: string }[] } }) {
    // Merge Sanity text overrides with hardcoded config
    const featuresToRender = FEATURES.map(feat => {
        const override = data?.features?.find(f => f.stateMachine === feat.stateMachine)
        if (override) {
            return {
                ...feat,
                title: override.title ? <span style={{ whiteSpace: 'pre-wrap' }}>{override.title}</span> : feat.title,
                description: override.description || feat.description
            }
        }
        return feat
    })

    return (
        <div className="w-full flex flex-col items-center py-16 md:py-24 gap-10 md:gap-16">
            {featuresToRender.map((feature) => (
                <div
                    key={feature.stateMachine}
                    className={`w-full max-w-site px-[12px] lg:px-[40px] flex flex-col items-center justify-between gap-12 md:gap-24 ${
                        feature.imageRight ? 'md:flex-row-reverse' : 'md:flex-row'
                    }`}
                >
                    {/* Rive Animation */}
                    <div className={`${feature.animationFlexClass || 'flex-[1.2]'} w-full flex ${feature.imageRight ? 'justify-end' : 'justify-start'}`}>
                        <RiveFeature
                            stateMachine={feature.stateMachine}
                            ariaLabel={feature.ariaLabel}
                            alignment={feature.alignment}
                            repeatIntroLoop={feature.repeatIntroLoop}
                            className={`w-full ${feature.sizeClass || 'max-w-[640px] md:max-w-[850px]'} aspect-[4/3] relative ${feature.wrapperClass || ''}`}
                        />
                    </div>

                    {/* Text */}
                    <div className={`${feature.textFlexClass || 'flex-[0.8]'} w-full flex flex-col text-left ${feature.textShiftClass || ''}`}>
                        <h2
                            className={`${feature.titleSizeClass || 'text-[52px] md:text-[68px] lg:text-[86px]'} font-bold text-[#012955] leading-[1.05] mb-8`}
                            style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                            {feature.title}
                        </h2>
                        <p className={`${feature.descSizeClass || 'text-[24px] md:text-[32px] lg:text-[34px]'} text-[#012955]/90 font-bold leading-[1.5] whitespace-pre-wrap`}>
                            {feature.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
