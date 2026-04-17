export default function RowDivider({ alt = false }: { alt?: boolean }) {
    return (
        <div className="w-full shrink-0 flex justify-center overflow-hidden">
            <div className="w-full h-px bg-[#E5E5E5]" />
        </div>
    )
}
