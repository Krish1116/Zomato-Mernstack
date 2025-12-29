const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const foodController = require("../controllers/food.controller.js");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

// post api/food [protected]
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood
);

// get api/food [protected]
router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);

module.exports = router;
