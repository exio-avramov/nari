import { Stack } from "expo-router";
import { ThemedView } from "@/components/ThemedView";

export default function AuthLayout() {
  console.log("rendering auth layout");
  return (
    <ThemedView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
        <Stack.Screen name="sign-up" options={{ title: "Sign Up" }} />
      </Stack>
    </ThemedView>
  );
}
