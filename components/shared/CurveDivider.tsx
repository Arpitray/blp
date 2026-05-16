import React from 'react';

export interface CurveDividerProps {
    /** Color above the curve */
    topColor?: string;
    /** Color below the curve */
    bottomColor?: string;
    /** The shape variant of the curve */
    curveType?: 'dome' | 'dip';
    /** Optional class name to configure the height/width */
    className?: string;
    /** Add a drop shadow like the original footer */
    hasShadow?: boolean;
}

export function CurveDivider({
    topColor = 'transparent',
    bottomColor = 'transparent',
    curveType = 'dome',
    className,
    hasShadow = false,
}: CurveDividerProps) {
    const isDome = curveType === 'dome';
    const viewBox = isDome ? "0 0 1440 200" : "0 0 1440 180";
    const defaultHeightClass = isDome ? "h-[180px] md:h-[220px]" : "h-[180px]";

    return (
        <div
            aria-hidden="true"
            className={`w-full relative z-20 leading-[0] ${className || defaultHeightClass}`}
            style={{
                backgroundColor: 'transparent',
                marginBottom: isDome ? '0' : '-2px',
            }}
        >
            <svg
                viewBox={viewBox}
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                style={{ display: 'block' }}
            >
                {hasShadow && (
                    <defs>
                        <filter id="curve-shadow" x="-5%" y="-5%" width="110%" height="300%">
                            <feDropShadow
                                dx="0"
                                dy="32"
                                stdDeviation="35.95"
                                floodColor="rgba(0,0,0,0.18)"
                            />
                        </filter>
                    </defs>
                )}

                {/* DOME SHAPE (Convex, dips UP) */}
                {isDome && (
                    <>
                        {topColor !== 'transparent' && (
                            <path
                                d="M0 0 V150 Q720 -150 1440 150 V0 H0 Z"
                                fill={topColor}
                            />
                        )}
                        {bottomColor !== 'transparent' && (
                            <path
                                d="M0 200 V150 Q720 -150 1440 150 V200 H0 Z"
                                fill={bottomColor}
                                filter={hasShadow ? 'url(#curve-shadow)' : undefined}
                            />
                        )}
                    </>
                )}

                {/* DIP SHAPE (Concave, dips DOWN) */}
                {!isDome && (
                    <>
                        {topColor !== 'transparent' && (
                            <path
                                d="M0 0 Q720 360 1440 0 V0 H0 Z"
                                fill={topColor}
                                filter={hasShadow ? 'url(#curve-shadow)' : undefined}
                            />
                        )}
                        {bottomColor !== 'transparent' && (
                            <path
                                d="M0 180 V0 Q720 360 1440 0 V180 H0 Z"
                                fill={bottomColor}
                            />
                        )}
                    </>
                )}
            </svg>
        </div>
    );
}
