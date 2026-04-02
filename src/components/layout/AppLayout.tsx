import { useState } from "react";
import { Sidebar } from "../sidebar/Sidebar";
import { ChatWindow } from "../chat/ChatWindow";
import "./AppLayout.css";

export const AppLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="layout">
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <Sidebar />
      </aside>

      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}

      <main className="chat">
        <button
          className="burger"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <ChatWindow />
      </main>
    </div>
  );
};