import React from "react";
import { connect } from "react-redux";

const OverlaySpinner = ({ showOverlay }) => {
  return showOverlay ? (
    <div className="loading-overlay">
      <div className="loading-overlay-container">
        <div className="text-center loading-overlay-spinner-container">
          <i className="fas fa-spinner fa-7x fa-spin mt-4 loading-overlay-spinner" />
        </div>
      </div>
    </div>
  ) : null;
};

const mapStateToProps = ({ ui }) => ({
  showOverlay: ui.showOverlay
});

export default connect(mapStateToProps)(OverlaySpinner);
