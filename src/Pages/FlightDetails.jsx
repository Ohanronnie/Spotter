import React, { useState, useEffect } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaClock,
  FaUsb,
  FaVideo,
  FaLeaf,
  FaInfoCircle,
  FaSortAmountDown,
} from "react-icons/fa";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { getFlightDetails } from "../utils/getData";
const LoadingComponent = ({  details  }) => {
  return (
    <div>
      <p className="text-center text-xl"> {!details ? 'Loading...' : 'Flight Not Found'}</p>
    </div>
  );
};
const FlightDetails = () => {
  const [expandedFlight, setExpandedFlight] = useState(null);
  const [state, setState] = useState(null);
  const [empty, setEmpty] = useState(false);
  const location = useLocation();

  const toggleFlight = (index) => {
    setExpandedFlight(expandedFlight === index ? null : index);
  };
  const [kFlights, setFlights] = useState(null);
  useEffect(
    function () {
      let search = new URLSearchParams(location.search);

      let trip = search.get("trip");
      let flightClass = search.get("flightClass");
      let passenger = JSON.parse(search.get("passenger"));
      let date = JSON.parse(search.get("date"));
      let city = JSON.parse(search.get("city"));

      setState({ trip, flightClass, passenger, date, city });
      console.log(state);
    },
    [location]
  );
  useEffect(
    function () {
      state &&
        (async () => {
          try {
            let { trip, flightClass, passenger, date, city } = state;
            const kPassenger = Object.fromEntries(
              Object.entries(passenger).filter((val) => val[1] > 0)
            );
            console.log(kPassenger);
            let data = await getFlightDetails(
              city.from,
              city.to,
              date.from,
              date.to,
              flightClass.replace(" ", "_").toLowerCase(),
              `&${kPassenger.infants ? "infants=" + kPassenger.infants : ""}&${
                kPassenger.children ? "children=" + kPassenger.children : ""
              }&${kPassenger.adults ? "adults=" + kPassenger.adults : ""}`
            );
            if(data.data.itineraries.length === 0) setEmpty(true);
            setFlights(
              data.data.itineraries.map((val) => {
                return {
                  airline: val.legs[0].carriers.marketing[0].name,
                  logo: val.legs[0].carriers.marketing[0].logoUrl,
                  departure: val.legs[0].departure,
                  arrival: val.legs[0].departure,
                  from: val.legs[0].origin.name,
                  to: val.legs[0].destination.name,
                  price: val.price.formatted,
                  segments: val.legs.map((leg) => {
                    return {
                      departure: leg.departure,
                      arrival: leg.arrival,
                      from: leg.origin.name,
                      to: leg.destination.name,
                      duration: leg.durationInMinutes,
                      //aircraft: leg.operatingCareer.name,
                    };
                  }),
                };
              })
            );
          } catch (error) {
            console.log('helljjjjjo')
            setFlights(false);
            console.log(kFlights)
          }
        })();
    },
    [state]
  );
  const flights = [
    {
      airline: "SAS",
      logo: "SAS", // You would replace this with actual airline logo
      departure: "6:40 AM",
      arrival: "3:55 PM",
      from: "Heathrow Airport (LHR)",
      to: "John F. Kennedy International Airport (JFK)",
      price: "NGN 1,128,492",
      emissions: "676 kg CO2e",
      emissionPercentage: "+48%",
      segments: [
        {
          departure: "6:40 AM",
          arrival: "9:30 AM",
          from: "Heathrow Airport (LHR)",
          to: "Copenhagen Airport (CPH)",
          duration: "1 hr 50 min",
          aircraft: "Airbus A320neo",
          flightNumber: "SK 500",
          amenities: ["Below average legroom (29 in)", "In-seat USB outlet"],
          emissions: "98 kg CO2e",
        },
        {
          departure: "1:00 PM",
          arrival: "3:55 PM",
          from: "Copenhagen Airport (CPH)",
          to: "John F. Kennedy International Airport (JFK)",
          duration: "8 hr 55 min",
          aircraft: "Airbus A330",
          flightNumber: "SK 915",
          amenities: [
            "Average legroom (31 in)",
            "In-seat power & USB outlets",
            "On-demand video",
          ],
          emissions: "579 kg CO2e",
        },
      ],
      layover: {
        duration: "3 hr 30 min",
        location: "Copenhagen (CPH)",
      },
    },
    // Add other flights here
    {
      airline: "SAS",
      logo: "SAS", // You would replace this with actual airline logo
      departure: "6:40 AM",
      arrival: "3:55 PM",
      from: "Heathrow Airport (LHR)",
      to: "John F. Kennedy International Airport (JFK)",
      price: "NGN 1,128,492",
      emissions: "676 kg CO2e",
      emissionPercentage: "+48%",
      segments: [
        {
          departure: "6:40 AM",
          arrival: "9:30 AM",
          from: "Heathrow Airport (LHR)",
          to: "Copenhagen Airport (CPH)",
          duration: "1 hr 50 min",
          aircraft: "Airbus A320neo",
          flightNumber: "SK 500",
          amenities: ["Below average legroom (29 in)", "In-seat USB outlet"],
          emissions: "98 kg CO2e",
        },
        {
          departure: "1:00 PM",
          arrival: "3:55 PM",
          from: "Copenhagen Airport (CPH)",
          to: "John F. Kennedy International Airport (JFK)",
          duration: "8 hr 55 min",
          aircraft: "Airbus A330",
          flightNumber: "SK 915",
          amenities: [
            "Average legroom (31 in)",
            "In-seat power & USB outlets",
            "On-demand video",
          ],
          emissions: "579 kg CO2e",
        },
      ],
      layover: {
        duration: "3 hr 30 min",
        location: "Copenhagen (CPH)",
      },
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Top departing flights</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <button className="flex items-center gap-1 text-blue-600">
            <FaSortAmountDown />
            Best
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {kFlights ? (
          kFlights.map((flight, index) => (
            <div key={index} className="border rounded-lg shadow-sm">
              <div
                className="p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleFlight(index)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                      <img src={`${flight.logo}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">
                          {flight.departure}
                        </span>
                        <span className="text-gray-500">-</span>
                        <span className="font-semibold">{flight.arrival}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {flight.from} → {flight.to}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-green-700">{flight.emissions}</span>
                      <span className="text-sm text-gray-500">
                        {flight.emissionPercentage} emissions
                      </span>
                      <FaInfoCircle className="text-gray-400" />
                    </div>
                    <div className="font-semibold">{flight.price}</div>
                    <div className="text-sm text-gray-600">round trip</div>
                  </div>
                </div>
              </div>

              {expandedFlight === index && (
                <div className="border-t p-4">
                  {flight.segments.map((segment, segIndex) => (
                    <div key={segIndex} className="mb-4">
                      <div className="flex justify-between mb-2">
                        <div>
                          <div className="font-semibold">
                            {segment.departure} · {segment.from}
                          </div>
                          <div className="text-sm text-gray-600">
                            Travel time: {segment.duration}
                          </div>
                          <div className="text-sm text-gray-600">
                            {segment.aircraft} · {segment.flightNumber}
                          </div>
                        </div>
                        {/*
                      <div className="space-y-1">
                        {segment.amenities.map((amenity, aIndex) => (
                          <div
                            key={aIndex}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            {amenity.includes("legroom") && (
                              <MdAirlineSeatReclineNormal />
                            )}
                            {amenity.includes("USB") && <FaUsb />}
                            {amenity.includes("video") && <FaVideo />}
                            {amenity}
                          </div>
                        ))}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaLeaf />
                          Emissions estimate: {segment.emissions}
                        </div>
                      </div>*/}
                      </div>

                      {flight.layover && segIndex === 0 && (
                        <div className="my-4 pl-4 border-l-2 border-gray-300">
                          <div className="text-sm text-gray-600">
                            <FaClock className="inline mr-2" />
                            {flight.layover.duration} layover ·{" "}
                            {flight.layover.location}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <LoadingComponent details={empty}/>
        )}
      </div>
    </div>
  );
};

export default FlightDetails;
