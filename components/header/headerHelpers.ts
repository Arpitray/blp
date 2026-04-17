import { LANGUAGES, DropdownItem, getLocalizedProducts, getLocaleCopy } from './headerData';

export const getLanguageItems = (onSelect: (code: string) => void): DropdownItem[] => {
    return LANGUAGES.map(lang => ({
        label: lang.label,
        subLabel: lang.subLabel,
        onClick: () => onSelect(lang.code)
    }));
};

export const getProductItems = (locale: string): DropdownItem[] => {
    return getLocalizedProducts(locale);
};

export const getUiCopy = (locale: string) => getLocaleCopy(locale);
