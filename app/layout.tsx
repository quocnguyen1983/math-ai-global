import "./globals.css";
import "katex/dist/katex.min.css";
export const metadata = {
  title: "Toanlop12 AI",
  description: "AI giải toán",
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