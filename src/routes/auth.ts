import { Router } from "express";
import { signup, singin, profile } from "../controllers/auth.controller";
import { tokenValidation } from "../libs/verifyToken";

const router: Router = Router();

router.post("/signup", signup);
router.post("/singin", singin);
router.get("/profile", tokenValidation, profile);

export default router;
