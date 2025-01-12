import React, { useState, ChangeEvent } from "react";
import axios from "axios";

const FileUpload: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [fileUrls, setFileUrls] = useState<string[]>([]);
    const [uploading, setUploading] = useState<boolean>(false);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files ? Array.from(event.target.files) : [];
        setFiles(selectedFiles);
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            alert("¡Por favor selecciona al menos un archivo!");
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            files.forEach((file) => {
                formData.append("files", file); // El nombre "files" debe coincidir con el nombre del parámetro en el backend
            });

            const response = await axios.post("http://localhost:8000/api/upload-files/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const uploadedUrls = response.data.uploaded_files.map((file: { url: string }) => file.url);
            setFileUrls(uploadedUrls);
            alert("¡Archivos subidos exitosamente!");
        } catch (error) {
            console.error("Error al subir los archivos:", error);
            alert("No se pudieron subir los archivos. Inténtalo de nuevo.");
        } finally {
            setUploading(false);
        }
    };
    

    return (
        <div>
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Subiendo..." : "Subir"}
            </button>
            {fileUrls.length > 0 && (
                <div>
                    <h3>Imágenes subidas:</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {fileUrls.map((url, index) => (
                            <div key={index} style={{ textAlign: "center" }}>
                                <img
                                    src={url}
                                    alt={`Uploaded file ${index + 1}`}
                                    style={{ maxWidth: "200px", height: "auto", borderRadius: "5px" }}
                                />
                                <p>{url}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;