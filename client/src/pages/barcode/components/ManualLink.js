import React from "react";
import { Link } from "react-router-dom";

// common components
import Spinner from "../../../components/Spinner";
// utils
import isEmpty from "../../../utils/validation/isEmpty";

const ManualLink = ({
  type,
  loading,
  storageIdsEntity,
  storageId,
  rackId,
  shelfId,
  shelfSpotId,
  boxId,
  handleSelectChange,
  handleLink
}) => {
  let spinner, text, racks, shelves, shelfSpots, boxes;

  if (boxId) console.log("boxid", boxId);

  switch (type) {
    case "linkBoxToSpot":
      text = "Box to Shelf Spot";
      break;

    case "linkProductToBox":
      text = "Product to Box";
      break;

    case "product":
      text = "Store Product";
      break;

    default:
      break;
  }

  const onChange = e => {
    const { name, value } = e.target;
    const obj = {
      [name]: value
    };

    switch (name) {
      case "storageId":
        obj["rackId"] = "";
        obj["shelfId"] = "";
        obj["shelfSpotId"] = "";
        obj["boxId"] = "";
        break;

      case "rackId":
        obj["shelfId"] = "";
        obj["shelfSpotId"] = "";
        obj["boxId"] = "";
        break;

      case "shelfId":
        obj["shelfSpotId"] = "";
        obj["boxId"] = "";
        break;

      case "shelfSpotId":
        obj["boxId"] = "";
        break;

      default:
        break;
    }
    handleSelectChange(obj);
  };

  const createSelect = (
    label,
    name,
    defaultOptionText,
    options,
    disabled = false,
    link = null
  ) => {
    const defaultOption = (
      <option key={label} value="">
        {defaultOptionText}
      </option>
    );

    return (
      <div className="form-group">
        {link ? (
          <label>
            <Link to={link}>{label}</Link>
          </label>
        ) : (
          <label>{label}</label>
        )}
        <select
          disabled={disabled}
          className="form-control"
          name={name}
          onChange={onChange}
        >
          {defaultOption}
          {options}
        </select>
      </div>
    );
  };
  // storage -------------------------------------------
  const storageOptions = [];

  const storageSelect = createSelect(
    "Pick a Storage",
    "storageId",
    "Select a Storage",
    storageOptions
  );

  // rack -----------------------------------------------
  let rackDisabled, rackSelect;

  let rackOptionText = storageId ? "Select a Rack" : "Pick a Storage first";

  const rackOptions = [];

  rackDisabled = storageId ? false : true;

  rackSelect = createSelect(
    "Pick a Rack",
    "rackId",
    rackOptionText,
    rackOptions,
    rackDisabled
  );

  if (storageId) {
    racks = storageIdsEntity[storageId].racks;

    if (isEmpty(racks)) {
      rackOptionText = "No racks available";
      rackSelect = createSelect(
        "Create a Rack",
        "rackId",
        rackOptionText,
        rackOptions,
        true,
        `/rack/create/${storageId}?type=rack`
      );
    } else {
      for (let obj in racks) {
        const rack = racks[obj];
        rackOptions.push(
          <option key={rack._id} value={rack._id}>
            {rack.rackLabel}
          </option>
        );
      }
    }
  }

  // shelf ------------------------------------------------
  let shelfDisabled, shelfSelect;

  let shelfOptionText = storageId ? "Select a Shelf" : "Pick a Rack first";

  const shelfOptions = [];

  shelfDisabled = rackId ? false : true;

  shelfSelect = createSelect(
    "Pick a Shelf",
    "shelfId",
    shelfOptionText,
    shelfOptions,
    shelfDisabled
  );

  if (rackId) {
    shelves = racks[rackId].shelves;

    if (isEmpty(shelves)) {
      shelfSelect = createSelect(
        "Create a Shelf",
        "shelfId",
        "No Shelves available",
        shelfOptions,
        true,
        `/shelf/create/${storageId}/${rackId}?type=shelf`
      );
    } else {
      for (let obj in shelves) {
        const shelf = shelves[obj];
        shelfOptions.push(
          <option key={shelf._id} value={shelf._id}>
            {shelf.shelfLabel}
          </option>
        );
      }
    }
  }

  // shelfSpot --------------------------------------------
  let shelfSpotDisabled, shelfSpotSelect;

  let shelfSpotOptionText = shelfId
    ? "Select a Shelf Spot"
    : "Pick a Shelf first";

  shelfSpotDisabled = shelfId ? false : true;

  const shelfSpotOptions = [];

  shelfSpotSelect = createSelect(
    "Pick a Shelf Spot",
    "shelfSpotId",
    shelfSpotOptionText,
    shelfSpotOptions,
    shelfSpotDisabled
  );

  if (shelfId) {
    shelfSpots = shelves[shelfId].shelfSpots;

    if (isEmpty(shelfSpots)) {
      shelfSpotSelect = createSelect(
        "Create a Shelf",
        "shelfId",
        "No Shelf Spots available",
        shelfSpotOptions,
        true,
        `/shelfSpot/create/${storageId}/${rackId}/${shelfId}?type=shelfSpot`
      );
    } else {
      for (let obj in shelfSpots) {
        const shelfSpot = shelfSpots[obj];
        shelfSpotOptions.push(
          <option key={shelfSpot._id} value={shelfSpot._id}>
            {shelfSpot.shelfSpotLabel}
          </option>
        );
      }
    }
  }
  // boxes -----------------------------------------------------
  let boxDisabled, boxSpotSelect;

  let boxOptionText = shelfSpotId
    ? "Optional store in box"
    : "Pick a Shelf Spot first";

  boxDisabled = shelfSpotId ? false : true;

  const boxOptions = [];

  boxSpotSelect = createSelect(
    "Optional Pick a Box",
    "boxId",
    boxOptionText,
    boxOptions,
    boxDisabled
  );

  if (shelfSpotId) {
    boxes = shelfSpots[shelfSpotId].boxes;

    if (isEmpty(boxes)) {
      boxSpotSelect = createSelect(
        "Create a Box",
        "boxId",
        "No Boxes available",
        boxOptions,
        true,
        `/box/create/${storageId}/${rackId}/${shelfId}/${shelfSpotId}?type=box`
      );
    } else {
      for (let obj in boxes) {
        const box = boxes[obj];
        boxOptions.push(
          <option key={box._id} value={box._id}>
            {box.boxLabel}
          </option>
        );
      }
    }
  }

  // render --------------------------------

  if (loading) {
    spinner = <Spinner />;
  } else if (storageIdsEntity) {
    for (let obj in storageIdsEntity) {
      const storage = storageIdsEntity[obj];

      const option = (
        <option key={storage._id} value={storage._id}>
          {storage.storageLabel}
        </option>
      );

      storageOptions.push(option);
    }
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <h2 />
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-10 col-md-8 mx-auto">
          {spinner}
          {!loading && (
            <form onSubmit={handleLink}>
              <h3 className="mb-4">{text}</h3>
              {storageSelect}
              {rackSelect}
              {shelfSelect}
              {shelfSpotSelect}
              {type !== "linkBoxToSpot" && boxSpotSelect}
              <button
                type="submit"
                disabled={shelfSpotId === ""}
                className="btn btn-primary btn-block"
              >
                Link
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManualLink;
