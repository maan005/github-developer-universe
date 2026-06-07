import axios from "axios";
import NodeCache from "node-cache";

const cache = new NodeCache({
  stdTTL: 60,
});

export const getGithubProfile = async (
  username: string
) => {
  const cacheKey = `profile-${username}`;

  const cached =
    cache.get(cacheKey);

  if (cached) {
    console.log(
      `CACHE HIT: ${cacheKey}`
    );
    return cached;
  }

  const { data } = await axios.get(
    `https://api.github.com/users/${username}`
  );

  cache.set(cacheKey, data);

  return data;
};

export const getGithubRepos = async (
  username: string
) => {
  const cacheKey = `repos-${username}`;

  const cached =
    cache.get(cacheKey);

  if (cached) {
    console.log(
      `CACHE HIT: ${cacheKey}`
    );
    return cached;
  }

  const { data } = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=100`
  );

  cache.set(cacheKey, data);

  return data;
};