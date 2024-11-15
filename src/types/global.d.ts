// src/types/global.d.ts

// 擴展 Window 介面
interface Window {
  showDirectoryPicker(options?: {
    mode?: 'read' | 'readwrite';
  }): Promise<FileSystemDirectoryHandle>;
  // 加入 showSaveFilePicker 定義
  showSaveFilePicker(options?: {
    suggestedName?: string;
    types?: Array<{
      description: string;
      accept: Record<string, string[]>;
    }>;
  }): Promise<FileSystemFileHandle>;
}

// 保留現有的介面定義，因為它們都是有用的
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

// 新增 FileSystemWritableFileStream 介面定義
interface FileSystemWritableFileStream extends WritableStream {
  write(data: BufferSource | Blob | string): Promise<void>;
  seek(position: number): Promise<void>;
  truncate(size: number): Promise<void>;
}

// UserAgentData 相關介面保持不變
interface UserAgentBrand {
  brand: string;
  version: string;
}

interface UserAgentData {
  platform?: string;
  mobile?: boolean;
  brands?: UserAgentBrand[];
}

// Navigator 介面保持不變
interface Navigator {
  userAgentData?: UserAgentData;
}
