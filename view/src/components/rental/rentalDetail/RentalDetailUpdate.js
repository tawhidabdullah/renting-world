import React, { Component } from 'react';
import { toast } from "react-toastify";
import RentalAssets from "./RentalAssets";
import { updateRental , resetRentalErrorr} from "../../../actions/rentalAction";
import EditableInput from "../../commonFeilds/editable/EditableInput";
import EditableTextArea from "../../commonFeilds/editable/EditableTextArea";
import EditableSelect from "../../commonFeilds/editable/EditableSelect";
import "../../../styles/rental/_rentalDetailInfo.scss";



export default class RentalDetailUpdate extends Component {

    updateRental = (rentalData) => {
        const { rental: { _id }, dispatch  } = this.props;
        dispatch(updateRental(rentalData, _id));
    }; 

    resetRentalErrors = () => {
        this.props.dispatch(resetRentalErrorr()); 
    }
    render() {
        const {errors} = this.props;
        const { category , bedrooms, user } = this.props.rental;


        if(errors && errors.length > 0){
            toast.error(errors[0].detail); 
        }

        return (
            <div className='rental'>
                <label style={{marginRight: "5px", fontWeight: "bold"}}>Shared</label>
                <EditableSelect
                    options={['true', 'false']}
                    updateEntity={this.updateRental}
                    className={`rental-type ${category}`}
                    entity={this.props.rental}
                    entityField={'shared'}
                    containerStyle={{ "display": 'inline-block' }}
                    errors={errors}
                    resetErrors={this.resetRentalErrors}
                />


                <EditableSelect
                    options={['aparment', 'house', 'banglo', 'condo']}
                    updateEntity={this.updateRental}
                    className={`rental-type ${category}`}
                    entity={this.props.rental}
                    entityField={'category'}
                    errors={errors}
                    resetErrors={this.resetRentalErrors}
                />

                <div className='rental-owner'>
                    <img
                        src={user.avatar}
                        alt='owner' />
                    <span>{user && user.name}</span>
                </div>

                <EditableInput
                    updateEntity={this.updateRental}
                    className={'rental-title'}
                    entity={this.props.rental}
                    entityField={'title'}
                    errors={errors}
                    resetErrors={this.resetRentalErrors}
                     />

                <EditableInput
                    updateEntity={this.updateRental}
                    className={'rental-city'}
                    entity={this.props.rental}
                    entityField={'city'}
                    errors={errors}
                    resetErrors={this.resetRentalErrors}
                     />

                <EditableInput
                    updateEntity={this.updateRental}
                    className={'rental-street'}
                    entity={this.props.rental}
                    entityField={'street'}
                    errors={errors}
                    resetErrors={this.resetRentalErrors}
                     />

                <div className='rental-room-info'>
                    <span><i className='fa fa-building'></i>

                        <EditableInput
                            updateEntity={this.updateRental}
                            className={'rental-bedrooms'}
                            entity={this.props.rental}
                            entityField={'bedrooms'}
                            containerStyle={{ "display": 'inline-block' }}
                            errors={errors}
                            resetErrors={this.resetRentalErrors}
                        />
                        bedrooms</span>

                    <span><i className='fa fa-user'></i>
                        {bedrooms + 4} guests
                    </span>
                    <span><i className='fa fa-bed'></i> {bedrooms + 2} beds</span>
                </div>
                <EditableTextArea
                    rows={6}
                    cols={50}
                    updateEntity={this.updateRental}
                    className={'rental-description'}
                    entity={this.props.rental}
                    entityField={'description'}
                    containerStyle={{ "display": 'inline-block' }}
                    errors={errors}
                    resetErrors={this.resetRentalErrors}
                />
                <hr></hr>
                <RentalAssets />
            </div>
        )
    }
}; 
