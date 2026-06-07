import type { GithubResponse } from "../types/github";

interface Props {
  data: GithubResponse;
}

export default function AnalyticsCards({
  data,
}: Props) {
  const analytics = data.analytics;

  return (
    <div className="analytics-grid">
      <div className="glass-card stat-card">
        <span>⭐</span>
        <h2>{analytics.totalStars}</h2>
        <p>Total Stars</p>
      </div>

      <div className="glass-card stat-card">
        <span>📦</span>
        <h2>{analytics.totalRepos}</h2>
        <p>Repositories</p>
      </div>

      <div className="glass-card stat-card">
        <span>🏆</span>
        <h2>{analytics.developerScore}</h2>
        <p>Developer Score</p>
      </div>

      <div className="glass-card stat-card">
        <span>💻</span>
        <h2>
          {analytics.topLanguages?.length}
        </h2>
        <p>Languages</p>
      </div>
    </div>
  );
}