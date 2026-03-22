"use client";

import { ProtectedRoute } from "@/components/research/protected-route";
import PortalLayout from "@/components/research/portal-layout";

export default function ResearchAppPage() {
  return (
    <ProtectedRoute>
      <PortalLayout />
    </ProtectedRoute>
  );
}
