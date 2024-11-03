// src/utils/systemFileLogger.ts
const unknownSystemFiles = new Set<string>();

export const logUnknownSystemFile = (fileName: string, osInfo?: string) => {
  const logEntry = {
    fileName,
    osInfo,
    timestamp: new Date().toISOString(),
  };
  unknownSystemFiles.add(JSON.stringify(logEntry));
  console.warn('Potential unknown system file:', logEntry);
};

export const getUnknownSystemFiles = () => Array.from(unknownSystemFiles);
