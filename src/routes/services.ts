//videographer-portfolio-backend\src\routes\services.ts
import { Router } from "express";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../controllers/servicesController";

const router = Router();

router.get("/", getServices);
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
