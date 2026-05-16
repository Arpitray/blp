// app/[lang]/page.tsx — Landing Page (SSR) - Figma Design Implementation
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CurveDivider } from '@/components/shared/CurveDivider'
import { buildLocaleAlternates, resolveLocale } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params
    const locale = resolveLocale(lang)

    return {
        title: 'BlockP: #1 Free AI porn blocker to increase your productivity',
        description:
            'Whether you want to block porn on your device or your child\'s, or even overcome a porn addiction online, BlockP is the #1 AI-Powered Porn Blocker, which is a free, reliable, and intuitive software program to steer clear of pornographic content on the Internet.',
        alternates: {
            canonical: `/${locale}`,
            languages: buildLocaleAlternates((supportedLocale) => `/${supportedLocale}`),
        },
    }
}

export default async function LandingPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const locale = resolveLocale(lang)

    // Figma asset URLs
    const heroImage = "https://www.figma.com/api/mcp/asset/5cc7e642-0b96-4abb-b9ef-51e638e4dd08"

    return (
        <div className="w-full flex flex-col items-center bg-white min-h-screen overflow-x-hidden">
            {/* ══════════════════════════════════════════════════════
                HERO SECTION - Figma Design
            ══════════════════════════════════════════════════════ */}
            <section
                className="w-full relative flex flex-col items-center justify-start overflow-hidden bg-gradient-to-b from-[#1160FF] via-[#649DFF] to-[#87C1FF]"
                style={{
                    minHeight: '1500px',
                }}
            >
                {/* Hero Content */}
                <div className="relative z-40 flex flex-col items-center pt-[180px] px-6 w-full max-w-[1440px]">
                    {/* Main Heading */}
                    <h1
                        className="text-[64px] font-extrabold text-white text-center leading-[1.2] mb-6 max-w-[995px]"
                        style={{
                            fontVariationSettings: "'wdth' 100",
                            textShadow: '0px 4px 4px rgba(0, 118, 244, 0.25)'
                        }}
                    >
                        BlockP: #1 Free AI porn blocker <br /> to increase your productivity
                    </h1>

                    {/* Subheading */}
                    <p
                        className="text-[24px] font-medium text-white text-center leading-[1.2] mb-24 max-w-[947px]"
                        style={{
                            fontVariationSettings: "'wdth' 100",
                            textShadow: '0px 4px 4px rgba(0, 118, 244, 0.25)'
                        }}
                    >
                        Whether you want to block porn on your device or your child&apos;s, or even overcome a porn addiction online, BlockP is the #1 AI-Powered Porn Blocker, which is a free, reliable, and intuitive software program to steer clear of pornographic content on the Internet.
                    </p>

                    {/* CTA Button */}
                    <Link href={`/${locale}/premium`}>
                        <div className="relative">
                            {/* Shadow layer */}
                            <div className="absolute top-[9px] left-0 w-full h-full bg-[#004c9d] rounded-full"></div>
                            {/* Button */}
                            <button
                                className="relative bg-white text-[#002954] font-semibold text-[30px] px-[130px] py-[18px] rounded-full hover:translate-y-1 transition-all duration-200 whitespace-nowrap"
                                style={{ fontVariationSettings: "'wdth' 100" }}
                            >
                                Download Now
                            </button>
                        </div>
                    </Link>
                </div>

                {/* Hero Image - Right side */}
                <div className="absolute right-0 bottom-0 z-30 pointer-events-none">
                    <img
                        src={heroImage}
                        alt="BlockP Hero"
                        className="w-[780px] h-[963px] object-cover object-bottom"
                    />
                </div>

                {/* Mascot - Positioned behind the white curve to hide the flat bottom */}
                <div className="absolute bottom-[60px] md:bottom-[80px] left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                    <img
                        src="/landing/maskot.svg"
                        alt="BlockP Mascot"
                        className="w-[440px] md:w-[600px] h-auto"
                    />
                </div>

                {/* Background Ellipse */}
                <div
                    className="absolute left-[-63px] top-[1194px] w-[1566px] h-[17400px] pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)'
                    }}
                />

                {/* White Curve Divider - Creates smooth transition to white section */}
                <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
                    <CurveDivider bottomColor="#ffffff" curveType="dome" className="h-[300px] md:h-[400px]" />
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                AS SEEN ON - Figma Design
            ══════════════════════════════════════════════════════ */}
            <section className="w-full py-[70px] flex flex-col items-center bg-white relative z-20">
                <div className="w-full max-w-[1522px] px-6 flex flex-col gap-[70px] items-center">
                    <h2
                        className="text-[48px] font-bold text-[#002954] text-center leading-[1.2]"
                        style={{
                            fontVariationSettings: "'wdth' 100",
                            textShadow: '0px 0px 4px rgba(255, 255, 255, 0.35)'
                        }}
                    >
                        As seen on
                    </h2>
                    <div className="flex items-center justify-center gap-[50px]">
                        <img
                            src="https://www.figma.com/api/mcp/asset/21f5b6b3-db89-46c3-baad-c7f1042bf2e3"
                            alt="Google"
                            className="h-[69px] w-auto"
                        />
                        <img
                            src="https://www.figma.com/api/mcp/asset/c7e7a6dc-7c98-4e26-8ec1-11fa3c9fc886"
                            alt="Meta"
                            className="h-[40px] w-auto"
                        />
                        <img
                            src="https://www.figma.com/api/mcp/asset/358e6b57-2934-469b-b153-5303a4c425ae"
                            alt="Microsoft"
                            className="h-[44px] w-auto"
                        />
                    </div>
                    {/* Divider Line */}
                    <div className="w-[1120px] h-[1px] bg-gray-200"></div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                STATS SECTION - Figma Design
            ══════════════════════════════════════════════════════ */}
            <section className="w-full py-[70px] flex flex-col items-center bg-white relative z-20">
                <div className="w-full max-w-[1522px] px-6 flex flex-col gap-[70px] items-center">
                    <h2
                        className="text-[48px] font-bold text-[#002954] text-center leading-[1.2] max-w-[810px]"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                        Join the millions of users who trust us
                    </h2>
                    <div className="flex items-center justify-center gap-[25px] w-full">
                        {/* 4.4 Star */}
                        <div className="backdrop-blur-[50px] bg-white/60 flex flex-col gap-[10px] items-center px-[50px] py-[25px] rounded-[25px] w-[326px]">
                            <img
                                src="https://www.figma.com/api/mcp/asset/5b272a04-b351-4a25-a78d-3429873e3fc6"
                                alt="Star"
                                className="w-[135px] h-[135px]"
                            />
                            <p
                                className="text-[32px] font-bold text-[#002954] text-center leading-[1.44]"
                                style={{
                                    fontVariationSettings: "'wdth' 100",
                                    textShadow: '0px 0px 4px rgba(255, 255, 255, 0.35)'
                                }}
                            >
                                4.4 Star
                            </p>
                            <p
                                className="text-[20px] font-medium text-[#002954] text-center"
                                style={{ fontVariationSettings: "'wdth' 100" }}
                            >
                                Average rating based on reviews
                            </p>
                        </div>

                        {/* 1M+ Downloads */}
                        <div className="backdrop-blur-[50px] bg-white/60 flex flex-col gap-[10px] items-center px-[50px] py-[25px] rounded-[25px] w-[326px]">
                            <img
                                src="https://www.figma.com/api/mcp/asset/7e5d7210-f8f3-41cc-b26e-a229a7432e1c"
                                alt="Download"
                                className="w-[135px] h-[135px]"
                            />
                            <p
                                className="text-[32px] font-bold text-[#002954] text-center leading-[1.44]"
                                style={{
                                    fontVariationSettings: "'wdth' 100",
                                    textShadow: '0px 0px 4px rgba(255, 255, 255, 0.35)'
                                }}
                            >
                                1M+ Downloads
                            </p>
                            <p
                                className="text-[20px] font-medium text-[#002954] text-center"
                                style={{ fontVariationSettings: "'wdth' 100" }}
                            >
                                Across all platforms
                            </p>
                        </div>

                        {/* 20K+ Reviews */}
                        <div className="backdrop-blur-[50px] bg-white/60 flex flex-col gap-[10px] items-center px-[50px] py-[25px] rounded-[25px] w-[326px]">
                            <img
                                src="https://www.figma.com/api/mcp/asset/31075054-7efc-4411-a10d-e219408e6389"
                                alt="Reviews"
                                className="w-[135px] h-[135px]"
                            />
                            <p
                                className="text-[32px] font-bold text-[#002954] text-center leading-[1.44]"
                                style={{
                                    fontVariationSettings: "'wdth' 100",
                                    textShadow: '0px 0px 4px rgba(255, 255, 255, 0.35)'
                                }}
                            >
                                20K+ Reviews
                            </p>
                            <p
                                className="text-[20px] font-medium text-[#002954] text-center"
                                style={{ fontVariationSettings: "'wdth' 100" }}
                            >
                                On google play store
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                TESTIMONIAL SECTION - Figma Design
            ══════════════════════════════════════════════════════ */}
            <section className="w-full py-[96px] flex flex-col items-center bg-white relative z-20">
                <div className="w-full max-w-[1121px] px-6 flex flex-col gap-[96px] items-center">
                    {/* Top Divider */}
                    <div className="w-full h-[1px] bg-gray-200"></div>

                    <div className="flex flex-col gap-[80px] items-center">
                        <h2
                            className="text-[48px] font-bold text-[#002954] text-center leading-[1.2]"
                            style={{
                                fontVariationSettings: "'wdth' 100",
                                textShadow: '0px 0px 4px rgba(255, 255, 255, 0.35)'
                            }}
                        >
                            What our users say about us
                        </h2>

                        <div className="flex flex-col gap-[60px] items-center w-full max-w-[1027px]">
                            {/* Stars */}
                            <div className="flex gap-[58px] items-center">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <img
                                        key={i}
                                        src="https://www.figma.com/api/mcp/asset/7a62653e-8ad9-4b1b-a2f9-fc5d4e6165dd"
                                        alt="Star"
                                        className="w-[66px] h-[66px]"
                                    />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p
                                className="text-[32px] font-bold text-[#002954] text-center leading-[1.44]"
                                style={{
                                    fontVariationSettings: "'wdth' 100",
                                    textShadow: '0px 0px 4px rgba(255, 255, 255, 0.35)'
                                }}
                            >
                                &quot;The best blocker app. Light on battery usage compared to competitors, and powerful enough to not only block adult content but also block politics and other &apos;toxic&apos; stuff by adding my own custom keywords.&quot;
                            </p>

                            {/* Author */}
                            <div className="flex flex-col items-center gap-[1px]">
                                <p
                                    className="text-[32px] font-bold text-[#002954] text-center leading-[1.44]"
                                    style={{
                                        fontVariationSettings: "'wdth' 100",
                                        textShadow: '0px 0px 4px rgba(255, 255, 255, 0.35)'
                                    }}
                                >
                                    Herdjati Pravito
                                </p>
                                <p
                                    className="text-[20px] font-medium text-[#595959] text-center"
                                    style={{ fontVariationSettings: "'wdth' 100" }}
                                >
                                    BlockP User
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Divider */}
                    <div className="w-full h-[1px] bg-gray-200"></div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                HOW CAN YOU STOP WATCHING PORN - Figma Design
            ══════════════════════════════════════════════════════ */}
            <section className="w-full py-[70px] flex flex-col items-center bg-white relative z-20">
                <div className="w-full max-w-[1522px] px-[80px] flex flex-col gap-[70px] items-center">
                    <h2
                        className="text-[48px] font-bold text-[#002954] text-center leading-[1.2]"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                        How can you stop watching porn?
                    </h2>

                    <div className="grid grid-cols-2 gap-[25px] w-full max-w-[1332px]">
                        {/* Card 1: Meditation */}
                        <StopWatchingCard
                            image="https://www.figma.com/api/mcp/asset/573c24ec-3ea9-43f6-a550-f6e11a6e9c2c"
                            title="Meditation"
                            description="The art of meditation helps you to get away from your urges. You can listen to calming music or use a meditation app. BlockP also has a feature that reduces your urge when you feel like giving up. It also has a meditation mode which can help you concentrate and understand the main cause of your addiction."
                        />

                        {/* Card 2: Physical activity */}
                        <StopWatchingCard
                            image="https://www.figma.com/api/mcp/asset/628871a7-a1b1-42fa-849e-48f7793a68bf"
                            title="Physical activity"
                            description="To tackle your addiction healthily, pick a sport you enjoy or hit the gym. This way you can stay physically fit and tackle your urges."
                        />

                        {/* Card 3: Seek help from your close ones */}
                        <StopWatchingCard
                            image="https://www.figma.com/api/mcp/asset/d701dbe1-50e7-4bc8-bd76-1ca0981be85e"
                            title="Seek help from your close ones"
                            description="Sometimes it is difficult to handle a problem alone and it is okay to seek help from your friends and family. Getting through it can be difficult, when you know you will get sudden urges that are hard to resist."
                        />

                        {/* Card 4: Prioritize your values */}
                        <StopWatchingCard
                            image="https://www.figma.com/api/mcp/asset/0f132157-cddd-4366-b6d3-b1563809093d"
                            title="Prioritize your values"
                            description="Everyone has some values that they need to prioritize to live a moral and good life. By doing this, it will help to let go of things that aren't right for you. Start by understanding your values and aligning yourself with them. Gradually you will understand what is important to you and what is not."
                        />

                        {/* Card 5: Consult a sexologist */}
                        <StopWatchingCard
                            image="https://www.figma.com/api/mcp/asset/cbb7d393-42d6-4384-8c5c-6f62399c3499"
                            title="Consult a sexologist"
                            description="They can help you understand the underlying cause of your addiction, it could be anything like relationship problems, emotional problems, family problems, etc."
                        />

                        {/* Card 6: Install a porn blocker */}
                        <StopWatchingCard
                            image="https://www.figma.com/api/mcp/asset/573c24ec-3ea9-43f6-a550-f6e11a6e9c2c"
                            title="Install a porn blocker"
                            description="Installing a porn blocker on your device would help control your sudden urges; BlockP is the best adult content blocker that will act as a barrier, driving you to act consciously."
                        />

                        {/* Card 7: Join a support group */}
                        <StopWatchingCard
                            image="https://www.figma.com/api/mcp/asset/0c7e468c-c696-4e21-b839-284f02361e54"
                            title="Join a support group"
                            description="It can be difficult to face this alone, joining a support group of people going through the same thing will give you more confidence. Having a support network can offer new viewpoints and coping techniques, as well as a sense of understanding. To join this type of community we have BlockP Community. Join Now!"
                        />

                        {/* Card 8: Replace the habit */}
                        <StopWatchingCard
                            image="https://www.figma.com/api/mcp/asset/f4c881f4-69e0-4ef0-8cf6-4239651f555e"
                            title="Replace the habit"
                            description="Redirect your energy into a healthy hobby or passion project that fills the gap – like reading, art, music, or learning a new skill. Creative pursuits fill your time, reduce boredom and uplift your mood."
                        />
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                HAVE MORE QUESTIONS? (FAQ)
            ══════════════════════════════════════════════════════ */}
            <section className="w-full py-16 md:py-24 flex flex-col items-center bg-[#F6FAFF] relative z-20">
                <div className="w-full max-w-site px-[12px] lg:px-[40px]">
                    <h2
                        className="text-[36px] md:text-[52px] lg:text-[64px] font-bold text-[#012955] text-center leading-[1.1] mb-16"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                        Have More Questions?
                    </h2>

                    <div className="max-w-3xl mx-auto flex flex-col gap-4">
                        <FaqItem
                            question="Is BlockP free?"
                            answer="Yes! BlockP offers a free tier with standard content blocking. Upgrade to Premium for AI-powered blocking, multi-device support, and advanced features."
                        />
                        <FaqItem
                            question="What platforms does BlockP support?"
                            answer="BlockP works on Android, iOS, macOS, Chrome, and Windows — covering virtually every device your family uses."
                        />
                        <FaqItem
                            question="Can my child bypass BlockP?"
                            answer="BlockP uses advanced tamper-protection technology that makes it extremely difficult to bypass. Premium users get additional uninstall protection."
                        />
                        <FaqItem
                            question="How does the AI blocking work?"
                            answer="Our AI analyzes images and text in real-time across all apps — not just browsers. It detects explicit content even on platforms like YouTube, Instagram, and Reddit."
                        />
                        <FaqItem
                            question="Is my data private?"
                            answer="Absolutely. BlockP never stores or transmits your browsing data. All filtering happens locally on your device. Read our privacy policy for details."
                        />
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                FOOTER - Figma Design
            ══════════════════════════════════════════════════════ */}
            <footer className="w-full bg-gradient-to-b from-[#1160FF] to-[#0076F4] py-[120px] relative">
                <div className="w-full max-w-[1524px] mx-auto px-[123px] flex flex-col gap-[40px]">
                    {/* Logo and Description */}
                    <div className="flex flex-col gap-[20px]">
                        <h3
                            className="text-[47px] font-extrabold text-white leading-[1.2]"
                            style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                            BlockP.
                        </h3>
                        <p
                            className="text-[20px] font-medium text-white max-w-[438px]"
                            style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                            BlockP: Porn and Website Blocker. BlockP is the best porn blocker which offers a safe browsing experience with its exceptional safety and security features.
                        </p>
                    </div>

                    {/* Footer Links */}
                    <div className="grid grid-cols-3 gap-[80px] mt-[40px]">
                        {/* Documentation */}
                        <div className="flex flex-col gap-[20px]">
                            <h4
                                className="text-[32px] font-bold text-white"
                                style={{ fontVariationSettings: "'wdth' 100" }}
                            >
                                Documentation
                            </h4>
                            <div className="flex flex-col gap-[15px] text-[20px] font-medium text-white">
                                <Link href={`/${locale}/privacy-policy`}>Privacy Policy</Link>
                                <Link href={`/${locale}/terms-and-conditions`}>Terms & Conditions</Link>
                                <Link href={`/${locale}/faqs`}>FAQs</Link>
                                <Link href={`/${locale}/premium`}>Premium</Link>
                                <a href="https://community.blockp.in/" target="_blank" rel="noopener noreferrer">BlockP Community</a>
                                <Link href={`/${locale}/data-deletion`}>Data Deletion</Link>
                            </div>
                        </div>

                        {/* Products */}
                        <div className="flex flex-col gap-[20px]">
                            <h4
                                className="text-[32px] font-bold text-white"
                                style={{ fontVariationSettings: "'wdth' 100" }}
                            >
                                Products
                            </h4>
                            <div className="flex flex-col gap-[15px] text-[20px] font-medium text-white">
                                <Link href={`/${locale}/products/android`}>Porn Blocker for Android</Link>
                                <Link href={`/${locale}/products/chrome`}>Porn Blocker Chrome extension</Link>
                                <Link href={`/${locale}/products/ios`}>Porn Blocker for IOS</Link>
                                <Link href={`/${locale}/products/microsoft`}>Porn Blocker for Windows</Link>
                                <Link href={`/${locale}/products/macos`}>Porn Blocker for Macbook</Link>
                            </div>

                            <div className="flex flex-col gap-[20px] mt-[40px]">
                                <h4
                                    className="text-[32px] font-bold text-white"
                                    style={{ fontVariationSettings: "'wdth' 100" }}
                                >
                                    Helpful resources
                                </h4>
                                <Link
                                    href={`/${locale}/addiction-test`}
                                    className="text-[20px] font-medium text-white"
                                    style={{ fontVariationSettings: "'wdth' 100" }}
                                >
                                    Porn addiction test
                                </Link>
                            </div>
                        </div>

                        {/* Contact & Social */}
                        <div className="flex flex-col gap-[30px]">
                            <div className="flex items-center gap-[15px]">
                                <img
                                    src="https://www.figma.com/api/mcp/asset/9a5a6727-0bff-45e3-b9af-a19a302a1d21"
                                    alt="Email"
                                    className="w-[45px] h-[45px]"
                                />
                                <p
                                    className="text-[20px] font-medium text-white"
                                    style={{ fontVariationSettings: "'wdth' 100" }}
                                >
                                    support@blockp.io
                                </p>
                            </div>

                            {/* Social Icons */}
                            <div className="flex items-center gap-[12px]">
                                <img src="https://www.figma.com/api/mcp/asset/19f803dc-6e3b-403b-aaa2-f4f4b77de99f" alt="Facebook" className="w-[35px] h-[35px]" />
                                <img src="https://www.figma.com/api/mcp/asset/25ae7e47-ef07-4125-a4c7-f2d29a09ebd8" alt="Twitter" className="w-[43px] h-[43px]" />
                                <img src="https://www.figma.com/api/mcp/asset/e6ed0f94-196c-4f0b-80c8-594a89a85adc" alt="Instagram" className="w-[35px] h-[35px]" />
                                <img src="https://www.figma.com/api/mcp/asset/90726b46-c3f4-4424-8600-6e6dce4eb527" alt="LinkedIn" className="w-[35px] h-[35px]" />
                                <img src="https://www.figma.com/api/mcp/asset/dd85fc3b-ddd9-4845-ac02-a7bb8c814fdc" alt="Reddit" className="w-[40px] h-[40px]" />
                                <img src="https://www.figma.com/api/mcp/asset/dfe4fb16-752c-44e8-8a19-5a633e453737" alt="Discord" className="w-[43px] h-[43px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────────
   SUB-COMPONENTS (co-located for simplicity)
   ───────────────────────────────────────────────────────────────── */

function StopWatchingCard({ image, title, description }: { image: string; title: string; description: string }) {
    return (
        <div className="bg-gradient-to-b from-[#F6FAFF] to-[#F6FAFF] rounded-[25px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,118,244,0.25)] h-[500px] flex flex-col">
            {/* Image Section */}
            <div className="relative h-[264px] overflow-hidden">
                <div className="absolute inset-0 backdrop-blur-[50px]">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-[15px] p-[25px] flex-1">
                <h3
                    className="text-[32px] font-bold text-[#002954] leading-[1.44]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                >
                    {title}
                </h3>
                <p
                    className="text-[20px] font-medium text-[#002954]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                >
                    {description}
                </p>
            </div>
        </div>
    )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
    return (
        <details className="group bg-white rounded-[20px] shadow-card overflow-hidden">
            <summary className="flex items-center justify-between cursor-pointer px-8 py-6 text-[18px] md:text-[22px] font-bold text-[#012955] hover:bg-[#F0F6FF] transition-colors duration-200 list-none">
                <span>{question}</span>
                <svg
                    className="w-6 h-6 text-brand-accent shrink-0 ml-4 transition-transform duration-300 group-open:rotate-180"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </summary>
            <div className="px-8 pb-6 text-[16px] md:text-[18px] text-[#012955]/70 font-medium leading-[1.7]">
                {answer}
            </div>
        </details>
    )
}
