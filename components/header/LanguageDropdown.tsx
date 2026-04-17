import { LANGUAGES, Language } from './constants'
import RowDivider from './RowDivider'

function LanguageRow({ lang, onClick }: { lang: Language; onClick: (code: string) => void }) {
    return (
        <button type="button" onClick={() => onClick(lang.code)} className="flex items-center w-full min-h-[28px] shrink-0 text-left bg-transparent border-none p-0 cursor-pointer transition-opacity duration-150 hover:opacity-60 text-[16px] font-medium text-brand-primary leading-normal" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="w-[100px] shrink-0 text-left">{lang.native}</span>
            <span className="whitespace-nowrap">({lang.english})</span>
        </button>
    )
}

export default function LanguageDropdown({ onSelect }: { onSelect: (code: string) => void }) {
    return (
        <div className="dropdown-card absolute left-1/2 -translate-x-1/2 top-full mt-0 z-50 flex flex-col gap-[10px] pt-[18px] pb-[18px] pl-[18px] pr-[16px] min-w-[310px] max-h-[calc(100vh-136px)] overflow-y-auto bg-white" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,118,244,0.15) transparent' }} role="listbox" aria-label="Select language">
            {LANGUAGES.map((lang, i) => (
                <div key={lang.code} className="contents">
                    <LanguageRow lang={lang} onClick={onSelect} />
                    {i < LANGUAGES.length - 1 && <RowDivider alt={lang.altDivider} />}
                </div>
            ))}
        </div>
    )
}
