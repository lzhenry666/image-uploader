import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function MyDropzone({ onFileDrop }) {
    const [previewUrl, setPreviewUrl] = useState(null);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: useCallback(files => {
            onFileDrop(files[0]);
            setPreviewUrl(URL.createObjectURL(files[0]));
        }, [onFileDrop]),
    });

    return (
        <div {...getRootProps()} style={{ height: 200, width: 200, border: '1px solid black' }}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Solte a imagem aqui...</p> :
                previewUrl ?
                <img src={previewUrl} alt="Preview" style={{ height: '100%', width: '100%' }} /> :
                <p>Arraste e solte sua imagem aqui, ou clique para selecionar a imagem</p>
            }
        </div>
    );
}

function ImageUploader() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

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
            <MyDropzone onFileDrop={setFile} />
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
