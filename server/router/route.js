import * as controller from "../controllers/appController.js";

import { Router } from "express";

export const router = Router();

/** POST Methods */
router.route("/register").post(controller.register);

router.route("/registerMail").post(); //send email
router.route("/login").post(controller.login); // login in app

/** GET Methods */
router.route("/user").get(controller.user); // user
router.route("/generateOTP").get(); // generate random OTP
router.route("/verifyOTP").get(); // verify generated OTP
router.route("/createResetSession").get(); // reset all the variables

/** PUT Methods */
router.route("/updateUser").put(controller.updateUser); // is use to update the user profile
router.route("/resetPassword").put(); // use to reset password
