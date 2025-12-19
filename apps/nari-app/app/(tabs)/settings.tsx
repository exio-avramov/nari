import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedSettingsButton } from "@/components/ThemedSettingsButton";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAuth } from "@/components/auth/useAuth";
import { StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import { useState } from "react";

export default function SettingsScreen() {
  const dividerColor = useThemeColor({}, "divider");
  const dangerBackground = useThemeColor({}, "dangerBackground");
  const dangerText = useThemeColor({}, "dangerText");
  const { signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
      // Navigation will happen automatically via the SessionProvider
      // which updates the session state, triggering the navigation guard
    } catch (error) {
      console.error("Error signing out:", error);
      Alert.alert(
        "Logout Failed",
        "There was an error logging out. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Settings
        </ThemedText>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Section 1: Account Settings */}
        <View style={styles.section}>
          <ThemedSettingsButton
            icon="person.circle"
            title="Account Settings"
            onPress={() => {
              // Navigation logic will be added later
            }}
          />
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: dividerColor }]} />

        {/* Section 2: Notification Settings */}
        <View style={styles.section}>
          <ThemedSettingsButton
            icon="bell"
            title="Notification Settings"
            onPress={() => {
              // Navigation logic will be added later
            }}
          />
        </View>

        {/* Spacer to push logout button to bottom */}
        <View style={styles.spacer} />

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: dangerBackground }]}
          activeOpacity={0.7}
          onPress={handleLogout}
          disabled={isLoggingOut}
        >
          <IconSymbol
            name="door.left.hand.open"
            size={20}
            color={dangerText}
            style={styles.logoutIcon}
          />
          <ThemedText style={[styles.logoutText, { color: dangerText }]}>
            {isLoggingOut ? "Logging Out..." : "Log Out"}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "700",
    lineHeight: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 16,
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  spacer: {
    flex: 1,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginBottom: 100, // Space above tab bar
    borderRadius: 12,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
