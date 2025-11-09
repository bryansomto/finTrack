import { createTheme, CSSObject, Theme } from "@mui/material/styles";

const typography = {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.85rem',
      color: '#6B7280',
    },
    button: {
      textTransform: 'none' as const,
      fontWeight: 500,
    },
};

type StyleFn = (params: { theme: Theme }) => CSSObject;
const components = {
  MuiCard: {
    styleOverrides: {
      root: (({ theme }: { theme: Theme }) =>
        ({
          borderRadius: 16,
          backgroundColor: theme.palette.background.paper,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 2px 8px rgba(0,0,0,0.04)"
              : "0 2px 8px rgba(0,0,0,0.25)",
          transition: "box-shadow 0.2s ease, transform 0.2s ease",
          "&:hover": {
            boxShadow:
              theme.palette.mode === "light"
                ? "0 4px 16px rgba(0,0,0,0.08)"
                : "0 4px 16px rgba(0,0,0,0.4)",
            transform: "translateY(-2px)",
          },
        } as CSSObject)) as StyleFn,
    },
  },

  MuiButton: {
    styleOverrides: {
      root: (({ theme }: { theme: Theme }) =>
        ({
          borderRadius: 10,
          textTransform: "none",
          fontWeight: 500,
          padding: "8px 16px",
          boxShadow: "none",
          "&:hover": {
            boxShadow:
              theme.palette.mode === "light"
                ? "0 2px 8px rgba(0,0,0,0.12)"
                : "0 2px 8px rgba(0,0,0,0.35)",
          },
        } as CSSObject)) as StyleFn,

      containedPrimary: (({ theme }: { theme: Theme }) =>
        ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "light" ? "#00B488" : "#00D1A2",
          },
        } as CSSObject)) as StyleFn,
    },
  },
  
  MuiAppBar: {
    styleOverrides: {
      root: (({ theme }: { theme: Theme }) =>
        ({
          backgroundColor:
            theme.palette.mode === "light"
              ? "#ffffff"
              : theme.palette.background.paper,
          color:
            theme.palette.mode === "light"
              ? "#1A1A1A"
              : theme.palette.text.primary,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 1px 4px rgba(0,0,0,0.08)"
              : "0 1px 4px rgba(0,0,0,0.5)",
        } as CSSObject)) as StyleFn,
    },
  },
};

const lightPalette = {
  mode: "light" as const,
  primary: { main: "#00A87C", contrastText: "#ffffff" },
  secondary: { main: "#00D1FF" },
  success: { main: "#22C55E" },
  warning: { main: "#FFD166" },
  error: { main: "#F87272" },
  info: { main: "#9C27B0" },
  background: { default: "#F5F6FA", paper: "#F6F6F6", white: "#FFFFFF" },
  text: { primary: "#1A1A1A", secondary: "#6B7280",  tertiary: "#4B2E05" },
  divider: "#E5E7EB",
};

const darkPalette = {
    mode: "dark" as const,
    primary: { main: "#00A87C" },
    secondary: { main: "#00D1FF" },
    success: { main: "#22C55E" },
    warning: { main: "#FFD166" },
    error: { main: "#F87272" },
    info: { main: "#9C27B0" },
    background: { default: "#0D1117", paper: "#161B22" },
    text: { primary: "#E5E7EB", secondary: "#9CA3AF", tertiary: "#4B2E05" },
    divider: "#1F2937",
};

export const lightTheme = createTheme({
  palette: lightPalette,
  typography,
  shape: {
    borderRadius: 14,
  },
  components,
});

export const darkTheme = createTheme({
  palette: darkPalette,
  typography,
  shape: {
    borderRadius: 14,
  },
  components,
});