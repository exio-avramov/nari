/**
 * Country data for phone number input
 * Structure designed for easy translation/internationalization
 */

export type CountryCode = string;

export type Country = {
  code: CountryCode;
  name: string; // This will be the key for translations in the future
  callingCode: string;
};

/**
 * Get flag emoji from country code
 */
export function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * All supported countries with their calling codes
 * Note: The 'name' field can be replaced with translation keys in the future
 * Example: name: "countries.us" instead of "United States"
 */
export const COUNTRIES: Country[] = [
  { code: "US", name: "United States", callingCode: "1" },
  { code: "GB", name: "United Kingdom", callingCode: "44" },
  { code: "CA", name: "Canada", callingCode: "1" },
  { code: "AU", name: "Australia", callingCode: "61" },
  { code: "DE", name: "Germany", callingCode: "49" },
  { code: "FR", name: "France", callingCode: "33" },
  { code: "IT", name: "Italy", callingCode: "39" },
  { code: "ES", name: "Spain", callingCode: "34" },
  { code: "NL", name: "Netherlands", callingCode: "31" },
  { code: "BE", name: "Belgium", callingCode: "32" },
  { code: "CH", name: "Switzerland", callingCode: "41" },
  { code: "AT", name: "Austria", callingCode: "43" },
  { code: "SE", name: "Sweden", callingCode: "46" },
  { code: "NO", name: "Norway", callingCode: "47" },
  { code: "DK", name: "Denmark", callingCode: "45" },
  { code: "FI", name: "Finland", callingCode: "358" },
  { code: "PL", name: "Poland", callingCode: "48" },
  { code: "CZ", name: "Czech Republic", callingCode: "420" },
  { code: "HU", name: "Hungary", callingCode: "36" },
  { code: "RO", name: "Romania", callingCode: "40" },
  { code: "BG", name: "Bulgaria", callingCode: "359" },
  { code: "GR", name: "Greece", callingCode: "30" },
  { code: "PT", name: "Portugal", callingCode: "351" },
  { code: "IE", name: "Ireland", callingCode: "353" },
  { code: "IN", name: "India", callingCode: "91" },
  { code: "PK", name: "Pakistan", callingCode: "92" },
  { code: "BD", name: "Bangladesh", callingCode: "880" },
  { code: "CN", name: "China", callingCode: "86" },
  { code: "JP", name: "Japan", callingCode: "81" },
  { code: "KR", name: "South Korea", callingCode: "82" },
  { code: "ID", name: "Indonesia", callingCode: "62" },
  { code: "PH", name: "Philippines", callingCode: "63" },
  { code: "VN", name: "Vietnam", callingCode: "84" },
  { code: "TH", name: "Thailand", callingCode: "66" },
  { code: "MY", name: "Malaysia", callingCode: "60" },
  { code: "SG", name: "Singapore", callingCode: "65" },
  { code: "BR", name: "Brazil", callingCode: "55" },
  { code: "MX", name: "Mexico", callingCode: "52" },
  { code: "AR", name: "Argentina", callingCode: "54" },
  { code: "CL", name: "Chile", callingCode: "56" },
  { code: "CO", name: "Colombia", callingCode: "57" },
  { code: "PE", name: "Peru", callingCode: "51" },
  { code: "ZA", name: "South Africa", callingCode: "27" },
  { code: "EG", name: "Egypt", callingCode: "20" },
  { code: "NG", name: "Nigeria", callingCode: "234" },
  { code: "KE", name: "Kenya", callingCode: "254" },
  { code: "RU", name: "Russia", callingCode: "7" },
  { code: "UA", name: "Ukraine", callingCode: "380" },
  { code: "TR", name: "Turkey", callingCode: "90" },
  { code: "SA", name: "Saudi Arabia", callingCode: "966" },
  { code: "AE", name: "United Arab Emirates", callingCode: "971" },
  { code: "IL", name: "Israel", callingCode: "972" },
  { code: "NZ", name: "New Zealand", callingCode: "64" },
];

/**
 * Get country by code
 */
export function getCountryByCode(code: CountryCode): Country | undefined {
  return COUNTRIES.find((country) => country.code === code);
}

/**
 * Get calling code by country code
 */
export function getCallingCode(code: CountryCode): string {
  const country = getCountryByCode(code);
  return country?.callingCode || "";
}

/**
 * Search countries by query (name, code, or calling code)
 */
export function searchCountries(query: string): Country[] {
  if (!query) return COUNTRIES;

  const lowerQuery = query.toLowerCase();
  return COUNTRIES.filter((country) => {
    return (
      country.name.toLowerCase().includes(lowerQuery) ||
      country.code.toLowerCase().includes(lowerQuery) ||
      country.callingCode.includes(lowerQuery)
    );
  });
}

// Import libphonenumber-js only for validation logic
import {
  isValidPhoneNumber as libIsValidPhoneNumber,
  parsePhoneNumberWithError,
  CountryCode as LibPhoneCountryCode,
} from "libphonenumber-js";

/**
 * Normalize phone number by removing leading zeros and non-digits
 * Uses libphonenumber-js for proper parsing
 */
export function normalizePhoneNumber(
  phoneInput: string,
  countryCode: CountryCode
): string {
  try {
    const phoneNumber = parsePhoneNumberWithError(
      phoneInput,
      countryCode as LibPhoneCountryCode
    );

    if (phoneNumber) {
      // Return the national number without leading zeros
      return phoneNumber.nationalNumber;
    }

    // If parsing fails, manually remove leading zeros and non-digits
    return phoneInput.replace(/^0+/, "").replace(/[^0-9]/g, "");
  } catch (error) {
    // Fallback: remove leading zeros and non-digits
    return phoneInput.replace(/^0+/, "").replace(/[^0-9]/g, "");
  }
}

/**
 * Validate phone number for a given country
 * Wrapper around libphonenumber-js validation
 */
export function validatePhoneNumber(
  phoneNumber: string,
  countryCode: CountryCode
): boolean {
  try {
    // First check if country code is valid
    const country = getCountryByCode(countryCode);
    if (!country) {
      return false;
    }

    // Use libphonenumber-js for validation
    return libIsValidPhoneNumber(
      phoneNumber,
      countryCode as LibPhoneCountryCode
    );
  } catch (error) {
    return false;
  }
}

/**
 * Validate country code
 */
export function isValidCountryCode(code: string): boolean {
  if (code.length !== 2) return false;
  return COUNTRIES.some((c) => c.code === code.toUpperCase());
}
