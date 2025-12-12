import React from "react";
import { StyleSheet, Animated, Easing, Pressable } from "react-native";
import { useEffect, useRef } from "react";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { useThemeColor } from "../../hooks/useThemeColor";
import { useAuth } from "@/components/auth/useAuth";
import CheckMarkSvg from "../../assets/svgs/check-mark-svgrepo-com.svg";
import { router } from "expo-router";

const AnimatedCheckMark = Animated.createAnimatedComponent(CheckMarkSvg);

export default function SignUpSuccess() {
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const checkmarkOpacity = useRef(new Animated.Value(0)).current;
  const green = useThemeColor({}, "success");
  const textColor = useThemeColor({}, "text");
  const { session } = useAuth();
  //TODO: add logic for resending verification email
  //   console.log("User session after sign up:", session);

  useEffect(() => {
    Animated.sequence([
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(checkmarkScale, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(checkmarkOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Animated.View
        style={[
          styles.checkmarkContainer,
          {
            transform: [{ scale: checkmarkScale }],
            opacity: checkmarkOpacity,
            backgroundColor: green,
          },
        ]}
      >
        <AnimatedCheckMark width={60} height={60} fill="#FFFFFF" />
      </Animated.View>
      <ThemedText style={[styles.title, { color: textColor }]}>
        Sign Up Complete!
      </ThemedText>
      <ThemedText style={[styles.subtitle, { color: textColor }]}>
        Please check your email and verify your address to continue.
      </ThemedText>

      <Pressable
        style={styles.redirectButton}
        onPress={() => router.replace("/(auth)/sign-in")}
      >
        <ThemedText type="link" style={styles.signInLink}>
          Sign In
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  checkmarkContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.8,
  },
  signInLink: {
    fontSize: 16,
    fontWeight: "600",
  },
  redirectButton: {
    marginTop: 24,
  },
});
