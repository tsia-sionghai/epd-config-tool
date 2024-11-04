// src/components/ImagePreview.tsx
import React from 'react';
import { Box } from '@mui/material';
import { ImageFile } from '../types/common';
import { getResolution } from '../configs/sizeOptions';

const getThumbnailDimensions = (
  size: string, 
  uiRotate: number,
  baseWidth = 150
) => {
  const resolution = getResolution(size);
  const [width, height] = resolution.split('x').map(Number);
  const ratio = height / width;
  const thumbWidth = baseWidth;
  const thumbHeight = Math.round(baseWidth * ratio);

  // 計算實際需要的旋轉角度
  const getActualRotation = (size: string, uiRotate: number) => {
    if (size === '13.3') {
      return (uiRotate - 90);
    }
    return uiRotate;
  };

  const actualRotate = getActualRotation(size, uiRotate);
  // 當旋轉 0 或 180 度時需要交換寬高
  const shouldSwapDimensions = (actualRotate === 0 || actualRotate === 180);

  return {
    width: shouldSwapDimensions ? thumbHeight : thumbWidth,
    height: shouldSwapDimensions ? thumbWidth : thumbHeight,
    rotate: actualRotate
  };
};

interface ImagePreviewProps {
  image: ImageFile;
  size: string;
  rotate: number;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  image, 
  size, 
  rotate 
}) => {
  const dimensions = getThumbnailDimensions(size, rotate);

  return (
    <Box
      sx={{
        width: dimensions.width,
        height: dimensions.height,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ccc',
        borderRadius: 1,
        bgcolor: 'background.paper',
        margin: 1  // 添加統一的邊距
      }}
    >
      <img
        src={image.preview}
        alt={image.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transform: `rotate(${dimensions.rotate}deg)`,
          transformOrigin: 'center center',
          transition: 'transform 0.3s ease'
        }}
      />
    </Box>
  );
};
