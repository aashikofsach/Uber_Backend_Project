const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {getDriverBookings, updateLocation} = require("../controllers/driverController")

const router = express.Router();

router.get("/bookings", authMiddleware, getDriverBookings);
router.get("/location", authMiddleware, updateLocation);

module.exports = router ;