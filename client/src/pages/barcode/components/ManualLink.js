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
  let spinner;

  // shelfSpot --------------------------------------------

  // shelf ------------------------------------------------
  let shelfOptions = <option>Pick a Rack first</option>;

  let shelfSelect = (
    <div className="form-group">
      <label>Pick a Rack</label>
      <select className="form-control" id="rackSelect" onChange={rackChange}>
        {shelfOptions}
      </select>
    </div>
  );

  // rack -----------------------------------------------
  const rackChange = e => {
    const obj = {
      rackId: e.target.value
    };
    handleSelectChange(obj);
  };

  let defaultRackOptions = [
    <option key="rackDefault">Pick a Storage first</option>
  ];

  let defaultRackSelect = (
    <div className="form-group">
      <label>Pick a Rack</label>
      <select className="form-control" id="rackSelect" onChange={rackChange}>
        {defaultRackOptions}
      </select>
    </div>
  );

  let rackOptions = [
    <option key="noValue" value="">
      Select a Rack
    </option>
  ];

  let rackSelect = (
    <div className="form-group">
      <label>Pick a Rack</label>
      <select className="form-control" id="rackSelect" onChange={rackChange}>
        {rackOptions}
      </select>
    </div>
  );

  if (storageId) {
    const racks = storageIdsEntity[storageId].racks;
    console.log(racks);

    for (let obj in racks) {
      let id;
      let label;

      let rack = racks[obj];
      id = rack._id;
      label = rack.rackLabel;

      rackOptions.push(
        <option key={id} value={id}>
          {label}
        </option>
      );
    }
  }

  // storage -------------------------------------------
  const storageChange = e => {
    const obj = {
      storageId: e.target.value
    };
    handleSelectChange(obj);
  };

  let storageOptions = [];

  let storageSelect = (
    <div className="form-group">
      <label>Pick a Storage</label>
      <select
        className="form-control"
        id="storageSelect"
        onChange={storageChange}
      >
        <option key="rackDefault" value="">
          Select a Storage
        </option>
        {storageOptions}
      </select>
    </div>
  );

  // render --------------------------------

  if (loading) {
    spinner = <Spinner />;
  } else if (storageIdsEntity) {
    // console.log(storageIdsEntity);

    for (let obj in storageIdsEntity) {
      let id;
      let label;

      let storage = storageIdsEntity[obj];
      id = storage._id;
      label = storage.storageLabel;

      const option = (
        <option key={id} value={id}>
          {label}
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
              {shelfSelect}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManualLink;
