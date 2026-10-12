import { ThemeApplier } from "@/lib/theme-mode";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import TopoBackground from "./TopoBackground";
import { ServerAddressButton } from "@/components/ServerAddressButton";
import { ConfirmHost } from "@/components/ui/ConfirmDialog";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { getUiLocale, getLocaleResources } from "@/lib/i18n/server";
import { createTranslator } from "@/lib/i18n/translator";
import { LOCALE_DEFINITIONS } from "@/lib/i18n/locales";
import "./globals.css";

// The faces ship in the repo (Google Fonts' latin subsets) so a build
// never fetches from fonts.gstatic.com: a failed download there broke CI
// builds and made offline builds impossible.
const geistSans = localFont({
  src: "./fonts/geist.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/geist-mono.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const sourceSerif = localFont({
  src: [
    { path: "./fonts/source-serif-4.woff2", weight: "200 900", style: "normal" },
    { path: "./fonts/source-serif-4-italic.woff2", weight: "200 900", style: "italic" },
  ],
  variable: "--font-source-serif",
});

// Engraved-capitals display face for wordmarks, screen titles, and
// campaign names; body text stays on Geist/Source Serif.
const cinzel = localFont({
  src: "./fonts/cinzel.woff2",
  variable: "--font-display",
  weight: "400 900",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getUiLocale();
  return {
    title: "Open Dungeon Master",
    description: createTranslator(locale)("surfaceUi.siteDescription"),
    applicationName: "Open Dungeon Master",
    appleWebApp: {
      capable: true,
      title: "Open DM",
      statusBarStyle: "black-translucent",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#181420",
  interactiveWidget: "resizes-content",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getUiLocale();
  return (
    <html
      lang={locale}
      dir={LOCALE_DEFINITIONS[locale].direction}
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} ${cinzel.variable} h-full antialiased`}
      // browser extensions inject attributes into <html> before React loads
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider initialLocale={locale} initialCatalogs={getLocaleResources(locale, "ui")}>
        {/* The reader's theme and scale, applied to <html> before anything
            else paints (docs/vtt-parity-implementation-plan.md section 14). */}
        <ThemeApplier />
        {/* Dust motes first, so the contour canvas is drawn over them. */}
        <div className="ambient-dust" aria-hidden="true" />
        <TopoBackground />
        {children}
        {/* Every page: the QR and address a friend scans to add this server
            in the app or open it in a browser on the same network. */}
        <ServerAddressButton />
        {/* The app's own confirm and notice, asked from anywhere. */}
        <ConfirmHost />
        </LocaleProvider>
      </body>
    </html>
  );
}
