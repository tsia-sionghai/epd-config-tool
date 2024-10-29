import React from 'react';
interface SDCardPathSettingsProps {
    sdCardPath: string;
    setSdCardPath: (path: string) => void;
    onDirectorySelect: (handle: FileSystemDirectoryHandle) => void;
    disabled?: boolean;
    onError?: (message: string) => void;
}
declare const SDCardPathSettings: React.FC<SDCardPathSettingsProps>;
export default SDCardPathSettings;
