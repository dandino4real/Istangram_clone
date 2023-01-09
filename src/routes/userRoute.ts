import express from "express";
import { Login, Register } from "../controllers/userController";


const router = express.Router();


router.post("/signup", Register);
router.post("/signin", Login);





export default router;