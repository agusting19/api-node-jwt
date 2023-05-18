import { Router } from "express";
import { singup, singin, profile } from "../controllers/auth.controller";

const router: Router = Router();

router.post("/singup", singup);
router.post("/singin", singin);
router.get("/profile", profile);

export default router;
