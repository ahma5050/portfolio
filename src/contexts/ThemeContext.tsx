import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark-luxury' | 'cosmic';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isGold: boolean;
  isCyan: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved as Theme) || 'dark-luxury';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    const root = document.documentElement;
    
    if (theme === 'cosmic') {
      root.classList.add('cosmic');
    } else {
      root.classList.remove('cosmic');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark-luxury' ? 'cosmic' : 'dark-luxury');
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      isGold: theme === 'dark-luxury',
      isCyan: theme === 'cosmic'
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
