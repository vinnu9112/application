import React, { useContext, useState } from 'react'
import detailContext from '../context/details/detailContext';

const AddDetail = () => {

    const context = useContext(detailContext);
    const { addDetail } = context;

    const [selectedState, setSelectedState] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [timeSlot, setTimeSlot] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    
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
    
    const handleClick = (e)=>{
        e.preventDefault();
        addDetail(selectedState, selectedCity, selectedDate, selectedTime);
    }


    return (
        <div className='row'>
            <h2 className='my-4'>Book an Appointment</h2>
            <div className="col-md-3 my-4">
                <h3>State</h3>
                <select id="state-select" value={selectedState} onChange={handleStateChange}>
                    <option value="">Select a state</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    {/* Add more Indian states here */}
                </select>
            </div>

            <div className="col-md-3 my-4">
                <h3>City</h3>

                <select id="city-select" disabled={cities.length === 0} onChange={handleCityChange}>
                    <option value="">Select a city</option>
                    {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>

            <div className="col-md-3 my-4">
                <h3>Date</h3>
                <input type="date" id="datepicker" value={selectedDate} onChange={handleDateChange} disabled={timeSlot.length === 0}/>
            </div>

            <div className="col-md-3 my-4">
                <h3>Timeslot</h3>
                <select id="timeSlot-select" disabled={timeSlot.length === 0} onChange={handleTimeChange}>
                    <option value="">Select a timeslot</option>
                    {timeSlot.map(time => (
                        <option key={time} value={time}>{time}</option>
                    ))}
                </select>
            </div>

            <div className="container my-4 ">
                <button className='btn btn-primary' disabled={timeSlot.length === 0} onClick={handleClick}>Submit</button>
            </div>



        </div>
    )
}

export default AddDetail
