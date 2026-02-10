const bookingRepository = require("../repository/bookingRepository");
const passengerRepository = require("../repository/passengerRepository");

const getPassengerBookings = async (passengerId) => {
  try {
    const passengerDetail = passengerRepository.findPassengerById(passengerId);
    if (!passengerDetail) throw new Error("Passenger Not Found");

    return passengerDetail;
  } catch (error) {}
};


const provideFeedback = async ({passengerId, bookingId, rating, feedback}) => {
  // to give the rating and feedbck we have to find out the booking right ??

  const booking = await bookingRepository.findBooking({
    _id: bookingId,
    passenger: passengerId,
  });
  if (!booking) throw new Error("Booking Not Found");
  booking.rating = rating;
  booking.feedback = feedback;
  await booking.save();
};

module.exports = {
  getPassengerBookings,
  provideFeedback,
};
