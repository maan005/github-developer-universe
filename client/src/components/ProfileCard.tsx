import type { GithubResponse } from "../types/github";

interface Props {
  data: GithubResponse;
}

export default function ProfileCard({
  data,
}: Props) {
  const { profile } = data;

  return (
    <div className="glass-card profile-card">
      <img
        src={profile.avatar_url}
        alt={profile.login}
        className="avatar"
      />

      <h2>{profile.name}</h2>

      <p>@{profile.login}</p>
      <a
          href={profile.html_url}
          target="_blank"
          rel="noreferrer"
          className="github-btn"
        >
          View GitHub Profile
      </a>

      <div className="stats-grid">
        <div>
          <h3>{profile.public_repos}</h3>
          <span>Repos</span>
        </div>

        <div>
          <h3>{profile.followers}</h3>
          <span>Followers</span>
        </div>

        <div>
          <h3>{profile.following}</h3>
          <span>Following</span>
        </div>

        <div>
          <h3>{profile.public_gists}</h3>
          <span>Gists</span>
        </div>
      </div>
    </div>
  );
}