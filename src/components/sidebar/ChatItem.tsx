import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "./ChatContext";

export const ChatItem = ({ chat, isActive }: ChatItemProps) => {
  const context = useContext(ChatContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("ChatItem must be used within ChatProvider");
  }

  const { dispatch, state } = context;

  const handleOpen = () => {
    dispatch({ type: "SET_ACTIVE_CHAT", payload: chat.id });
    navigate(`/chat/${chat.id}`);
  };

  const handleRename = (e: React.MouseEvent) => {
    e.stopPropagation();

    const title = prompt("Новое название")?.trim();

    if (!title) return;

    dispatch({
      type: "RENAME_CHAT",
      payload: { id: chat.id, title },
    });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!confirm("Удалить чат?")) return;

    const isActiveChat = state.activeChatId === chat.id;

    dispatch({ type: "DELETE_CHAT", payload: chat.id });

    if (isActiveChat) {
      navigate("/");
    }
  };

  return (
    <div
      className={`chat-item ${isActive ? "active" : ""}`}
      onClick={handleOpen}
    >
      <div className="chat-content">
        <div className="chat-title">{chat.title}</div>
      </div>

      <div className="chat-actions">
        <button onClick={handleRename}>✏️</button>
        <button onClick={handleDelete}>🗑️</button>
      </div>
    </div>
  );
};