export const TypingIndicator = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;

  return (
    <div className="flex gap-1 p-3">
      <span className="animate-bounce">•</span>
      <span className="animate-bounce delay-150">•</span>
      <span className="animate-bounce delay-300">•</span>
    </div>
  );
};