const express = require("express");
const { connection } = require("./Config/db.js");
const { UserRoute } = require("./Routes/User.route.js");
require("dotenv").config();

const app = express();
const cors = require("cors");
let PORT = process.env.PORT;
const { MensdataRoute } = require("./Routes/Mensdata.route.js");
const { CartRoute } = require("./Routes/Cart.route.js");
const { Authetication } = require("./Middleware/authetication.js");
app.use(cors());
app.use(express.json());

app.use("/", UserRoute);
app.use("/data", MensdataRoute);

app.use("/cart", Authetication, CartRoute);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (err) {
    console.log("Connection Failed to Connect DB");
  }
  console.log(`Listening on port ${PORT}`);
});
