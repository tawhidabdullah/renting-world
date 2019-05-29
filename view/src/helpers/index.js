import titleize from "titleize";
import * as moment from "moment";

export const rentalType = isShared => isShared ? "shared" : "entire";
export const toUpperCase = value => value ? titleize(value) : "";

export const getRangeDates = (startAt, endAt, dateFormat = "Y/MM/DD") => {
    const tempDates = [];

    let mStartAt = moment(startAt);
    const mEndAt = moment(endAt);

    while (mStartAt < mEndAt) {
        tempDates.push(mStartAt.format(dateFormat));
        mStartAt = mStartAt.add(1, 'day');
    }

    tempDates.push(mEndAt.format(dateFormat));

    return tempDates;
}


export const pritifyDate = (date) => {
    return moment(date).format("MMM Do YY");
}


export const isDateExpired = (enddate) => {
    const dateNow = moment(); 
    const endDateOfBooking = moment(enddate); 

   return endDateOfBooking.isAfter(dateNow); 
}



