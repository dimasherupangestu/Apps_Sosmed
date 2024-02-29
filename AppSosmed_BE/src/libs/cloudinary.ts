import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

export default new (class CloudinaryConfig {
  upload() {
    cloudinary.config({
      cloud_name: "debqy6i4f",
      api_key: "258826236137417",
      api_secret: "uLZI7bTO9H6X5iCni3NgzV-okjY",
      secure: true,
    });
  }
  async destination(image: string) {
    try {
      return await cloudinary.uploader.upload(`src/uploads/${image}`);
    } catch (error) {
      throw error;
    }
  }
})();
