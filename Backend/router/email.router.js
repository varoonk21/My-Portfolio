import { Router } from "express";
const router = Router();
import { handleSendEmail } from "../controllers/email.controllers.js";

router.post("/email", handleSendEmail);

export default router;
