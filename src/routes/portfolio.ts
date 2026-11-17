//videographer-portfolio-backend\src\routes\portfolio.ts
import { Router } from "express";
import {
  getPortfolio,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} from "../controllers/portfolioController";

const router = Router();

router.get("/", getPortfolio);
router.post("/", addPortfolioItem);
router.put("/:id", updatePortfolioItem);
router.delete("/:id", deletePortfolioItem);

export default router;
