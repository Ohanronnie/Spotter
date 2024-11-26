import Flight from "../assets/Flight.jpg";
import React, { useState } from "react";
import TripSelector from "../components/TripSelector";
import PassengerSelector from "../components/PassengerSelector";
import ClassSelector from "../components/ClassSelector";
import CitySearch from "../components/CitySearch";
import DatePicker from "../components/DatePicker";
import MultiCityFilters from "../components/MultiCity/MultiCityFilters";
import RoundtripFilter from "../components/RoundTrip/RoundtripFilter";
import OneWayFilter from "../components/OneWay/OneWayFilter";
import Explore from "../components/Explore";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Homepage = () => {
  /* 
  multi city = 1,
  one way = 2,
  round trip = 3 */
  const [selectedOption, setSelectedOption] = useState("Multi-city");
  const [trip, setTrip] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [flightClass, setFlightClass] = useState('business');
  const [city, changeCity] = useState({
    from: null,
    to: null
  })
  const [date, setDate] = useState({
    from: new Date(),
    to: null
  })
  const [passenger, setPassenger] = useState({
    adults: 1,
    children: 0,
    infants: 0
  })
  const options = ["Round trip", "One way", "Multi-city"];

  const updatePassenger = (val) => {
    setPassenger(val)
  }
  const updateClass = (val) => {
    setFlightClass(val)
  }
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const updateCity = (option) => {
    changeCity(option)
  }
  const handleTrip = val => {
    if(val != trip){
      setTrip(val)
    }
  }
  const changeDate = (from, to) => {
    if(!to)
      return setDate({from});
    return setDate({ from, to });
  }
  const validate = () => {
    if(!trip) return false;
    if(!city.from || !city.to) return false;
    if(trip === 3 && !date.to) return false;
    if(!date.from) return false;
    if(passenger.adults == 0 && passenger.children == 0 && passenger.infants == 0) return false;
    if(!flightClass) return false;
    return true
  }
  // Function to render the appropriate filter component
  const renderFilterComponent = () => {
    switch (selectedOption) {
      case "Multi-city":
       handleTrip(1);
        return <MultiCityFilters changeDate={changeDate} changeCity={updateCity}/>;
       
      case "One way":
        handleTrip(2)
        return <OneWayFilter changeDate={changeDate} changeCity={updateCity}/>;
      case "Round trip":
       handleTrip(3);
        return <RoundtripFilter changeDate={changeDate} chanegCity={updateCity}/>;
      default:
        handleTrip(1);
        return <MultiCityFilters changeDate={changeDate} changeCity={updateCity}/>;
    }
  };

  return (
    <div className="lg:px-36 p-2">
      <img src={Flight} className="h-[40vh] w-full" />
      <h1 className="text-center font-semibold text-5xl py-6">Flights</h1>
      <div className="bg-white rounded-md p-8 shadow-2xl flex flex-col space-y-6">
        <div className="inline-flex gap-4">
          <div className="relative w-40">
            <button
              className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex justify-between items-center">
                <span>{selectedOption}</span>
                {isOpen ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </div>
            </button>

            {isOpen && (
              <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {options.map((option) => (
                  <li
                    key={option}
                    className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                      option === selectedOption
                        ? "text-blue-500 font-semibold"
                        : ""
                    }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <PassengerSelector updatePassenger={updatePassenger}/>
          <ClassSelector  updateClass={updateClass} />
        </div>

        {/* Render the appropriate filter component based on selection */}
        {renderFilterComponent()}
        {validate() && <Link to={`/FlightDetails?trip=${trip}&flightClass=${flightClass}&passenger=${JSON.stringify(passenger)}&date=${JSON.stringify(date)}&city=${JSON.stringify(city)}`}>
          <button
            type="submit"
            onClick={() => { console.log(trip, flightClass, passenger, date, city)}}
            className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-blue-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
          >
            Search
            <svg
              className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
              viewBox="0 0 16 19"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                className="fill-gray-800 group-hover:fill-gray-800"
              ></path>
            </svg>
          </button>
        </Link>}
      </div>

      <Explore />
    </div>
  );
};

export default Homepage;