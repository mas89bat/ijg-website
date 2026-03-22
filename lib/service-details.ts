export interface ServiceDetail {
  id: string;
  title: string;
  headline: string;
  description: string[];
  features: { title: string; description: string }[];
  cta: string;
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  advisory: {
    id: "advisory",
    title: "Advisory",
    headline: "Strategic Corporate Finance Advice for Namibia",
    description: [
      "IJG's Advisory division provides expert corporate finance guidance to businesses across Namibia and the wider region. Our team brings decades of experience in capital raising, mergers and acquisitions, restructuring, and strategic financial planning.",
      "We work closely with boards, management teams, and shareholders to structure transactions that create value and support long-term growth. Our independence ensures that every recommendation is driven by your best interests — not product sales.",
      "From JSE and NSX listings to private placements, BEE transactions, and corporate restructuring, IJG's advisory team delivers institutional-quality advice tailored to the Namibian and Southern African markets.",
    ],
    features: [
      { title: "Capital Raising", description: "Equity and debt capital raising on the NSX and JSE, private placements, and structured finance solutions." },
      { title: "Mergers & Acquisitions", description: "End-to-end M&A advisory including valuation, due diligence, negotiation, and transaction execution." },
      { title: "Corporate Restructuring", description: "Financial restructuring, unbundlings, and strategic reviews for businesses navigating change." },
      { title: "BEE & Empowerment", description: "Black Economic Empowerment transaction structuring and compliance advisory." },
    ],
    cta: "Discuss Your Corporate Finance Needs",
  },
  "investment-management": {
    id: "investment-management",
    title: "Investment Management",
    headline: "Active Portfolio Management Tailored to Your Goals",
    description: [
      "IJG's Investment Management team actively manages portfolios across equities, fixed income, and balanced mandates. We serve institutional investors, pension funds, unit trust holders, and high-net-worth individuals.",
      "Our investment philosophy is grounded in fundamental research, disciplined risk management, and a deep understanding of Namibian and regional markets. Every portfolio is constructed to meet specific return objectives and risk parameters.",
      "With over N$15 billion in assets under management, IJG is one of Namibia's largest independent investment managers. Our track record demonstrates consistent, risk-adjusted performance across market cycles.",
    ],
    features: [
      { title: "Equity Portfolios", description: "Actively managed NSX and JSE equity mandates with a focus on bottom-up stock selection and fundamental research." },
      { title: "Fixed Income", description: "Government bond and money market portfolios optimised for yield, duration, and credit quality." },
      { title: "Balanced Mandates", description: "Multi-asset portfolios combining equities, bonds, and cash to deliver stable long-term returns." },
      { title: "Unit Trusts", description: "IJG Unit Trusts provide retail investors with access to professionally managed, diversified portfolios." },
    ],
    cta: "Explore Investment Solutions",
  },
  stockbroking: {
    id: "stockbroking",
    title: "Stockbroking",
    headline: "Direct Market Access with Research-Backed Execution",
    description: [
      "IJG Stockbroking provides direct access to the Namibian Stock Exchange (NSX) and Johannesburg Stock Exchange (JSE), backed by our own independent research capabilities.",
      "Our brokers combine execution expertise with real-time market intelligence to help clients make informed trading decisions. Whether you're an individual investor or an institutional portfolio manager, we provide personalised service and competitive execution.",
      "Every trade is supported by IJG's award-winning research team, giving you access to company analyses, sector reviews, and market commentaries that inform better investment decisions.",
    ],
    features: [
      { title: "NSX Trading", description: "Full-service trading on the Namibian Stock Exchange with personalised broker support." },
      { title: "JSE Access", description: "Cross-listed and dual-listed stock trading on the Johannesburg Stock Exchange." },
      { title: "Research-Backed", description: "Every trade supported by IJG's proprietary equity and economic research." },
      { title: "Settlement & Custody", description: "Efficient trade settlement, share custody, and portfolio reporting." },
    ],
    cta: "Start Trading",
  },
  "private-equity": {
    id: "private-equity",
    title: "Private Equity",
    headline: "Growth Capital for High-Potential Businesses",
    description: [
      "IJG Private Equity provides growth capital and strategic partnerships to high-potential businesses in Namibia and the broader Southern African region.",
      "We focus on established businesses with strong management teams, clear growth trajectories, and meaningful competitive advantages. Our approach goes beyond capital — we are active partners who contribute strategic insight, governance support, and industry connections.",
      "Our investments span multiple sectors including financial services, agriculture, manufacturing, and services. We seek to create lasting value for our portfolio companies, their employees, and the communities they serve.",
    ],
    features: [
      { title: "Growth Capital", description: "Expansion funding for established businesses ready to scale operations, enter new markets, or invest in capacity." },
      { title: "Strategic Partnerships", description: "Active partnership approach with board representation, strategic guidance, and network access." },
      { title: "Sector Expertise", description: "Deep knowledge of Namibian and regional industries including financial services, agriculture, and manufacturing." },
      { title: "Value Creation", description: "Structured value creation plans focused on operational improvement, governance, and sustainable growth." },
    ],
    cta: "Explore Partnership Opportunities",
  },
  "wealth-management": {
    id: "wealth-management",
    title: "Wealth Management",
    headline: "Holistic Financial Planning for Your Life Goals",
    description: [
      "IJG Wealth Management delivers comprehensive financial planning services covering retirement, estate planning, education funding, offshore investments, and stock portfolios.",
      "We take a holistic view of your financial life, understanding your goals, risk tolerance, and timeline before crafting a personalised plan. Our advisors are qualified financial planners who provide ongoing guidance as your circumstances evolve.",
      "As an independent firm, we have access to the full universe of financial products — not just those manufactured by a parent bank. This means your portfolio is built from the best available solutions, not limited to a single provider's shelf.",
    ],
    features: [
      { title: "Retirement Planning", description: "Pension fund optimisation, retirement annuities, and drawdown strategies for a comfortable retirement." },
      { title: "Estate Planning", description: "Wills, trusts, estate duty planning, and wealth transfer strategies to protect your legacy." },
      { title: "Education Planning", description: "Tax-efficient savings vehicles and investment plans to fund your children's education." },
      { title: "Offshore Investments", description: "International portfolio diversification through regulated offshore investment platforms." },
    ],
    cta: "Plan Your Financial Future",
  },
};
