'use client'
import React, { createContext, useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import { ConfigProvider, theme } from 'antd'
const { defaultAlgorithm, darkAlgorithm } = theme

export const ThemeContext = createContext({
  darkMode: false,
  changeDarkMode: () => {}
})

export default function Providers({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <SessionProvider>
      <ThemeContext.Provider
        value={{ darkMode: isDarkMode, changeDarkMode: setIsDarkMode }}
      >
        <ConfigProvider
          theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}
        >
          {children}
        </ConfigProvider>
      </ThemeContext.Provider>
    </SessionProvider>
  )
}
