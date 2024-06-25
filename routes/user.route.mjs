import express from "express";
import { addNewUser, userLogin } from "../controllers/user.controller.mjs";

const router = express.Router();

router.post("/", addNewUser);

router.post("/login", userLogin);

export default router;
