const { v4: uuid } = require("uuid");
const storageService = require("../services/storage.service.js");
const foodModel = require("../modals/food.modal.js");

async function createFood(req, res) {
  console.log("🚀 ~ createFood ~ req:body", req.body);
  console.log("🚀 ~ createFood ~ req:file", req.file);

  const fileUploadResult = await storageService.uploadFile(
    req.file.path,
    `${uuid()}.mp4`
  );

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  console.log("🚀 ~ createFood ~ fileUploadResult:", fileUploadResult);

  res.status(201).json({
    message: "Food created successfully",
    food: foodItem,
  });
}

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find();
  res.status(200).json({
    message: "Food items fetched successfully",
    foodItems,
  });
}
module.exports = { createFood, getFoodItems };
