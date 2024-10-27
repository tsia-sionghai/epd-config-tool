// src/types/global.d.ts
interface Window {
  showDirectoryPicker(options?: {
    mode?: 'read' | 'readwrite';
  }): Promise<FileSystemDirectoryHandle>;
}

interface FileSystemDirectoryHandle {
  kind: 'directory';
  name: string;
  // ... 其他屬性
}
