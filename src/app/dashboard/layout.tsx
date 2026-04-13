import { roboto } from "@/app/fonts";
import "@/app/globals.css";

export const metadata = { title: "Dashboard | Pascal Byabasaija" };

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  );
}
