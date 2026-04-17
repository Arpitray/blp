import { PlatformList } from '@/components/shared/PlatformList'

export default function ProductsDropdown() {
    return (
        <div className="dropdown-card absolute left-1/2 -translate-x-1/2 top-full mt-0 z-50 flex flex-col gap-[10px] p-[18px] min-w-[230px] bg-white" role="menu" aria-label="Products menu">
            <PlatformList variant="dropdown" locale="en" />
        </div>
    )
}
