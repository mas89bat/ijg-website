import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | IJG Securities",
};

export default function TermsOfUsePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-sans text-3xl font-bold tracking-tight text-foreground">
        Terms of Use
      </h1>
      <p className="mt-4 text-muted-foreground">
        This page is under development. Please contact{" "}
        <a
          href="mailto:info@ijg.net"
          className="text-primary underline underline-offset-4"
        >
          info@ijg.net
        </a>{" "}
        for enquiries.
      </p>
    </div>
  );
}
