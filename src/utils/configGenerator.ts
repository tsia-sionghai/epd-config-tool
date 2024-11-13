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

// 生成內部使用的配置
export const generateConfig = (
  customer: string,
  mode: ModeType,
  powerMode: PowerModeType,
  timeZone: TimeZoneType,
  imageConfig: ImageConfig,
  networkConfig?: NetworkConfig
): SignageConfig => {
  const config: SignageConfig = {
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
    ActivityName: ""
  };

  // 只在 CMS 模式時處理網路設定
  if (mode === 'cms' && networkConfig) {
    config.WifiSetting = `${networkConfig.ssid}${networkConfig.password ? ',' + networkConfig.password : ''}`;
    config.ServerURL = networkConfig.serverURL || "";

    if (networkConfig.wifi === 'staticIP') {
      config.IP_addr = networkConfig.ip;
      config.Netmask = networkConfig.netmask;
      config.Gateway = networkConfig.gateway;
      config.DNS = networkConfig.dns;
    }
  }
  
  return config;
};

// 新增：轉換為檔案格式的函數
export const convertToConfigFile = (config: SignageConfig): SignageConfigFile => {
  return {
    ...config,
    // 確保數值都被轉換為字串
    Rotate: config.Rotate.toString(),
    Interval: config.Interval.toString()
  };
};
