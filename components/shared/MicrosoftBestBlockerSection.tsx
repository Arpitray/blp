import React from 'react'

export function MicrosoftBestBlockerSection({ data }: { data?: any }) {
    const title = data?.sectionTitle || "Why BlockP Is The Best Porn Blocker for Windows?"
    const desc1 = data?.description1 || "BlockP creates a safe online environment for your entire family. \n\nIt makes self-control effortless for grown-ups to resist online distractions and improve their focus. It protects the younger ones from accidental exposure to porn and helps them learn responsible digital behavior."
    const listHeading = data?.listHeading !== undefined ? data.listHeading : ""
    const listItems = data?.listItems && data.listItems.length > 0 ? data.listItems : [
        "It is easy to install, with a user-friendly interface and offers immediate protection.",
        "Inappropriate content across browsers and apps will be detected and blocked.",
        "You can create a ‘blacklist’ of specific websites and keywords that you do not want to see.",
        "You can completely block or limit specific features of social media platforms."
    ]
    const desc2 = data?.description2 || "Whether you want to quit porn or learn healthy digital habits to reclaim your focus, BlockP supports your goals. Download the BlockP free porn blocker for windows today and secure your computer."
    const desktopImg = data?.desktopImagePath || "/product/android/desktop.svg"
    const phoneImg = data?.phoneImagePath || "/product/android/phone.svg"

    return (
        <section className="w-full bg-[#F6FAFF] py-16 md:py-32 relative overflow-hidden z-20">
            <div className="w-full max-w-site px-[12px] lg:px-[40px] mx-auto flex flex-col lg:flex-row items-center justify-between">
                
                {/* Left Side: Images */}
                <div className="w-full lg:w-[52%] relative flex items-center justify-start min-h-[300px] sm:min-h-[400px] md:min-h-[480px] mb-16 lg:mb-0 lg:-ml-12 xl:-ml-20 2xl:-ml-32">
                    {/* Desktop Image */}
                    <div className="w-[90%] sm:w-[85%] lg:w-[85%] relative z-0 -ml-[6px] sm:-ml-[18px] lg:-ml-12 xl:-ml-20 2xl:-ml-28">
                        <img 
                            src={desktopImg} 
                            alt="BlockP Dashboard Desktop"
                            className="w-full h-auto drop-shadow-2xl"
                        />
                    </div>
                    {/* Phone Image */}
                    <div className="absolute right-[14%] sm:right-[24%] lg:right-[165px] xl:right-[145px] top-[53%] -translate-y-[33%] w-[46%] sm:w-[40%] lg:w-[42%] xl:w-[38%] z-10">
                        <img 
                            src={phoneImg} 
                            alt="BlockP Windows App" 
                            className="w-full h-auto drop-shadow-2xl"
                        />
                    </div>
                </div>

                {/* Right Side: Text Content */}
                <div className="w-full lg:w-[48%] flex flex-col items-start lg:pl-12 xl:pl-20 relative z-20">
                    <h2 className="text-[36px] sm:text-[42px] lg:text-[48px] font-black text-[#012955] mb-6 leading-[1.15] tracking-tight">
                        {title}
                    </h2>
                    
                    <p className="text-[18px] lg:text-[20px] text-[#012955] mb-6 leading-[1.6] font-medium whitespace-pre-wrap">
                        {desc1}
                    </p>

                    {listHeading && (
                        <h3 className="text-[18px] lg:text-[20px] font-bold text-[#012955] mb-4">
                            {listHeading}
                        </h3>
                    )}

                    <ul className="space-y-4 mb-8">
                        {listItems.map((item: string, idx: number) => (
                            <li key={idx} className="flex items-start text-[18px] lg:text-[20px] text-[#012955] font-medium leading-[1.6]">
                                <span className="mr-3 mt-[14px] block w-[6px] h-[6px] bg-[#012955] rounded-full shrink-0"></span>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <p className="text-[18px] lg:text-[20px] text-[#012955] leading-[1.6] font-medium whitespace-pre-wrap">
                        {desc2}
                    </p>
                </div>

            </div>
        </section>
    )
}
