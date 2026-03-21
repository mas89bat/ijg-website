const financialServiceSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "IJG Securities (Pty) Ltd",
  url: "https://www.ijg.net",
  description:
    "Independent financial advisory, investment management, stockbroking, private equity, and wealth management in Namibia.",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "4th Floor, 1@Steps, Corner of Grove & Chasie Streets, Kleine Kuppe",
    addressLocality: "Windhoek",
    addressCountry: "NA",
  },
  telephone: "+264 61 256 666",
  areaServed: { "@type": "Country", name: "Namibia" },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "IJG Namibia",
  url: "https://www.ijg.net",
};

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
