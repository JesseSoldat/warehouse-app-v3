import React from "react";

// common components
import Spinner from "../../../components/Spinner";

const ManualLink = ({
  loading,
  storageIdsEntity,
  storageId,
  rackId,
  shelfId,
  shelfSpotId,
  handleSelectChange
}) => {
  let spinner, racks, shelves, shelfSpots;

  const onChange = e => {
    const { name, value } = e.target;
    const obj = {
      [name]: value
    };

    switch (name) {
      case "storageId":
        (obj["rackId"] = ""), (obj["shelfId"] = "");
        obj["shelfSpotId"] = "";
        break;

      case "rackId":
        obj["shelfId"] = "";
        obj["shelfSpotId"] = "";
        break;

      case "shelfId":
        obj["shelfSpotId"] = "";
        break;

      default:
        break;
    }
    handleSelectChange(obj);
  };

  const createSelect = (label, name, options, disabled = false) => {
    return (
      <div className="form-group">
        <label>{label}</label>
        <select
          disabled={disabled}
          className="form-control"
          name={name}
          onChange={onChange}
        >
          {options}
        </select>
      </div>
    );
  };
  // storage -------------------------------------------
  const storageOptions = [
    <option key="storageNoValue" value="">
      Select a Storage
    </option>
  ];

  const storageSelect = createSelect(
    "Pick a Storage",
    "storageId",
    storageOptions
  );

  // rack -----------------------------------------------
  const rackOptions = [
    <option key="rackNoValue" value="">
      {storageId ? "Select a Rack" : "Pick a Storage first"}
    </option>
  ];

  const defaultRackSelect = createSelect(
    "Pick a Rack",
    "rackId",
    rackOptions,
    true
  );

  const rackSelect = (
    <div className="form-group">
      <label>Pick a Rack</label>
      <select className="form-control" name="rackId" onChange={onChange}>
        {rackOptions}
      </select>
    </div>
  );

  if (storageId) {
    racks = storageIdsEntity[storageId].racks;

    for (let obj in racks) {
      const rack = racks[obj];
      rackOptions.push(
        <option key={rack._id} value={rack._id}>
          {rack.rackLabel}
        </option>
      );
    }
  }

  // shelf ------------------------------------------------
  const shelfOptions = [
    <option key="shelNoValue" value="">
      {storageId ? "Select a Shelf" : "Pick a Rack first"}
    </option>
  ];

  const defaultShelfSelect = createSelect(
    "Pick a Shelf",
    "shelfId",
    shelfOptions,
    true
  );

  const shelfSelect = (
    <div className="form-group">
      <label>Pick a Shelf</label>
      <select className="form-control" name="shelfId" onChange={onChange}>
        {shelfOptions}
      </select>
    </div>
  );

  if (rackId) {
    shelves = racks[rackId].shelves;

    for (let obj in shelves) {
      const shelf = shelves[obj];
      shelfOptions.push(
        <option key={shelf._id} value={shelf._id}>
          {shelf.shelfLabel}
        </option>
      );
    }
  }

  // shelfSpot --------------------------------------------
  const shelfSpotOptions = [
    <option key="shelfSpotNoValue" value="">
      {storageId ? "Select a Shelf Spot" : "Pick a Shelf first"}
    </option>
  ];

  const defaultShelfSpotSelect = createSelect(
    "Pick a Shelf Spot",
    "shelfSpotId",
    shelfSpotOptions,
    true
  );

  const shelfSpotSelect = (
    <div className="form-group">
      <label>Pick a Shelf Spot</label>
      <select className="form-control" name="shelfSpotId" onChange={onChange}>
        {shelfSpotOptions}
      </select>
    </div>
  );

  if (shelfId) {
    shelfSpots = shelves[shelfId].shelfSpots;

    for (let obj in shelfSpots) {
      const shelfSpot = shelfSpots[obj];
      shelfSpotOptions.push(
        <option key={shelfSpot._id} value={shelfSpot._id}>
          {shelfSpot.shelfSpotLabel}
        </option>
      );
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
      <div className="row mt-5">
        <h2 />
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-10 col-md-8 mx-auto">
          {spinner}
          {!loading && (
            <form>
              {storageSelect}
              {storageId ? rackSelect : defaultRackSelect}
              {rackId ? shelfSelect : defaultShelfSelect}
              {shelfId ? shelfSpotSelect : defaultShelfSpotSelect}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManualLink;
