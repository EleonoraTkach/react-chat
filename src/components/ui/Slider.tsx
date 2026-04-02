export const ErrorMessage = ({ text }: { text: string }) => (
  <div className="text-red-500 text-sm">{text}</div>
);

export const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full text-gray-400">
    💬
    <p>Начните новый диалог</p>
  </div>
);
