import { useState, useRef, useEffect } from "react";
import { IoChatbubbleEllipsesOutline, IoClose, IoSend } from "react-icons/io5";
import axios from "axios";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How can I help you? You can ask me about products, prices, or say 'show me images of Samsung products'!", sender: "bot" },
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = {
      id: Date.now(),
      text: input.trim(),
      sender: "user",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        import.meta.env.VITE_backEnd_URL + "/chat",
        { message: userMsg.text }
      );

      // ✅ Build bot message — text + optional images
      const botMsg = {
        id: Date.now() + 1,
        text: data.answer || data.reply || data.message || "No response.",
        sender: "bot",
        images: data.images || [], // ← images from backend if any
      };

      setMessages((prev) => [...prev, botMsg]);

    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg = {
        id: Date.now() + 1,
        text: "Sorry, failed to get a response. Please try again.",
        sender: "bot",
        images: [],
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Renders text with line breaks
  const renderText = (text) => {
    return text.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        <br />
      </span>
    ));
  };

  // ✅ Renders product image cards
  const renderImages = (images) => {
    if (!images || images.length === 0) return null;

    return (
      <div className="mt-2 flex flex-col gap-2">
        {images.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
          >
            {/* Product Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[160px] object-cover"
              onError={(e) => {
                // If image fails to load, show placeholder
                e.target.src =
                  "https://via.placeholder.com/300x160?text=No+Image";
              }}
            />
            {/* Product Info below image */}
            <div className="p-2">
              <p className="text-xs font-semibold text-slate-700 truncate">
                {item.name}
              </p>
              <p className="text-xs text-indigo-600 font-bold">
                Rs. {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg shadow-indigo-200 transition-all hover:scale-110 active:scale-95 cursor-pointer z-50"
      >
        <IoChatbubbleEllipsesOutline size={28} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[350px]">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden border border-slate-200 h-[480px]">

        {/* Header */}
        <div className="bg-indigo-600 text-white px-5 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-base">💬 ChatBot</h3>
            <p className="text-xs text-indigo-200">Ask me anything</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-indigo-700 p-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
          {messages.map((msg, index) => (
            <div
              key={msg.id != null ? msg.id : `msg-${index}`}
              className={`max-w-[80%] ${
                msg.sender === "user" ? "ml-auto" : ""
              }`}
            >
              {/* Text bubble */}
              <div
                className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white rounded-br-sm shadow-sm"
                    : "bg-white text-slate-700 border border-slate-200 rounded-bl-sm shadow-sm"
                }`}
              >
                {renderText(msg.text)}
              </div>

              {/* ✅ Images below the text bubble (only for bot messages) */}
              {msg.sender === "bot" && renderImages(msg.images)}
            </div>
          ))}

          {/* Loading dots */}
          {loading && (
            <div className="max-w-[80%] px-4 py-3 bg-white border border-slate-200 rounded-2xl rounded-bl-sm shadow-sm">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-slate-200 bg-white flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={loading}
            className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-slate-100 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white p-2.5 rounded-xl transition-all active:scale-95 cursor-pointer shadow-sm shadow-indigo-200"
          >
            <IoSend size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}