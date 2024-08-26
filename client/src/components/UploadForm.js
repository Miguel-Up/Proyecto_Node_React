import React, { useState } from "react";

const UploadForm = () => {
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setMessage("Por favor, selecciona una imagen primero.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await fetch("http://localhost:3010/upload", {
                method: "POST",
                body: formData,

            });

            const data = await response.json();
            if (response.ok) {
                setMessage(`Imagen subida con éxito: ${data.filePath}`);
            } else {
                setMessage(`Error al subir la imagen: ${data.message}`);
            }
        } catch (error) {
            setMessage("Error al realizar la solicitud: " + error);
        }
    };

    return (
        <div>
            <h1>Subir Imagen</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept="image/*" />
                <button type="submit">Subir Imagen</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadForm;