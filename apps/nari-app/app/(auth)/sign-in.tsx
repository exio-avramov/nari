import { useSession } from "@/components/auth/useSession";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedButton } from "@/components/ThemedButton";
import { HelloWave } from "@/components/HelloWave";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function SignIn() {
  const { signIn } = useSession();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Get themed colors for dynamic theming
  const dividerColor = useThemeColor({}, "icon");
  const borderColor = useThemeColor({}, "icon");

  const handleSignIn = () => {
    // TODO: Implement sign-in logic
    console.log("Sign in with:", formData);
    signIn();
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google SSO
    console.log("Sign in with Google");
    signIn();
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with animated waving hand */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <ThemedText type="title" style={styles.title}>
              Welcome Back
            </ThemedText>
            <HelloWave />
          </View>
          <ThemedText type="default" style={styles.subtitle}>
            Sign in to your account
          </ThemedText>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <ThemedTextInput
            placeholder="Email Address"
            value={formData.email}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, email: text }))
            }
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          {/* Password Input with Eye Toggle */}
          <View style={styles.passwordContainer}>
            <ThemedTextInput
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, password: text }))
              }
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              autoComplete="current-password"
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              <IconSymbol
                name={showPassword ? "eye.slash" : "eye"}
                size={20}
                color={borderColor}
              />
            </Pressable>
          </View>

          {/* Sign In Button */}
          <ThemedButton
            title="Sign In"
            variant="primary"
            size="large"
            onPress={handleSignIn}
            style={styles.signInButton}
          />

          {/* Divider with themed colors */}
          <View style={styles.divider}>
            <View
              style={[styles.dividerLine, { backgroundColor: dividerColor }]}
            />
            <ThemedText type="default" style={styles.dividerText}>
              or
            </ThemedText>
            <View
              style={[styles.dividerLine, { backgroundColor: dividerColor }]}
            />
          </View>

          {/* Google Sign In */}
          <ThemedButton
            title="Continue with Google"
            variant="outline"
            size="large"
            onPress={handleGoogleSignIn}
            style={styles.googleButton}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText type="default" style={styles.footerText}>
            Don't have an account?{" "}
          </ThemedText>
          <Pressable onPress={() => router.replace("/(auth)/sign-up")}>
            <ThemedText type="link" style={styles.signUpLink}>
              Create Account
            </ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginRight: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 22,
  },
  form: {
    marginBottom: 40,
  },
  input: {
    marginBottom: 16,
  },
  passwordContainer: {
    position: "relative",
    marginBottom: 16,
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  signInButton: {
    marginBottom: 24,
    marginTop: 8,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    opacity: 0.5,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    opacity: 0.6,
  },
  googleButton: {
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  footerText: {
    fontSize: 16,
  },
  signUpLink: {
    fontSize: 16,
    fontWeight: "600",
  },
});
