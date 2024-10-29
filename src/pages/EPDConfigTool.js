import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/EPDConfigTool.tsx
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Backdrop, Box, CircularProgress, Snackbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { checkBrowserSupport } from '../utils/browserCheck';
import PageHeader from '../components/PageHeader';
import BasicSettings from '../components/BasicSettings';
import NetworkSettings from '../components/NetworkSettings';
import ImageSettings from '../components/ImageSettings';
import SDCardPathSettings from '../components/SDCardPathSettings';
import ActionButtons from '../components/ActionButtons';
import { createConfigFile, createDirectory, copyImages, createEmptyFile, checkSDCardEmpty } from '../utils/fileSystem';
// Styled Backdrop
const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
}));
const EPDConfigurationTool = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    // 檢查是否是支援的瀏覽器
    const isSupportedBrowser = useMemo(() => checkBrowserSupport(), []);
    // States for UI feedback
    const [sdCardHandle, setSdCardHandle] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingStatus, setProcessingStatus] = useState('');
    const [showBrowserWarning, setShowBrowserWarning] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState({
        show: false,
        message: ''
    });
    useEffect(() => {
        if (!isSupportedBrowser) {
            setShowBrowserWarning(true);
        }
    }, [isSupportedBrowser]);
    // Basic settings state
    const [customer, setCustomer] = useState('');
    const [customerError, setCustomerError] = useState('');
    const [mode, setMode] = useState('auto');
    const [powerMode, setPowerMode] = useState('hibernation');
    const [timeZone, setTimeZone] = useState('GMT+08:00');
    const [sdCardPath, setSdCardPath] = useState('');
    const handleGenerateConfig = async () => {
        try {
            // 清除之前的錯誤訊息
            setCustomerError('');
            // 1. 檢查共同必填項目: Customer
            if (!customer.trim()) {
                setCustomerError(t('common.error.customerRequired'));
                return;
            }
            // 2. 檢查 SD Card 是否已選擇
            if (!sdCardHandle) {
                setError({
                    show: true,
                    message: t('common.error.noSDCardSelected')
                });
                return;
            }
            // 開始處理，顯示 Backdrop
            setIsProcessing(true);
            // 3. 根據不同模式檢查必填欄位
            if (mode === 'auto') {
                // 檢查是否有選擇圖片
                if (!imageConfig.images.length) {
                    setError({
                        show: true,
                        message: t('common.error.noImagesSelected')
                    });
                    return;
                }
            }
            else if (mode === 'cms') {
                // CMS 模式下的欄位檢查
                const errors = [];
                // 基本必填: SSID 和 Server URL
                if (!networkConfig.ssid.trim())
                    errors.push('SSID');
                if (!serverURL.trim())
                    errors.push('CMS Server URL');
                // WPA2 Personal 和 Static IP 模式需要密碼
                if (['wpa2Personal', 'staticIP'].includes(networkConfig.wifi) &&
                    !networkConfig.password.trim()) {
                    errors.push('WiFi Password');
                }
                // Static IP 模式的額外檢查
                if (networkConfig.wifi === 'staticIP') {
                    if (!networkConfig.ip.trim())
                        errors.push('IP Address');
                    if (!networkConfig.netmask.trim())
                        errors.push('Netmask');
                    if (!networkConfig.gateway.trim())
                        errors.push('Gateway');
                    if (!networkConfig.dns.trim())
                        errors.push('DNS');
                }
                if (errors.length > 0) {
                    setError({
                        show: true,
                        message: t('common.error.requiredFields', { fields: errors.join(', ') })
                    });
                    return;
                }
            }
            // nas 模式暫不處理
            // 4. 檢查 SD Card 是否為空
            setProcessingStatus(t('common.status.checkingSDCard'));
            const isEmpty = await checkSDCardEmpty(sdCardHandle, true);
            if (!isEmpty) {
                setError({
                    show: true,
                    message: t('common.error.sdCardNotEmpty')
                });
                return;
            }
            // 5. 建立必要檔案
            // 建立 show_info
            setProcessingStatus(t('common.status.creatingFiles'));
            await createEmptyFile(sdCardHandle, 'show_info');
            // 只在 auto 模式下處理圖片
            if (mode === 'auto') {
                setProcessingStatus(t('common.status.creatingDirectory'));
                const imageDir = await createDirectory(sdCardHandle, 'image/slideshow');
                setProcessingStatus(t('common.status.copyingImages'));
                await copyImages(imageConfig.images, imageDir);
            }
            // 6. 建立設定檔
            setProcessingStatus(t('common.status.creatingConfig'));
            const configData = {
                Customer: customer,
                Mode: mode,
                PowerMode: powerMode,
                TimeZone: timeZone,
                SoftAP: "0",
                Path: "/sdcard/image/slideshow",
                // 根據模式設定不同的值
                ...(mode === 'cms' ? {
                    Interval: "180",
                    WifiSetting: `${networkConfig.ssid}${networkConfig.password ? ',' + networkConfig.password : ''}`,
                    ServerURL: serverURL,
                    ...(networkConfig.wifi === 'staticIP' ? {
                        IP_addr: networkConfig.ip,
                        Netmask: networkConfig.netmask,
                        Gateway: networkConfig.gateway,
                        DNS: networkConfig.dns
                    } : {})
                } : {
                    // auto 模式的設定
                    Interval: imageConfig.interval.toString(),
                    WifiSetting: "",
                    ServerURL: "",
                }),
                PackageName: "",
                ActivityName: "",
            };
            await createConfigFile(sdCardHandle, configData);
            // 完成處理
            setShowSuccess(true);
        }
        catch (error) {
            console.error('Error in handleGenerateConfig:', error);
            setError({
                show: true,
                message: t('common.error.generateConfigFailed')
            });
        }
        finally {
            setIsProcessing(false);
            setProcessingStatus('');
        }
    };
    // 當 customer 值改變時清除錯誤訊息
    const handleCustomerChange = (value) => {
        setCustomer(value);
        if (customerError) {
            setCustomerError('');
        }
    };
    // Network settings state
    const [networkConfig, setNetworkConfig] = useState({
        wifi: 'wpa2Personal',
        ssid: '',
        password: '',
        ip: '',
        netmask: '',
        gateway: '',
        dns: '',
    });
    // Image settings state
    const [imageConfig, setImageConfig] = useState({
        size: '13.3',
        rotate: 0,
        interval: 180,
        images: []
    });
    // Additional settings state
    const [serverURL, setServerURL] = useState('https://api.ezread.com.tw/schedule');
    const [nasURL, setNasURL] = useState('');
    const handleNetworkConfigChange = (updates) => {
        setNetworkConfig(prev => ({ ...prev, ...updates }));
    };
    const handleImageConfigChange = (updates) => {
        if (typeof updates === 'function') {
            setImageConfig(updates);
        }
        else {
            setImageConfig(prev => ({
                ...prev,
                ...updates
            }));
        }
    };
    const handleSDCardError = (message) => {
        setError({
            show: true,
            message
        });
    };
    return (_jsxs(Box, { children: [_jsx(PageHeader, {}), _jsx(BasicSettings, { customer: customer, setCustomer: handleCustomerChange, customerError: customerError, mode: mode, setMode: setMode, powerMode: powerMode, setPowerMode: setPowerMode, timeZone: timeZone, setTimeZone: setTimeZone }), _jsx(ImageSettings, { mode: mode, config: imageConfig, onConfigChange: handleImageConfigChange }), _jsx(NetworkSettings, { mode: mode, config: networkConfig, onConfigChange: handleNetworkConfigChange, serverURL: serverURL, setServerURL: setServerURL, nasURL: nasURL, setNasURL: setNasURL }), _jsx(SDCardPathSettings, { sdCardPath: sdCardPath, setSdCardPath: setSdCardPath, onDirectorySelect: setSdCardHandle, disabled: !isSupportedBrowser, onError: handleSDCardError }), _jsx(ActionButtons, { mode: mode, onGenerateConfig: handleGenerateConfig, disabled: !isSupportedBrowser }), _jsxs(StyledBackdrop, { open: isProcessing, children: [_jsx(CircularProgress, { color: "inherit", size: 60 }), _jsx(Typography, { variant: "h6", component: "div", children: processingStatus || t('common.status.processing') })] }), _jsx(Snackbar, { open: showBrowserWarning, autoHideDuration: 6000, onClose: () => setShowBrowserWarning(false), anchorOrigin: { vertical: 'top', horizontal: 'center' }, children: _jsx(Alert, { onClose: () => setShowBrowserWarning(false), severity: "warning", variant: "filled", sx: {
                        width: '100%',
                        backgroundColor: theme => theme.palette.primary.dark,
                    }, children: t('common.error.browserNotSupported') }) }), _jsx(Snackbar, { open: error.show, autoHideDuration: 6000, onClose: (_event, reason) => {
                    setError({ ...error, show: false });
                    // 如果是點擊關閉按鈕且錯誤訊息是 customerRequired
                    if (reason === 'clickaway' ||
                        error.message !== t('common.error.customerRequired')) {
                        return;
                    }
                }, anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, children: _jsx(Alert, { onClose: () => {
                        setError({ ...error, show: false });
                    }, severity: "error", variant: "filled", sx: { width: '100%' }, children: error.message }) }), _jsx(Snackbar, { open: showSuccess, autoHideDuration: 6000, onClose: () => setShowSuccess(false), anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, children: _jsx(Alert, { onClose: () => setShowSuccess(false), severity: "success", variant: "filled", sx: { width: '100%' }, children: t('common.success.configGenerated') }) })] }));
};
export default EPDConfigurationTool;
