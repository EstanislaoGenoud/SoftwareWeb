// src/components/ChatWidget.tsx
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { v4 as uuid } from "uuid";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";

// 🔹 Interfaz de mensaje
interface ChatMessage {
  id: string;
  text: string;
  createdAt: Timestamp | null;
  sender: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 🔹 Obtener chatId (uid si está logeado, sino uuid en localStorage)
  const getChatId = (): string => {
    if (auth.currentUser) {
      return auth.currentUser.uid;
    } else {
      let chatId = localStorage.getItem("chatId");
      if (!chatId) {
        chatId = uuid();
        localStorage.setItem("chatId", chatId);
      }
      return chatId;
    }
  };

  const chatId = getChatId();

  // 🔹 Suscripción en tiempo real a los mensajes
  useEffect(() => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...(doc.data() as Omit<ChatMessage, "id">),
            } as ChatMessage)
        )
      );
    });

    return () => unsubscribe();
  }, [chatId]);

  // 🔹 Scroll automático al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Enviar mensaje
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
      text: newMessage,
      createdAt: serverTimestamp(),
      sender: auth.currentUser ? auth.currentUser.email! : "guest",
    });

    setNewMessage("");
  };

  return (
    <div className="fixed bottom-5 right-5">
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Ventana del chat */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-xl shadow-xl flex flex-col"
        >
          {/* Header */}
          <div className="bg-purple-600 text-white p-3 rounded-t-xl">
            <h3 className="font-semibold">Chat de soporte</h3>
          </div>

          {/* Mensajes */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm flex flex-col">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg max-w-[70%] ${
                  msg.sender === (auth.currentUser?.email || "guest")
                    ? "bg-purple-500 text-white self-end ml-auto"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p>{msg.text}</p>
                {msg.createdAt && (
                  <span className="block text-xs text-gray-400 mt-1">
                    {msg.createdAt.toDate().toLocaleTimeString()}
                  </span>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-3 rounded-lg hover:bg-purple-700"
            >
              Enviar
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}