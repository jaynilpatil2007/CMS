import { Router } from "express";
import { heroEdit, navbarEdit } from "../controllers/edit.controller.js";
import { verifyJWT } from "../middlewares/auth.middlerware.js";
import { upload } from "../middlewares/multer.middlerware.js";

const router = Router();

router.use(verifyJWT);
router.route("/navbar").post(navbarEdit);
router.route("/hero").post(
    upload.fields([
        {
            name: "img",
            maxCount: 1
        }
    ]),
    heroEdit
);

export default router;