import { Request, Response } from "express";
import {
  getGithubProfile,
  getGithubRepos,
} from "../services/githubService";

export const getGithubUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const username = req.params.username as string;

    const profile = await getGithubProfile(username);
    const repos = await getGithubRepos(username);

    const totalStars = repos.reduce(
      (sum: number, repo: any) =>
        sum + repo.stargazers_count,
      0
    );

    const languageMap: Record<string, number> = {};

    repos.forEach((repo: any) => {
      if (repo.language) {
        languageMap[repo.language] =
          (languageMap[repo.language] || 0) + 1;
      }
    });

    const topLanguages = Object.entries(languageMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const mostStarredRepo =
      repos.length > 0
        ? repos.reduce((prev: any, current: any) =>
            prev.stargazers_count >
            current.stargazers_count
              ? prev
              : current
          )
        : null;

        const topRepos = repos.map((repo: any) => ({
          name: repo.name,
        
          description:
            repo.description ||
            "No description available",
        
          stars: repo.stargazers_count,
        
          forks: repo.forks_count,
        
          language:
            repo.language || "Unknown",
        
          url: repo.html_url,
        
          updatedAt: repo.updated_at,
        
          openIssues:
            repo.open_issues_count,
        
          defaultBranch:
            repo.default_branch,
        }));

    const developerScore = Math.min(
      100,
      Math.floor(
        repos.length * 5 +
          totalStars * 2 +
          profile.followers * 0.5 +
          Object.keys(languageMap).length * 10
      )
    );

    res.status(200).json({
      profile,
      analytics: {
        totalRepos: repos.length,
        totalStars,
        developerScore,
        mostStarredRepo: mostStarredRepo
          ? {
              name: mostStarredRepo.name,
              stars:
                mostStarredRepo.stargazers_count,
            }
          : null,
        topLanguages,
      },
      topRepos,
    });
  } catch (error: any) {
    console.error(error);

    if (error.response?.status === 404) {
      res.status(404).json({
        success: false,
        message: "GitHub user not found",
      });
      return;
    }

    if (error.response?.status === 403) {
      res.status(403).json({
        success: false,
        message:
          "GitHub API rate limit exceeded",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};