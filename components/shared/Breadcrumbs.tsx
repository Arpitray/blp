import Link from 'next/link';
import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex flex-wrap items-center gap-x-2 gap-y-1" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          <Link
            href={item.href}
            className="text-[24px] font-medium leading-none text-[#595959] transition-colors hover:text-[#002954]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {item.label}
          </Link>
          {index < items.length - 1 && (
            <span className="text-[24px] leading-none text-[#595959]" aria-hidden="true">
              /
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
