export const AuthForm = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!value) {
      setError("Поле обязательно");
      return;
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-80 space-y-3">
        <input
          type="password"
          placeholder="Credentials"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div>
          <label><input type="radio" /> PERS</label>
          <label><input type="radio" /> B2B</label>
          <label><input type="radio" /> CORP</label>
        </div>

        {error && <ErrorMessage text={error} />}

        <button onClick={handleSubmit}>Войти</button>
      </div>
    </div>
  );
};