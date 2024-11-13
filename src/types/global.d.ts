// src/types/global.d.ts

// 現有的 Window 介面定義
interface Window {
  showDirectoryPicker(options?: {
    mode?: 'read' | 'readwrite';
  }): Promise<FileSystemDirectoryHandle>;
}

// 檔案系統相關介面
interface FileSystemFileHandle extends FileSystemHandle {
  kind: 'file';
  getFile(): Promise<File>;
  createWritable(options?: FileSystemCreateWritableOptions): Promise<FileSystemWritableFileStream>;
}

interface FileSystemDirectoryHandle extends FileSystemHandle {
  kind: 'directory';
  getDirectoryHandle(name: string, options?: { create?: boolean }): Promise<FileSystemDirectoryHandle>;
  getFileHandle(name: string, options?: { create?: boolean }): Promise<FileSystemFileHandle>;
  values(): AsyncIterableIterator<FileSystemHandle>;
}

interface FileSystemHandle {
  kind: 'file' | 'directory';
  name: string;
}

// 新增 UserAgentData 相關介面
interface UserAgentBrand {
  brand: string;
  version: string;
}

interface UserAgentData {
  platform?: string;
  mobile?: boolean;
  brands?: UserAgentBrand[];
}

// 擴展 Navigator 介面
interface Navigator {
  userAgentData?: UserAgentData;
}
