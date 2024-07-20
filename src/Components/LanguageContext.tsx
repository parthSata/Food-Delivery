import { createContext, useContext, ReactNode } from "react";
import { i18n, TFunction } from "i18next";
import { useTranslation } from "react-i18next";

type Language = 'en';

interface LanguageContextType {
    t: TFunction;
    onClickLanguageChange: (language: Language) => void;
    i18n: i18n;
    languages: { [key in Language]: { nativeName: string } };
}

export const LanguageContext = createContext<LanguageContextType>({
    t: {} as TFunction,
    onClickLanguageChange: () => { },
    i18n: {} as i18n,
    languages: { en: { nativeName: "English" } },
});

interface LanguageContextProviderProps {
    children: ReactNode;

}

export const LanguageContextProvider = ({ children }: LanguageContextProviderProps) => {
    const languages = {
        en: { nativeName: "English" },
    };
    const { t, i18n } = useTranslation();

    const onClickLanguageChange = (language: Language) => {
        i18n.changeLanguage(language);
    };

    const value = { t, i18n, onClickLanguageChange, languages }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguageContext = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguageContext must be used within a LanguageContextProvider");
    }
    return context;
};