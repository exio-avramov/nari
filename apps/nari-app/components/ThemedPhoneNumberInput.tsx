import { TextInputProps, View, StyleSheet, useColorScheme } from "react-native";
import { ThemedTextInput } from "./ThemedTextInput";
import { useState } from "react";
import CountryPicker from "react-native-country-picker-modal";
import { CountryCode, getCountries } from "libphonenumber-js";
import { useThemeColor } from "@/hooks/useThemeColor";

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
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const countryCodes = getCountries();

  return (
    <View style={styles.container}>
      <CountryPicker
        theme={{
          onBackgroundTextColor: textColor,
          backgroundColor: backgroundColor,
        }}
        countryCodes={countryCodes as any}
        countryCode={countryCode as any}
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
