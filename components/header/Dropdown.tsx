import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { DropdownItem } from './headerData'
import RowDivider from './RowDivider'

interface DropdownProps {
    items: DropdownItem[];
    onItemClick?: (item: DropdownItem) => void;
    className?: string;
    isLanguage?: boolean;
}

export default function Dropdown({ items, onItemClick, className = '', isLanguage = false }: DropdownProps) {
    return (
        <div className={`dropdown-card absolute left-1/2 -translate-x-1/2 top-full mt-0 z-50 bg-white overflow-hidden ${className}`}>
            <div
                className="overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar p-[18px] flex flex-col gap-[10px]"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(0,41,84,0.1) transparent'
                }}
            >
                {items.map((item, i) => (
                    <React.Fragment key={i}>
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="dropdown-item"
                                onClick={() => onItemClick?.(item)}
                            >
                                {item.icon && (
                                    <div className="relative shrink-0 size-[26px]">
                                        <Image src={item.icon} alt="" fill sizes="26px" className="object-contain" />
                                    </div>
                                )}
                                <span className="dropdown-item-text">{item.label}</span>
                            </Link>
                        ) : (
                            <button
                                type="button"
                                className="dropdown-item"
                                onClick={() => {
                                    item.onClick?.();
                                    onItemClick?.(item);
                                }}
                            >
                                {isLanguage ? (
                                    <>
                                        <span className="w-[105px] shrink-0 text-left dropdown-item-text">{item.label}</span>
                                        <span className="dropdown-item-subtext">({item.subLabel})</span>
                                    </>
                                ) : (
                                    <>
                                        {item.icon && (
                                            <div className="relative shrink-0 size-[26px]">
                                                <Image src={item.icon} alt="" fill sizes="26px" className="object-contain" />
                                            </div>
                                        )}
                                        <span className="dropdown-item-text">{item.label}</span>
                                    </>
                                )}
                            </button>
                        )}
                        {/* Automatic dividers between all items as per design images */}
                        {i < items.length - 1 && (
                            <div className="mt-[10px]">
                                <RowDivider />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}
