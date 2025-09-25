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
import { useAuth } from "@/components/auth/useAuth";
import z from "zod";
import Environment from "@/constants/Environment";
import {
  CountryCode,
  CountryCodeList,
} from "react-native-country-picker-modal";
import { ThemedPhoneNumberInput } from "@/components/ThemedPhoneNumberInput";
const countryCodeSet = new Set(CountryCodeList);
const signUpSchema = z
  .object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.email("Please enter a valid email address"),
    phone: z.string().nonempty("Phone number is required"),
    countryCode: z.string().nonempty("Country code is required"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(
        Environment.REQUIREMENTS_MIN_PASSWORD_LENGTH,
        `Password must be at least ${Environment.REQUIREMENTS_MIN_PASSWORD_LENGTH} characters`
      ),
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"], // Specify which field gets the error
      });
    }

    if (
      data.countryCode.length !== 2 ||
      !countryCodeSet.has(data.countryCode.toUpperCase() as CountryCode)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid country code",
        path: ["phone"],
      });
    }
  });

type SignUpFormData = z.infer<typeof signUpSchema>;
export default function SignUpScreen() {
  const { signUpWithEmail } = useAuth();
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "BG" as CountryCode,
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPhoneCountryPicker, setShowPhoneCountryPicker] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignUpFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorColor = useThemeColor({}, "errorMessage");

  // Get themed colors for dynamic theming
  const borderColor = useThemeColor({}, "icon");

  const handleSignUp = () => {
    // TODO: Implement sign-up logic
    console.log("Sign up with:", formData);
  };

  const validateField = (field: keyof SignUpFormData, value: string) => {
    try {
      signUpSchema.shape[field].parse(value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.issues[0].message }));
      }
    }
  };

  const onTextChange = (field: keyof SignUpFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      validateField(field, value);
    }
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
            <View style={[styles.inputContainer, { flex: 1 }]}>
              {/* First Name Input */}
              <ThemedTextInput
                placeholder="First Name"
                value={formData.firstName}
                onChangeText={(text) => onTextChange("firstName", text)}
                onBlur={() => validateField("firstName", formData.firstName)}
                style={[
                  styles.input,
                  errors.firstName && {
                    borderColor: errorColor,
                    borderWidth: 1,
                  },
                ]}
                autoCapitalize="words"
              />
              {errors.firstName && (
                <ThemedText style={[styles.errorText, { color: errorColor }]}>
                  {errors.firstName}
                </ThemedText>
              )}
            </View>

            {/* Last Name Input */}
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <ThemedTextInput
                placeholder="Last Name"
                value={formData.lastName}
                onChangeText={(text) => onTextChange("lastName", text)}
                onBlur={() => validateField("lastName", formData.lastName)}
                style={[
                  styles.input,
                  errors.lastName && {
                    borderColor: errorColor,
                    borderWidth: 1,
                  },
                ]}
                autoCapitalize="words"
              />
              {errors.lastName && (
                <ThemedText style={[styles.errorText, { color: errorColor }]}>
                  {errors.lastName}
                </ThemedText>
              )}
            </View>
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <ThemedTextInput
              placeholder="Email Address"
              value={formData.email}
              onChangeText={(text) => onTextChange("email", text)}
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

          <View style={styles.inputContainer}>
            <ThemedPhoneNumberInput
              phoneValue={formData.phone}
              countryCode={formData.countryCode as CountryCode}
              onBlur={() => validateField("phone", formData.phone)}
              onPhoneChange={(phone: string) => onTextChange("phone", phone)}
              onCountryCodeChange={(code: CountryCode) => {
                onTextChange("countryCode", code);
                validateField("countryCode", code);
              }}
              style={[
                styles.input,
                errors.phone && { borderColor: errorColor, borderWidth: 1 },
              ]}
            />
            {errors.phone && (
              <ThemedText style={[styles.errorText, { color: errorColor }]}>
                {errors.phone}
              </ThemedText>
            )}
          </View>
          {/* Password Input with Eye Toggle */}
          <View style={styles.inputContainer}>
            <View style={styles.passwordContainer}>
              <ThemedTextInput
                placeholder="Password"
                value={formData.password}
                onChangeText={(text) => onTextChange("password", text)}
                onBlur={() => validateField("password", formData.password)}
                style={[
                  styles.passwordInput,
                  errors.password && {
                    borderColor: errorColor,
                    borderWidth: 1,
                  },
                ]}
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
            {errors.password && (
              <ThemedText style={[styles.errorText, { color: errorColor }]}>
                {errors.password}
              </ThemedText>
            )}
          </View>

          {/* Confirm Password Input with Eye Toggle */}
          <View style={styles.inputContainer}>
            <View style={styles.passwordContainer}>
              <ThemedTextInput
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={(text) => onTextChange("confirmPassword", text)}
                onBlur={() =>
                  validateField("confirmPassword", formData.confirmPassword)
                }
                style={[
                  styles.passwordInput,
                  errors.confirmPassword && {
                    borderColor: errorColor,
                    borderWidth: 1,
                  },
                ]}
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
            {errors.confirmPassword && (
              <ThemedText style={[styles.errorText, { color: errorColor }]}>
                {errors.confirmPassword}
              </ThemedText>
            )}
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
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 0,
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
  errorText: {
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
});
