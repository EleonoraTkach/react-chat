export type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
};

export type ChatState = {
  chats: Chat[];
  activeChatId: string | null;
  isLoading: boolean;
  error: string | null;
};

export type ChatAction =
  | { type: "CREATE_CHAT"; payload: Chat }
  | { type: "SET_ACTIVE_CHAT"; payload: string }
  | { type: "ADD_MESSAGE"; payload: { chatId: string; message: Message } }
  | { type: "DELETE_CHAT"; payload: string }
  | { type: "RENAME_CHAT"; payload: { id: string; title: string } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_STATE"; payload: ChatState };

export const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case "CREATE_CHAT":
      return {
        ...state,
        chats: [action.payload, ...state.chats],
        activeChatId: action.payload.id,
      };

    case "SET_ACTIVE_CHAT":
      return { ...state, activeChatId: action.payload };

    case "ADD_MESSAGE":
  return {
    ...state,
    chats: state.chats.map(chat => {
      if (chat.id !== action.payload.chatId) return chat;

      const updatedMessages = [...chat.messages, action.payload.message];

      // 👇 автогенерация названия
      let title = chat.title;

      if (chat.messages.length === 0) {
        const text = action.payload.message.content.trim();

        if (text.length > 3) {
          title = text.slice(0, 40);
        } else {
          title = `Диалог ${state.chats.length}`;
        }
      }

      return {
        ...chat,
        title,
        messages: updatedMessages,
      };
    }),
  };

    case "DELETE_CHAT":
      return {
        ...state,
        chats: state.chats.filter(c => c.id !== action.payload),
        activeChatId: null,
      };

    case "RENAME_CHAT":
      return {
        ...state,
        chats: state.chats.map(chat =>
          chat.id === action.payload.id
            ? { ...chat, title: action.payload.title }
            : chat
        ),
      };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_STATE":
      return action.payload;

    default:
      return state;
  }
};