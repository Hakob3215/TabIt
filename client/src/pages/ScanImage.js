import React from 'react';
import './styles/ScanImage.css';

const ScanImage = () => {

function handleImage(e) {
    const imageFile = e.target.files[0];
    return imageFile;
};

    return (
        <div className='scanner'>
        <h1>Scan Image</h1>
        <input id="pickImage" type="file" accept="image/*" capture="camera" onChange={handleImage}/>
        <label htmlFor="pickImage" className='custom-file-upload'>Pick Image</label>
        </div>
    );
};

export default ScanImage;