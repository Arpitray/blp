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
      <h2 className="text-[48px] sm:text-[64px] font-[800] text-brand-primary text-center max-w-[550px] mx-auto leading-[1.2] tracking-tight font-anek">
        {cta.title}
      </h2>
      <Button
        href={cta.buttonUrl || '#'}
        variant="cta"
        className="!text-[30px] !h-[60px] !px-[40px] font-bold mt-2"
      >
        {cta.buttonText}
      </Button>
    </div>
  );
}
