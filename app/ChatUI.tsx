"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

type Message = {
  role: "user" | "assistant";
  content: string;
  image?: string;
  file?: {
    name: string;
    url: string;
  };
};
type Chat = {
  id: string;
  title: string;
  messages: Message[];
};
export default function ChatUI() {
  const router = useRouter();
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [user, setUser] = useState<any>(null);
    const [chats, setChats] = useState<any[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const handleNewChat = () => {
  const newChat = {
    id: Date.now().toString(),
    title: "Cuộc trò chuyện mới",
    messages: [],
  };

  setChats(prev => [newChat, ...prev]);
  setCurrentChatId(newChat.id);
};

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  
  const handleLogout = async () => {
  await fetch("/api/logout", {
    method: "POST",
  });

  router.push("/login");
};
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!currentChatId) return;

  const files = e.target.files;
  if (!files) return;

  Array.from(files).forEach((file) => {
    const reader = new FileReader();

    reader.onload = () => {
      const isImage = file.type.startsWith("image/");

      const newMessage: Message = {
        role: "user",
        content: "",
        ...(isImage
          ? { image: reader.result as string }
          : {
              file: {
                name: file.name,
                url: reader.result as string,
              },
            }),
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [...chat.messages, newMessage],
              }
            : chat
        )
      );
    };

    reader.readAsDataURL(file);
  });

  e.target.value = ""; // reset input
};
useEffect(() => {
  const fetchUser = async () => {
    const res = await fetch("/api/me");
    const data = await res.json();
    setUser(data.user);
  };

  fetchUser();
}, []);
  // Load localStorage
  useEffect(() => {
    const savedChats = localStorage.getItem("chats");
    if (savedChats) {
      const parsed = JSON.parse(savedChats);
      setChats(parsed);
      if (parsed.length > 0) {
        setCurrentChatId(parsed[0].id);
      }
    }
  }, []);

  // Save localStorage
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  const currentChat = chats.find(chat => chat.id === currentChatId);
  const messages = currentChat?.messages || [];
type Message = {
  role: "user" | "assistant";
  content: string;
  image?: string;
  file?: {
    name: string;
    url: string;
  };
};

  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: "Cuộc trò chuyện mới",
      messages: [
        { role: "assistant", content: "Chào bạn! Tôi có thể giúp gì?" }
      ]
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

    const userMessage = { role: "user", content: input };

    setChats(prevChats =>
  prevChats.map(chat => {
    if (chat.id === currentChatId) {

      const updatedMessages = [...chat.messages, userMessage];

      // 👉 Nếu chat chưa có title thực sự
      const newTitle =
        chat.messages.length === 0
          ? userMessage.content.slice(0, 30)
          : chat.title;

      return {
        ...chat,
        messages: updatedMessages,
        title: newTitle,
      };
    }
    return chat;
  })
);
setInput("");

    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const aiMessage = { role: "assistant", content: data.reply };

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

  return (
    <div className="flex h-screen w-screen bg-[#343541] text-white overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-64 bg-[#202123] p-4 flex flex-col">
        <button
  onClick={handleNewChat}
  className="w-full p-2 bg-gray-700 rounded"
>
  + Cuộc trò chuyện mới
</button>

        <button
          onClick={clearAllChats}
          className="mt-3 bg-[#5C4033] hover:bg-[#4a342a] text-white p-2 rounded transition"
        >
          Xóa toàn bộ
        </button>

        <div className="mt-4 space-y-2 overflow-y-auto">
          {chats.map(chat => (
  <div key={chat.id} className="group relative">

    <button
      onClick={() => setCurrentChatId(chat.id)}
      className={`w-full text-left p-2 rounded ${
        currentChatId === chat.id
          ? "bg-gray-600"
          : "bg-gray-700"
      }`}
    >
      {chat.title}
    </button>

    {/* Nút đổi tên */}
    <button
      onClick={() => {
        const newName = prompt("Đổi tên cuộc trò chuyện:", chat.title);
        if (!newName) return;

        setChats(prev =>
          prev.map(c =>
            c.id === chat.id
              ? { ...c, title: newName }
              : c
          )
        );
      }}
      className="absolute right-2 top-2 hidden group-hover:block text-xs"
    >
      ✏️
    </button>

  </div>
))}

        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        
        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg: any, index: number) => (
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
            </div>
          ))}

          {loading && (
            <div className="bg-green-800 p-4 rounded-lg max-w-3xl">
              <span className="font-bold text-white">AI:</span> Đang trả lời...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-[#40414F] border-t border-gray-700">
          <div className="flex gap-2 max-w-3xl mx-auto">
            
            <input
              className="flex-1 bg-[#40414F] border border-gray-600 rounded p-2 text-white focus:outline-none"
              placeholder="Nhập câu hỏi..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />
            <button
              onClick={handleSend}
              className="bg-green-600 px-4 rounded hover:bg-green-700"
            >
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
