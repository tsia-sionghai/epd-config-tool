// src/utils/imageUtils.ts
import { getResolution } from '../configs/sizeOptions';

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
    if (size === '13.3') {
      // 13.3" 的特殊處理：UI rotate 90° 對應實際 0°
      return uiRotate === 90 ? 0 : 
             uiRotate === 180 ? 90 :
             uiRotate === 270 ? 180 :
             uiRotate === 0 ? 270 : uiRotate;
    }
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
