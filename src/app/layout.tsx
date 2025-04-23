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
        <body className="border-[1px] border-gray-300 box-border min-h-screen">
          {children}
          <Script src="/nocopy.js" strategy="afterInteractive" />
          </body>
      </html>
    </ViewTransitions>
  );
}
