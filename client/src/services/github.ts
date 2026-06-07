import axios from "axios";

export const fetchGithubUser = async (
  username: string
) => {
  const { data } = await axios.get(
    `https://github-developer-universe.onrender.com/api/github/${username}`
  );

  return data;
};