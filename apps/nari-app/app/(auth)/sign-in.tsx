import { useSession } from "@/components/auth/useSession";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function SignIn() {
  const { signIn } = useSession();

  const handleAuthentication = () => {
    // Implement your authentication logic here
    signIn();
    console.log("User signed in");
  };
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText onPress={handleAuthentication}>Sign In</ThemedText>
    </ThemedView>
  );
}
