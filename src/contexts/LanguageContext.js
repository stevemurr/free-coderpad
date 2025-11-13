import React, { createContext, useState, useContext, useEffect } from "react";
import { codeExecutionService } from "../services/codeExecutionService";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch available languages from backend on mount
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("http://localhost:3001/api/languages");

        if (!response.ok) {
          throw new Error(`Failed to fetch languages: ${response.statusText}`);
        }

        const data = await response.json();
        setAvailableLanguages(data.languages || []);

        // Set default language to first available if current selection not available
        if (data.languages && data.languages.length > 0) {
          const languageIds = data.languages.map((lang) => lang.id);
          if (!languageIds.includes(selectedLanguage)) {
            setSelectedLanguage(data.languages[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch available languages:", err);
        setError(err.message);

        // Fallback to Python if fetch fails
        setAvailableLanguages([
          {
            id: "python",
            name: "Python 3",
            fileExtension: ".py",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  const changeLanguage = (languageId) => {
    const language = availableLanguages.find((lang) => lang.id === languageId);
    if (language) {
      setSelectedLanguage(languageId);
      console.log(`Language changed to: ${language.name}`);
    } else {
      console.warn(`Language ${languageId} not found in available languages`);
    }
  };

  const getCurrentLanguage = () => {
    return availableLanguages.find((lang) => lang.id === selectedLanguage);
  };

  const value = {
    selectedLanguage,
    availableLanguages,
    isLoading,
    error,
    changeLanguage,
    getCurrentLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
