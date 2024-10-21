import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface ImageUploaderProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImages(prev => [...prev, ...acceptedFiles.map(file => URL.createObjectURL(file))]);
  }, [setImages]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: true });

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImages(items);
  };

  return (
    <Box>
      <Box {...getRootProps()} sx={{ border: '2px dashed grey', p: 2, mb: 2 }}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <Typography>Drop the images here ...</Typography> :
            <Typography>Drag 'n' drop some images here, or click to select images</Typography>
        }
      </Box>
      <Button variant="contained">選擇圖片</Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="images" direction="horizontal">
          {(provided) => (
            <Box
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}
            >
              {images.map((image, index) => (
                <Draggable key={image} draggableId={image} index={index}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{ position: 'relative', m: 1 }}
                    >
                      <img src={image} alt={`preview ${index}`} style={{ width: 100, height: 100, objectFit: 'cover' }} />
                      <IconButton
                        size="small"
                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                        sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'rgba(255,255,255,0.7)' }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <Typography variant="caption" align="center">{index + 1}</Typography>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default ImageUploader;
