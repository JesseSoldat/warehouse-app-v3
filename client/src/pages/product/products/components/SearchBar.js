import React from "react";

// common components
import SelectInput from "../../../../components/searchbar/SelectInput";
import FilterTextInput from "../../../../components/searchbar/FilterTextInput";
import BlankInput from "../../../../components/searchbar/BlankInput";
import BtnGroup from "../../../../components/searchbar/BtnGroup";
// custom components
import NumberRangeInput from "./searchBar/NumberRangeInput";
import DateRangeInput from "./searchBar/DateRangeInput";

const SearchBar = ({
  searchBarFields,
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
  onSearch,
  onResetFilter
}) => {
  return (
    <div className="row mb-3">
      <div className="col-12 d-flex flex-wrap mx-auto align-items-center">
        <SelectInput
          searchBarFields={searchBarFields}
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
            onSearch={onSearch}
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
            onSearch={onSearch}
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

        <BtnGroup onSearch={onSearch} onResetFilter={onResetFilter} />
      </div>
    </div>
  );
};

export default SearchBar;
