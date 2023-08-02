import React, { useState, useCallback } from 'react';
import axios from 'axios';

function Dropzone({ onFileDrop }) {
    const onDrop = useCallback((event) => {
        event.preventDefault();

        const files = Array.from(event.dataTransfer.files);
        onFileDrop(files[0]);
    }, [onFileDrop]);

    const onDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={{ height: 200, width: 200, border: '1px solid black' }}
        >
            Arraste e solte sua imagem aqui
        </div>
    );
}

function ImageUploader() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('image', file);

        setLoading(true);

        const res = await axios.post('http://localhost:5000/upload', formData);

        setImageUrl(res.data.url);

        setLoading(false);
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(imageUrl);
    };

    return (
        <div>
            <Dropzone onFileDrop={setFile} />
            <input type="file" onChange={handleFileChange} />
            {loading ? <p>Carregando...</p> : null}
            {imageUrl ? (
                <div>
                    <img src={imageUrl} alt="Uploaded" />
                    <button onClick={handleCopyToClipboard}>Copiar para a área de transferência</button>
                </div>
            ) : null}
            <button onClick={handleFileUpload}>Enviar</button>
        </div>
    );
}

export default ImageUploader;
