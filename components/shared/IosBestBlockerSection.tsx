import React from 'react'

export function IosBestBlockerSection({ data }: { data?: any }) {
    const title = data?.sectionTitle || "Why BlockP Is the Best App to Block porn on an iPhone?"
    const desc1 = data?.description1 || "BlockP is one of the best porn blocker for iOS to filter adult content from your iPhone. You can stay away from pornography with our customized filtering technology, website and app blocker."
    const listHeading = data?.listHeading || "Our powerful free porn blocker app can:"
    const listItems = data?.listItems && data.listItems.length > 0 ? data.listItems : [
        "Help you stay away from adult websites and other distractions",
        "Filter pornography in real-time with AI-powered filters",
        "Whitelist feature to control accessible content",
        "Accountability partner and password protection help you stay porn-free",
        "Block distracting applications like social media",
        "Block any website, be it pornography, gambling or anything else"
    ]
    const desc2 = data?.description2 || "Discover all the unique features of the BlockP free porn blocker for iPhone, including keyword and website blocking, social media controls, and many more by downloading the BlockP app from the App store."
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
                            alt="BlockP iPhone App" 
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

                    <h3 className="text-[20px] md:text-[22px] font-bold text-[#012955] mb-4">
                        {listHeading}
                    </h3>

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
