import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

interface FileHandlerProps {
  isOpen: boolean;
  onOverwrite: () => void;
  onCancel: () => void;
}

const FileHandler: React.FC<FileHandlerProps> = ({ isOpen, onOverwrite, onCancel }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        選擇儲存位置
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          選擇「確認下載」後，您可以選擇儲存位置並確認是否要覆蓋現有檔案。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          取消下載
        </Button>
        <Button
          onClick={onOverwrite}
          color="primary"
          variant="contained"
          autoFocus
        >
          確認下載
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileHandler;
