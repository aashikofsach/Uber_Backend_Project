const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// router.get("/bookings", authMiddleware, getDriverBookings);
// router.get("/location", authMiddleware, updateLocation);

module.exports = router ;