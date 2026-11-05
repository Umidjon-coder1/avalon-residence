import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avalon Residence",
  description: "Avalon Residence turar-joy majmuasi",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uz" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
