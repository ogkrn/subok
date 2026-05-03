import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata = {
  title: "Subok - Stay Safe, Stay Connected",
  description: "Ping your location and status to let your loved ones know you're safe. Replace constant phone calls with a simple safety check.",
  keywords: "safety, location sharing, family safety, ping location, check-in app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
