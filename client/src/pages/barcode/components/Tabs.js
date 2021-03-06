import React from "react";

// custom components
import BarcodeScan from "./BarcodeScan";
import ManualLink from "./ManualLink";
import LinkOrphansToBox from "./LinkOrphansToBox";

const Tabs = ({
  // manual link
  type,
  loading,
  storageIdsEntity,
  storageId,
  rackId,
  shelfId,
  shelfSpotId,
  handleSelectChange,
  handleLink,
  // scan
  result,
  scanning,
  handleClickUseCamera,
  handleErr,
  handleScan,
  // Scan Form
  linkScannedItems,
  resetItems,
  firstScannedItemId,
  firstScannedItemType,
  secondScannedItemId,
  secondScannedItemType,
  // linkProductToBox
  orphans,
  handleLinkProductToBox,
  history
}) => {
  let content;

  // Flow Control ------------------------------
  switch (type) {
    case "storeProduct":
    case "restoreProduct":
    case "linkBoxToSpot":
      content = (
        <ManualLink
          type={type}
          storageIdsEntity={storageIdsEntity}
          loading={loading}
          storageId={storageId}
          rackId={rackId}
          shelfId={shelfId}
          shelfSpotId={shelfSpotId}
          handleSelectChange={handleSelectChange}
          handleLink={handleLink}
        />
      );
      break;

    case "linkProductToBox":
      content = (
        <LinkOrphansToBox
          loading={loading}
          orphans={orphans}
          handleLinkProductToBox={handleLinkProductToBox}
          history={history}
        />
      );
      break;

    default:
      break;
  }

  // Return HTML -------------------------------------
  return (
    <div>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="home-tab"
            data-toggle="tab"
            href="#home"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Scan
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="profile-tab"
            data-toggle="tab"
            href="#profile"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Manual Link
          </a>
        </li>
      </ul>

      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <BarcodeScan
            result={result}
            scanning={scanning}
            handleClickUseCamera={handleClickUseCamera}
            handleErr={handleErr}
            handleScan={handleScan}
            // Scan Form
            resetItems={resetItems}
            linkScannedItems={linkScannedItems}
            firstScannedItemId={firstScannedItemId}
            firstScannedItemType={firstScannedItemType}
            secondScannedItemId={secondScannedItemId}
            secondScannedItemType={secondScannedItemType}
          />
        </div>

        <div
          className="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
