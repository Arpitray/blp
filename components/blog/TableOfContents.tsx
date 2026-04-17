'use client';

import { useEffect, useMemo, useState, useRef } from 'react';

type Heading = {
  text: string;
  id: string;
  style: string;
};

type GroupedHeading = Heading & {
  children: Heading[];
};

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isManualScrolling = useRef(false);

  const groupedHeadings = useMemo(() => {
    const grouped: GroupedHeading[] = [];
    let currentParent: GroupedHeading | null = null;

    headings.forEach((heading) => {
      if (heading.style === 'h2') {
        currentParent = { ...heading, children: [] };
        grouped.push(currentParent);
      } else if (heading.style === 'h3' && currentParent) {
        currentParent.children.push(heading);
      }
    });
    return grouped;
  }, [headings]);

  const activeParentId = useMemo(() => {
    if (!activeId) return null;
    const parent = groupedHeadings.find(g =>
      g.id === activeId || g.children.some(c => c.id === activeId)
    );
    return parent?.id ?? null;
  }, [activeId, groupedHeadings]);

  const effectiveExpandedId = expandedId ?? activeParentId;

  // Handle "Top of Page" edge case - force first heading when at scroll origin
  useEffect(() => {
    const handleScrollTop = () => {
      if (window.scrollY < 200 && headings.length > 0) {
        setActiveId(headings[0].id);
      }
    };

    window.addEventListener('scroll', handleScrollTop, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollTop);
  }, [headings]);

  // Setup IntersectionObserver for standard scroll tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-15% 0px -75% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (isManualScrolling.current) return;

      // Ignore standard observer if we are at the very top of the page
      if (window.scrollY < 200) return;

      const intersecting = entries.filter(e => e.isIntersecting);
      if (intersecting.length > 0) {
        // Find the one closest to our sensor area
        const bestEntry = intersecting.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        setActiveId(bestEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Sidebar auto-scrolling logic
  useEffect(() => {
    if (!activeId || !scrollContainerRef.current) return;

    const scrollTimeout = setTimeout(() => {
      const container = scrollContainerRef.current!;
      const target = container.querySelector(`[href="#${activeId}"]`) as HTMLElement;

      if (target) {
        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        const isVisible = (
          targetRect.top >= containerRect.top + 40 &&
          targetRect.bottom <= containerRect.bottom - 40
        );

        if (!isVisible) {
          const relativeTop = targetRect.top - containerRect.top + container.scrollTop;
          const scrollTarget = relativeTop - (container.offsetHeight / 2) + (target.offsetHeight / 2);

          container.scrollTo({
            top: Math.max(0, scrollTarget),
            behavior: 'smooth'
          });
        }
      }
    }, 150);

    return () => clearTimeout(scrollTimeout);
  }, [activeId, effectiveExpandedId]);

  const handleLinkClick = (id: string, parentId: string) => {
    isManualScrolling.current = true;
    setActiveId(id);
    setExpandedId(parentId);
    setTimeout(() => { isManualScrolling.current = false; }, 1000);
  };

  return (
    <nav
      // className="sticky top-[120px] w-full bg-white/60 backdrop-blur-2xl border border-brand-primary/10 rounded-[32px] p-6 shadow-[0_30px_60px_rgba(0,41,84,0.06)] overflow-hidden"
      className="sticky top-[120px] w-full bg-[#F6FAFF] backdrop-blur-2xl  rounded-[32px] p-6 overflow-hidden"
      aria-label="Table of contents"
    >
      <div className="flex items-center gap-3 pb-5 mb-5 border-b border-brand-primary/10">
        <div className="w-1.5 h-6 bg-brand-accent rounded-full animate-pulse" />
        <h4 className="font-extrabold text-[16px] tracking-[0.15em] text-brand-primary uppercase opacity-70">
          Contents
        </h4>
      </div>

      <div
        ref={scrollContainerRef}
        className="relative max-h-[calc(100vh-340px)] overflow-y-auto pr-1 no-scrollbar scroll-smooth"
      >
        <ul className="flex flex-col gap-1 list-none p-0 m-0">
          {groupedHeadings.map((group, i) => {
            const isExpanded = effectiveExpandedId === group.id;
            const isCurrent = activeId === group.id;
            const hasManyChildren = group.children.length > 2;

            return (
              <li key={i} className="flex flex-col">
                <a
                  href={`#${group.id}`}
                  onClick={() => handleLinkClick(group.id, group.id)}
                  className={`relative flex items-center min-h-[46px] py-1.5 px-4 rounded-xl no-underline transition-all duration-300 ${isCurrent
                    ? 'bg-brand-accent/[0.08] text-brand-accent'
                    : 'text-brand-primary/60 hover:text-brand-primary'
                    }`}
                >
                  <div className={`absolute left-0 w-1 rounded-full transition-all duration-500 ${isCurrent ? 'h-1/2 bg-brand-accent opacity-100' : 'h-0'}`} />
                  <span className={`text-[15px] leading-snug transition-all duration-300 ${isCurrent ? 'font-bold translate-x-1' : 'font-medium'}`}>
                    {group.text}
                  </span>
                </a>

                <div className={`grid transition-all duration-500 ease-in-out ${isExpanded && hasManyChildren ? 'grid-rows-[1fr] opacity-100 mt-2 mb-4' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
                  <ul className="overflow-hidden flex flex-col gap-1 border-l-2 border-dashed border-brand-primary/20 ml-7 pl-5">
                    {group.children.map((child, j) => {
                      const isChildActive = activeId === child.id;
                      return (
                        <li key={j} className="relative">
                          {isChildActive && (
                            <div className="absolute left-[-23px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(17,96,255,0.4)] z-10" />
                          )}
                          <a
                            href={`#${child.id}`}
                            onClick={() => handleLinkClick(child.id, group.id)}
                            className={`flex items-center py-2 px-3 text-[14px] no-underline rounded-lg transition-all duration-200 ${isChildActive ? 'text-brand-accent font-bold bg-brand-accent/[0.03]' : 'text-brand-primary opacity-60 hover:opacity-100'}`}
                          >
                            {child.text}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F6FAFF] to-transparent pointer-events-none rounded-b-[32px]" />
      <div className="absolute top-[80px] left-0 right-0 h-8 bg-gradient-to-b from-[#F6FAFF]/40 to-transparent pointer-events-none" />
    </nav>
  );
}
