import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../lib/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('sjh_lang') || 'en')

  useEffect(() => {
    localStorage.setItem('sjh_lang', lang)
  }, [lang])

  const t = (path) => {
    const keys = path.split('.')
    let current = translations[lang]
    for (const key of keys) {
      if (current[key] === undefined) return path
      current = current[key]
    }
    return current
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
