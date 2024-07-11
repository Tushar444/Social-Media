import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

export const upload = async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      public_id: Date.now() + req.file.filename,
    });

    // Send back the secure_url to the client
    res.status(200).json({ url: uploadResult.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error });
  }
};
