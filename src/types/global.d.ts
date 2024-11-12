// src/types/global.d.ts

// 現有的 Window 介面定義
interface Window {
  showDirectoryPicker(options?: {
    mode?: 'read' | 'readwrite';
  }): Promise<FileSystemDirectoryHandle>;
}

// 檔案系統相關介面
interface FileSystemDirectoryHandle {
  kind: 'directory';
  name: string;
  // ... 其他屬性
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
