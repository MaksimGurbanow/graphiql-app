/*
import {
    createContext,
    useContext,
    useMemo,
    useState,
    ReactNode,
    useCallback,
    FC,
} from 'react';
import {
    createTheme,
    ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export interface ThemeContextType {
    mode: boolean;
    toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    mode: true,
    toggleMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const CustomThemeProvider: FC<{ children: ReactNode }> = ({
                                                                     children,
                                                                 }) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState(prefersDarkMode);
    const toggleMode = useCallback(() => {
        setMode((prevMode) => !prevMode);
    }, []);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: mode ? 'dark' : 'light',
                    primary: {
                        main: mode ? '#ffffff' : '#000000',
                    },
                },
                components: {
                    MuiLink: {
                        styleOverrides: {
                            root: {
                                color: mode ? '#ffffff' : '#000000',
                                textDecoration: 'none',
                            },
                        },
                    },
                },
            }),
        [mode]
    );

    const contextValue = useMemo(
        () => ({
            mode,
            toggleMode,
        }),
        [mode, toggleMode]
    );

    return (
        <ThemeContext.Provider value={contextValue}>
        <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
            </ThemeContext.Provider>
    );
};
*/
