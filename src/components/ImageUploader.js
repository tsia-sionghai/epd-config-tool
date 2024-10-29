import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/ImageUploader.tsx
import { useCallback, useMemo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useTranslation } from 'react-i18next';
const DropzoneArea = styled(Box)(({ theme }) => ({
    border: `2px dashed ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1),
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
    overflow: 'visible',
    '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        borderRadius: theme.shape.borderRadius,
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
const ImageUploader = ({ images, setImages, maxImages = 10, size, rotate }) => {
    const { t } = useTranslation();
    const safeImages = useMemo(() => {
        return Array.isArray(images) ? images.map((image, index) => ({
            ...image,
            id: image.id || `image-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        })) : [];
    }, [images]);
    const onDrop = useCallback(async (acceptedFiles) => {
        const newImages = acceptedFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            id: `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        }));
        setImages(prev => {
            const prevImages = Array.isArray(prev) ? prev : [];
            return [...prevImages, ...newImages];
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
    const handleSelectImage = useCallback((event) => {
        event.preventDefault();
        if (safeImages.length < maxImages) {
            open();
        }
    }, [safeImages.length, maxImages, open]);
    const onDragEnd = useCallback((result) => {
        if (!result.destination) {
            return;
        }
        const reorderedItems = Array.from(safeImages);
        const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, reorderedItem);
        setImages(reorderedItems);
    }, [safeImages, setImages]);
    const removeImage = useCallback((index) => {
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
    return (_jsxs(Box, { children: [_jsxs(DropzoneArea, { ...getRootProps(), children: [_jsx("input", { ...getInputProps() }), _jsxs(Typography, { sx: { backgroundColor: 'transparent' }, children: [t('common.placeholder.dragOrSelect'), _jsx(Button, { variant: "basic", onClick: handleSelectImage, disabled: safeImages.length >= maxImages, sx: { ml: 1 }, children: t('common.placeholder.selectImage') })] })] }), _jsx(DragDropContext, { onDragEnd: onDragEnd, children: _jsx(Droppable, { droppableId: "droppable-images", direction: "horizontal", children: (provided) => (_jsxs(PreviewContainer, { ref: provided.innerRef, ...provided.droppableProps, children: [safeImages.map((image, index) => (_jsx(Draggable, { draggableId: image.id, index: index, children: (provided, snapshot) => (_jsx(DraggableItem, { ref: provided.innerRef, ...provided.draggableProps, ...provided.dragHandleProps, children: _jsxs(DraggablePreview, { sx: {
                                            opacity: snapshot.isDragging ? 0.6 : 1,
                                            transform: snapshot.isDragging ? 'scale(1.05)' : 'scale(1)',
                                            transition: 'all 0.2s ease',
                                        }, children: [_jsxs(ImagePreview, { children: [_jsx("img", { src: image.preview, alt: image.name || `preview ${index + 1}` }), _jsx(DeleteButton, { onClick: (e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                            removeImage(index);
                                                        }, "aria-label": "remove image", children: _jsx(CloseIcon, {}) })] }), _jsx(SequenceNumber, { children: index + 1 })] }) })) }, image.id))), provided.placeholder] })) }) })] }));
};
export default ImageUploader;
