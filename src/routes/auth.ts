import { Router } from "express";
import { validateLogin, validateRegister } from "../validators/auth";
import { signup, singin, profile } from "../controllers/auth.controller";
import { tokenValidation } from "../libs/verifyToken";

const router: Router = Router();

router.post("/signup", validateRegister, signup);
router.post("/singin", validateLogin, singin);
router.get("/profile", tokenValidation, profile);

export default router;
