import { ImageFile } from "../types/common";
export declare const checkSDCardEmpty: (dirHandle: FileSystemDirectoryHandle, ignoreSystemFiles?: boolean) => Promise<boolean>;
export declare const createDirectory: (parentHandle: FileSystemDirectoryHandle, path: string) => Promise<FileSystemDirectoryHandle>;
export declare const createConfigFile: (dirHandle: FileSystemDirectoryHandle, config: {
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
}) => Promise<void>;
export declare const createEmptyFile: (dirHandle: FileSystemDirectoryHandle, fileName: string) => Promise<void>;
export declare const writeFile: (dirHandle: FileSystemDirectoryHandle, fileName: string, content: string | Blob) => Promise<void>;
export declare const copyImages: (images: ImageFile[], targetDir: FileSystemDirectoryHandle) => Promise<void>;
