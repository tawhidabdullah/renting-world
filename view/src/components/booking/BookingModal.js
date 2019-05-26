import React from 'react';
import Modal from "react-responsive-modal";
import AlertError from "../commonFeilds/AlertError";


const BookingModal = (props) => {
    const { open, closeModal, booking, confirmModal,errors, rentalPrice } = props;
    return (
        <Modal open={open} onClose={closeModal} little classNames={{ modal: 'booking-modal' }}>
            <h4 className='modal-title title'>Confirm Booking </h4>
            <p className='dates'>{booking.startAt} / {booking.endAt}</p>
            <div className='modal-body'>
                <em>{booking.days}</em> nights /
         <em>{rentalPrice}</em> per Night
         <p>Guests: <em>{booking.guests}</em></p>
                <p>Price: <em>{booking.totalPrice}$ </em></p>
                <p>Do you confirm your booking for selected days?</p>
            </div>
            <AlertError errors={errors} />
            <div className='modal-footer'>
                <button
                onClick={confirmModal}
                type='button'
                className='btn btn-primary'>Confirm</button>
                <button type='button' onClick={closeModal} className='btn btn-danger'>Cancel</button>
            </div>
        </Modal>

    )
}

export default BookingModal
