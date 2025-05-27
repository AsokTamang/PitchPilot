// app/layout.tsx
import Navbar from "../../components/navbar";

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
   <main className="font-work-sans">
            <Navbar />

            {children}
        </main>
  )
}
