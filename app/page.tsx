"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-800">

        <div className="text-xl font-bold text-green-400">
          AI Toán Học
        </div>

        <div className="flex gap-6">

          <Link href="/login" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg">
            Đăng nhập
          </Link>

          <Link
            href="/register"
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
          >
            Đăng ký miễn phí
          </Link>

        </div>

      </nav>


      {/* HERO */}
      <section className="text-center py-32 px-6">

        <h1 className="text-5xl font-bold mb-6">
          AI Giải Toán Lớp 1-12
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          Hỏi bất kỳ bài toán lớp 1-12 nào và nhận lời giải chi tiết trong vài giây.
        </p>


        <div className="max-w-2xl mx-auto flex gap-3">

          <input
            placeholder="Ví dụ: Giải phương trình x³ - 3x + 1 = 0"
            className="flex-1 bg-[#1e293b] border border-gray-700 px-4 py-3 rounded-lg"
          />

          <Link
            href="/login"
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg"
          >
            Giải ngay
          </Link>

        </div>

      </section>


      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-8 px-10 py-16 max-w-6xl mx-auto">

        <div className="bg-[#1e293b] p-6 rounded-xl hover:bg-[#263349] transition">
          <h3 className="text-xl font-semibold mb-3">
            ⚡ Giải nhanh
          </h3>
          <p className="text-gray-400">
            AI giải bài toán trong vài giây.
          </p>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-xl hover:bg-[#263349] transition">
          <h3 className="text-xl font-semibold mb-3">
            📚 Giải chi tiết
          </h3>
          <p className="text-gray-400">
            Phân tích từng bước dễ hiểu.
          </p>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-xl hover:bg-[#263349] transition">
          <h3 className="text-xl font-semibold mb-3">
            🎯 Chuẩn chương trình
          </h3>
          <p className="text-gray-400">
            Phù hợp chương trình Toán lớp 1-12.
          </p>
        </div>

      </section>
    {/* MORE FEATURES */}
<section className="grid md:grid-cols-3 gap-8 px-10 py-10 max-w-6xl mx-auto">

  {/* H1 */}
  <div className="bg-[#1e293b] p-6 rounded-xl hover:bg-[#263349] transition">
    <h3 className="text-xl font-semibold mb-3">
      📘 Ôn Tập
    </h3>

    <p className="text-gray-400">
      Giải pháp giúp học sinh ôn tập hiệu quả môn Toán.
    </p>
  </div>


  {/* H2 */}
  <div className="bg-[#1e293b] p-6 rounded-xl hover:bg-[#263349] transition">
    <h3 className="text-xl font-semibold mb-3">
      🤖 Trợ lý Toán
    </h3>

    <p className="text-gray-400">
      Trợ lý đắc lực cho phụ huynh trong việc dạy con môn Toán.
    </p>
  </div>


  {/* H3 */}
  <div className="bg-[#1e293b] p-6 rounded-xl hover:bg-[#263349] transition">
    <h3 className="text-xl font-semibold mb-3">
      📝 Thư viện đề thi
    </h3>

    <p className="text-gray-400">
      Giúp giáo viên tạo đề thi nhanh và hiệu quả nhất.
    </p>
  </div>

</section>

      {/* CTA */}
      <section className="text-center py-20">

        <h2 className="text-3xl font-bold mb-6">
          Bắt đầu học toán với AI ngay hôm nay
        </h2>

        <Link
          href="/register"
          className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-lg text-lg"
        >
          Đăng ký miễn phí
        </Link>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-6 text-center text-gray-500">
        © 2026 AI Toán Học
      </footer>

    </div>
  );
}