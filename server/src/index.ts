import express from "express";
import cors from "cors";
import githubRoutes from "./routes/githubRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("GitHub Developer Universe API Running 🚀");
});

const PORT = 8000;

app.use("/api/github", githubRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});