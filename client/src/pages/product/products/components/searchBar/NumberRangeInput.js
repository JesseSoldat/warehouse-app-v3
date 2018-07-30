import React from "react";

const NumberRangeInput = ({
  value,
  value2,
  disableValue2,
  valueErr,
  info,
  onChangeSearchValue,
  onChangeSearchValue2,
  handleUseValue2
}) => {
  return (
    <div className="col-xs-12 col-md-5 d-inline-block py-2 my-0">
      <div className="input-group d-flex">
        <span className="mr-3">
          <label className="p-0 m-0">
            <small>Starting</small>
          </label>
          <input
            style={{ width: "200px" }}
            type="number"
            className={valueErr ? "form-control is-invalid" : "form-control"}
            placeholder="Number #1"
            value={value}
            onChange={onChangeSearchValue}
          />
        </span>

        <span>
          <label style={{ position: "relative" }} className="col-12 p-0 m-0">
            <small>Ending</small>
            <input
              style={{ position: "absolute", right: 0 }}
              checked={!disableValue2}
              type="checkbox"
              onChange={handleUseValue2}
            />
          </label>
          <input
            disabled={disableValue2}
            style={{ width: "200px" }}
            type="number"
            className="form-control"
            placeholder="Number #2"
            value={value2}
            onChange={onChangeSearchValue2}
          />
        </span>
      </div>

      <div>
        {!valueErr ? (
          <small className="form-text text-muted py-0 my-0 pl-2 pt-1 ">
            {info}
          </small>
        ) : (
          <small
            className="form-text py-0 my-0 pl-2 pt-1"
            style={{ color: "red" }}
          >
            {valueErr}
          </small>
        )}
      </div>
    </div>
  );
};

export default NumberRangeInput;
