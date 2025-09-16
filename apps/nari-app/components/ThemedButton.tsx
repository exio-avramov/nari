import { Pressable, PressableProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";

export type ThemedButtonProps = PressableProps & {
  title: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  lightColor?: string;
  darkColor?: string;
};

export function ThemedButton({
  title,
  variant = "primary",
  size = "medium",
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedButtonProps) {
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: 12,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    };

    const sizeStyles = {
      small: { paddingHorizontal: 16, paddingVertical: 8 },
      medium: { paddingHorizontal: 24, paddingVertical: 12 },
      large: { paddingHorizontal: 32, paddingVertical: 16 },
    };

    const variantStyles = {
      primary: { backgroundColor: tintColor },
      secondary: {
        backgroundColor: backgroundColor,
        borderWidth: 1,
        borderColor: tintColor,
      },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: tintColor,
      },
    };

    return [baseStyle, sizeStyles[size], variantStyles[variant]];
  };

  const getTextColor = () => {
    if (variant === "primary") return "#fff";
    return tintColor;
  };

  return (
    <Pressable
      style={({ pressed, hovered }) => [
        getButtonStyle(),
        { opacity: pressed ? 0.8 : 1 },
        typeof style === "function" ? style({ pressed, hovered }) : style,
      ]}
      {...rest}
    >
      <ThemedText style={{ color: getTextColor(), fontWeight: "600" }}>
        {title}
      </ThemedText>
    </Pressable>
  );
}
