import { useState } from "react";
import {X, MessageSquare} from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Panel de chat */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-white shadow-xl rounded-lg border flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 rounded-t-lg font-semibold">
            Asistente Virtual
          </div>

          {/* Mensajes */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            <div className="bg-gray-200 p-2 rounded max-w-[75%]">
              ¡Hola! ¿En qué puedo ayudarte? 🙂
            </div>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // acá podés manejar el envío de mensajes
            }}
            className="p-3 border-t flex gap-2"
          >
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="flex-1 border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}