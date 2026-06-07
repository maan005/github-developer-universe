import { useState } from "react";
import type { GithubResponse } from "../types/github";

interface Props {
  data: GithubResponse;
}

type SortOption =
  | "stars"
  | "name"
  | "updated";

export default function RepoGrid({
  data,
}: Props) {
  const [sortBy, setSortBy] =
    useState<SortOption>("stars");

  const [expandedRepo, setExpandedRepo] =
    useState<string | null>(null);

  const [visibleRepos, setVisibleRepos] =
    useState(6);

  const sortedRepos = [
    ...data.topRepos,
  ].sort((a, b) => {
    if (sortBy === "stars") {
      return b.stars - a.stars;
    }

    if (sortBy === "name") {
      return a.name.localeCompare(
        b.name
      );
    }

    return (
      new Date(
        b.updatedAt
      ).getTime() -
      new Date(
        a.updatedAt
      ).getTime()
    );
  });

  return (
    <div className="repo-section">
      <div className="repo-header">
        <h2>
          🚀 Repositories
        </h2>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value as SortOption
            )
          }
        >
          <option value="stars">
            Sort By Stars
          </option>

          <option value="name">
            Sort By Name
          </option>

          <option value="updated">
            Sort By Last Updated
          </option>
        </select>
      </div>

      <div className="repo-grid">
        {sortedRepos
          .slice(0, visibleRepos)
          .map((repo) => (
            <div
              key={repo.name}
              className="repo-card"
              onClick={() =>
                setExpandedRepo(
                  expandedRepo === repo.name
                    ? null
                    : repo.name
                )
              }
            >
              <h3>{repo.name}</h3>

              <p>
                {repo.description}
              </p>

              <div className="repo-footer">
                <span className="language-badge">
                  {repo.language}
                </span>

                <span>
                  ⭐ {repo.stars}
                </span>

                <span>
                  🍴 {repo.forks}
                </span>
              </div>

              {expandedRepo ===
                repo.name && (
                <div className="repo-details">
                  <p>
                    Open Issues:{" "}
                    {
                      repo.openIssues
                    }
                  </p>

                  <p>
                    Default Branch:{" "}
                    {
                      repo.defaultBranch
                    }
                  </p>

                  <p>
                    Updated:{" "}
                    {new Date(
                      repo.updatedAt
                    ).toLocaleDateString()}
                  </p>

                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) =>
                      e.stopPropagation()
                    }
                  >
                    View on GitHub →
                  </a>
                </div>
              )}
            </div>
          ))}
      </div>

      {visibleRepos <
        sortedRepos.length && (
        <div className="load-more-container">
          <button
            className="load-more-btn"
            onClick={() =>
              setVisibleRepos(
                (prev) => prev + 6
              )
            }
          >
            Load More Repositories
          </button>
        </div>
      )}
    </div>
  );
}