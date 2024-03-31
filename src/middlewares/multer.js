import multer from "multer";

export const storage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "src/public/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

export default storage;
