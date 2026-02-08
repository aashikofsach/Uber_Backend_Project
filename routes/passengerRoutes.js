const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {provideFeedback, getPassengerBookings} = require("../controllers/passengerController")

const router = express.Router();

module.exports = (io) => {
  router.get("/bookings", authMiddleware, getPassengerBookings);
  router.post("/feedback", authMiddleware, provideFeedback);

  return router ;
};
