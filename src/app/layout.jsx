import "./globals.css";
import Provider from "@/lib/provider";
import Header from "./components/header/header";

export const metadata = {
  title: "Draft Tool",
  description: "TDL Prep Tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main>
            <Header />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
