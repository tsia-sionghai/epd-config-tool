// src/utils/configGenerator.ts
import { 
  ModeType, 
  PowerModeType, 
  TimeZoneType, 
  ImageConfig, 
  NetworkConfig,
  SignageConfig,
  SignageConfigFile 
} from '../types/common';

// 處理網路設定的輔助函數
const processNetworkConfig = (
  networkConfig: NetworkConfig,
  mode: ModeType
): Partial<SignageConfig> => {
  // 基礎網路設定
  const config: Partial<SignageConfig> = {
    WifiSetting: networkConfig.password
      ? `${networkConfig.ssid},${networkConfig.password}`
      : networkConfig.ssid
  };

  // 處理 Static IP 設定
  if (networkConfig.wifi === 'staticIP') {
    Object.assign(config, {
      IP_addr: networkConfig.ip,
      Netmask: networkConfig.netmask,
      Gateway: networkConfig.gateway,
      DNS: networkConfig.dns
    });
  }

  // 設定 ServerURL 和 ServerSyncInterval（適用於 CMS 和 NAS 模式）
  if (['cms', 'nas'].includes(mode)) {
    config.ServerURL = networkConfig.serverURL || '';
    config.ServerSyncInterval = networkConfig.ServerSyncInterval || 10; // 預設值 10
  }

  return config;
};

// 生成用於播放的配置（用於 ePoster.zip）
export const generatePlaybackConfig = (
  customer: string,
  mode: ModeType,
  powerMode: PowerModeType,
  timeZone: TimeZoneType,
  imageConfig: ImageConfig,
  networkConfig?: NetworkConfig
): SignageConfig => {
  return {
    Customer: customer,
    Mode: mode,
    PowerMode: powerMode,
    TimeZone: timeZone,
    SoftAP: "0",
    Path: "/sdcard/image/slideshow",
    Size: imageConfig.size,
    Rotate: imageConfig.rotate,
    Interval: imageConfig.interval,
    WifiSetting: "",  // 固定為空
    ServerURL: "",    // 固定為空
    PackageName: "",
    ActivityName: "",
    ServerSyncInterval: networkConfig?.ServerSyncInterval || 10  // 保持與實際設定一致
  };
};

// 生成用於 SD Card 的配置
export const generateSDCardConfig = (
  customer: string,
  mode: ModeType,
  powerMode: PowerModeType,
  timeZone: TimeZoneType,
  imageConfig: ImageConfig,
  networkConfig?: NetworkConfig
): SignageConfig => {
  // 基本配置
  const baseConfig: SignageConfig = {
    Customer: customer,
    Mode: mode,
    PowerMode: powerMode,
    TimeZone: timeZone,
    SoftAP: "0",
    Path: "/sdcard/image/slideshow",
    Size: imageConfig.size,
    Rotate: imageConfig.rotate,
    Interval: imageConfig.interval,
    WifiSetting: "",
    ServerURL: "",
    PackageName: "",
    ActivityName: "",
    ServerSyncInterval: 10  // 預設值
  };

  // 如果有網路設定且是 CMS 或 NAS 模式，則處理網路設定
  if (networkConfig && ['cms', 'nas'].includes(mode)) {
    const networkSettings = processNetworkConfig(networkConfig, mode);
    return {
      ...baseConfig,
      ...networkSettings
    };
  }

  return baseConfig;
};

// 轉換為檔案格式的函數
export const convertToConfigFile = (config: SignageConfig): SignageConfigFile => ({
  ...config,
  Rotate: config.Rotate.toString(),
  Interval: config.Interval.toString(),
  ServerSyncInterval: config.ServerSyncInterval.toString()
});
