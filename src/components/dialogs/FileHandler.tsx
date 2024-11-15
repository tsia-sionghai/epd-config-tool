import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface FileHandlerProps {
  isOpen: boolean;
  onOverwrite: () => void;
  onCancel: () => void;
}

const FileHandler: React.FC<FileHandlerProps> = ({ isOpen, onOverwrite, onCancel }) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {t('dialog.saveLocation.title')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t('dialog.saveLocation.description')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          {t('dialog.saveLocation.cancelButton')}
        </Button>
        <Button
          onClick={onOverwrite}
          color="primary"
          variant="contained"
          autoFocus
        >
          {t('dialog.saveLocation.confirmButton')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileHandler;
