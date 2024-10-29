import React from 'react';
import { ImageFile } from '../types/common';
interface ImageUploaderProps {
    images: ImageFile[];
    setImages: (images: ImageFile[] | ((prev: ImageFile[]) => ImageFile[])) => void;
    maxImages?: number;
    size: string;
    rotate: number;
}
declare const ImageUploader: React.FC<ImageUploaderProps>;
export default ImageUploader;
