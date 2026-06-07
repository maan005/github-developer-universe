import { Router } from "express";
import { getGithubUser } from "../controllers/githubController";

const router = Router();

router.get("/:username", getGithubUser);

export default router;