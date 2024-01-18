import express from "express"; 
const router = express.Router();
import { getAll, createUser, login,forgetPassword,resetPassword,  diactivateUser, updateUser,
    activateUser,
    getUser, } from "../controller/UserController.js";
router.post('/forgot-password', forgetPassword);
router.post('/reset-password/:resetToken', resetPassword);

router.get("/", getAll);
router.get("/:id", getUser);
router.post("/", createUser);
router.post("/login", login);
router.patch("/:id/activate", activateUser);
router.patch("/:id/diactivate", diactivateUser);
router.put('/user/:id', updateUser);
export default router;
