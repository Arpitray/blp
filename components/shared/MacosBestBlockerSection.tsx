import React from 'react'

export function MacosBestBlockerSection({ data }: { data?: any }) {
    const title = data?.sectionTitle || "Why BlockP Is The Best Porn Blocker for MacBook?"
    const desc1 = data?.description1 || "BlockP helps you make your digital environment safer and distraction-free. It reduces exposure to porn and explicit content to help you stay focused on your goals while keeping the younger ones safe from accidental exposure to porn."
    const listHeading = data?.listHeading || ""
    const listItems = data?.listItems && data.listItems.length > 0 ? data.listItems : [
        "It is easy to install, with a user-friendly interface, and offers immediate protection.",
        "Inappropriate content across browsers and apps will be detected and blocked.",
        "You use the unlimited blocklist and whitelist to control what you want to see.",
        "You can completely block or limit specific features of social media platforms.",
        "Use password protection and accountability partner settings to prevent bypass during moments of temptation."
    ]
    const desc2 = data?.description2 || "Whether you want to quit porn or learn healthy digital habits to reclaim your focus, BlockP supports your goals. Download the BlockP free porn blocker for MacBook today for safe and distraction-free browsing."
    const desktopImg = data?.desktopImagePath || "/product/android/desktop.svg"
    const phoneImg = data?.phoneImagePath || "/product/android/phone.svg"

    return (
        <section className="w-full bg-[#F6FAFF] py-16 md:py-32 relative overflow-hidden z-20">
            <div className="w-full max-w-[1898px] px-6 lg:px-16 mx-auto flex flex-col lg:flex-row items-center justify-between">
                
                {/* Left Side: Images */}
                <div className="w-full lg:w-[56%] relative flex items-center justify-start min-h-[280px] sm:min-h-[380px] md:min-h-[460px] mb-16 lg:mb-0 lg:-ml-6 xl:-ml-12">
                    {/* Desktop Image */}
                    <div className="w-[80%] sm:w-[74%] lg:w-[74%] relative z-0 -ml-4 sm:-ml-8 lg:-ml-4">
                        <img 
                            src={desktopImg} 
                            alt="BlockP Dashboard Desktop"
                            className="w-full h-auto drop-shadow-2xl"
                        />
                    </div>
                    {/* Phone Image */}
                    <div className="absolute right-[14%] sm:right-[18%] lg:right-[120px] xl:right-[105px] top-[53%] -translate-y-[35%] w-[42%] sm:w-[35%] lg:w-[38%] xl:w-[34%] z-10">
                        <img 
                            src={phoneImg} 
                            alt="BlockP MacOS App" 
                            className="w-full h-auto drop-shadow-2xl"
                        />
                    </div>
                </div>

                {/* Right Side: Text Content */}
                <div className="w-full lg:w-[44%] flex flex-col items-start lg:pl-0 lg:-ml-10 xl:-ml-20 2xl:-ml-28 relative z-20">
                    <h2 className="text-[40px] md:text-[48px] lg:text-[52px] xl:text-[56px] font-black text-[#012955] mb-6 leading-[1.15] tracking-tight">
                        {title}
                    </h2>
                    
                    <p className="text-[20px] md:text-[22px] text-[#012955] mb-6 leading-[1.6] font-medium whitespace-pre-wrap">
                        {desc1}
                    </p>

                    {listHeading && (
                        <h3 className="text-[20px] md:text-[22px] font-bold text-[#012955] mb-4">
                            {listHeading}
                        </h3>
                    )}

                    <ul className="space-y-4 mb-8">
                        {listItems.map((item: string, idx: number) => (
                            <li key={idx} className="flex items-start text-[20px] md:text-[22px] text-[#012955] font-medium leading-[1.6]">
                                <span className="mr-3 mt-[14px] block w-[6px] h-[6px] bg-[#012955] rounded-full shrink-0"></span>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <p className="text-[20px] md:text-[22px] text-[#012955] leading-[1.6] font-medium whitespace-pre-wrap">
                        {desc2}
                    </p>
                </div>

            </div>
        </section>
    )
}
