import {
  TextInputProps,
  View,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import { ThemedTextInput } from "./ThemedTextInput";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";
import {
  CountryCode,
  getCallingCode,
  getCountryByCode,
  getFlagEmoji,
} from "@/constants/Countries";

export type ThemedPhoneNumberInputProps = TextInputProps & {
  phoneValue: string;
  countryCode: CountryCode;
  onBlur: () => void;
  onPhoneChange?: (phoneNumber: string) => void;
  onCountryCodeChange?: (countryCode: CountryCode) => void;
  onCountryPickerPress?: () => void;
};

export function ThemedPhoneNumberInput({
  style,
  phoneValue,
  countryCode,
  onBlur,
  onPhoneChange,
  onCountryCodeChange,
  onCountryPickerPress,
  ...rest
}: ThemedPhoneNumberInputProps) {
  const borderColor = useThemeColor({}, "icon");
  const country = getCountryByCode(countryCode);
  const callingCode = country?.callingCode || "";
  const flag = getFlagEmoji(countryCode);

  return (
    <View style={styles.container}>
      {/* Country selector button */}
      <Pressable
        style={[styles.countryButton, { borderColor }]}
        onPress={onCountryPickerPress}
      >
        <Text style={styles.flag}>{flag}</Text>
        <ThemedText style={styles.callingCode}>+{callingCode}</ThemedText>
        <ThemedText style={styles.dropdownArrow}>▼</ThemedText>
      </Pressable>

      {/* Phone number input */}
      <ThemedTextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneValue}
        onBlur={onBlur}
        onChangeText={(text) => {
          // Only allow digits
          const cleaned = text.replace(/[^0-9]/g, "");
          onPhoneChange?.(cleaned);
        }}
        inputMode="numeric"
        style={styles.input}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  countryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    gap: 6,
  },
  flag: {
    fontSize: 24,
  },
  callingCode: {
    fontSize: 16,
    fontWeight: "600",
  },
  dropdownArrow: {
    fontSize: 10,
    opacity: 0.5,
  },
  input: {
    flex: 1,
  },
});
