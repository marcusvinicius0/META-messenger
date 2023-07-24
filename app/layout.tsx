import "../styles/globals.css";

import Header from "./Header";
import Head from "./head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head />
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
