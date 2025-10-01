import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useAuth } from "@/components/auth/useAuth";

export default function NavigationStack() {
  const { session } = useAuth();

  return (
    <Stack>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
