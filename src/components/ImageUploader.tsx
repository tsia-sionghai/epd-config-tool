// src/components/ImageUploader.tsx
import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

// Styled Components
const DropzoneArea = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: theme.palette.grey[50],
  marginBottom: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
    borderColor: theme.palette.primary.main,
  },
}));

const ImagePreviewContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 150px)', // 固定寬度
  gap: theme.spacing(2),
  width: '100%',
  marginTop: theme.spacing(2),
}));

const ImagePreview = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '150px',           // 固定寬度
  height: '200px',          // 固定高度
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.grey[300]}`,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: -8,
  right: -8,
  width: 24,
  height: 24,
  padding: 0,
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
  zIndex: 2,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 16,
  },
}));

const SequenceNumber = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(1),
  left: '50%',
  transform: 'translateX(-50%)',
  color: theme.palette.common.white,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: '2px 12px',
  borderRadius: 12,
  fontSize: '0.75rem',
  zIndex: 1,
}));

interface ImageUploaderProps {
  images: string[];
  setImages: (images: string[] | ((prev: string[]) => string[])) => void;
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
  
  const safeImages = useMemo(() => 
    Array.isArray(images) ? images : [],
    [images]
  );

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newImageUrls = acceptedFiles.map(file => URL.createObjectURL(file));
    setImages(prev => {
      const prevImages = Array.isArray(prev) ? prev : [];
      return [...prevImages, ...newImageUrls];
    });
  }, [setImages]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png']
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

  const onDragEnd = useCallback((result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(safeImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setImages(items);
  }, [safeImages, setImages]);

  const removeImage = useCallback((index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  }, [setImages]);

  return (
    <Box>
      <DropzoneArea {...getRootProps()}>
        <input {...getInputProps()} />
        <Typography>
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="images" direction="horizontal">
            {(provided) => (
              <ImagePreviewContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {safeImages.map((image, index) => (
                  <Draggable 
                    key={`image-${index}`}
                    draggableId={`image-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <ImagePreview
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Box 
                          sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: `rotate(${rotate}deg)`,
                            transformOrigin: 'center'
                          }}
                        >
                          <img 
                            src={image} 
                            alt={`preview ${index + 1}`}
                            style={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              objectFit: 'contain'
                            }}
                          />
                        </Box>
                        <DeleteButton
                          onClick={() => removeImage(index)}
                          aria-label="remove image"
                        >
                          <CloseIcon />
                        </DeleteButton>
                        <SequenceNumber>
                          {index + 1}
                        </SequenceNumber>
                      </ImagePreview>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ImagePreviewContainer>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Box>
  );
};

export default ImageUploader;
