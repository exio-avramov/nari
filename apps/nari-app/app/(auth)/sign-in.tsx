import { useAuth } from "@/components/auth/useAuth";
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
import { z } from "zod";
import Environment from "@/constants/Environment";

// Validation schema for sign-in form
const signInSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(
      Environment.REQUIREMENTS_MIN_PASSWORD_LENGTH,
      `Password must be at least ${Environment.REQUIREMENTS_MIN_PASSWORD_LENGTH} characters`
    ),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignIn() {
  const { signInWithEmail } = useAuth();
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignInFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get themed colors for dynamic theming
  const dividerColor = useThemeColor({}, "icon");
  const borderColor = useThemeColor({}, "icon");
  const errorColor = useThemeColor(
    { light: "#DC2626", dark: "#EF4444" },
    "text"
  );

  const validateField = (field: keyof SignInFormData, value: string) => {
    try {
      signInSchema.shape[field].parse(value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.issues[0].message }));
      }
    }
  };

  const onTextChange = (field: keyof SignInFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      validateField(field, value);
    }
  };

  const handleSignIn = async () => {
    try {
      setIsSubmitting(true);
      setErrors({});

      // Validate the entire form
      const validatedData = signInSchema.parse(formData);

      console.log("Sign in with:", validatedData);
      await signInWithEmail(validatedData.email, validatedData.password);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof SignInFormData, string>> = {};
        error.issues.forEach((err) => {
          const fieldName = err.path[0] as keyof SignInFormData;
          fieldErrors[fieldName] = err.message;
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google SSO
    console.log("Sign in with Google");
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
              Welcome
            </ThemedText>
            <HelloWave />
          </View>
          <ThemedText type="default" style={styles.subtitle}>
            Sign in to your account
          </ThemedText>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <ThemedTextInput
              placeholder="Email Address"
              value={formData.email}
              onChangeText={(emailInput) => onTextChange("email", emailInput)}
              onBlur={() => validateField("email", formData.email)}
              style={[
                styles.input,
                errors.email && { borderColor: errorColor, borderWidth: 1 },
              ]}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            {errors.email && (
              <ThemedText style={[styles.errorText, { color: errorColor }]}>
                {errors.email}
              </ThemedText>
            )}
          </View>

          {/* Password Input with Eye Toggle */}
          <View style={styles.inputContainer}>
            <View style={styles.passwordContainer}>
              <ThemedTextInput
                placeholder="Password"
                value={formData.password}
                onChangeText={(passwordInput) =>
                  onTextChange("password", passwordInput)
                }
                onBlur={() => validateField("password", formData.password)}
                style={[
                  styles.passwordInput,
                  errors.password && {
                    borderColor: errorColor,
                    borderWidth: 1,
                  },
                ]}
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
            {errors.password && (
              <ThemedText style={[styles.errorText, { color: errorColor }]}>
                {errors.password}
              </ThemedText>
            )}
          </View>

          {/* Sign In Button */}
          <ThemedButton
            title={isSubmitting ? "Signing In..." : "Sign In"}
            variant="primary"
            size="large"
            onPress={handleSignIn}
            style={styles.signInButton}
            disabled={isSubmitting}
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
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 0,
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  passwordContainer: {
    position: "relative",
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
