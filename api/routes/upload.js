import express from "express";
import multer from "multer";
import { upload } from "../controllers/upload.js";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

export const uploadMulter = multer({ storage: storage });

const router = express.Router();

router.post("/", uploadMulter.single("file"), upload);

export default router;
