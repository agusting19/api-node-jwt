import { Router } from "express";
import { singup, singin, profile } from "../controllers/auth.controller";
import { tokenValidation } from "../libs/verifyToken";

const router: Router = Router();

router.post("/singup", singup);
router.post("/singin", singin);
router.get("/profile", tokenValidation, profile);

export default router;
