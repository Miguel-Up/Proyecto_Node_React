const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();
const { connectDB } = require("./src/utils/db")
const routerUser = require("./src/api/routes/users.routes");
const routerBook = require("./src/api/routes/books.routes");

app.use(cors()); // Permitir CORS para todas las solicitudes
app.use(express.json());
app.use("/user", routerUser);
app.use("/books", routerBook);

// Configurar multer para almacenar archivos en una carpeta "uploads"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Endpoint para subir imágenes
app.post("/upload", upload.single("image"), (req, res) => {
    console.log("hola")
    try {
        res.status(200).json({
            message: "Imagen subida con éxito",
            filePath: `/uploads/${req.file.filename}`,
        });
    } catch (error) {
        res.status(500).json({ message: "Error al subir la imagen", error });
    }
});

const env = require("dotenv");
env.config()
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET


})

console.log(process.env)


connectDB();

const PORT = process.env.PORT;





console.log(path.join(__dirname, "uploads"))


app.listen(PORT, () => {
    console.log(`listen port http://localhost:${PORT}`)
})
