import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/app-context";
import { Toast } from "@/components/toast";

export const metadata: Metadata = {
  title: "HourSafe AI",
  description: "Protecting gig workers by insuring lost working hours.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
          <Toast />
        </AppProvider>
      </body>
    </html>
  );
}
