// src/utils/fileSystem.ts
export const checkSDCardEmpty = async (dirHandle, ignoreSystemFiles = true) => {
    try {
        console.log('Starting to check directory:', dirHandle.name);
        // 獲取目錄內容
        const entries = dirHandle.values();
        // 遍歷所有檔案
        for await (const entry of entries) {
            // 忽略系統檔案
            if (ignoreSystemFiles && (entry.name.startsWith('.') || // 隱藏檔案
                entry.name === '.DS_Store' || // macOS 系統檔案
                entry.name === 'Thumbs.db' || // Windows 系統檔案
                entry.name === '.Spotlight-V100' || // macOS Spotlight 索引
                entry.name === '.Trashes' || // macOS 垃圾桶
                entry.name === '.fseventsd' // macOS 檔案系統事件
            )) {
                console.log('Ignoring system file:', entry.name);
                continue;
            }
            // 如果找到非系統檔案
            console.log('Found non-system file:', entry.name);
            return false;
        }
        // 如果遍歷完成沒有找到非系統檔案，表示目錄為空
        console.log('Directory is empty (excluding system files)');
        return true;
    }
    catch (error) {
        console.error('Error checking directory:', error);
        throw error;
    }
};
// 建立目錄
export const createDirectory = async (parentHandle, path) => {
    try {
        const parts = path.split('/').filter(part => part.length > 0);
        let currentHandle = parentHandle;
        for (const part of parts) {
            currentHandle = await currentHandle.getDirectoryHandle(part, { create: true });
        }
        return currentHandle;
    }
    catch (error) {
        console.error('Error creating directory:', error);
        throw error;
    }
};
// 建立 signage_configure.json
export const createConfigFile = async (dirHandle, config) => {
    try {
        const configContent = JSON.stringify(config, null, 2);
        await writeFile(dirHandle, 'signage_configure.json', configContent);
    }
    catch (error) {
        console.error('Error creating config file:', error);
        throw error;
    }
};
// 新增建立空檔案的函數
export const createEmptyFile = async (dirHandle, fileName) => {
    try {
        console.log(`Creating empty file: ${fileName}`);
        await writeFile(dirHandle, fileName, '');
        console.log(`Successfully created empty file: ${fileName}`);
    }
    catch (error) {
        console.error(`Error creating empty file ${fileName}:`, error);
        throw error;
    }
};
// 寫入檔案
export const writeFile = async (dirHandle, fileName, content) => {
    try {
        const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
    }
    catch (error) {
        console.error('Error writing file:', error);
        throw error;
    }
};
// 複製並重新命名圖片
export const copyImages = async (images, targetDir) => {
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
    }
    catch (error) {
        console.error('Error copying images:', error);
        throw error;
    }
};
