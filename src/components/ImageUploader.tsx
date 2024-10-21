import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DropzoneArea = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  marginBottom: theme.spacing(2),
}));

const ImagePreviewContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
  gap: theme.spacing(2),
}));

const ImagePreview = styled(Box)(({ theme }) => ({
  position: 'relative',
  aspectRatio: '3/4',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: -12,
  right: -12,
  width: 24,
  height: 24,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 16,
  },
}));

interface ImageUploaderProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImages(prev => [...prev, ...acceptedFiles.map(file => URL.createObjectURL(file))]);
  }, [setImages]);

  const { getRootProps, getInputProps, open } = useDropzone({ 
    onDrop, 
    accept: {'image/*': []}, 
    noClick: true,
    noKeyboard: true
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setImages(items);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <DropzoneArea {...getRootProps()}>
        <input {...getInputProps()} />
        <Typography>請將圖片拖曳至此 或 
          <Button onClick={open} variant="contained" sx={{ ml: 1 }}>
            選擇圖片
          </Button>
        </Typography>
      </DropzoneArea>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="images" direction="horizontal">
          {(provided) => (
            <ImagePreviewContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {images.map((image, index) => (
                <Draggable key={image} draggableId={image} index={index}>
                  {(provided) => (
                    <ImagePreview
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Box position="relative" width="100%" height="100%">
                        <img src={image} alt={`preview ${index}`} />
                        <DeleteButton
                          size="small"
                          onClick={() => removeImage(index)}
                        >
                          <CloseIcon />
                        </DeleteButton>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 0.5,
                          textAlign: 'center',
                        }}
                      >
                        {index + 1}
                      </Typography>
                    </ImagePreview>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ImagePreviewContainer>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default ImageUploader;
