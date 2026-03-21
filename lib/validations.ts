import { z } from "zod";

export const stepOneSchema = z.object({
  interest: z.enum(
    ["investing", "planning", "stockbroking", "corporate", "other"],
    { message: "Please select what you're looking for" }
  ),
  aumBand: z.string().min(1, "Please select an investment range"),
  timeline: z.enum(["immediately", "1-3-months", "exploring"], {
    message: "Please select a timeline",
  }),
});

export const stepTwoSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .regex(
      /^[+]?[\d\s()-]{7,}$/,
      "Please enter a valid phone number"
    ),
  preferredContact: z.enum(["email", "phone", "whatsapp"], {
    message: "Please select a contact method",
  }),
});

export const stepThreeSchema = z.object({
  meetingPreference: z.enum(["morning", "afternoon", "flexible"]).optional(),
  privacyConsent: z.literal(true, {
    message: "You must agree to the privacy policy",
  }),
});

export const fullProspectSchema = stepOneSchema
  .merge(stepTwoSchema)
  .merge(stepThreeSchema);

export type StepOneData = z.infer<typeof stepOneSchema>;
export type StepTwoData = z.infer<typeof stepTwoSchema>;
export type StepThreeData = z.infer<typeof stepThreeSchema>;
export type FullProspectData = z.infer<typeof fullProspectSchema>;
