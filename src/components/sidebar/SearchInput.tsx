import { useState } from "react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Поиск чатов..."
        className="SearchInput"
      />
    </div>
  );
};