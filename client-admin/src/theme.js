// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#e7faed",
    100: "#c5f1d1",
    200: "#9fe8b4",
    300: "#72e095",
    400: "#49d87c",
    500: "#19ce65",
    600: "#05be5b",
    700: "#00ab4e",
    800: "#009943",
    900: "#00782f",
  },
  secondary: {
    50: "#eee7f9",
    100: "#d2c3f1",
    200: "#b49be8",
    300: "#9572e0",
    400: "#7c52d9",
    500: "#6234ce",
    600: "#582fc8",
    700: "#4827bf",
    800: "#3922b7",
    900: "#1a15a8",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          // palette values for dark mode
          primary: {
            dark: colorTokens.primary[900],
            main: colorTokens.primary[500],
            light: colorTokens.primary[100],
          },
          neutral: {
            dark: colorTokens.grey[100],
            main: colorTokens.grey[200],
            mediumMain: colorTokens.grey[300],
            medium: colorTokens.grey[400],
            light: colorTokens.grey[700],
          },
          background: {
            default: colorTokens.grey[900],
            alt: colorTokens.grey[800],
          },
        }
        : {
          // palette values for light mode
          primary: {
            dark: colorTokens.primary[700],
            main: colorTokens.primary[400],
            light: colorTokens.primary[50],
          },
          secondary: {
            dark: colorTokens.secondary[700],
            main: colorTokens.secondary[300],
            light: colorTokens.secondary[50],
          },
          neutral: {
            dark: colorTokens.grey[700],
            main: colorTokens.grey[500],
            mediumMain: colorTokens.grey[400],
            medium: colorTokens.grey[300],
            light: colorTokens.grey[50],
          },
          background: {
            default: colorTokens.grey[10],
            alt: colorTokens.grey[0],
          },
        }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};