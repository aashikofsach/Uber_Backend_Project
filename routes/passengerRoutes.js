const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

module.exports = (io) => {
  router.get("/bookings", authMiddleware, passengerBookings);
  router.post("/feedback", authMiddleware, provideFeedback);

  return router ;
};
