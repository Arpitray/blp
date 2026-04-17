import React from 'react'
import Link from 'next/link'

interface BaseButtonProps {
    children?: React.ReactNode
    className?: string
    variant?: 'cta' | 'cta-large' | 'cta-white' | 'nav' | 'outline' | 'ghost' | 'default'
    style?: React.CSSProperties
}

interface AsButtonProps extends BaseButtonProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: never
    target?: never
}

interface AsLinkProps extends BaseButtonProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string
}

type ButtonProps = AsButtonProps | AsLinkProps

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ children, className = '', variant = 'default', href, ...props }, ref) => {

        let variantClasses = ''
        switch (variant) {
            case 'cta':
                variantClasses = 'cta-btn'
                break
            case 'cta-large':
                variantClasses = 'cta-large-btn'
                break
            case 'cta-white':
                variantClasses = 'cta-white-btn'
                break
            case 'nav':
                variantClasses = 'nav-link'
                break
            case 'outline':
                variantClasses = 'border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white'
                break
            case 'ghost':
                variantClasses = 'bg-transparent border-none p-0 cursor-pointer transition-opacity duration-150 hover:opacity-60 text-[16px] font-medium text-brand-primary'
                break
            default:
                variantClasses = ''
                break
        }

        const combinedClasses = `${variantClasses} ${className}`.trim()

        if (href) {
            return (
                <Link
                    href={href}
                    className={combinedClasses}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                >
                    {children}
                </Link>
            )
        }

        return (
            <button
                className={combinedClasses}
                ref={ref as React.Ref<HTMLButtonElement>}
                {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
            >
                {children}
            </button>
        )
    }
)

Button.displayName = 'Button'
