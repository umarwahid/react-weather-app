import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import '../App.css';

export default function WeatherApp() {
  // const [cityName, setCityName] = useState("");
  const [data, setData] = useState(null);
  const inputRef = useRef(null);

  const getWeather = async (event) => {
    event.preventDefault();
    // const cityName = document.querySelector("#cityName").value;
    console.log(`getting weather of ${inputRef.current.value}...`);
  try {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=7089467baf1548b69b644959230707&q=${inputRef.current.value}&aqi=no`
    );
    console.log("response: ", response.data);
    setData(response.data);
  } catch (e) {
    console.log(e);
  }
};  
useEffect(() => {
  // Fetch default weather data based on user's geolocation
  navigator.geolocation.getCurrentPosition(async (position) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=7089467baf1548b69b644959230707&q=${position.coords.latitude},${position.coords.longitude}&aqi=no`
      );
      setData(response.data);
      event.target.reset();       
    } catch (error) {
      console.log(error);
    }
  });
}, []);

// const changeHandler = (event) => {
//   setCityName(event.target.value);
// };
  return (
    <div className="weather-app d-flex row">
        <div className="containers col-lg-7 colo-md-5 col-sm-12">
          <h3 className="brand">The Weather</h3>
          <div className='d-flex'>
            <h1 className="temp">{data?.current?.temp_c}&#176; </h1>
            <div className="city-time">
              <h1 className="name">{data?.location?.name}</h1>
              <small>
                <span className="region">{data?.location?.region} </span>
                <span className="country">{data?.location?.country}</span>
              </small>
              <br/>
              <small>
                <span className="time">{data?.location?.localtime.split(' ')[1]} </span>
                <span className="date">{data?.location?.localtime.split(' ')[0]}</span>
              </small>
            </div>
            <div className="weather">
              <img
                src={data?.current?.condition?.icon}
                className="icon"
                alt="icon"
                width="58"
                height="50"
              />
              <span className="condition">{data?.current?.condition?.text}</span>
            </div>
          </div>
        </div>
        <div className="panel col-lg-5 col-md-5 col-sm-12">
          <form id="locationInput" onSubmit={getWeather}>
            <input
              type="text"
              className="search"
              placeholder="Search Location..."
              id="cityName"
              maxLength={20}
              minLength={2}
              required
              ref={inputRef}
            />
            <button type="submit" className="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
          <ul className="details">
            <h4>Weather Details</h4>
            <li>
              <span>Humidity</span>
              <span className="humidity">{data?.current?.humidity}</span>
            </li>
            <li>
              <span>Wind</span>
              <span className="wind">{data?.current?.wind_kph}</span>
            </li>
            <li>
              <span>Feels Like</span>
              <span className="wind">{data?.current?.feelslike_c}</span>
            </li>
            <li>
              <span>Pressure</span>
              <span className="wind">{data?.current?.pressure_in}</span>
            </li>
          </ul>
        </div>
        {/* <div className='d-flex row'>
          <div className='one col-lg-6 bg-secondary'>one</div>
          <div className='two col-lg-6 bg-secondary'>two</div>
        </div> */}
      </div>
  )
}
// import React, { useRef, useState } from 'react';
// import axios from 'axios';
// import '../App.css';

// export default function WeatherApp() {
//   const [data, setData] = useState(null);
//   const inputRef = useRef(null);

//   const getWeather = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.get(
//         `https://api.weatherapi.com/v1/current.json?key=7089467baf1548b69b644959230707&q=${inputRef.current.value}&aqi=no`
//       );
//       setData(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="weather-app">
//       <div className="container">
//         <h3 className="brand">The Weather</h3>
//         <div className="row d-flex justify-content-between align-items-center">
//           {/* Temperature */}
//           <div className="col-md-4 temp">
//             <h1>{data?.current?.temp_c}&#176;</h1>
//           </div>
//           {/* City and Time */}
//           <div className="col-md-4 city-time">
//             <h1 className="name">{data?.location?.name}</h1>
//             <small>
//               <span className="time">
//                 {data?.location?.localtime.split(' ')[1]}
//               </span>
//               <span className="date">
//                 {data?.location?.localtime.split(' ')[0]}
//               </span>
//             </small>
//           </div>
//           {/* Weather Condition */}
//           <div className="col-md-4 weather">
//             <img
//               src={data?.current?.condition?.icon}
//               className="icon"
//               alt="icon"
//               width="58"
//               height="50"
//             />
//             <span className="condition">{data?.current?.condition?.text}</span>
//           </div>
//         </div>
//       </div>
//       <div className="panel">
//         <form id="locationInput" onSubmit={getWeather}>
//           <input
//             type="text"
//             className="search"
//             placeholder="Search Location..."
//             maxLength={20}
//             minLength={2}
//             required
//             ref={inputRef}
//           />
//           <button type="submit" className="submit">
//             <i className="fa fa-search"></i>
//           </button>
//         </form>
//         <ul className="details">
//           <h4>Weather Details</h4>
//           <li>
//             <span>Cloudy</span>
//             <span className="cloud">89% </span>
//           </li>
//           <li>
//             <span>Humidity</span>
//             <span className="humidity">64%</span>
//           </li>
//           <li>
//             <span>Wind</span>
//             <span className="wind">8km/h</span>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

