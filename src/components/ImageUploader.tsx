// src/components/ImageUploader.tsx
import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { 
  DragDropContext, 
  Droppable, 
  Draggable,
  DropResult 
} from '@hello-pangea/dnd';
import { useTranslation } from 'react-i18next';
import { ImageFile } from '../types/common';
import { getThumbnailDimensions } from '../utils/imageUtils';

const DropzoneArea = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(1),
  height: '100px',
  textAlign: 'center',
  backgroundColor: theme.palette.grey[50],
  marginBottom: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
    borderColor: theme.palette.primary.main,
  },
}));
import { checkImageResolution, getResolutionRequirement } from '../utils/imageUtils';
import { Alert, Snackbar } from '@mui/material';

const PreviewContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  // gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',  // 自動調整列數
  gridTemplateColumns: 'auto auto auto',
  gap: theme.spacing(2),
  width: '100%',
  padding: theme.spacing(1),
  alignItems: 'start',
  justifyItems: 'center',
  justifyContent: 'flex-start'
}));

const DraggableItem = styled('div')({
  position: 'relative',
  cursor: 'grab',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  '&:active': {
    cursor: 'grabbing',
  }
});

const DraggablePreview = styled(Box)<{ width: number }>(
  ({ width }) => ({
    width,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '4px',
    backgroundColor: '#fff',
    overflow: 'visible',
    padding: '2px',  // 減少 padding
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    }
  })
);

const DeleteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: -8,
  right: -8,
  width: 16,
  height: 16,
  padding: 0,
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
  zIndex: 2,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 12,
  },
}));

const SequenceNumber = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

interface ImageUploaderProps {
  images: ImageFile[];
  setImages: (images: ImageFile[] | ((prev: ImageFile[]) => ImageFile[])) => void;
  maxImages?: number;
  size: string;
  rotate: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  images, 
  setImages, 
  maxImages = 10,
  size,
  rotate
}) => {
  const { t } = useTranslation();
  const [resolutionError, setResolutionError] = useState<string | null>(null);
  
  const safeImages = useMemo(() => {
    return Array.isArray(images) ? images.map((image, index) => ({
      ...image,
      id: image.id || `image-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    })) : [];
  }, [images]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const validImages: ImageFile[] = [];
    const invalidImages: string[] = [];
    
    for (const file of acceptedFiles) {
      const image = {
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        id: `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };

      // 檢查圖片解析度
      const isValid = await checkImageResolution(image, { size, rotate });
      
      if (isValid) {
        validImages.push(image);
      } else {
        invalidImages.push(file.name);
        URL.revokeObjectURL(image.preview);
      }
    }

    if (invalidImages.length > 0) {
      const requirement = getResolutionRequirement(size, rotate);
      setResolutionError(
        t('common.error.invalidResolution', {
          files: invalidImages.join(', '),
          requirement: requirement
        })
      );
    }

    if (validImages.length > 0) {
      setImages(prev => {
        const prevImages = Array.isArray(prev) ? prev : [];
        return [...prevImages, ...validImages];
      });
    }
  }, [setImages, size, rotate, t]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.bmp', '.gif']
    },
    noClick: true,
    noKeyboard: true,
    maxFiles: maxImages,
  });

  const handleSelectImage = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    if (safeImages.length < maxImages) {
      open();
    }
  }, [safeImages.length, maxImages, open]);

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = Array.from(safeImages);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    setImages(reorderedItems);
  }, [safeImages, setImages]);

  // 添加 removeImage 函數
  const removeImage = useCallback((index: number) => {
    setImages(prev => {
      const newImages = prev.filter((_, i) => i !== index);
      if (prev[index]?.preview) {
        URL.revokeObjectURL(prev[index].preview);
      }
      return newImages;
    });
  }, [setImages]);

  useEffect(() => {
    return () => {
      safeImages.forEach(image => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [safeImages]);

  return (
    <Box>
      <DropzoneArea {...getRootProps()}>
        <input {...getInputProps()} />
        <Typography sx={{ backgroundColor: 'transparent' }}>
          {t('common.placeholder.dragOrSelect')}
          <Button 
            variant="basic" 
            onClick={handleSelectImage}
            disabled={safeImages.length >= maxImages}
            sx={{ ml: 1 }}
          >
            {t('common.placeholder.selectImage')}
          </Button>
        </Typography>
      </DropzoneArea>
      
      {safeImages.length > 0 && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable-images" direction="horizontal">
            {(provided) => (
              <PreviewContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {safeImages.map((image, index) => {
                  const dimensions = getThumbnailDimensions(size, rotate);
                  const isVertical = rotate === 90 || rotate === 270;
                  const baseSize = 150;
                  
                  return (
                    <Draggable 
                      key={image.id}
                      draggableId={image.id}
                      index={index}
                    >
                      {(provided) => (  // 移除未使用的 snapshot 參數
                        <DraggableItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                        >
                          <DraggablePreview
                            width={baseSize}
                            sx={{
                              height: isVertical ? baseSize * (4/3) : baseSize * (3/4),
                              padding: '4px'
                            }}
                          >
                            <Box
                              sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative'
                              }}
                            >
                              <img
                                src={image.preview}
                                alt={image.name}
                                style={{
                                  maxWidth: '100%',
                                  maxHeight: '100%',
                                  objectFit: 'contain',
                                  transform: `rotate(${dimensions.rotate}deg)`,
                                  transformOrigin: 'center center',
                                  transition: 'all 0.3s ease'
                                }}
                              />
                            </Box>
                            <DeleteButton
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                removeImage(index);
                              }}
                              aria-label="remove image"
                            >
                              <CloseIcon />
                            </DeleteButton>
                          </DraggablePreview>
                          <SequenceNumber sx={{ mt: 0 }}>
                            {index + 1}
                          </SequenceNumber>
                        </DraggableItem>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </PreviewContainer>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {/* 新增解析度錯誤提示 */}
      <Snackbar
        open={!!resolutionError}
        autoHideDuration={6000}
        onClose={() => setResolutionError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setResolutionError(null)}
          severity="error"
          variant="filled"
        >
          {resolutionError}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ImageUploader;
