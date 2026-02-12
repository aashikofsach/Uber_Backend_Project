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
    // we need this array so that we have records oh which drivers we have to remove the ride request notification 
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

    // below line we store the drivers availaible to currenet booking as key value mapping redis 
    await locationService.storeNotifiedDrivers(booking._id , driversIds) ;
    return res.status(201).send({data : booking , sucess : true , error : null , message : "booking created Sucessfully"})
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = { createBooking };
