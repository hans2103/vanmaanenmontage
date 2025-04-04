import type {Metadata} from "next";
import "./globals.css";
import {ThemeProvider} from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Van Maanen Klus- en Montagebedrijf – Betrouwbaar Vakmanschap",
    description: "Zoekt u een ervaren klusser in de Kempen? Van Maanen Montage helpt met alle bouw- en montageklussen. Betrouwbaar, professioneel en vakkundig.",
    other: {
        "apple-mobile-web-app-title": "van Maanen montage",
    },
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
        <ThemeProvider
            attribute={'class'}
            defaultTheme={'system'}
            enableSystem
            disableTransitionOnChange>
            <div className={"flex w-full"}>
                <div className="fixed inset-0 flex justify-center sm:px-8">
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
