import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

import PropTypes from 'prop-types';


function MyDropzone({ onFileDrop, onFileUpload }) {
    const [previewUrl, setPreviewUrl] = useState(null);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: useCallback(files => {
            onFileDrop(files[0]);
            setPreviewUrl(URL.createObjectURL(files[0]));
        }, [onFileDrop]),
    });

    const handleUploadClick = async () => {
        await onFileUpload();
        setPreviewUrl(null);
    };

    return (
        <div>
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
            <button onClick={handleUploadClick}>Enviar</button>
        </div>
    );
}

MyDropzone.propTypes = {
    onFileDrop: PropTypes.func.isRequired,
};

function ImageUploader() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('image', file);

        setLoading(true);

        const res = await axios.post('http://localhost:5000/upload', formData);

        setUploadedImages(prevState => [...prevState, res.data.url]);

        setLoading(false);
    };

    return (
        <div>
            <MyDropzone onFileDrop={setFile} onFileUpload={handleFileUpload} />
            {loading ? <p>Carregando...</p> : null}
            {uploadedImages.map((url, index) => (
                <div key={index}>
                    <img src={url} alt="Uploaded" />
                </div>
            ))}
        </div>
    );
}

export default ImageUploader;
