import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/layout/ui/Button'

interface PremiumCtaProps {
  title?: string
  subHeadline?: string
  buttonText?: string
  buttonHref: string
}

export const PremiumCta: React.FC<PremiumCtaProps> = ({
  title = 'BlockP Premium.',
  subHeadline = 'Stronger protection, full control, and priority support, so nothing stands in your way.',
  buttonText = 'Start your free trial!',
  buttonHref,
}) => {
  return (
    <section
      className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden footer-gradient py-20"
    >
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
        {/* Text Content */}
        <div className="text-center lg:text-left max-w-2xl">
          <h1 className="text-5xl lg:text-[80px] font-bold text-white leading-tight tracking-tight">
            {title}
          </h1>
          <p className="mt-6 text-lg lg:text-[32px] text-white/90 font-medium max-w-xl mx-auto lg:mx-0">
            {subHeadline}
          </p>
          <div className="mt-10 flex justify-center lg:justify-start">
            <Button variant="cta-white" href={buttonHref}>
              {buttonText}
            </Button>
          </div>
        </div>

        {/* Mascot Image */}
        <div className="relative w-full max-w-md lg:max-w-lg flex justify-center">
          <Image
            src="/CTA/King_Mascot.svg"
            alt="BlockP Mascot"
            width={400}
            height={400}
            className="w-full h-auto transform rotate-[-10deg] transition-transform hover:rotate-0 duration-500 ease-in-out"
          />
        </div>
      </div>
    </section>
  )
}
