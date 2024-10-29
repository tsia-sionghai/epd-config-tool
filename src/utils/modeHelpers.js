export const getModeTitle = (mode, t) => {
    switch (mode) {
        case 'auto':
            return t('common.title.auto');
        case 'cms':
            return t('common.title.cms');
        case 'nas':
            return t('common.title.nasBinary');
        default:
            return '';
    }
};
export const shouldShowNetworkSettings = (mode) => {
    return mode !== 'auto';
};
export const shouldShowDownloadButton = (mode) => {
    return mode === 'nas';
};
