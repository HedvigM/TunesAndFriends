import type { Metadata, Viewport } from "next";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppProviders } from "components/providers/AppProviders";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Tunes and Friends",
  description: "Share and discover tunes with friends",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap"
        />
      </head>
      <body>
        <AppProviders>
          <UserProvider>
            {children}
          </UserProvider>
        </AppProviders>
      </body>
    </html>
  );
}

