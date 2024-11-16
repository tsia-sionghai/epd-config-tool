// src/utils/imageUtils.ts
import { getResolution } from '../configs/sizeOptions';
import { ImageFile, ImageConfig, SizeType } from '../types/common';

// 保留現有的縮圖計算功能
export const getThumbnailDimensions = (
  size: string, 
  rotate: number,
  baseWidth = 150
) => {
  const resolution = getResolution(size);
  const [width, height] = resolution.split('x').map(Number);
  const ratio = height / width;
  const thumbWidth = baseWidth;
  const thumbHeight = Math.round(baseWidth * ratio);

  // 計算實際需要的旋轉角度
  const getActualRotation = (size: string, uiRotate: number) => {
    return uiRotate;
  };

  const actualRotate = getActualRotation(size, rotate);
  // 當實際旋轉角度為 90 或 270 度時交換寬高
  const shouldSwapDimensions = (actualRotate === 90 || actualRotate === 270);

  return {
    width: shouldSwapDimensions ? thumbHeight : thumbWidth,
    height: shouldSwapDimensions ? thumbWidth : thumbHeight,
    rotate: actualRotate
  };
};

// 新增解析度檢查功能
export const checkImageResolution = async (
  image: ImageFile,
  config: Pick<ImageConfig, 'size' | 'rotate'>
): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => {
      const resolution = getResolution(config.size);
      const [expectedWidth, expectedHeight] = resolution.split('x').map(Number);
      
      // 根據旋轉角度決定預期的寬高
      const shouldSwapDimensions = (config.rotate === 90 || config.rotate === 270);
      const requiredWidth = shouldSwapDimensions ? expectedHeight : expectedWidth;
      const requiredHeight = shouldSwapDimensions ? expectedWidth : expectedHeight;

      console.log(`Checking resolution for ${image.name}:`, {
        actual: `${img.width}x${img.height}`,
        required: `${requiredWidth}x${requiredHeight}`,
        size: config.size,
        rotate: config.rotate
      });

      const isValid = img.width === requiredWidth && img.height === requiredHeight;
      resolve(isValid);
    };

    img.onerror = () => {
      console.error(`Failed to load image for resolution check: ${image.name}`);
      resolve(false);
    };

    img.src = image.preview;
  });
};

// 取得特定尺寸的解析度要求
export const getRequiredResolution = (
  size: SizeType,
  rotate: number
): { width: number; height: number } => {
  const resolution = getResolution(size);
  const [width, height] = resolution.split('x').map(Number);
  
  const shouldSwapDimensions = (rotate === 90 || rotate === 270);
  return {
    width: shouldSwapDimensions ? height : width,
    height: shouldSwapDimensions ? width : height
  };
};

// 取得格式化的解析度字串
export const formatResolution = (width: number, height: number): string => {
  return `${width}x${height}`;
};

// 取得尺寸和旋轉角度對應的解析度要求字串
export const getResolutionRequirement = (
  size: SizeType,
  rotate: number
): string => {
  const { width, height } = getRequiredResolution(size, rotate);
  return formatResolution(width, height);
};

// 取得解析度錯誤訊息
export const getResolutionErrorMessage = (
  size: SizeType,
  rotate: number,
  actualWidth: number,
  actualHeight: number
): string => {
  const required = getRequiredResolution(size, rotate);
  return `需要 ${formatResolution(required.width, required.height)}, 
          但圖片解析度為 ${formatResolution(actualWidth, actualHeight)}`;
};
