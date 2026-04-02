import {Message} from "./Message";
import type {MessageProp} from "./Message";
import {TypingIndicator} from "./TypingIndicator";

type MessageItem = MessageProp & {
  id: number;
};

type MessageListProp = {
  messages: MessageItem[];
  isLoading: boolean;
};

export const MessageList = ({ messages, isLoading }:MessageListProp) => {
  if (!messages.length) {
    return <div>Начните новый диалог</div>;
  }

  return (
    <div className="message list">
      {messages.map((msg) => (
        <Message
          key={msg.id}
          role={msg.role}
          text={msg.content}
        />
      ))}

      <TypingIndicator isVisible={isLoading} />
    </div>
  );
};