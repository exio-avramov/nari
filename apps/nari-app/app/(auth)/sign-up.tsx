import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Pressable } from "react-native";
import { router } from "expo-router";

export default function SignUpScreen() {
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText type="title">Sign Up</ThemedText>
      {/* Add your sign-up form here */}
      <Pressable
        onPress={() => router.replace("/(auth)/sign-in")}
        style={{ marginTop: 24 }}
      >
        <ThemedText type="link">Already have an account? Sign In</ThemedText>
      </Pressable>
    </ThemedView>
  );
}
