export interface GithubResponse {
    profile: {
      login: string;
      avatar_url: string;
      html_url: string;
      name: string;
      bio: string;
      followers: number;
      following: number;
      public_repos: number;
      public_gists: number;
      location: string;
    };
  
    analytics: {
      totalRepos: number;
      totalStars: number;
      developerScore: number;
    
      mostStarredRepo: {
        name: string;
        stars: number;
      };
    
      topLanguages: [string, number][];
    };
  
    topRepos: {
      name: string;
      description: string;
      stars: number;
      forks: number;
      language: string;
      url: string;
      updatedAt: string;
    
      openIssues: number;
      defaultBranch: string;
    }[];
  }