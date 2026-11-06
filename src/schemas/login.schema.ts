import * as yup from "yup";

/**
 * Matches any Georgian Unicode character ranges:
 * - Mkhedruli & Asomtavruli (\u10A0 - \u10FF)
 * - Mtavruli capitals (\u1C90 - \u1CBF)
 * - Nuskhuri (\u2D00 - \u2D2F)
 */
const GEORGIAN_CHARS_REGEX = /[\u10A0-\u10FF\u1C90-\u1CBF\u2D00-\u2D2F]/;

/**
 * Validation schema for the Login form.
 * Enforces PRD P1.2 rules with exact error messages:
 * - Username: required, non-empty after trim -> "Username is required"
 * - Password: required -> "Password is required", min 6 chars -> "Password must be at least 6 characters"
 * - Georgian letters restriction -> "Only Latin characters are allowed"
 */
export const loginSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required("Username is required")
    .test(
      "no-georgian",
      "Only Latin characters are allowed",
      (val) => !val || !GEORGIAN_CHARS_REGEX.test(val),
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .test(
      "no-georgian",
      "Only Latin characters are allowed",
      (val) => !val || !GEORGIAN_CHARS_REGEX.test(val),
    ),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;
