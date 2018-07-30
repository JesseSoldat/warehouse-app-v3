import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerInput = ({
  date,
  checked,
  dateLabel,
  checkLabel,
  handleDateChange,
  handleCheck
}) => {
  const handleChange = date => {
    handleDateChange(date);
  };

  return (
    <div className="form-group d-flex align-items-center">
      <div className="pr-3">
        <label className="p-0 m-0">
          <small>{dateLabel}</small>
        </label>
        <DatePicker
          className="form-control form-control-lg mt-2"
          selected={date}
          onChange={handleChange}
        />
      </div>

      <div className="form-check mt-3">
        <input
          type="checkbox"
          className="form-check-input form-control-lg mt-4"
          id="exampleCheck1"
          value={checked}
          checked={checked}
          onChange={handleCheck}
        />
        <label className="form-check-label mt-3" htmlFor="exampleCheck1">
          {checkLabel}
        </label>
      </div>
    </div>
  );
};

export default DatePickerInput;
