import React, { Component } from "react";

class ImageCard extends Component {
  state = {
    showDeleteBtn: "d-none"
  };

  toggleDeleteBtn = showDeleteBtn => {
    showDeleteBtn
      ? this.setState({ showDeleteBtn: "d-inline-block" })
      : this.setState({ showDeleteBtn: "d-none" });
  };

  render() {
    const { picUrl, type, handleDeleteImage } = this.props;
    return (
      <div className="d-inline-block" style={{ position: "relative" }}>
        <img
          onMouseOver={() => this.toggleDeleteBtn(true)}
          onMouseOut={() => this.toggleDeleteBtn(false)}
          src={picUrl}
          alt="product"
          style={{ width: "150px", height: "150px" }}
          className="img-thumbnail m-2"
        />
        <button
          onMouseOver={() => this.toggleDeleteBtn(true)}
          onMouseOut={() => this.toggleDeleteBtn(false)}
          onClick={e => handleDeleteImage(picUrl, type)}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px"
          }}
          className={`btn btn-danger btn-sm ${this.state.showDeleteBtn}`}
        >
          x
        </button>
      </div>
    );
  }
}

export default ImageCard;
