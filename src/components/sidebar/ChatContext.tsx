import { createContext, useReducer, useEffect, useState } from "react";
import { chatReducer } from "./chatReducer";
import type { ChatState, ChatAction } from "./types";

type ChatContextType = {
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
};

export const ChatContext = createContext<ChatContextType | null>(null);

const initialState: ChatState = {
  chats: [],
  activeChatId: null,
  isLoading: false,
  error: null,
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("chat_state");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        dispatch({
          type: "SET_STATE",
          payload: parsed,
        });
      } catch (e) {
        console.warn("Ошибка парсинга localStorage", e);
      }
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    try {
      localStorage.setItem("chat_state", JSON.stringify(state));
    } catch (e) {
      console.warn("Ошибка сохранения localStorage", e);
    }
  }, [state, isInitialized]);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};