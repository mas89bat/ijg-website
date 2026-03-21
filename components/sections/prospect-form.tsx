"use client"

import { useReducer, useCallback } from "react"
import { toast } from "sonner"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { FormStepper } from "./form-stepper"
import {
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
  type FullProspectData,
} from "@/lib/validations"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type FormState = {
  currentStep: 0 | 1 | 2
  data: Partial<FullProspectData>
  isSubmitting: boolean
  isComplete: boolean
  error: string | null
  fieldErrors: Record<string, string>
}

type FormAction =
  | { type: "SET_FIELD"; field: string; value: unknown }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "CLEAR_ERRORS" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; error: string }

const initialState: FormState = {
  currentStep: 0,
  data: {},
  isSubmitting: false,
  isComplete: false,
  error: null,
  fieldErrors: {},
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
        fieldErrors: { ...state.fieldErrors, [action.field]: "" },
        error: null,
      }
    case "NEXT_STEP":
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 2) as 0 | 1 | 2,
        fieldErrors: {},
      }
    case "PREV_STEP":
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0) as 0 | 1 | 2,
        fieldErrors: {},
      }
    case "SET_ERRORS":
      return { ...state, fieldErrors: action.errors }
    case "CLEAR_ERRORS":
      return { ...state, fieldErrors: {}, error: null }
    case "SUBMIT_START":
      return { ...state, isSubmitting: true, error: null }
    case "SUBMIT_SUCCESS":
      return { ...state, isSubmitting: false, isComplete: true }
    case "SUBMIT_ERROR":
      return { ...state, isSubmitting: false, error: action.error }
  }
}

// ---------------------------------------------------------------------------
// Option data
// ---------------------------------------------------------------------------

const interestOptions = [
  { value: "investing", label: "I want to start investing" },
  { value: "planning", label: "I need financial planning advice" },
  { value: "stockbroking", label: "I\u2019m interested in stockbroking" },
  { value: "corporate", label: "I have a corporate/institutional need" },
  { value: "other", label: "Something else" },
] as const

const aumOptions = [
  { value: "under-100k", label: "Under N$100,000" },
  { value: "100k-500k", label: "N$100,000 \u2013 N$500,000" },
  { value: "500k-1m", label: "N$500,000 \u2013 N$1,000,000" },
  { value: "1m-5m", label: "N$1,000,000 \u2013 N$5,000,000" },
  { value: "5m-plus", label: "Over N$5,000,000" },
  { value: "unsure", label: "I\u2019m not sure yet" },
] as const

const timelineOptions = [
  { value: "immediately", label: "Immediately" },
  { value: "1-3-months", label: "Within 1\u20133 months" },
  { value: "exploring", label: "Just exploring for now" },
] as const

const contactMethods = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "whatsapp", label: "WhatsApp" },
] as const

const meetingOptions = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "flexible", label: "Flexible" },
] as const

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="mt-1.5 text-xs text-destructive" role="alert">
      {message}
    </p>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ProspectForm() {
  const [state, dispatch] = useReducer(formReducer, initialState)
  const { currentStep, data, isSubmitting, isComplete, fieldErrors } = state

  const setField = useCallback(
    (field: string, value: unknown) => {
      dispatch({ type: "SET_FIELD", field, value })
    },
    []
  )

  const handleContinue = useCallback(() => {
    const schemas = [stepOneSchema, stepTwoSchema, stepThreeSchema] as const
    const result = schemas[currentStep].safeParse(data)

    if (!result.success) {
      const errors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string
        if (!errors[key]) errors[key] = issue.message
      }
      dispatch({ type: "SET_ERRORS", errors })
      return
    }

    dispatch({ type: "NEXT_STEP" })
  }, [currentStep, data])

  const handleBack = useCallback(() => {
    dispatch({ type: "PREV_STEP" })
  }, [])

  const handleSubmit = useCallback(async () => {
    const result = stepThreeSchema.safeParse(data)
    if (!result.success) {
      const errors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string
        if (!errors[key]) errors[key] = issue.message
      }
      dispatch({ type: "SET_ERRORS", errors })
      return
    }

    dispatch({ type: "SUBMIT_START" })

    try {
      const res = await fetch("/api/prospect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(
          body?.message ?? "Something went wrong. Please try again."
        )
      }

      dispatch({ type: "SUBMIT_SUCCESS" })
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      dispatch({ type: "SUBMIT_ERROR", error: message })
      toast.error(message)
    }
  }, [data])

  // -------------------------------------------------------------------------
  // Success state
  // -------------------------------------------------------------------------

  if (isComplete) {
    return (
      <section
        id="prospect-form"
        className="border-t border-primary/30 bg-[oklch(0.12_0.05_245)] py-24"
      >
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="flex flex-col items-center gap-4">
            <CheckCircle2
              className="size-16 text-primary"
              strokeWidth={1.5}
            />
            <h2 className="text-3xl font-medium tracking-tight">
              Thank you, {data.fullName?.split(" ")[0]}!
            </h2>
            <p className="text-muted-foreground">
              We&apos;ve received your enquiry and will be in touch within 24
              hours.
            </p>
          </div>
        </div>
      </section>
    )
  }

  // -------------------------------------------------------------------------
  // Form
  // -------------------------------------------------------------------------

  return (
    <section
      id="prospect-form"
      className="border-t border-primary/30 bg-[oklch(0.12_0.05_245)] py-20"
    >
      <div className="mx-auto max-w-2xl px-4">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-medium tracking-tight">
            Start Your Journey
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tell us about your needs and we&apos;ll connect you with the right
            advisor.
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-10">
          <FormStepper currentStep={currentStep} />
        </div>

        {/* Steps */}
        <div className="min-h-[420px]">
          {currentStep === 0 && (
            <StepOne
              data={data}
              errors={fieldErrors}
              setField={setField}
              onContinue={handleContinue}
            />
          )}
          {currentStep === 1 && (
            <StepTwo
              data={data}
              errors={fieldErrors}
              setField={setField}
              onContinue={handleContinue}
              onBack={handleBack}
            />
          )}
          {currentStep === 2 && (
            <StepThree
              data={data}
              errors={fieldErrors}
              setField={setField}
              onBack={handleBack}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Step 1 — Your Needs
// ---------------------------------------------------------------------------

function StepOne({
  data,
  errors,
  setField,
  onContinue,
}: {
  data: Partial<FullProspectData>
  errors: Record<string, string>
  setField: (field: string, value: unknown) => void
  onContinue: () => void
}) {
  return (
    <div className="space-y-8">
      {/* Interest */}
      <fieldset className="space-y-3">
        <Label className="text-sm font-medium">
          What are you looking for?
        </Label>
        <RadioGroup
          value={data.interest ?? ""}
          onValueChange={(val: string) => setField("interest", val)}
        >
          {interestOptions.map((opt) => (
            <label
              key={opt.value}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors",
                data.interest === opt.value
                  ? "border-primary/50 bg-primary/5"
                  : "border-border hover:border-primary/30 hover:bg-muted/50"
              )}
            >
              <RadioGroupItem value={opt.value} />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
        </RadioGroup>
        <FieldError message={errors.interest} />
      </fieldset>

      {/* AUM Band */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">
          How much are you looking to invest?
        </Label>
        <Select
          value={data.aumBand ?? ""}
          onValueChange={(val) => { if (val) setField("aumBand", val) }}
        >
          <SelectTrigger className="h-10 w-full">
            <SelectValue placeholder="Select an amount range" />
          </SelectTrigger>
          <SelectContent>
            {aumOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError message={errors.aumBand} />
      </div>

      {/* Timeline */}
      <fieldset className="space-y-3">
        <Label className="text-sm font-medium">
          When are you looking to get started?
        </Label>
        <RadioGroup
          value={data.timeline ?? ""}
          onValueChange={(val: string) => setField("timeline", val)}
        >
          {timelineOptions.map((opt) => (
            <label
              key={opt.value}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors",
                data.timeline === opt.value
                  ? "border-primary/50 bg-primary/5"
                  : "border-border hover:border-primary/30 hover:bg-muted/50"
              )}
            >
              <RadioGroupItem value={opt.value} />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
        </RadioGroup>
        <FieldError message={errors.timeline} />
      </fieldset>

      <Button size="lg" className="w-full" onClick={onContinue}>
        Continue
      </Button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Step 2 — Your Details
// ---------------------------------------------------------------------------

function StepTwo({
  data,
  errors,
  setField,
  onContinue,
  onBack,
}: {
  data: Partial<FullProspectData>
  errors: Record<string, string>
  setField: (field: string, value: unknown) => void
  onContinue: () => void
  onBack: () => void
}) {
  return (
    <div className="space-y-6">
      {/* Full name */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-medium">
          Full name
        </Label>
        <Input
          id="fullName"
          placeholder="e.g. Johannes Müller"
          value={data.fullName ?? ""}
          onChange={(e) => setField("fullName", e.target.value)}
          aria-invalid={!!errors.fullName || undefined}
          className="h-10"
        />
        <FieldError message={errors.fullName} />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={data.email ?? ""}
          onChange={(e) => setField("email", e.target.value)}
          aria-invalid={!!errors.email || undefined}
          className="h-10"
        />
        <FieldError message={errors.email} />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium">
          Phone number
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+264 81 123 4567"
          value={data.phone ?? ""}
          onChange={(e) => setField("phone", e.target.value)}
          aria-invalid={!!errors.phone || undefined}
          className="h-10"
        />
        <FieldError message={errors.phone} />
      </div>

      {/* Preferred contact */}
      <fieldset className="space-y-3">
        <Label className="text-sm font-medium">
          Preferred contact method
        </Label>
        <RadioGroup
          value={data.preferredContact ?? ""}
          onValueChange={(val: string) => setField("preferredContact", val)}
          className="flex gap-3"
        >
          {contactMethods.map((opt) => (
            <label
              key={opt.value}
              className={cn(
                "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm transition-colors",
                data.preferredContact === opt.value
                  ? "border-primary/50 bg-primary/5 font-medium"
                  : "border-border hover:border-primary/30 hover:bg-muted/50"
              )}
            >
              <RadioGroupItem value={opt.value} />
              {opt.label}
            </label>
          ))}
        </RadioGroup>
        <FieldError message={errors.preferredContact} />
      </fieldset>

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        <Button variant="outline" size="lg" onClick={onBack}>
          Back
        </Button>
        <Button size="lg" className="flex-1" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Step 3 — Confirm
// ---------------------------------------------------------------------------

function StepThree({
  data,
  errors,
  setField,
  onBack,
  onSubmit,
  isSubmitting,
}: {
  data: Partial<FullProspectData>
  errors: Record<string, string>
  setField: (field: string, value: unknown) => void
  onBack: () => void
  onSubmit: () => void
  isSubmitting: boolean
}) {
  const interestLabel =
    interestOptions.find((o) => o.value === data.interest)?.label ?? "\u2014"
  const aumLabel =
    aumOptions.find((o) => o.value === data.aumBand)?.label ?? "\u2014"
  const timelineLabel =
    timelineOptions.find((o) => o.value === data.timeline)?.label ?? "\u2014"
  const contactLabel =
    contactMethods.find((o) => o.value === data.preferredContact)?.label ??
    "\u2014"

  return (
    <div className="space-y-8">
      {/* Summary */}
      <Card className="bg-muted/30">
        <CardContent className="space-y-4 text-sm">
          <h3 className="font-medium text-foreground">Your Summary</h3>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
            <dt className="text-muted-foreground">Looking for</dt>
            <dd>{interestLabel}</dd>
            <dt className="text-muted-foreground">Investment range</dt>
            <dd>{aumLabel}</dd>
            <dt className="text-muted-foreground">Timeline</dt>
            <dd>{timelineLabel}</dd>
            <dt className="text-muted-foreground">Name</dt>
            <dd>{data.fullName}</dd>
            <dt className="text-muted-foreground">Email</dt>
            <dd>{data.email}</dd>
            <dt className="text-muted-foreground">Phone</dt>
            <dd>{data.phone}</dd>
            <dt className="text-muted-foreground">Contact via</dt>
            <dd>{contactLabel}</dd>
          </dl>
        </CardContent>
      </Card>

      {/* Meeting preference */}
      <fieldset className="space-y-3">
        <Label className="text-sm font-medium">
          Preferred meeting time{" "}
          <span className="text-muted-foreground">(optional)</span>
        </Label>
        <RadioGroup
          value={data.meetingPreference ?? ""}
          onValueChange={(val: string) =>
            setField("meetingPreference", val)
          }
          className="flex gap-3"
        >
          {meetingOptions.map((opt) => (
            <label
              key={opt.value}
              className={cn(
                "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm transition-colors",
                data.meetingPreference === opt.value
                  ? "border-primary/50 bg-primary/5 font-medium"
                  : "border-border hover:border-primary/30 hover:bg-muted/50"
              )}
            >
              <RadioGroupItem value={opt.value} />
              {opt.label}
            </label>
          ))}
        </RadioGroup>
        <FieldError message={errors.meetingPreference} />
      </fieldset>

      {/* Privacy consent */}
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <Checkbox
            id="privacyConsent"
            checked={data.privacyConsent === true}
            onCheckedChange={(checked: boolean) =>
              setField("privacyConsent", checked)
            }
            aria-invalid={!!errors.privacyConsent || undefined}
            className="mt-0.5"
          />
          <Label
            htmlFor="privacyConsent"
            className="text-sm font-normal leading-snug text-muted-foreground"
          >
            I agree to IJG&apos;s{" "}
            <Link
              href="/legal/privacy"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              Privacy Policy
            </Link>{" "}
            and consent to being contacted.
          </Label>
        </div>
        <FieldError message={errors.privacyConsent} />
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          size="lg"
          className="flex-1"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting\u2026" : "Request a Consultation"}
        </Button>
      </div>
    </div>
  )
}
