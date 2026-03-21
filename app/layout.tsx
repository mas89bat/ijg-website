import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { ChatProvider } from "@/components/chat/chat-context";
import { ChatLauncher } from "@/components/chat/chat-launcher";
import { ChatPanel } from "@/components/chat/chat-panel";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ijg.net"),
  title: {
    default: "IJG | Independent Wealth Management | Namibia",
    template: "%s | IJG Namibia",
  },
  description:
    "IJG provides independent financial advisory, investment management, stockbroking, private equity, and wealth management services in Namibia.",
  keywords: [
    "wealth management Namibia",
    "investment management Windhoek",
    "stockbroking Namibia",
    "financial advisory Namibia",
    "IJG Securities",
    "unit trusts Namibia",
  ],
  openGraph: {
    type: "website",
    locale: "en_NA",
    siteName: "IJG Namibia",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <ChatProvider>
            {children}
            <ChatLauncher />
            <ChatPanel />
          </ChatProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
