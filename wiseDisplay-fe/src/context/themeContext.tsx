import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from "../components/DataStore/localstorage";

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
	const [theme, setTheme] = useLocalStorage('theme', 'light');

	const toggleTheme = () => {
		setTheme((prevTheme: string) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
