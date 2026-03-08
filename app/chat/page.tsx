"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { compile } from "mathjs";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type Message = {
  role: "user" | "assistant";
  content: string;
  graph?: {
    x: number[];
    y: number[];
  };
};

type Chat = {
  id: string;
  title: string;
  messages: Message[];
};

export default function Home() {

  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const currentChat = chats.find(c => c.id === currentChatId);
  const messages = currentChat?.messages || [];

  useEffect(() => {
    const saved = localStorage.getItem("chats");
    if (saved) {
      const parsed = JSON.parse(saved);
      setChats(parsed);
      if (parsed.length > 0) setCurrentChatId(parsed[0].id);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "Cuộc trò chuyện mới",
      messages: []
    };

    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const clearAllChats = () => {
    setChats([]);
    setCurrentChatId(null);
    localStorage.removeItem("chats");
  };

  const handleSend = async () => {

    if (!input || !currentChatId) return;

    const userMessage: Message = { role: "user", content: input };

    setChats(prev =>
      prev.map(chat =>
        chat.id === currentChatId
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat
      )
    );

    setInput("");
    setLoading(true);

    try {

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      let graph: { x: number[]; y: number[] } | undefined = undefined;
      const func = extractFunction(data.reply);

      if (func) graph = drawGraph(func);

      const aiMessage: Message = {
        role: "assistant",
        content: data.reply,
        graph
      };

      setChats(prev =>
        prev.map(chat =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, aiMessage] }
            : chat
        )
      );

      setLoading(false);

    } catch (error) {

      console.error(error);
      setLoading(false);

    }
  };

  function drawGraph(expression: string) {

    try {

      const expr = compile(expression);

      const xValues: number[] = [];
      const yValues: number[] = [];

      for (let x = -10; x <= 10; x += 0.1) {

        const y = expr.evaluate({ x });

        if (!isNaN(y) && isFinite(y)) {
          xValues.push(x);
          yValues.push(y);
        }

      }

      return { x: xValues, y: yValues };

    } catch {

  return undefined;

}

  }

  function extractFunction(text: string) {

    const regex = /(y\s*=|f\(x\)\s*=)?\s*([\-0-9xX\^\+\*\/\(\)\s\.]+)/;

    const match = text.match(regex);

    if (!match) return null;

    let func = match[2];

    func = func.replace(/\^/g, "**");
    func = func.replace(/(\d)x/g, "$1*x");
    func = func.replace(/x\(/g, "x*(");
    func = func.replace(/\)\(/g, ")*(");

    func = func.trim();

    if (!func.includes("x")) return null;

    return func;

  }

  return (

    <div className="flex h-screen w-screen bg-[#343541] text-white">

      <div className="w-64 bg-[#202123] p-4 flex flex-col">

        <button
          onClick={handleNewChat}
          className="w-full p-2 bg-gray-700 rounded"
        >
          + Cuộc trò chuyện mới
        </button>

        <button
          onClick={clearAllChats}
          className="mt-3 bg-[#5C4033] p-2 rounded"
        >
          Xóa toàn bộ
        </button>

        <div className="mt-4 space-y-2 overflow-y-auto">

          {chats.map(chat => (

            <button
              key={chat.id}
              onClick={() => setCurrentChatId(chat.id)}
              className={`w-full text-left p-2 rounded ${
                currentChatId === chat.id ? "bg-gray-600" : "bg-gray-700"
              }`}
            >
              {chat.title}
            </button>

          ))}

        </div>

      </div>

      <div className="flex-1 flex flex-col">

        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-4"
        >

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`max-w-3xl p-4 rounded-lg ${
                msg.role === "user"
                  ? "ml-auto bg-[#3E3F4B]"
                  : "bg-[#444654]"
              }`}
            >

              <span className="font-bold text-green-400">
                {msg.role === "user" ? "Bạn: " : "AI: "}
              </span>

              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {msg.content}
              </ReactMarkdown>

              {msg.graph && (

                <div style={{ height: 450, marginTop: 20, background: "#fff" }}>

                  <Plot
                    data={[
                      {
                        x: msg.graph.x,
                        y: msg.graph.y,
                        type: "scatter",
                        mode: "lines"
                      }
                    ]}
                    layout={{
                      title: { text: "Đồ thị hàm số" },
                      xaxis: { title: { text: "x" } },
                      yaxis: { title: { text: "y" } },
                      dragmode: "pan"
                    }}
                    config={{
                      responsive: true,
                      scrollZoom: true
                    }}
                    style={{ width: "100%", height: "100%" }}
                  />

                </div>

              )}

            </div>

          ))}

          {loading && (
            <div className="bg-green-800 p-4 rounded-lg max-w-3xl">
              AI: Đang trả lời...
            </div>
          )}

        </div>

        <div className="p-4 bg-[#40414F] border-t border-gray-700">

          <div className="flex gap-2 max-w-3xl mx-auto">

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi..."
              rows={1}
              className="flex-1 bg-[#40414F] border border-gray-600 rounded p-2"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />

            <button
              onClick={handleSend}
              className="bg-green-600 px-4 rounded"
            >
              Gửi
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}