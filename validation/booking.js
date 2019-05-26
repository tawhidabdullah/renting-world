const isValidBooking = (proposedBooking, rental) => {
    let isValid = true;

    if (rental.bookings && rental.bookings.length > 0) {
        isValid = rental.bookings.every(booking => {
            const proposedStart = proposedBooking.startAt;
            const proposedEnd = proposedBooking.endAt;

            const actualStart = booking.startAt;
            const actualEnd = booking.endAt;

            if ((actualStart < proposedStart && actualEnd < proposedStart) ||
                (proposedEnd < actualEnd && proposedEnd < actualStart)) {
                return true;

            } else {
                return false;
            }
        });
    }






    return isValid;
}













module.exports = isValidBooking;