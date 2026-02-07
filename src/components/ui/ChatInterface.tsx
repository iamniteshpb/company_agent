import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, User, Bot, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: "text" | "chart" | "table";
  data?: any;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 p-4">
      <Bot className="w-6 h-6 text-primary mr-3" />
      <div className="flex gap-1">
        <span className="typing-dot w-2 h-2 bg-primary rounded-full" />
        <span className="typing-dot w-2 h-2 bg-primary rounded-full" />
        <span className="typing-dot w-2 h-2 bg-primary rounded-full" />
      </div>
    </div>
  );
}

export function ChatInterface({ messages, onSendMessage, isLoading = false, placeholder = "Ask me anything about your business data..." }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[75%] p-4",
                  message.role === "user"
                    ? "chat-bubble-user"
                    : "chat-bubble-ai"
                )}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                {message.data && (
                  <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                    <pre className="text-xs font-mono text-muted-foreground overflow-x-auto">
                      {JSON.stringify(message.data, null, 2)}
                    </pre>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.role === "user" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-accent" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border/50">
        <form onSubmit={handleSubmit} className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="w-full px-5 py-4 pr-14 bg-muted/30 border border-border/50 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
        <div className="flex items-center justify-center gap-1 mt-3 text-xs text-muted-foreground">
          <Sparkles className="w-3 h-3" />
          <span>Powered by AI Analytics Agent</span>
        </div>
      </div>
    </div>
  );
}
