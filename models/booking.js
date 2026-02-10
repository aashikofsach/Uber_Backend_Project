const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  passenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  source: {
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
  },
  destination: {
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
  },
  fare: Number,
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed"],
    default: "pending",
  },
  rating: Number,
  feedback: String,
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
