import express from "express";
import {
    signupController,
    logOutController,
    loginController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/logout', logOutController );

export default router;