import * as yup from "yup";

/**
 * Validation schema for Checkout shipping information.
 * Enforces PRD P5.2 rules with exact error messages.
 */
export const checkoutSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name must be at least 3 characters"),
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Please enter a valid email address"),
  address: yup
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .required("Address must be at least 5 characters"),
  city: yup.string().trim().required("City is required"),
});

export type CheckoutFormValues = yup.InferType<typeof checkoutSchema>;
