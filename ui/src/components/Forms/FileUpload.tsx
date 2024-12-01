import React, { useState, useRef } from "react";

interface FileUploadProps {
    onFilesSelected: (files: File[]) => void; // Callback para notificar los archivos seleccionados
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFiles = (selectedFiles: FileList) => {
        const fileArray = Array.from(selectedFiles);
        setFiles((prevFiles) => [...prevFiles, ...fileArray]);
        onFilesSelected([...files, ...fileArray]); // Notifica los archivos seleccionados
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            handleFiles(event.target.files);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files) {
            handleFiles(event.dataTransfer.files);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer"
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleFileChange}
            />
            <img src="/icons/upload-icon.svg" alt="Upload Icon" className="mb-2 w-8 h-8" />
            <p className="text-gray-600">Arrastra y suelta archivos aquí</p>
            <p className="text-gray-400 text-sm">o haz clic para seleccionarlos</p>

            {files.length > 0 && (
                <div className="mt-4 w-full">
                    <h4 className="text-gray-600 mb-2">Archivos seleccionados:</h4>
                    <ul className="list-disc list-inside">
                        {files.map((file, index) => (
                            <li key={index} className="text-gray-500 text-sm">
                                {file.name} ({Math.round(file.size / 1024)} KB)
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
