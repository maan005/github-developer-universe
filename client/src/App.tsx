import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";
import AnalyticsCards from "./components/AnalyticsCards";
import LanguageChart from "./components/LanguageChart";
import RepoGrid from "./components/RepoGrid";
import Stars from "./components/Stars";

import { fetchGithubUser } from "./services/github";

import type { GithubResponse } from "./types/github";

import "./App.css";

function App() {
  const [data, setData] =
    useState<GithubResponse | null>(null);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [recentSearches, setRecentSearches] =
    useState<string[]>(
      JSON.parse(
        localStorage.getItem(
          "recentSearches"
        ) || "[]"
      )
    );

  const searchUser = async (
    username: string
  ) => {
    try {
      setLoading(true);
      setError("");

      const result =
        await fetchGithubUser(username);

      setData(result);

      const updatedSearches = [
        username,
        ...recentSearches.filter(
          (item) => item !== username
        ),
      ].slice(0, 5);

      setRecentSearches(
        updatedSearches
      );

      localStorage.setItem(
        "recentSearches",
        JSON.stringify(
          updatedSearches
        )
      );
    } catch (error: any) {
      setData(null);

      setError(
        error?.response?.data?.message ||
          "Failed to fetch user"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Stars />

      <div className="hero">
        <h1>
          🌌 GitHub Developer Universe
        </h1>

        <p>
          Explore Any Developer's
          Coding Galaxy
        </p>

        <SearchBar
          onSearch={searchUser}
          loading={loading}
        />

        {recentSearches.length >
          0 && (
          <div className="recent-searches">
            <h3>
              Recent Searches
            </h3>

            <div className="recent-list">
              {recentSearches.map(
                (username) => (
                  <button
                    key={username}
                    onClick={() =>
                      searchUser(
                        username
                      )
                    }
                  >
                    {username}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        {loading && (
          <div className="loader">
            Loading GitHub
            Profile...
          </div>
        )}
      </div>

      {data && (
        <>
          <ProfileCard data={data} />

          <AnalyticsCards
            data={data}
          />

          <LanguageChart
            data={data}
          />

          <RepoGrid data={data} />
        </>
      )}
    </div>
  );
}

export default App;