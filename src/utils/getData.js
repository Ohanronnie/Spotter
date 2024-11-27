const API_KEY = import.meta.env.VITE_RAPIDAPI_API_KEY; // Replace with your actual API key
//console.log(API_KEY)
// Step 1: Search for airports and get entityId and skyId
const formatDate = (_date) => {
  let date = new Date(_date);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};
//  console.log(formatDate(new Date()))
const searchAirport = async (query) => {
  const url =
    "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
    },
  };
  
  const response = await fetch(`${url}?query=${query}`, options);
  const data = await response.json();
  //console.dir(data, { depth: null });

  // Assuming first result, you may want to handle multiple results
  const { skyId, entityId } = data.data[0];
  return { skyId, entityId };
};

// Step 2: Search for flights using entityId and skyId
export const searchFlights = async (
  originSkyId,
  destinationSkyId,
  originEntityId,
  destinationEntityId,
  date,
  returnDate,
  cabinClass,
  childQuery
) => {
  const url =
    "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
    },
  };

  const response = await fetch(
    `${url}?originSkyId=${originSkyId}&destinationSkyId=${destinationSkyId}&originEntityId=${originEntityId}&destinationEntityId=${destinationEntityId}&date=${date}${
      returnDate ? "&returnDate=" + returnDate : ""
    }&cabinClass=${cabinClass}${childQuery}`,
    options
  );
  const data = await response.json();
  return data;
};

export const getFlightDetails = async (
  origin,
  destination,
  date,
  returnDate,
  cabinClass,
  childQuery
) => {
  // Get origin airport details
  const originData = await searchAirport(origin);
  // Get destination airport details
  const destinationData = await searchAirport(destination);
  try {
    console.log(date, returnDate);
    // Call searchFlights with obtained IDs
    let data = await searchFlights(
      originData.skyId,
      destinationData.skyId,
      originData.entityId,
      destinationData.entityId,
      formatDate(date),
      returnDate ? formatDate(returnDate) : null,
      cabinClass,
      childQuery
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Example call with the origin, destination, and date
