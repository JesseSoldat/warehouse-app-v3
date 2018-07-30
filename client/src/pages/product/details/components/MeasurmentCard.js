import React from "react";

// common components
import SingleField from "../../../../components/SingleField";

const MeasurmentCard = ({ array }) => {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-12">
          <div className="text-center">
            <h4 className="pb-3">
              <strong>{array.label}</strong>
            </h4>
          </div>
          <div>
            <div className="row">
              <div className="col-12 mr-ml-auto">
                <ul className="list-group list-group-flush">
                  {array.data.map(({ label, value }, index) => (
                    <SingleField label={label} value={value} key={index} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurmentCard;
