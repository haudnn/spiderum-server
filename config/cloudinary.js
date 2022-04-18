import dotenv from 'dotenv'
dotenv.config()
import { config, uploader } from 'cloudinary';
const cloudinaryConfig = () => config({
  cloud_name: 'trumblogapp', 
  api_key: '228477458325852',
  api_secret: 'Fp5C-5r0nBs120YcwkiLCDkiphU'
});
export { cloudinaryConfig, uploader };