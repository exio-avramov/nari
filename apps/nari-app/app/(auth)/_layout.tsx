import { Stack } from "expo-router";
import { ThemedView } from "@/components/ThemedView";

export default function AuthLayout() {
  return (
    <ThemedView style={{ flex: 1, backgroundColor: "#FFF5F7" }}>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemedView>
  );
}
