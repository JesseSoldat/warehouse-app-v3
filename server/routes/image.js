const firebase = require("firebase");
const googleStorage = require("@google-cloud/storage");
const Multer = require("multer");

const util = require("util");
const path = require("path");

const serviceAccount = require("../config/file-upload-c3300-firebase-adminsdk-y23q7-57b779a519.json");

// middleware
const isAuth = require("../middleware/isAuth");

var config = {
  apiKey: "AIzaSyBkyPopLr6_O8iIPnEr--ZGcsW1ecxdr3s",
  authDomain: "file-upload-c3300.firebaseapp.com",
  databaseURL: "https://file-upload-c3300.firebaseio.com",
  projectId: "file-upload-c3300",
  storageBucket: "file-upload-c3300.appspot.com",
  messagingSenderId: "359118658227"
};
firebase.initializeApp(config);

const storage = googleStorage({
  projectId: "file-upload-c3300",
  credentials: serviceAccount
});

const bucket = storage.bucket("file-upload-c3300.appspot.com");

const multer = Multer({
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  },
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Please provide only Images!");
  }
}

const uploadImageToStorage = file => {
  const prom = new Promise((resolve, reject) => {
    if (!file) {
      reject("No image file");
    }
    const newFileName = `${file.originalname}_${Date.now()}`;

    const fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on("error", err => {
      console.log("blobStream err", err);

      reject("Something is wrong! Unable to upload at the moment.");
    });

    blobStream.on("finish", () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = format(
        `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`
      );
      console.log("url", url);

      resolve(url);
    });

    blobStream.end(file.buffer);
  });
  return prom;
};

module.exports = app => {
  app.post(
    "/api/uploadProductImage",
    multer.single("file"),
    async (req, res) => {
      const file = req.file;

      try {
        if (file) {
          await uploadImageToStorage(file);
          console.log("success");

          res.status(200).send({
            status: "success"
          });
        }
      } catch (err) {
        console.log("err", err);
      }
    }
  );
};
