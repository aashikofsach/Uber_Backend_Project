const passengerService = require("../services/passengerService");

const getPassengerBookings = async (req, res) => {
  try {
    const bookings = await passengerService.getPassengerBookings(req.user._id);
    return res.status(200).send({
      data: bookings,
      success: true,
      error: null,
      message: "Bookings retreived Sucessfully",
    });
  } catch (error) {
    return res.status(400).send({
      error: error.message,
    });
  }
};

const provideFeedback = async (req, res) => {
  try {
    const { bookingId, feedback, rating } = req.body;
    passengerService.provideFeedback(req.user._id, bookingId, feedback, rating);
    return res.status(201).send({
      sucess: true,
      error: null,
      message: "feedback submitted Successfully",
    });
  } catch (error) {
    return res.status(400).send({
      error: error.message,
    });
  }
};

module.exports = {
  getPassengerBookings,
  provideFeedback,
};
