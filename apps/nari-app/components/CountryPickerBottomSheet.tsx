import { useState, useMemo } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import ThemedBottomSheet from "./ThemedBottomSheet";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { ThemedTextInput } from "./ThemedTextInput";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  COUNTRIES,
  Country,
  CountryCode,
  getFlagEmoji,
  searchCountries,
} from "@/constants/Countries";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

type CountryPickerBottomSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  selectedCountryCode: CountryCode;
  onSelectCountry: (countryCode: CountryCode) => void;
};

export function CountryPickerBottomSheet({
  isVisible,
  onClose,
  selectedCountryCode,
  onSelectCountry,
}: CountryPickerBottomSheetProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Get theme colors
  const selectedItemBackground = useThemeColor({}, "bottomSheetSelectedItem");
  const textColor = useThemeColor({}, "text");

  // Filter countries based on search query
  const filteredCountries = useMemo(() => {
    return searchCountries(searchQuery);
  }, [searchQuery]);

  const handleCountrySelect = (code: CountryCode) => {
    onSelectCountry(code);
    handleClose();
  };

  const handleClose = () => {
    setSearchQuery("");
    onClose();
  };

  const renderCountryItem = ({ item }: { item: Country }) => {
    const isSelected = item.code === selectedCountryCode;

    return (
      <Pressable
        style={({ pressed }) => [
          styles.countryItem,
          (pressed || isSelected) && {
            backgroundColor: selectedItemBackground,
          },
        ]}
        onPress={() => handleCountrySelect(item.code)}
      >
        <Text style={styles.countryFlag}>{getFlagEmoji(item.code)}</Text>
        <View style={styles.countryInfo}>
          <ThemedText style={[styles.countryName, { color: textColor }]}>
            {item.name}
          </ThemedText>
          <ThemedText style={[styles.countryCode, { color: textColor }]}>
            +{item.callingCode}
          </ThemedText>
        </View>
        {isSelected && (
          <ThemedText style={[styles.checkMark, { color: textColor }]}>
            ✓
          </ThemedText>
        )}
      </Pressable>
    );
  };

  return (
    <ThemedBottomSheet
      isVisible={isVisible}
      onClose={handleClose}
      snapPoints={["80%"]}
      enableDynamicSizing={false}
      enableContentPanningGesture={false}
    >
      <ThemedView style={styles.sheetContent}>
        {/* Search input - auto-focused */}
        <ThemedTextInput
          placeholder="Search country or code..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
        />

        {/* Country list */}
        <BottomSheetFlatList
          data={filteredCountries}
          renderItem={renderCountryItem}
          keyExtractor={({ code }: Country) => code}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.countryListContent}
          keyboardShouldPersistTaps="handled"
        />
      </ThemedView>
    </ThemedBottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetContent: {
    flex: 1,
  },
  searchInput: {
    marginBottom: 16,
    marginHorizontal: 10,
  },
  countryList: {
    flex: 1,
  },
  countryListContent: {
    paddingBottom: 20,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
    gap: 12,
  },
  countryFlag: {
    fontSize: 28,
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  countryCode: {
    fontSize: 14,
    opacity: 0.6,
  },
  checkMark: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
