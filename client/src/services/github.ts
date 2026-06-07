import axios from "axios";

export const fetchGithubUser = async (
  username: string
) => {
  const { data } = await axios.get(
    `http://localhost:8000/api/github/${username}`
  );

  return data;
};