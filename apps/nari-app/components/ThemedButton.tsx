import { Pressable, PressableProps, ViewStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";

export type ThemedButtonProps = PressableProps & {
  title: string;
  variant?: "filled" | "outline";
  size?: "small" | "medium" | "large";
  lightColor?: string;
  darkColor?: string;
};

export function ThemedButton({
  title,
  variant = "filled",
  size = "medium",
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedButtonProps) {
  const buttonBackground = useThemeColor({}, "buttonBackground");
  const onBackgroundTextColor = useThemeColor({}, "buttonText");
  const textColor = useThemeColor({}, "text");

  const getButtonStyle = (): ViewStyle[] => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    };

    const sizeStyles: Record<typeof size, ViewStyle> = {
      small: { paddingHorizontal: 16, paddingVertical: 8 },
      medium: { paddingHorizontal: 24, paddingVertical: 12 },
      large: { paddingHorizontal: 32, paddingVertical: 16 },
    };

    const variantStyles: Record<typeof variant, ViewStyle> = {
      filled: { backgroundColor: buttonBackground },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: buttonBackground,
      },
    };

    return [baseStyle, sizeStyles[size], variantStyles[variant]];
  };

  const getButtonTextColor = (): string => {
    if (variant === "filled") {
      return onBackgroundTextColor;
    } else {
      return textColor;
    }
  };

  return (
    <Pressable
      style={({ pressed, hovered }) => {
        const resolvedStyle =
          typeof style === "function" ? style({ pressed, hovered }) : style;
        return [
          ...getButtonStyle(),
          { opacity: pressed ? 0.8 : 1 },
          resolvedStyle,
        ];
      }}
      {...rest}
    >
      <ThemedText style={{ color: getButtonTextColor(), fontWeight: "600" }}>
        {title}
      </ThemedText>
    </Pressable>
  );
}
