const connectDB = require("./db/db.js");
const app = require("./src/app.js");
require("dotenv").config();
connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
