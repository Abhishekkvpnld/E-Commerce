
import { useEffect, useRef, useState } from "react";
import { FiMessageCircle, FiX, FiSend, FiShoppingBag } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const SUGGESTIONS = [
  {
    icon: "👟",
    text: "Show me Nike shoes",
  },
  {
    icon: "💰",
    text: "Best products under ₹1000",
  },
  {
    icon: "🏷️",
    text: "What brands do you have?",
  },
  {
    icon: "💻",
    text: "Laptop recommendations",
  },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! 👋 I'm your AI shopping assistant. I can help you find products, compare prices, explore brands, and more.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const sendMessage = async (text) => {
    const userText = text || input;

    if (!userText.trim() || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userText,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const backendUrl =
        import.meta.env.VITE_APP_BACKEND_URL ||
        "http://localhost:8000/api";

      const res = await fetch(`${backendUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text:
            data.reply ||
            "Sorry, I couldn't find an answer for that.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ============================= */}
      {/* Floating Chat Button */}
      {/* ============================= */}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open AI shopping assistant"
        className={`
          fixed bottom-5 right-5 sm:bottom-6 sm:right-6
          z-[999]
          w-14 h-14 sm:w-16 sm:h-16
          rounded-full
          flex items-center justify-center
          text-white
          shadow-[0_10px_35px_rgba(220,38,38,0.35)]
          transition-all duration-300
          hover:scale-110
          active:scale-95
          ${
            isOpen
              ? "bg-gray-900 hover:bg-gray-800"
              : "bg-gradient-to-br from-red-500 via-red-600 to-red-700"
          }
        `}
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20" />
        )}

        {isOpen ? (
          <FiX className="text-2xl relative z-10" />
        ) : (
          <FiMessageCircle className="text-2xl relative z-10" />
        )}
      </button>

      {/* ============================= */}
      {/* Chat Window */}
      {/* ============================= */}

      {isOpen && (
        <div
          className="
            fixed
            z-[998]
            bottom-[88px]
            right-3
            sm:right-6
            w-[calc(100vw-24px)]
            sm:w-[390px]
            h-[min(650px,calc(100vh-110px))]
            bg-white
            rounded-3xl
            overflow-hidden
            border border-gray-200
            shadow-[0_25px_80px_rgba(0,0,0,0.18)]
            flex flex-col
            animate-[chatOpen_0.25s_ease-out]
          "
        >
          {/* ============================= */}
          {/* Header */}
          {/* ============================= */}

          <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-600 to-red-700 px-5 py-4 text-white">
            {/* Decorative circles */}

            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10" />

            <div className="absolute -left-8 -bottom-12 w-28 h-28 rounded-full bg-white/5" />

            <div className="relative flex items-center gap-3">
              {/* Bot Icon */}

              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                  <HiSparkles className="text-xl" />
                </div>

                {/* Online indicator */}

                <span className="absolute -right-0.5 -bottom-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-red-600 rounded-full" />
              </div>

              {/* Title */}

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-[15px]">
                    AI Shopping Assistant
                  </h3>

                  <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-white/15 border border-white/20">
                    AI
                  </span>
                </div>

                <p className="text-[11px] text-red-100 mt-0.5">
                  Ask me anything about our products
                </p>
              </div>

              {/* Close */}

              <button
                onClick={() => setIsOpen(false)}
                className="
                  w-8 h-8
                  rounded-full
                  bg-white/10
                  hover:bg-white/20
                  flex items-center justify-center
                  transition-colors
                "
              >
                <FiX className="text-lg" />
              </button>
            </div>
          </div>

          {/* ============================= */}
          {/* Suggestions */}
          {/* ============================= */}

          {messages.length === 1 && (
            <div className="px-4 pt-4 pb-2 bg-white">
              <div className="flex items-center gap-2 mb-3">
                <HiSparkles className="text-red-500" />

                <p className="text-xs font-semibold text-gray-700">
                  Try asking
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion.text}
                    onClick={() => sendMessage(suggestion.text)}
                    className="
                      group
                      text-left
                      p-3
                      rounded-2xl
                      border border-gray-200
                      bg-gray-50
                      hover:bg-red-50
                      hover:border-red-200
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                    "
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-base">
                        {suggestion.icon}
                      </span>

                      <span className="text-[11px] leading-4 text-gray-600 group-hover:text-red-600">
                        {suggestion.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ============================= */}
          {/* Messages */}
          {/* ============================= */}

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gradient-to-b from-gray-50 to-white scrollbar-thin scrollbar-thumb-gray-300">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {/* Bot Avatar */}

                {msg.role === "bot" && (
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                    <HiSparkles className="text-sm" />
                  </div>
                )}

                {/* Message */}

                <div
                  className={`
                    max-w-[78%]
                    px-3.5
                    py-2.5
                    text-[13px]
                    leading-5
                    whitespace-pre-wrap
                    ${
                      msg.role === "user"
                        ? `
                          bg-gradient-to-br
                          from-red-500
                          to-red-600
                          text-white
                          rounded-2xl
                          rounded-br-md
                          shadow-sm
                        `
                        : `
                          bg-white
                          text-gray-700
                          border
                          border-gray-200
                          rounded-2xl
                          rounded-bl-md
                          shadow-sm
                        `
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}

            {loading && (
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                  <HiSparkles className="text-sm" />
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />

                    <span
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    />

                    <span
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ============================= */}
          {/* Input Area */}
          {/* ============================= */}

          <div className="border-t border-gray-200 bg-white p-3">
            <div
              className="
                flex
                items-center
                gap-2
                p-1.5
                pl-4
                rounded-2xl
                border
                border-gray-200
                bg-gray-50
                focus-within:border-red-300
                focus-within:ring-4
                focus-within:ring-red-50
                transition-all
              "
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about products..."
                disabled={loading}
                className="
                  flex-1
                  bg-transparent
                  outline-none
                  text-sm
                  text-gray-700
                  placeholder:text-gray-400
                  min-w-0
                "
              />

              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="
                  flex-shrink-0
                  w-10
                  h-10
                  rounded-xl
                  bg-red-600
                  hover:bg-red-700
                  disabled:bg-gray-300
                  disabled:cursor-not-allowed
                  text-white
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-200
                  hover:scale-105
                  active:scale-95
                "
              >
                <FiSend className="text-sm" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-1 mt-2">
              <FiShoppingBag className="text-gray-400 text-[10px]" />

              <p className="text-[9px] text-gray-400">
                AI-powered product recommendations
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat animation */}

      <style>
        {`
          @keyframes chatOpen {
            from {
              opacity: 0;
              transform: translateY(12px) scale(0.97);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </>
  );
};

export default ChatBot;

