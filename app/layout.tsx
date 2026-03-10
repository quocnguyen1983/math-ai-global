import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
export const metadata = {
  title: "AI Toán Học - Giải toán lớp 1-12 bằng AI",
  description:
    "Công cụ AI giải toán từ lớp 1 đến lớp 12. Phân tích chi tiết từng bước, vẽ đồ thị và hiển thị công thức LaTeX.",
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

      <body
        className="
        bg-white 
        dark:bg-[#343541] 
        text-black 
        dark:text-white 
        transition-colors duration-300
        min-h-screen
      "
      >
        {children}
      </body>
    </html>
  );
}