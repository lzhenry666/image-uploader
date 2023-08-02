import axios from 'axios';

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

        const res = await axios.post('/upload', formData);

        setImageUrl(res.data.url);

        setLoading(false);
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(imageUrl);
    };

    return (
        <div>
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
