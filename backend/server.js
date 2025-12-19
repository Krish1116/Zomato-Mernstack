const connectDB = require("./src/db/db.js");
const app = require("./src/app.js");
require("dotenv").config();
connectDB();

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
