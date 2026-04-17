"use client";
import { Button } from '@/components/layout/ui/Button';

interface FooterCTAProps {
  cta?: {
    title: string;
    buttonText: string;
    buttonUrl: string;
  };
}

export default function FooterCTA({ cta }: FooterCTAProps) {
  if (!cta) return null;

  return (
    <div className="w-full pt-32 flex flex-col items-center justify-center gap-12 bg-card-fill relative z-[70] px-6 rounded-b-[180px]">
      <h2 className="text-[48px] sm:text-[64px] font-extrabold text-brand-primary text-center max-w-[1050px] leading-[1.05] tracking-tighter font-anek">
        {cta.title}
      </h2>
      <Button
        href={cta.buttonUrl || '#'}
        variant="cta-large"
        className="text-[24px] px-12 py-5 rounded-full font-bold"
      >
        {cta.buttonText}
      </Button>
    </div>
  );
}
