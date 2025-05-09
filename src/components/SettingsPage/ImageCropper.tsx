import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';
import { Area } from 'react-easy-crop';
import styles from './ImageCropper.module.css';

type Props = {
    image: string;
    onCropComplete: (croppedBlob: Blob) => void;
    onClose: () => void;
};

const ImageCropper: React.FC<Props> = ({ image, onCropComplete, onClose }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const handleCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleDone = async () => {
        if (!croppedAreaPixels) return;
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        onCropComplete(croppedImage);
        onClose();
    };

    return (
        <div>
            <div className={styles.cropperContainer}>
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={handleCropComplete}
                />
            </div>
            <div className={styles.buttonGroup}>
                <button onClick={handleDone} className={styles.cropButton}>Confirmar</button>
                <button onClick={onClose} className={styles.cancelButton}>Cancelar</button>
            </div>
        </div>
    );
};

export default ImageCropper;
