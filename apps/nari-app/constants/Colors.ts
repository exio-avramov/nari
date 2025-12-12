/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const Colors = {
  light: {
    text: "#2E3A40",
    background: "#FCFAF8",

    icon: "#7C8A92",
    tabIconDefault: "#9BAAB1",
    tabIconSelected: "#0a7ea4",

    errorMessage: "#E06767",

    // Higher contrast vs light background
    buttonBackground: "#055E7A",
    buttonText: "#FFFFFF",

    // Success color
    success: "#22c55e",

    // Bottom sheet styling
    backdrop: "#000000",
    bottomSheetBackground: "#FFFFFF",
    bottomSheetHandle: "#D1D5DB",
    bottomSheetBorder: "#E5E7EB",
    bottomSheetSelectedItem: "#c5e5f0", // Light blue tint
  },
  dark: {
    text: "#E6EEF1",
    background: "#23292C",

    icon: "#B0BCC2",
    tabIconDefault: "#A2B0B6",
    tabIconSelected: "#FFF",

    errorMessage: "#F18888",

    // Higher contrast vs dark background
    buttonBackground: "#1BA5D2",
    buttonText: "#002A36",

    // Success color
    success: "#10b981",

    // Bottom sheet styling
    backdrop: "#000000",
    bottomSheetBackground: "#1F2527",
    bottomSheetHandle: "#4B5563",
    bottomSheetBorder: "#374151",
    bottomSheetSelectedItem: "#07303d", // Darker blue tint
  },
};
