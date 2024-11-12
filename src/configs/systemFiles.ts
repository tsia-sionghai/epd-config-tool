// src/configs/systemFiles.ts
export const systemFiles = {
  // Windows 系統檔案
  windows: [
    'System Volume Information',
    '$RECYCLE.BIN',
    'desktop.ini',
    'Thumbs.db',
    'RECYCLER',
    'pagefile.sys',
    'hiberfil.sys',
    'swapfile.sys'
  ],

  // macOS 系統檔案
  macos: [
    '.DS_Store',
    '.Spotlight-V100',
    '.Trashes',
    '.fseventsd',
    '.TemporaryItems',
    '.DocumentRevisions-V100'
  ],

  // 通用隱藏檔案
  common: [
    '..',
    '.'
  ]
};

// 系統檔案模式
export const systemFilePatterns = [
  /^\._.*/,              // macOS 元數據
  /^~\$.*/,              // Windows 暫存
  /^\$.*\.*/,            // Windows 系統
  /.*\.tmp$/i,           // 暫存檔案
  /^\.sync.*/,           // 同步檔案
  /^\.cache.*/           // 快取檔案
];
