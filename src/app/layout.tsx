import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="pt-br">
        <head>
          <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body className="border-[1px] border-gray-300 box-border min-h-screen">
          {children}
          <Script src="/nocopy.js" strategy="afterInteractive" />
        </body>
      </html>
    </ViewTransitions>
  );
}
