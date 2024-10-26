// src/components/ImageUploader.tsx
import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

const DropzoneArea = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // padding: theme.spacing(1),
  height: '150px',
  textAlign: 'center',
  backgroundColor: theme.palette.grey[50],
  marginBottom: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
    borderColor: theme.palette.primary.main,
  },
}));

const PreviewContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  width: '100%',
  padding: theme.spacing(1),
  minHeight: 200,
}));

const DraggablePreview = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '150px',
  userSelect: 'none',
});

const DraggableItem = styled('div')({
  width: '150px',
  padding: '8px',
  cursor: 'grab',
  '&:active': {
    cursor: 'grabbing',
  },
});

const ImagePreview = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '200px',
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.shape.borderRadius,
  overflow: 'visible', // 改為 visible 以顯示溢出的刪除按鈕
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    borderRadius: theme.shape.borderRadius, // 保持圖片的圓角
  },
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(-1),
  right: theme.spacing(-1),
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
  marginTop: theme.spacing(1),
  color: theme.palette.text.primary,
  textAlign: 'center',
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

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = Array.from(safeImages);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    setImages(reorderedItems);
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
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-images" direction="horizontal">
          {(provided) => (
            <PreviewContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {safeImages.map((image, index) => {
                const id = `image-${index}`;
                return (
                  <Draggable 
                    key={id}
                    draggableId={id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <DraggableItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <DraggablePreview
                          sx={{
                            opacity: snapshot.isDragging ? 0.6 : 1,
                            transform: snapshot.isDragging ? 'scale(1.05)' : 'scale(1)',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <ImagePreview>
                            <img 
                              src={image} 
                              alt={`preview ${index + 1}`}
                            />
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
                          </ImagePreview>
                          <SequenceNumber>
                            {index + 1}
                          </SequenceNumber>
                        </DraggablePreview>
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
    </Box>
  );
};

export default ImageUploader;
