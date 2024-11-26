import React from "react";
import OnewayCitySearch from "./OnewayCitySearch";
import OnewayDatepicker from "./OnewayDatepicker";

const MultiCityFilters = ({ changeDate, changeCity}) => {
  return (
    <div>
      <div className="lg:inline-flex lg:flex-row flex-col gap-4 w-full">
        <OnewayCitySearch changeCity={changeCity} />
        <OnewayDatepicker changeDate={changeDate}/>
      </div>
    </div>
  );
};

export default MultiCityFilters;
