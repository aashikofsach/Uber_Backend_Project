const bookingService = require("../services/bookingService");
const locationService = require("../services/locationService");

const createBooking = (io) => async (req, res) => {
  try {
    const { source, destination } = req.body;
    const booking = await bookingService.createBooking({
      passengerId: req.user._id,
      source,
      destination,
    });
    // here above we made a booking and now after that we have to find out the nearbydrivers and corresponding to their driverId we have to
    // find out there sokcet id and have to send the notification of that

    const nearByDrivers = await bookingService.findNearByDrivers(source);
    const driversIds = [];

    for (const driver of nearByDrivers) {
      // here we get the socket id from driver id
      // send the alert of booking
      const driverSocketId = await locationService.getDriverSocket(driver[0]);
      if (driverSocketId) {
        driversIds.push(driver[0]);
        io.to(driverSocketId).emit("newBooking", {
          bookingId: booking._id,
          source,
          destination,
          fare: booking.fare,
        });
      }
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = { createBooking };
