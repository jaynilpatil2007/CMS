import { Router } from "express";
import { getHero, getNavbar } from "../controllers/content.controller.js";
import { verifyJWT } from "../middlewares/auth.middlerware.js";

const router = Router();

router.route("/navbar").get(getNavbar);

router.route("/hero").get(getHero);

export default router;