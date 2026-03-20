"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
export default function HomePage() {
  const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");
const [loading, setLoading] = useState(false);
const [remaining, setRemaining] = useState(3);
const [input, setInput] = useState("");
const [freeCount, setFreeCount] = useState(3);

const handleContinue = () => {
  setAnswer("")
  setQuestion("")
  setInput("")
};
useEffect(() => {
  const count = Number(localStorage.getItem("demoCount") || 0);
  setRemaining(3 - count);
}, []);
const handleSolve = async () => {
  if (!input) return;
  const count = Number(localStorage.getItem("demoCount") || 0);
  if (count >= 3) {
    alert("You have used all 3 free attempts. Please sign up to continue using the AI.");
    window.location.href = "/register";
    return;
  }
  setLoading(true);
  const res = await fetch("/api/demo", {
    method: "POST",
    body: JSON.stringify({ question: input }),
  });
  const data = await res.json();
  setAnswer(data.answer);
  localStorage.setItem("demoCount", String(count + 1));
  setRemaining(3 - (count + 1));
  setLoading(false);
};
    return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-800">

         {/* LEFT SIDE */}
  <div className="flex items-center gap-6">

    <div className="text-xl font-bold text-green-400">
      🤖AI Math Solver
    </div>

    <Link
      href="/help"
      className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
    >
      Contact
    </Link>

    <Link
      href="/upgrade"
      className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
    >
      Upgrade Plan
    </Link>

  </div>
        <div className="flex gap-6">

          <Link href="/login" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg">
            Login
          </Link>

          <Link
            href="/register"
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
          >
            Sign Up for Free
          </Link>
        </div>
      </nav>
      {/* HERO */}
      <section className="text-center py-32 px-6">

        <h1 className="text-5xl font-bold mb-6">
          AI Math Solver for K-12 Students
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          Solve any K-12 math problem and get step-by-step solutions in seconds
        </p>
        <div className="container">

  {/* Hàng 1 */}
  <div className="top-row">
    <input
      className="math-input"
      placeholder="Enter your math problem here"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />

    <button className="solve-btn" onClick={handleSolve}>
      Solve Now
    </button>

    <div className="free-count">
      You have {remaining} free attempts remaining
    </div>
  </div>


  {/* Bài toán */}
  {question && (
    <div className="question-box">
      {question}
    </div>
  )}


  {/* Lời giải */}
{(answer || loading) && (
  <div className="answer-box">

    {loading ? (

      <p className="text-green-400 animate-pulse">
        🤖 AI is generating the solution...
      </p>

    ) : (

      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p({ children }) {
            return <p className="my-2">{children}</p>;
          },
        }}
      >
        {answer}
      </ReactMarkdown>

    )}

  </div>
)}


  {/* Nút tiếp tục */}
  {/* Nút tiếp tục */}
{answer && (
  <div className="text-center mt-8">
    <button
      className="continue-btn"
      onClick={handleContinue}
    >
      Continue
    </button>
  </div>
)}

</div>

      </section>
    {/* MORE FEATURES */}
<section className="grid md:grid-cols-3 gap-8 px-10 py-10 max-w-6xl mx-auto">
  <div className="bg-[#1e293b] p-6 rounded-xl hover:bg-[#263349] transition">
          <h3 className="text-xl font-semibold mb-3">
            ⚡ Fast Solutions
          </h3>
          <p className="text-gray-400">
            AI solves math problems within seconds.
          </p>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-xl hover:bg-[#263349] transition">
          <h3 className="text-xl font-semibold mb-3">
            📚 Step-by-Step Solutions
          </h3>
          <p className="text-gray-400">
            Clear step-by-step explanations.
          </p>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-xl hover:bg-[#263349] transition">
          <h3 className="text-xl font-semibold mb-3">
            🎯 Curriculum Aligned
          </h3>
          <p className="text-gray-400">
            Aligned with the K-12 math curriculum.
          </p>
        </div>
  {/* H1 */}
  <div className="bg-[#1e293b] p-6 rounded-xl hover:bg-[#263349] transition">
    <h3 className="text-xl font-semibold mb-3">
      📘 Practice & Review
    </h3>

    <p className="text-gray-400">
      An effective solution for students to review and practice Math.
    </p>
  </div>


  {/* H2 */}
  <div className="bg-[#1e293b] p-6 rounded-xl hover:bg-[#263349] transition">
    <h3 className="text-xl font-semibold mb-3">
      🤖 Math Assistant
    </h3>

    <p className="text-gray-400">
      A helpful assistant for parents teaching their children Math.
    </p>
  </div>


  {/* H3 */}
  <div className="bg-[#1e293b] p-6 rounded-xl hover:bg-[#263349] transition">
    <h3 className="text-xl font-semibold mb-3">
      📝 Exam Library
    </h3>

    <p className="text-gray-400">
      Helps teachers create exams quickly and efficiently.
    </p>
  </div>

</section>

      {/* CTA */}
      <section className="text-center py-20">

        <h2 className="text-3xl font-bold mb-6">
          Start learning math with AI today
        </h2>

        <Link
          href="/register"
          className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-lg text-lg"
        >
          Sign Up for Free
        </Link>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-6 text-center text-gray-500">
        © 2026 AI Math Solver
      </footer>

    </div>
  );
}