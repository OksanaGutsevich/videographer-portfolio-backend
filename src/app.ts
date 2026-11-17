//videographer-portfolio-backend\src\app.ts
import express from "express";
import { cspMiddleware } from "./middleware/csp";
import portfolioRouter from "./routes/portfolio";
import servicesRouter from "./routes/services";
import settingsRouter from "./routes/settings";

const app = express();

app.use(cspMiddleware);
app.use(express.json());

app.use("/api/v1/portfolio", portfolioRouter);
app.use("/api/v1/services", servicesRouter);
app.use("/api/v1/settings", settingsRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
