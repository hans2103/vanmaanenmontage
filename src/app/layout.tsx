import type {Metadata, Viewport} from "next";
import "./globals.css";
import {ThemeProvider} from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Van Maanen Klus- en Montagebedrijf – Betrouwbaar Vakmanschap",
    description: "Zoekt u een ervaren klusser in de Kempen? Van Maanen Montage helpt met alle bouw- en montageklussen. Betrouwbaar, professioneel en vakkundig.",
    applicationName: "van Maanen montage",
    appleWebApp: {
        capable: true,
        title: "van Maanen montage",
        statusBarStyle: "default",
    },
    formatDetection: {
        telephone: true,
        email: true,
        address: false,
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    colorScheme: "light dark",
    themeColor: [
        {media: "(prefers-color-scheme: light)", color: "#f0f9ff"},
        {media: "(prefers-color-scheme: dark)", color: "#082f49"},
    ],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="nl" suppressHydrationWarning>
        <body
            className={'flex h-full bg-sky-50 dark:bg-sky-950 antialiased'}
        >
        <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-sky-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
        >
            Direct naar inhoud
        </a>
        <ThemeProvider
            attribute={'class'}
            defaultTheme={'system'}
            enableSystem
            disableTransitionOnChange>
            <div className={"flex w-full"}>
                <div className="fixed inset-0 flex justify-center sm:px-8" aria-hidden="true">
                    <div className="flex w-full max-w-7xl lg:px-8">
                        <div
                            className="w-full bg-white ring-1 ring-sky-100 dark:bg-sky-900 dark:ring-sky-300/20"></div>
                    </div>
                </div>
                <div className={"relative flex w-full flex-col"}>
                    <Header/>
                    {children}
                    <Contact/>
                    <Footer/>
                </div>
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}
