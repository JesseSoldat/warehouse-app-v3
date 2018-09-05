import React from "react";

// common components
import SelectInput from "../../../../components/searchbar/SelectInput";
import FilterTextInput from "../../../../components/searchbar/FilterTextInput";
import BlankInput from "../../../../components/searchbar/BlankInput";
import BtnGroup from "../../../../components/searchbar/BtnGroup";

const SearchBar = ({
  searchBarFields,
  searchOption,
  value,
  valueErr,
  searchType,
  // CB
  onChangeSearchOption,
  onChangeSearchValue,
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

        {searchType === "orphans" && (
          <BlankInput
            info="Click the search button to find boxes without a location."
            placeholder="No Location"
          />
        )}

        <BtnGroup onSearch={onSearch} onResetFilter={onResetFilter} />
      </div>
    </div>
  );
};

export default SearchBar;
