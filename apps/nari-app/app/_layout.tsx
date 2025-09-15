import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SessionProvider } from "@/components/auth/SessionProvider";
import { SplashScreenController } from "@/components/Splash";
import { useSession } from "@/components/auth/useSession";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { session } = useSession();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SessionProvider>
        {/* <SplashScreenController /> */}
        <Stack>
          <Stack.Protected guard={!!session}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack.Protected>

          <Stack.Protected guard={!session}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack.Protected>

          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </SessionProvider>
    </ThemeProvider>
  );
}
