import * as yup from "yup";

/**
 * Validation schema for the Login form.
 * Enforces PRD P1.2 rules with exact error messages:
 * - Username: required, non-empty after trim -> "Username is required"
 * - Password: required -> "Password is required", min 6 chars -> "Password must be at least 6 characters"
 */
export const loginSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;

