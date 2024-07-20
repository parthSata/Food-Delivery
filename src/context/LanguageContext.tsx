import { createContext, useContext, ReactNode } from "react";
import { i18n, TFunction } from "i18next";
import { useTranslation } from "react-i18next";

interface LanguageContextType {
    t: TFunction<"translation", undefined>;
    i18n: any;
    onClickLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    languages: { en: { nativeName: string } };
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

    const onClickLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const language = e.target.value;
        i18n.changeLanguage(language); // Change the language
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