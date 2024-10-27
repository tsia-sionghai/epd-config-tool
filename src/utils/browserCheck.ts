// src/utils/browserCheck.ts
export const checkBrowserSupport = () => {
  const isChromium = window.navigator.vendor.includes('Google') || 
                    window.navigator.vendor.includes('Microsoft');
  const hasFileSystem = 'showDirectoryPicker' in window;
  
  return isChromium && hasFileSystem;
};
