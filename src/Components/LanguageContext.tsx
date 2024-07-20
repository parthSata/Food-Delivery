import { createContext, useContext, ReactNode } from "react";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

// Define the type for the context value
interface LanguageContextType {
    t: TFunction<"translation", undefined>;
    i18n: any;
    onClickLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    languages: { en: { nativeName: string } };
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

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

    return (
        <LanguageContext.Provider value={{ t, i18n, onClickLanguageChange, languages }}>
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