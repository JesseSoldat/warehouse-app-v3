const boxCardData = boxes => {
  let link1;
  let link2;

  return boxes.map(box => {
    const boxId = box._id;
    if (box.shelfSpot) {
      const shelfSpotId = box.shelfSpot._id;
      const shelfId = box.shelfSpot.shelf._id;
      const rackId = box.shelfSpot.shelf.rack._id;
      const storageId = box.shelfSpot.shelf.rack.storage._id;
      link1 = `/box/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}`;
      link2 = `/box/edit/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type=box`;
    } else {
      link1 = `/box/${boxId}`;
      link2 = `/box/edit/${boxId}?type=box&location=false`;
    }
    return {
      id: box._id,
      title: box.boxLabel,
      picture: [
        "https://firebasestorage.googleapis.com/v0/b/file-upload-c3300.appspot.com/o/images%2Fbox2.png?alt=media&token=2d4197ff-5051-46b5-a158-96a4ab52e408"
      ],
      linkText1: "View",
      linkText2: "Edit",
      link1,
      link2
    };
  });
};

export default boxCardData;
