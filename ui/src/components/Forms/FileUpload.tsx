import React, { useState, useRef } from 'react';

const FileUpload: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Maneja los archivos seleccionados o arrastrados
    const handleFiles = (selectedFiles: FileList) => {
        const fileArray = Array.from(selectedFiles);
        setFiles(fileArray);
    };

    // Evento de selección de archivos
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            handleFiles(event.target.files);
        }
    };

    // Evento de arrastre de archivos sobre el área
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    // Evento cuando los archivos se sueltan en el área de drop
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files) {
            handleFiles(event.dataTransfer.files);
        }
    };

    // Abre el diálogo de selección de archivos
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
                onChange={handleFileChange}
            />
            <img src="/icons/upload-icon.svg" alt="Upload Icon" className="mb-2" />
            <p className="text-gray-600">Arrastra y suelta archivos aquí</p>
            <p className="text-gray-400 text-sm">o haz clic para seleccionarlos</p>

            {files.length > 0 && (
                <div className="mt-4 w-full">
                    <h4 className="text-gray-600 mb-2">Archivos seleccionados:</h4>
                    <ul className="list-disc list-inside">
                        {files.map((file, index) => (
                            <li key={index} className="text-gray-500 text-sm">
                                {file.name} ({Math.round(file.size / 1024)} KB)
                                {file.type.startsWith("image/") && (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        className="mt-2 w-20 h-20 object-cover rounded-md"
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
