const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const mongoose = require("mongoose");
const cors = require('cors');

const authRoute = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const driverRoutes = require("./routes/driverRoutes");
const passengerRoutes = require("./routes/passengerRoutes");
const {redisClient} = require("./utils/redisClient");

dotenv.config();

const app = express();

const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.static());

mongoose.connect(process.env.MONGO_URI);
app.use("api/auth", authRoute);
app.use("api/bookings", bookingRoutes(io));
app.use("api/drivers", driverRoutes);
app.use("api/passengers", passengerRoutes(io));

server.listen(process.env.PORT, () => {
  console.log("server is lsitening on port", process.env.PORT);
});

redisClient.on("connect", ()=>
{
    console.log("connected to redis")
})
