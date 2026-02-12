const bookingRepository = require("../repository/bookingRepository");
const haversine = require("haversine-distance");


const BASIC_FARE=50;
const RATE_PER_KM= 12;

const createBooking = async ({ passengerId, source, destination }) => {

    const distance = haversine(source , destination)

    const fare= BASIC_FARE + (RATE_PER_KM*distance);

    const bookingData = {
        passenger : passengerId,
        source,
        destination,
        fare,
        status : "pending"
    }
   const booking = await bookingRepository.createBooking(bookingData) ;
   return booking ;
};

module.exports = { createBooking };
