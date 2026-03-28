import { Router } from "express";
const router = Router();
import { handleGetVideo } from "../controllers/video.controllers.js";

router.get("/video", handleGetVideo);

export default router;
