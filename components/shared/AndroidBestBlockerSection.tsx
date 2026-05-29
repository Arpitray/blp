import React from 'react'

export function AndroidBestBlockerSection({ data }: { data?: any }) {
    const title = data?.sectionTitle || "Why BlockP Is The Best Porn Blocker App for Android?"
    const desc1 = data?.description1 || "BlockP is one of the best porn blocker apps for Android to filter adult content from your device. You can stay away from pornography with our customized filtering technology, website and app blocker."
    const listHeading = data?.listHeading || "Our adult content blocker can:"
    const listItems = data?.listItems && data.listItems.length > 0 ? data.listItems : [
        "Help you stay away from adult websites and other distractions",
        "Filter pornography in real-time with AI-powered filters",
        "Whitelist feature to control accessible content",
        "Accountability partner and password protection help you stay porn-free",
        "Block distracting applications like social media",
        "Block any website, be it pornography, gambling or anything else"
    ]
    const desc2 = data?.description2 || "Discover all the unique features of the BlockP free porn blocker app for Android, including keyword and website blocking, social media controls, and many more by downloading the BlockP app from the Google Play Store."
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
                            alt="BlockP Android App" 
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

                    <h3 className="text-[18px] lg:text-[20px] font-bold text-[#012955] mb-4">
                        {listHeading}
                    </h3>

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
