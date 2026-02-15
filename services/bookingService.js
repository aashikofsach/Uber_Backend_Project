const bookingRepository = require("../repository/bookingRepository");
const haversine = require("haversine-distance");
const locationService = require("./locationService");

const BASIC_FARE = 50;
const RATE_PER_KM = 12;

const createBooking = async ({ passengerId, source, destination }) => {
  const distance = haversine(source, destination);

  const fare = BASIC_FARE + RATE_PER_KM * distance;

  const bookingData = {
    passenger: passengerId,
    source,
    destination,
    fare,
    status: "pending",
  };
  const booking = await bookingRepository.createBooking(bookingData);
  return booking;
};

const findNearByDrivers = async (location, radius = 5) => {
  console.log(
    "checking what type of source thrown",
    typeof location.latitude,
    typeof location.longitude,
  );
  let latitude = parseFloat(location.latitude);
  let longitude = parseFloat(location.longitude);

  let radiusKM = parseFloat(radius);
  console.log(latitude , longitude , radiusKM)

  if (isNaN(latitude) || isNaN(longitude) || isNaN(radiusKM))
    throw new Error("Invalid Coordinates and radius ");
  const nearByDrivers = await locationService.findNearByDrivers(
    latitude,
    longitude,
    radiusKM,
  );

  return nearByDrivers;
};

const assignDriver = async (bookingId, driverId) => {
  const booking = await bookingRepository.updateBookingStatus(
    bookingId,
    driverId,
    "confirmed",
  );

  if(!booking)
    throw new Error("Booking already confirmed or not exist ");
  return booking ;
};

module.exports = { createBooking, findNearByDrivers , assignDriver};
