import React, {useState} from "react";
import detailContext from "./detailContext";

const DetailState = (props) => {
  const host = "http://localhost:8080"
    const detailsInitial = []

  const getDetails = async ()=>{
    const response = await fetch(`${host}/api/details/fetchalldetails`, {
      method: "GET",
      headers: {
        "Content-type": 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmRlMjc1ZjU0ZThmNGFkOWJmYjc0MiIsImlhdCI6MTY3NzY4NTAwMn0._nV2-6aDqJNUcdV8aMlm8fr8ohREBieywwx0idgQifA"
      },
    });
    const json = await response.json()
    console.log(json);
    setDetails(json)
  }

  const addDetail = async (state, city, date, timeslot)=>{
    const response = await fetch(`${host}/api/details/adddetails`, {
      method: "POST",
      headers: {
        "Content-type": 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmRlMjc1ZjU0ZThmNGFkOWJmYjc0MiIsImlhdCI6MTY3NzY4NTAwMn0._nV2-6aDqJNUcdV8aMlm8fr8ohREBieywwx0idgQifA"
      },
      body: JSON.stringify({state, city, date, timeslot})
    });
    // eslint-disable-next-line
    const json = response.json()
    // console.log(json);

    console.log("new note");
    let detail = {
      "_id": "63ff766913289056cf9611e3",
        "state": state,
        "city": city,
        "date": date,
        "timeslot": timeslot,
        "__v": 0
      }
      setDetails(details.concat(detail))
    }
    
    const deleteDetail = async (id)=>{
      const response = await fetch(`${host}/api/details/deletedetails/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmRlMjc1ZjU0ZThmNGFkOWJmYjc0MiIsImlhdCI6MTY3NzY4NTAwMn0._nV2-6aDqJNUcdV8aMlm8fr8ohREBieywwx0idgQifA"
      }
    });
    // eslint-disable-next-line
    const json = await response.json()
    console.log(json);
    console.log(`deleting...${id}`);
    const newDetails = details.filter((detail)=>{return detail._id !== id })
    setDetails(newDetails)

  }

  const editDetail = async (id, state, city, date, timeslot)=>{
    const response = await fetch(`${host}/api/details/updatedetails/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmRlMjc1ZjU0ZThmNGFkOWJmYjc0MiIsImlhdCI6MTY3NzY4NTAwMn0._nV2-6aDqJNUcdV8aMlm8fr8ohREBieywwx0idgQifA"
      },
      body: JSON.stringify({state, city, date, timeslot})
    });
    // eslint-disable-next-line
    const json = await response.json()
    console.log(json);
    
    for (let index = 0; index < details.length; index++) {
      const element = details[index];
      if (element._id === id) {
        element.state = state;
        element.city = city;
        element.date = date;
        element.time = timeslot;
      }
    }
  }
  const [details, setDetails] = useState(detailsInitial);
  return (
    <detailContext.Provider value={{details, setDetails, addDetail, deleteDetail, editDetail,getDetails}}>
      {props.children}
    </detailContext.Provider>
  )
}

export default DetailState
