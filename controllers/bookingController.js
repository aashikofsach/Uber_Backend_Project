const bookingService = require("../services/bookingService");

const createBooking = async (req, res) => {
  try {
    const { source, destination } = req.body;
    const booking = await bookingService.createBooking({
      passengerId: req.user._id,
      source,
      destination,
    });

    
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = { createBooking };
