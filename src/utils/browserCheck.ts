export const checkBrowserSupport = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  
  // 開發環境下只記錄 userAgent
  if (import.meta.env.DEV) {
    console.log('Browser Detection:', {
      userAgent
      // 移除 platform
    });
  }

  const isEdge = /edg\//.test(userAgent);
  const isChrome = /chrome\//.test(userAgent) && !/edg\//.test(userAgent);
  const result = isChrome || isEdge;
  
  if (import.meta.env.DEV) {
    console.log('Browser Support Check:', {
      isChrome,
      isEdge,
      result
    });
  }

  return result;
};
