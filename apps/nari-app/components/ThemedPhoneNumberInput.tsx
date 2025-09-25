import { TextInputProps, View, StyleSheet } from "react-native";
import { ThemedTextInput } from "./ThemedTextInput";
import { useState } from "react";
import { CountryCode } from "react-native-country-picker-modal";
import CountryPicker from "react-native-country-picker-modal";

export type ThemedPhoneNumberInputProps = TextInputProps & {
  phoneValue: string;
  countryCode: CountryCode;
  onBlur: () => void;
  onPhoneChange?: (phoneNumber: string) => void;
  onCountryCodeChange?: (countryCode: CountryCode) => void;
};
export function ThemedPhoneNumberInput({
  style,
  phoneValue,
  countryCode,
  onBlur,
  onPhoneChange,
  onCountryCodeChange,
  ...rest
}: ThemedPhoneNumberInputProps) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  return (
    <View style={styles.container}>
      <CountryPicker
        containerButtonStyle={{ ...styles.countryButton }}
        countryCode={countryCode}
        withCallingCodeButton
        withCallingCode
        withFilter
        withFlag
        visible={isPickerVisible}
        onSelect={(country) => {
          onCountryCodeChange?.(country.cca2 as CountryCode);
          setIsPickerVisible(false);
        }}
        onClose={() => setIsPickerVisible(false)}
      />

      <ThemedTextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneValue}
        onBlur={onBlur}
        onChangeText={onPhoneChange}
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
  },
  countryButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    marginLeft: 8,
  },
});
