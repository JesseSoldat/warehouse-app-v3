import React from "react";

// components
import SelectInput from "./searchBar/SelectInput";
import FilterTextInput from "./searchBar/FilterTextInput";
import NumberRangeInput from "./searchBar/NumberRangeInput";
import DateRangeInput from "./searchBar/DateRangeInput";
import BlankInput from "./searchBar/BlankInput";
import BtnGroup from "./searchBar/BtnGroup";

const SearchBar = ({
  // option
  searchOption,
  // option CB
  onChangeSearchOption,
  // value
  value,
  valueErr,
  value2,
  disableValue2,
  // value CB
  onChangeSearchValue,
  onChangeSearchValue2,
  handleDateChange,
  handleDateChange2,
  handleUseValue2,
  // type
  searchType,
  // btn CB
  onSearchProduct,
  onResetFilter
}) => {
  return (
    <div className="row mb-3">
      <div className="col-12 d-flex flex-wrap mx-auto align-items-center">
        <SelectInput
          searchOption={searchOption}
          info="Select an option to search by."
          onChangeSearchOption={onChangeSearchOption}
        />

        {searchType === "string" && (
          <FilterTextInput
            value={value}
            valueErr={valueErr}
            info="Enter the text you want to filter by."
            onChangeSearchValue={onChangeSearchValue}
          />
        )}

        {searchType === "number" && (
          <NumberRangeInput
            value={value}
            value2={value2}
            disableValue2={disableValue2}
            valueErr={valueErr}
            info="Enter a specific number or a range of two numbers."
            onChangeSearchValue={onChangeSearchValue}
            onChangeSearchValue2={onChangeSearchValue2}
            handleUseValue2={handleUseValue2}
          />
        )}

        {searchType === "date" && (
          <DateRangeInput
            value={value}
            value2={value2}
            valueErr={valueErr}
            disableValue2={disableValue2}
            info="Enter a specific date or a range of two dates."
            handleDateChange={handleDateChange}
            handleDateChange2={handleDateChange2}
            handleUseValue2={handleUseValue2}
          />
        )}

        {searchType === "orphans" && (
          <BlankInput
            info="Click the search button to find products without a location."
            placeholder="No Location"
          />
        )}

        <BtnGroup
          onSearchProduct={onSearchProduct}
          onResetFilter={onResetFilter}
        />
      </div>
    </div>
  );
};

export default SearchBar;
