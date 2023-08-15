import express from "express";
import {
  deleteUser,
  selectUser,
  selectUsers,
  signinUser,
  signupUser,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/user/signup", signupUser);

router.post("/user/signin", signinUser);

router.get("/users/:id", selectUser);

router.get("/users", selectUsers);

router.delete("/user/:id", deleteUser);

export default router;
