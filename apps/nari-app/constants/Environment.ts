import { z } from "zod";
import Constants from "expo-constants";

// Define the schema for environment variables
const envSchema = z.object({
  APP_ENVIRONMENT: z
    .enum(["development", "staging", "production"])
    .default("development"),
  EXPO_PUBLIC_SUPABASE_URL: z
    .url()
    .min(1, "EXPO_PUBLIC_SUPABASE_URL must be a valid URL"),
  EXPO_PUBLIC_SUPABASE_KEY: z
    .string()
    .min(1, "EXPO_PUBLIC_SUPABASE_KEY cannot be empty"),

  //Requirements
  REQUIREMENTS_MIN_PASSWORD_LENGTH: z.number().min(8).default(8),
});

// Type inference from the schema
type EnvironmentSchema = z.infer<typeof envSchema>;

// Export the validated configuration
const Environment: EnvironmentSchema = envSchema.parse(process.env);
export default Environment;
