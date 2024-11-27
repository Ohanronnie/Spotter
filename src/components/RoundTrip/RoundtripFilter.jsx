import React from "react";
import RoundtripCitySearch from "./RoundtripCitySearch";
import RoundtripDatePicker from "./RoundtripDatePicker";

const MultiCityFilters = ({ changeDate, chanegCity }) => {
  return (
    <div className="lg:inline-flex lg:flex-row flex-col gap-4 w-full">
      <RoundtripCitySearch changeCity={chanegCity} />
      <RoundtripDatePicker changeDate={changeDate} />
    </div>
  );
};

export default MultiCityFilters;
