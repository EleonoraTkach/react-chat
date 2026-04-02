export const SettingsPanel = () => {
  return (
    <div className="fixed right-0 top-0 w-80 h-full bg-white shadow-lg p-4">
      <select>
        <option>GigaChat</option>
        <option>GigaChat-Plus</option>
        <option>GigaChat-Pro</option>
        <option>GigaChat-Max</option>
      </select>

      <input type="range" min={0} max={2} step={0.1} />
      <input type="range" min={0} max={1} step={0.1} />

      <input type="number" placeholder="Max Tokens" />

      <textarea placeholder="System Prompt" />

      <label>
        <input type="checkbox" /> Тёмная тема
      </label>

      <div className="flex gap-2 mt-4">
        <button>Сохранить</button>
        <button>Сбросить</button>
      </div>
    </div>
  );
};