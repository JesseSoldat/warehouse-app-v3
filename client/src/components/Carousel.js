import React from "react";

const Carousel = ({ picturesArray }) => {
  const carouselItem = picturesArray.map((item, i) => {
    const text = `${i} slide of ${picturesArray.length}`;
    const active = i === 0 ? "carousel-item active" : "carousel-item";

    return (
      <div className={active} key={i}>
        <img
          className="d-block w-100"
          style={{
            height: "350px",
            backgroundColor: "lightgrey",
            backgroundBlendMode: "multiply"
          }}
          src={item}
          alt={text}
        />
        <div className="carousel-caption d-none d-md-block">
          <p className="">Image {i + 1}</p>
        </div>
      </div>
    );
  });

  const carouselInner = <div className="carousel-inner">{carouselItem}</div>;

  return (
    <div
      id="carouselExampleControls"
      className="carousel slide mt-2"
      data-ride="carousel"
    >
      {carouselInner}
      <a
        className="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Carousel;
