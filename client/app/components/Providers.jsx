'use client'
import React, { createContext, useState, useEffect } from 'react'
import { SessionProvider } from 'next-auth/react'
import { ConfigProvider, theme } from 'antd'
const { defaultAlgorithm, darkAlgorithm } = theme

export const ThemeContext = createContext({
  theme: 'light',
  changeTheme: () => {}
})

export default function Providers({ children }) {
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <SessionProvider>
      <ThemeContext.Provider value={{ theme, changeTheme: setTheme }}>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: '#00b96b'
            }
          }}
        >
          {children}
        </ConfigProvider>
      </ThemeContext.Provider>
    </SessionProvider>
  )
}
