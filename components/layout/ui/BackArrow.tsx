import React from 'react'

interface BackArrowProps {
    size?: number | string
    color?: string
    className?: string
}

export const BackArrow: React.FC<BackArrowProps> = ({
    size = 24,
    color = '#004C9D',
    className = '',
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
    )
}
