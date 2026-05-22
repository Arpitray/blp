import React from 'react'

export function ChromeBestBlockerSection({ data }: { data?: any }) {
    const title = data?.sectionTitle || "Why BlockP Is The Best Porn Blocker Chrome Extension?"
    const desc1 = data?.description1 || "BlockP is an effective porn blocker for PC, offering a simple and fast way to block inappropriate sites in Chrome."
    const listItems = data?.listItems && data.listItems.length > 0 ? data.listItems : [
        "It is easy to install, with a user-friendly interface and offers immediate protection.",
        "Inappropriate content across browsers will be detected and blocked by AI-powered filters",
        "You can create a ‘blacklist’ of specific websites and keywords that you do not want to see.",
        "You can completely block or limit specific features of social media platforms."
    ]
    const desc2 = data?.description2 || "Discover all the unique features of the BlockP Chrome extension including keyword and website blocking, inspirational quotes, custom redirect URLs and many more by visiting the Chrome Web Store and downloading our extension today."
    const desktopImg = data?.desktopImagePath || "/product/android/desktop.svg"
    const phoneImg = data?.phoneImagePath || "/product/android/phone.svg"

    return (
        <section className="w-full bg-[#F6FAFF] py-16 md:py-32 relative overflow-hidden z-20">
            <div className="w-full max-w-site px-6 lg:px-16 mx-auto flex flex-col lg:flex-row items-center justify-between">
                
                {/* Left Side: Images */}
                <div className="w-full lg:w-[46%] relative flex items-center justify-start min-h-[300px] sm:min-h-[400px] md:min-h-[480px] mb-16 lg:mb-0 lg:-ml-4 xl:-ml-8">
                    {/* Desktop Image */}
                    <div className="w-[90%] sm:w-[85%] lg:w-[85%] relative z-0 -ml-[6px] sm:-ml-[18px] lg:-ml-[8px] xl:-ml-[40px]">
                        <img 
                            src={desktopImg} 
                            alt="BlockP Dashboard Desktop"
                            className="w-full h-auto drop-shadow-2xl"
                        />
                    </div>
                    {/* Phone Image */}
                    <div className="absolute right-[5%] sm:right-[16%] lg:right-[114px] xl:right-[99px] top-[53%] -translate-y-[33%] w-[46%] sm:w-[40%] lg:w-[42%] xl:w-[38%] z-10">
                        <img 
                            src={phoneImg} 
                            alt="BlockP App" 
                            className="w-full h-auto drop-shadow-2xl"
                        />
                    </div>
                </div>

                {/* Right Side: Text Content */}
                <div className="w-full lg:w-[54%] flex flex-col items-start lg:pl-12 xl:pl-20 relative z-20">
                    <h2 className="text-[40px] md:text-[48px] lg:text-[52px] xl:text-[56px] font-black text-[#012955] mb-6 leading-[1.15] tracking-tight">
                        {title}
                    </h2>
                    
                    <p className="text-[20px] md:text-[22px] text-[#012955] mb-6 leading-[1.6] font-medium whitespace-pre-wrap">
                        {desc1}
                    </p>

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
