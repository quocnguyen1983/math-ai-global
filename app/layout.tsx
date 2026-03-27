import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
export const metadata = {
  title: "AI Math Solver - AI Math Solver for K-12 Students",
  description:
    "AI Math Solver for K-12 Students. Step-by-step solutions, graph plotting, and LaTeX-formatted formulas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        {/* Giữ theme sau khi reload */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (localStorage.getItem("theme") === "dark") {
                document.documentElement.classList.add("dark");
              }
            `,
          }}
        />
      </head>

      <body className="bg-[#020617] text-white">
        {children}
      </body>
    </html>
  );
}