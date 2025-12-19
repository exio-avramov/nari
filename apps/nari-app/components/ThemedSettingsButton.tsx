import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type IconName = React.ComponentProps<typeof IconSymbol>["name"];

interface ThemedSettingsButtonProps {
  icon: IconName;
  title: string;
  onPress?: () => void;
  showChevron?: boolean;
}

export function ThemedSettingsButton({
  icon,
  title,
  onPress,
  showChevron = true,
}: ThemedSettingsButtonProps) {
  const textColor = useThemeColor({}, "text");
  const buttonBackground = useThemeColor({}, "settingsButton");

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonBackground }]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.buttonContent}>
        <View style={styles.buttonLeft}>
          <IconSymbol
            name={icon}
            size={24}
            color={textColor}
            style={styles.buttonIcon}
          />
          <ThemedText style={styles.buttonText}>{title}</ThemedText>
        </View>
        {showChevron && (
          <IconSymbol name="chevron.right" size={20} color={textColor} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  buttonIcon: {
    marginRight: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
