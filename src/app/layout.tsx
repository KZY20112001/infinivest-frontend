import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans, open_sans, quicksand, raleway } from "./fonts";
import { Provider } from "@/components/ui/provider";
import { Box } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Welcome to Infinivest",
  description: "Welcome to Infinivest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${raleway.variable} ${open_sans.variable} ${quicksand.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Box minH={"100vh"} w={"100vw"} background="#d2e7e7ec">
            {children}
          </Box>
        </Provider>
      </body>
    </html>
  );
}
