import { Router } from "express";
import { login, logout, refreshAccessToken, signup } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middlerware.js"

const router = Router();


router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);
router.route("/check").get(verifyJWT, (req, res) => {
    res.status(200).json(req.user)
});
router.route("/refreshToken").post(refreshAccessToken);


export default router;