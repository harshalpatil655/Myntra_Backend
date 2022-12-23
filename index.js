const express = require("express");
const { connection } = require("./Config/db.js");
const { UserRoute } = require("./Routes/User.route.js");

const app = express();
const cors = require("cors");
const { MensdataRoute } = require("./Routes/Mensdata.route.js");
const { CartRoute } = require("./Routes/Cart.route.js");
const { Authetication } = require("./Middleware/authetication.js");
app.use(cors());
app.use(express.json());

app.use("/", UserRoute);
app.use("/data", MensdataRoute);
app.use(Authetication);
app.use("/cart", CartRoute);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (err) {
    console.log("Connection Failed to Connect DB");
  }
  console.log("Listening on port 8080");
});
