const express = require("express");
const ctrl = require("../../controllers/auth-controllers");

const { validateBody } = require("../../decorators");
const {authenticate, upload} = require("../../middlewares")
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registeSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);
router.get("/verify/:verificationToken", ctrl.verify);
router.post("/resend-verify-email", validateBody(schemas.emailSchema, ctrl.resendVerifyEmail));


module.exports = router;