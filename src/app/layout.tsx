import type { Metadata } from "next";
import "./globals.css";
import { geistMono, open_sans, quicksand, raleway } from "./fonts";
import { Provider } from "@/components/ui/provider";
import { Box } from "@chakra-ui/react";
import Chat from "@/app/_components/chat/chat";
import Sidebar from "@/app/_components/sidebar/sidebar";
import Navbar from "@/app/_components/navbar/navbar";

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
        suppressHydrationWarning
        className={`${raleway.variable} ${open_sans.variable} ${quicksand.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Navbar />
          <Sidebar />
          <Chat />
          <Box minH={"100vh"} w={"100vw"} background="#d2e7e7ec">
            {children}
          </Box>
        </Provider>
      </body>
    </html>
  );
}
