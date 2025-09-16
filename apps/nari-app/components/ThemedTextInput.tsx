import { TextInput, TextInputProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextInputProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "icon");

  return (
    <TextInput
      style={[
        {
          backgroundColor,
          color: textColor,
          borderWidth: 1,
          borderColor,
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 14,
          fontSize: 16,
        },
        style,
      ]}
      placeholderTextColor={borderColor}
      {...rest}
    />
  );
}
