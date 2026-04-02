import { useState,useContext } from "react";
import { ChatContext } from "./ChatContext";
import { ChatList } from "./ChatList";
import { SearchInput } from "./SearchInput";
import "./Sidebar.css";

export const Sidebar = () => {
  const [query, setQuery] = useState("");


  const context = useContext(ChatContext);

  if (!context) {
	throw new Error("Sidebar must be used within ChatProvider");
  }

  const { state, dispatch } = context;
	
  const normalizedQuery = query.trim().toLowerCase();

  const filteredChats = state.chats
    .filter((chat) => {
      if (!normalizedQuery) return true;

      const title = chat.title.toLowerCase();
      const lastMessage =
        chat.messages.at(-1)?.content?.toLowerCase() || "";

      return (
        title.includes(normalizedQuery) ||
        lastMessage.includes(normalizedQuery)
      );
    })
    .sort((a, b) => {
      const aTime = a.messages.at(-1)?.timestamp || 0;
      const bTime = b.messages.at(-1)?.timestamp || 0;
      return bTime - aTime;
    });
  
  const createChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: "Новый чат",
      messages: [],
    };

    dispatch({ type: "CREATE_CHAT", payload: newChat });
  };

  return (
    <div className="sidebar">
      <button className="new-chat" onClick={createChat}>
        + Новый чат
      </button>

      <SearchInput value={query} onChange={setQuery} />

      <ChatList chats={filteredChats} activeId={state.activeChatId} />
    </div>
  );
};