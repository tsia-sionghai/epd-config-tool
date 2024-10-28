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

// 建立 signage_configure.json
export const createConfigFile = async (
  dirHandle: FileSystemDirectoryHandle,
  config: {
    Customer: string;
    Mode: string;
    PowerMode: string;
    Interval: string;
    WifiSetting: string;
    TimeZone: string;
    SoftAP: string;
    Path: string;
    ServerURL: string;
    PackageName: string;
    ActivityName: string;
  }
) => {
  try {
    const configContent = JSON.stringify(config, null, 2);
    await writeFile(dirHandle, 'signage_configure.json', configContent);
  } catch (error) {
    console.error('Error creating config file:', error);
    throw error;
  }
};

// 新增建立空檔案的函數
export const createEmptyFile = async (
  dirHandle: FileSystemDirectoryHandle,
  fileName: string
): Promise<void> => {
  try {
    console.log(`Creating empty file: ${fileName}`);
    await writeFile(dirHandle, fileName, '');
    console.log(`Successfully created empty file: ${fileName}`);
  } catch (error) {
    console.error(`Error creating empty file ${fileName}:`, error);
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

// 複製並重新命名圖片
export const copyImages = async (
  images: ImageFile[],
  targetDir: FileSystemDirectoryHandle
) => {
  try {
    for (const [index, image] of images.entries()) {
      const newFileName = `${index + 1}.png`;
      console.log(`Copying image ${newFileName}`);
      
      // 確保檔案存在
      if (!image.file) {
        console.error(`No file found for image at index ${index}`);
        continue;
      }

      // 使用 arrayBuffer 來複製檔案
      const blob = new Blob([await image.file.arrayBuffer()], { type: image.file.type });
      await writeFile(targetDir, newFileName, blob);
      console.log(`Successfully copied ${newFileName}`);
    }
  } catch (error) {
    console.error('Error copying images:', error);
    throw error;
  }
};
