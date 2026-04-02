import { Routes, Route } from "react-router-dom";
import { ChatProvider } from "./components/sidebar/ChatContext";
import { AppLayout } from "./components/layout/AppLayout";

const App = () => {
  return (
    <ChatProvider>
      <Routes>
        <Route path="/" element={<AppLayout />} />
        <Route path="/chat/:id" element={<AppLayout />} />
      </Routes>
    </ChatProvider>
  );
};

export default App;