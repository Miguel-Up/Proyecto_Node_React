const multer = require("multer");//recojo lo que viene y lo puedo mandar
const cloudinary = require("cloudinary").v2; //la instancia donde lo mando
const { CloudinaryStorage } = require("multer-storage-cloudinary");//las restricciones que vamos a poner


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "usermiguel",
        allowedFormats: ["jpg", "png", "jpeg"]
    }
});
const upload = multer({ storage });

module.exports = upload