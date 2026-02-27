import "./globals.css";
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
    <html lang="vi" className="bg-[#343541]">
      <body className="bg-[#343541] text-white h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}

