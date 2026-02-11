const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const mongoose = require("mongoose");
const cors = require('cors');
const SocketIo = require('socket.io');
const locationService = require('./services/locationService');

const authRoute = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const driverRoutes = require("./routes/driverRoutes");
const passengerRoutes = require("./routes/passengerRoutes");
const {redisClient} = require("./utils/redisClient");
const connectDB = require("./utils/db");

dotenv.config();

const app = express();

const server = http.createServer(app); 

const io =  SocketIo(server , {
  cors : {
    origin : "http://localhost:5500",
    methods : ['GET', "POST"]
  }
})

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// mongoose.connect(process.env.MONGO_URI);
connectDB();
app.use("/api/auth", authRoute);
// app.use("/api/bookings", bookingRoutes(io));
app.use("/api/drivers", driverRoutes);
app.use("/api/passengers", passengerRoutes());

server.listen(process.env.PORT, () => {
  console.log("server is lsitening on port", process.env.PORT);
});

io.on("connection",(socket)=> {

  socket.on("registerDriver", async (driverId)=>{
    await locationService.setDriverSocket(driverId , socket.id)
  })

  socket.on("disconnect", async () => {
    const driverId = await locationService.getDriverSocket(driverId);
    if(driverId)
       await locationService.delDriverSocket(driverId);
  })

}) 

redisClient.on("connect", ()=>
{
    console.log("connected to redis 1")
    console.log("redis URI here", process.env.REDIS_URI)
})
