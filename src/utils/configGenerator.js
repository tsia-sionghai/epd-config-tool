export const generateConfig = (mode, powerMode, timeZone, imageConfig, networkConfig) => {
    const baseConfig = {
        mode,
        powerMode,
        timeZone,
        size: imageConfig.size,
        rotate: imageConfig.rotate,
        interval: imageConfig.interval,
    };
    if (mode === 'auto' || mode === 'nas') {
        baseConfig.imageCount = imageConfig.images.length;
    }
    if (mode === 'cms' || mode === 'nas') {
        baseConfig.wifi = networkConfig ? {
            mode: networkConfig.wifi,
            ssid: networkConfig.ssid,
            password: networkConfig.password,
            ip: networkConfig.ip,
            netmask: networkConfig.netmask,
            gateway: networkConfig.gateway,
            dns: networkConfig.dns,
        } : undefined;
        if (mode === 'cms' && networkConfig?.serverURL) {
            baseConfig.serverURL = networkConfig.serverURL;
        }
        else if (mode === 'nas' && networkConfig?.nasURL) {
            baseConfig.nasURL = networkConfig.nasURL;
        }
    }
    return baseConfig;
};
