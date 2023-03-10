import React, { useContext } from 'react';
import detailContext from '../context/details/detailContext';

const DetailItem = (props) => {
    // const { _id, state, city, date, time } = detail;
    const context = useContext(detailContext);
    const { deleteDetail } = context;
    const { detail, updateDetails } = props;
    return (
        <>
        <div className="col-md-3 ">
        <div className='card my-2 mx-2'>
            <div className="card-body"> 
            <h5>State: {detail.state}</h5>
            <h5>City: {detail.city}</h5>
            <h5>Date: {detail.date}</h5>
            <h5>TimeSlot: {detail.timeslot}</h5>
             <i className='far fa-trash-alt mx-2' onClick={()=>{deleteDetail(detail._id)}}></i>
             <i className='far fa-edit mx-2' onClick={()=>{updateDetails(detail)}}></i>
            </div>
        </div>
        </div>
        </>
    )
}

export default DetailItem
