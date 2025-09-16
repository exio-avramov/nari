import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedButton } from "@/components/ThemedButton";
import { HelloWave } from "@/components/HelloWave";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function SignUpScreen() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Get themed colors for dynamic theming
  const borderColor = useThemeColor({}, "icon");

  const handleSignUp = () => {
    // TODO: Implement sign-up logic
    console.log("Sign up with:", formData);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <ThemedText type="title" style={styles.title}>
              Create Account
            </ThemedText>
            <HelloWave />
          </View>
          <ThemedText type="default" style={styles.subtitle}>
            Join our community of parents and nannies
          </ThemedText>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.nameRow}>
            <ThemedTextInput
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, firstName: text }))
              }
              style={[styles.input, styles.halfInput]}
              autoCapitalize="words"
            />
            <ThemedTextInput
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, lastName: text }))
              }
              style={[styles.input, styles.halfInput]}
              autoCapitalize="words"
            />
          </View>

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
              autoComplete="new-password"
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

          {/* Confirm Password Input with Eye Toggle */}
          <View style={styles.passwordContainer}>
            <ThemedTextInput
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, confirmPassword: text }))
              }
              style={styles.passwordInput}
              secureTextEntry={!showConfirmPassword}
              autoComplete="new-password"
            />
            <Pressable
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeButton}
            >
              <IconSymbol
                name={showConfirmPassword ? "eye.slash" : "eye"}
                size={20}
                color={borderColor}
              />
            </Pressable>
          </View>

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <ThemedText type="default" style={styles.termsText}>
              By creating an account, you agree to our{" "}
              <ThemedText type="link">Terms of Service</ThemedText> and{" "}
              <ThemedText type="link">Privacy Policy</ThemedText>
            </ThemedText>
          </View>

          {/* Sign Up Button */}
          <ThemedButton
            title="Create Account"
            variant="primary"
            size="large"
            onPress={handleSignUp}
            style={styles.signUpButton}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText type="default" style={styles.footerText}>
            Already have an account?{" "}
          </ThemedText>
          <Pressable onPress={() => router.replace("/(auth)/sign-in")}>
            <ThemedText type="link" style={styles.signInLink}>
              Sign In
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
    paddingTop: 60,
    paddingBottom: 40,
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
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
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
  halfInput: {
    flex: 1,
  },
  termsContainer: {
    marginBottom: 24,
  },
  termsText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    opacity: 0.8,
  },
  signUpButton: {
    marginBottom: 40,
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
  signInLink: {
    fontSize: 16,
    fontWeight: "600",
  },
});
