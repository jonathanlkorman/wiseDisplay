import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ThemeContextType {
	theme: string;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

interface IThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
	const [theme, setTheme] = useState<string>('light');

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
