// src/utils/fileSystem.ts
export const checkSDCardEmpty = async (
  dirHandle: FileSystemDirectoryHandle,
  ignoreSystemFiles = true
): Promise<boolean> => {
  try {
    const entries = dirHandle.values();
    
    for await (const entry of entries) {
      // 忽略 macOS 的系統檔案
      if (ignoreSystemFiles && (
        entry.name.startsWith('.') ||
        entry.name === '.DS_Store' ||
        entry.name === 'Thumbs.db'
      )) {
        console.log('Ignoring system file:', entry.name);
        continue;
      }
      
      console.log('Found non-system file:', entry.name);
      return false; // 找到非系統檔案，返回 false
    }
    
    return true; // 沒有找到任何非系統檔案
  } catch (error) {
    console.error('Error checking SD card:', error);
    throw error;
  }
};

// 建立目錄
export const createDirectory = async (
  parentHandle: FileSystemDirectoryHandle,
  path: string
): Promise<FileSystemDirectoryHandle> => {
  try {
    const parts = path.split('/').filter(part => part.length > 0);
    let currentHandle = parentHandle;

    for (const part of parts) {
      currentHandle = await currentHandle.getDirectoryHandle(part, { create: true });
    }

    return currentHandle;
  } catch (error) {
    console.error('Error creating directory:', error);
    throw error;
  }
};

// 寫入檔案
export const writeFile = async (
  dirHandle: FileSystemDirectoryHandle,
  fileName: string,
  content: string | Blob
): Promise<void> => {
  try {
    const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
  } catch (error) {
    console.error('Error writing file:', error);
    throw error;
  }
};

// 複製圖片檔案
export const copyImage = async (
  sourceUrl: string,
  targetDir: FileSystemDirectoryHandle,
  newFileName: string
): Promise<void> => {
  try {
    const response = await fetch(sourceUrl);
    const blob = await response.blob();
    await writeFile(targetDir, newFileName, blob);
  } catch (error) {
    console.error('Error copying image:', error);
    throw error;
  }
};
