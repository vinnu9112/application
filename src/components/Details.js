import React, { useContext, useEffect, useRef, useState } from 'react';
import detailContext from '../context/details/detailContext';
import AddDetail from './AddDetail';
import DetailItem from './DetailItem';

const Details = () => {
  const context = useContext(detailContext);
  const { details, getDetails, editDetail } = context;

  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  // eslint-disable-next-line
  const [detail, setDetail] = useState({});

  const citiesByState = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Bomdila"],
    "Maharashtra": ["Pune", "Amravati", "Mumbai", "Nashik", "Nagpur"]
    // Add more Indian states and cities here
  };

  const timeByState = {
    "Andhra Pradesh": ["12pm", "1pm", "4pm"],
    "Arunachal Pradesh": ["12pm", "3pm", "4pm"],
    "Maharashtra": ["12pm", "5pm", "8pm"]
    // Add more timeslots here
  }

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    if (state in citiesByState) {
      setCities(citiesByState[state]);
      setTimeSlot(timeByState[state]);
    } else {
      setCities([]);
      setTimeSlot([]);
    }
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
  };
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
  };
  const handleTimeChange = (e) => {
    const time = e.target.value;
    setSelectedTime(time);
  };

  const handleClick = (id) => {
    console.log(`updating detail with id: ${id}`, detail);
    editDetail(detail.id, selectedState, selectedCity, selectedDate, selectedTime);
    refClose.current.click();
  };

  useEffect(() => {
    getDetails()
    // eslint-disable-next-line
  }, []);

  const updateDetails = () => {
    ref.current.click()
  }

  const ref = useRef()
  const refClose = useRef()
  return (
    <>
      <AddDetail />

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">

      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h2 className='my-4'>Book an Appointment</h2>
              <div className="col-md-3 my-4">
                <h3>State</h3>
                <select id="e-state-select" value={selectedState} onChange={handleStateChange}>
                  <option value="">Select a state</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  {/* Add more Indian states here */}
                </select>
              </div>

              <div className="col-md-3 my-4">
                <h3>City</h3>

                <select id="e-city-select" disabled={cities.length === 0} onChange={handleCityChange}>
                  <option value="">Select a city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-3 my-4">
                <h3>Date</h3>
                <input type="date" id="e-datepicker" value={selectedDate} onChange={handleDateChange} disabled={timeSlot.length === 0} />
              </div>

              <div className="col-md-3 my-4">
                <h3>Timeslot</h3>
                <select id="e-timeSlot-select" disabled={timeSlot.length === 0} onChange={handleTimeChange}>
                  <option value="">Select a timeslot</option>
                  {timeSlot.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Appointment</button>
            </div>
          </div>
        </div>
      </div>


      <div className='row my-3'>
        <h2>Exam Appointment(s)</h2>
        {details.map((detail) => {
          return <DetailItem key={detail._id} detail={detail} updateDetails={updateDetails}editDetail={editDetail} />
        })}
      </div>
    </>
  )
}

export default Details

