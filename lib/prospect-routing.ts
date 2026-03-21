import type { ProspectFormData, ProspectRouting } from "@/types";

export function getProspectRouting(data: ProspectFormData): ProspectRouting {
  const { interest, aumBand } = data;

  const highValueBands = [
    "500k-1m",
    "1m-5m",
    "5m-plus",
  ];
  const isHighValue = highValueBands.includes(aumBand);

  switch (interest) {
    case "investing":
      if (isHighValue) {
        return {
          team: "wealth-management",
          emailTo: "wealth@ijg.net",
          priority: "high",
        };
      }
      return {
        team: "unit-trusts",
        emailTo: "unittrusts@ijg.net",
        priority: "standard",
      };

    case "planning":
      return {
        team: "wealth-management",
        emailTo: "wealth@ijg.net",
        priority: isHighValue ? "high" : "standard",
      };

    case "stockbroking":
      return {
        team: "stockbroking",
        emailTo: "trading@ijg.net",
        priority: isHighValue ? "high" : "standard",
      };

    case "corporate":
      return {
        team: "advisory",
        emailTo: "advisory@ijg.net",
        priority: "high",
      };

    default:
      return {
        team: "general",
        emailTo: "info@ijg.net",
        priority: "standard",
      };
  }
}
