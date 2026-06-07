import { useEffect, useState } from "react";

interface Props {
  onSearch: (username: string) => void;
  loading?: boolean;
}

export default function SearchBar({
  onSearch,
  loading,
}: Props) {
  const [username, setUsername] =
    useState("");

  const [debouncedUsername,
    setDebouncedUsername] =
    useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUsername(
        username
      );
    }, 500);

    return () =>
      clearTimeout(timer);
  }, [username]);

  useEffect(() => {
    if (
      debouncedUsername.trim().length > 2
    ) {
      onSearch(
        debouncedUsername
      );
    }
  }, [debouncedUsername]);

  const handleSearch = () => {
    if (username.trim()) {
      onSearch(username);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search GitHub Username..."
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <button
        onClick={handleSearch}
        disabled={loading}
      >
        {loading
          ? "Searching..."
          : "Search"}
      </button>
    </div>
  );
}