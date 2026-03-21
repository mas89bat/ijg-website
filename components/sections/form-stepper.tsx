"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = ["Your Needs", "Your Details", "Confirm"] as const

export function FormStepper({ currentStep }: { currentStep: number }) {
  return (
    <nav aria-label="Form progress" className="w-full">
      <ol className="flex items-center justify-between">
        {steps.map((label, index) => {
          const isCompleted = index < currentStep
          const isActive = index === currentStep
          const isUpcoming = index > currentStep

          return (
            <li
              key={label}
              className="flex flex-1 items-center last:flex-none"
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300",
                    isCompleted && "bg-primary text-primary-foreground",
                    isActive && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    isUpcoming && "bg-muted text-muted-foreground"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="size-4" strokeWidth={3} />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    "hidden text-xs transition-colors duration-300 md:block",
                    isActive && "font-semibold text-foreground",
                    isCompleted && "font-medium text-primary",
                    isUpcoming && "font-medium text-muted-foreground"
                  )}
                >
                  {label}
                </span>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-3 h-px flex-1 transition-colors duration-500",
                    index < currentStep ? "bg-primary" : "bg-muted"
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
