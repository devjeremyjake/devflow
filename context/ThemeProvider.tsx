'use client';
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from 'react';

interface ThemeContextType {
	mode: string;
	setMode: (mode: string) => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: PropsWithChildren) => {
	const [mode, setMode] = useState('dark');
	const handleThemeChange = () => {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			setMode('dark');
			document.documentElement.classList.add('dark');
		} else {
			setMode('light');
			document.documentElement.classList.remove('dark');
		}
	};

	useEffect(() => handleThemeChange, [mode]);

	return (
		<ThemeContext.Provider value={{ mode, setMode }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useThemem ust be used within a ThemeProvider');
	}
	return context;
}
